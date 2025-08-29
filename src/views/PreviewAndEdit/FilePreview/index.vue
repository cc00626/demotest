<template>
  <div class="pdf-scroll-container">
    <!-- 加载状态 -->
    <!-- <div v-if="loading" class="loading">加载中...</div> -->

    <!-- 错误提示 -->
    <!-- <div v-if="error" class="error">{{ error }}</div> -->

    <!-- PDF 操作栏 -->
    <div class="pdf-toolbar">
      <!-- 页码跳转 -->
      <div class="page-jump">
        <input v-model.number="jumpPage" type="text" min="1" :max="totalPages" placeholder="页码"
          @keyup.enter="jumpToPage" style="background-color: #f3f4f6;border: 1px solid #d1d5db;" />
        <span>/ {{ totalPages }}</span>
        <el-button :icon="Search"></el-button>
      </div>


      <!-- 缩放控制 -->
      <div class="zoom-controls">
        <button @click="zoom(1.2)">+</button>
        <button @click="zoom(0.8)">-</button>
      </div>


    </div>


    <!-- PDF 多页容器（滚动区域） -->
    <div class="pdf-pages" style="height: 475px;">
      <!-- 动态渲染每一页的 Canvas -->
      <canvas v-for="pageNum in totalPages" :key="pageNum" :ref="(el) => pdfCanvases[pageNum] = el"
        class="pdf-page-canvas"></canvas>
      <!-- 搜索高亮覆盖层（简单示例，实际需更完善处理） -->
      <div v-if="searchResults.length > 0" class="search-highlight" :style="{
        top: searchTop + 'px',
        left: searchLeft + 'px',
        width: searchWidth + 'px',
        height: searchHeight + 'px',
      }"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from "vue";
import * as pdfjsLib from "pdfjs-dist";
import useEditStore from "@/store/edit";
import { Search } from "@element-plus/icons-vue";

// 1. 从 Store 获取当前 PDF 地址
const editStore = useEditStore();
const pdfUrl = computed(() => {
  return editStore.fileList.find((item) => item.id === editStore.selectedId)?.url || "";
});

// 2. 配置 PDF.js Worker（必须）
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// 3. 响应式变量
const pdfCanvases = ref<{ [key: number]: HTMLCanvasElement | null }>({}); // 存储每一页的 Canvas
const loading = ref(true);
const error = ref("");
const totalPages = ref(0); // PDF 总页数
let pdfDoc: pdfjsLib.PDFDocumentProxy | null = null; // PDF 文档实例（复用）
let currentScale = 0.68; // 当前缩放比例（默认 100%）

// 新增功能相关变量
const jumpPage = ref(1); // 用于页码跳转的输入值
const searchQuery = ref(""); // 搜索关键词
const searchResults = ref<{ page: number; x: number; y: number; width: number; height: number }[]>([]); // 搜索结果存储
const searchTop = ref(0);
const searchLeft = ref(0);
const searchWidth = ref(0);
const searchHeight = ref(0);
const sidebarType = ref<"outline" | "thumbnails" | null>(null); // 侧边栏类型，如大纲、缩略图
const outline = ref<any[]>([]); // 存储 PDF 大纲数据
const thumbnailsLoaded = ref(false); // 缩略图是否加载完成

// 4. 渲染所有页的核心函数
const renderAllPages = async () => {
  try {
    loading.value = true;
    error.value = "";

    // 校验 PDF 地址
    if (!pdfUrl.value) {
      error.value = "未选中有效 PDF 文件";
      return;
    }

    // 加载 PDF 文档（复用实例）
    if (!pdfDoc) {
      pdfDoc = await pdfjsLib.getDocument(pdfUrl.value).promise;
      totalPages.value = pdfDoc.numPages;
      // 加载大纲数据
      const outlineData = await pdfDoc.getOutline().catch(() => []);
      outline.value = outlineData || [];
    }

    // 循环渲染每一页
    for (let pageNum = 1; pageNum <= totalPages.value; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: currentScale }); // 应用当前缩放

      // 获取当前页的 Canvas
      const canvas = pdfCanvases.value[pageNum];
      if (!canvas) {
        error.value = `第 ${pageNum} 页 Canvas 未初始化`;
        continue;
      }

      // 渲染到 Canvas
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: ctx, viewport }).promise;

      // 如果是缩略图视图，可在这里做特殊处理（简单示例，暂未完善）
      if (sidebarType.value === "thumbnails" && !thumbnailsLoaded.value) {
        // 可简化绘制缩略图，实际需更清晰的小尺寸渲染逻辑
        const thumbnailViewport = page.getViewport({ scale: 0.2 });
        const thumbnailCtx = canvas.getContext("2d");
        if (thumbnailCtx) {
          thumbnailCtx.save();
          thumbnailCtx.scale(0.2, 0.2);
          await page.render({ canvasContext: thumbnailCtx, viewport: thumbnailViewport }).promise;
          thumbnailCtx.restore();
        }
      }
    }

    // 若有搜索结果，尝试定位高亮（简单示例，实际需遍历结果处理）
    if (searchResults.value.length > 0) {
      const firstResult = searchResults.value[0];
      searchTop.value = firstResult.y;
      searchLeft.value = firstResult.x;
      searchWidth.value = firstResult.width;
      searchHeight.value = firstResult.height;
    }

    thumbnailsLoaded.value = sidebarType.value === "thumbnails";

  } catch (err) {
    error.value = err instanceof Error ? err.message : "PDF 渲染失败";
    console.error("PDF 渲染错误:", err);
  } finally {
    loading.value = false;
  }
};

// 5. 缩放功能（修改 scale 后重新渲染所有页）
const zoom = (factor: number) => {
  currentScale *= factor;
  renderAllPages(); // 重新渲染所有页以应用新缩放
};

// 6. 监听 PDF 地址变化（切换文件时重置状态）
watch(pdfUrl, (newUrl) => {
  if (newUrl) {
    pdfDoc = null; // 重置 PDF 实例，加载新文件
    totalPages.value = 0;
    currentScale = 0.68; // 重置缩放比例
    jumpPage.value = 1;
    searchQuery.value = "";
    searchResults.value = [];
    sidebarType.value = null;
    outline.value = [];
    thumbnailsLoaded.value = false;
    renderAllPages();
  }
});

// 7. 组件挂载时初始化
onMounted(() => {
  renderAllPages();
});

// 新增功能逻辑

// 页码跳转
const jumpToPage = () => {
  if (jumpPage.value < 1 || jumpPage.value > totalPages.value) {
    return;
  }
  // 简单实现：滚动到对应页，可结合 IntersectionObserver 精准定位
  nextTick(() => {
    const targetCanvas = pdfCanvases.value[jumpPage.value];
    if (targetCanvas) {
      const container = document.querySelector(".pdf-pages") as HTMLElement;
      container.scrollTop = targetCanvas.offsetTop - 20; // 滚动到目标页，留出间距
    }
  });
};

// 搜索功能（简单示例，仅演示逻辑，实际需完善文本匹配和高亮）
const handleSearch = async () => {
  if (!searchQuery.value || !pdfDoc) return;
  searchResults.value = [];
  for (let pageNum = 1; pageNum <= totalPages.value; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    textContent.items.forEach((textItem) => {
      if (textItem.str.includes(searchQuery.value)) {
        // 简单获取文本位置用于高亮，实际需更准确的坐标计算和覆盖层处理
        const { x, y, width, height } = textItem;
        searchResults.value.push({ page: pageNum, x, y, width, height });
      }
    });
  }
  // 重新渲染以显示高亮（简单示例，实际可通过绝对定位覆盖层实现）
  renderAllPages();
};

// 清空搜索
const clearSearch = () => {
  searchQuery.value = "";
  searchResults.value = [];
  renderAllPages();
};

// 视图切换（大纲/缩略图等）
// 优化：切换到大纲时，确保大纲数据已加载（防止数据未初始化）
const toggleSidebar = (type: "outline" | "thumbnails") => {
  if (sidebarType.value === type) {
    sidebarType.value = null;
    thumbnailsLoaded.value = false;
  } else {
    sidebarType.value = type;
    if (type === "thumbnails") {
      // 缩略图逻辑保持不变
      thumbnailsLoaded.value = false;
      renderAllPages();
    } else if (type === "outline") {
      // 新增：切换到大纲时，若未加载大纲数据则重新加载
      if (outline.value.length === 0 && pdfDoc) {
        pdfDoc.getOutline().then((data) => {
          outline.value = data || [];
        }).catch(() => {
          outline.value = [];
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
/* 滚动容器核心样式：固定高度 + 溢出滚动 */
.pdf-scroll-container {
  width: 480px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
}

/* 操作栏样式 */
.pdf-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #f3f4f6;
  gap: 10px;
}

.page-jump {
  display: flex;
  align-items: center;
  gap: 5px;
  // border: 1px solid #e5e7eb;
}

.page-jump input {
  width: 60px;
  padding: 4px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.search {
  display: flex;
  gap: 5px;
}

.search input {
  padding: 4px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.search button {
  padding: 4px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
}

.zoom-controls button {
  margin-left: 8px;
  padding: 4px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
}

.view-switch button {
  padding: 4px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s;

  &.active {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
}

/* 滚动区域：固定高度，超出部分纵向滚动 */
.pdf-pages {
  width: 100%;
  overflow-y: auto;
  /* 关键：纵向滚动 */
  border-radius: 4px;
  scroll-behavior: smooth;
  /* 滚动动画（可选） */
  position: relative;
}

/* 单页 Canvas 样式：水平居中，添加页间距 */
.pdf-page-canvas {
  display: block;
  /* 去除默认 inline 导致的间距 */
  margin: 20px auto;
  /* 水平居中，页与页之间留间距 */
  border: 1px solid #eee;
  background-color: #fff;
}

/* 搜索高亮覆盖层样式（简单示例，实际需优化） */
.search-highlight {
  position: absolute;
  background-color: rgba(255, 217, 102, 0.5);
  pointer-events: none;
  z-index: 1;
}

/* 加载状态与错误提示 */
.loading,
.error {
  text-align: center;
  padding: 40px 0;
  font-size: 16px;
}

.error {
  color: #dc2626;
}

/* 控制栏：页码 + 缩放 */
.pdf-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding: 0 10px;
}

.page-info {
  color: #666;
  font-size: 14px;
}
</style>