<template>
  <div class="tree-wrapper">
    <!-- 文档库标题 -->
    <div class="list-title">文档库</div>

    <!-- 文档列表 -->
    <div v-for="item in documentList" :key="item.id" class="custom-list-item" @click="ToDocument(item)">
      <span class="title">{{ item.title }}</span>
      <div class="actions">
        <el-dropdown trigger="click">
          <el-icon color="#8c8c8c" @click.stop :size="20">
            <MoreFilled />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>编辑</el-dropdown-item>
              <el-dropdown-item>权限</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 监听元素触底加载 -->
    <div ref="infiniteRef" class="infinite-trigger" v-show="!allCollapsed">{{ loading ? '加载中...' : hasMore ? '' :
      '没有更多了' }}</div>
  </div>
</template>

<script lang="ts" setup>
import { MoreFilled } from '@element-plus/icons-vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import { useRouter } from 'vue-router'
import { getDocumentList } from '../../api/document'
import { computed, onMounted, ref } from 'vue'

interface Tree {
  id: number
  title: string
  children?: Tree[]
}
const router = useRouter()
const infiniteRef = ref()
const page = ref<number>(1) // 当前页数
const pageSize = ref<number>(20) // 每页数量
const total = ref<number>(0) //总页数
const documentList = ref<Tree[]>([]) //文档列表
const hasMore = ref(true) // 是否还有更多数据
const loading = ref(false) // 是否正在加载
const allCollapsed = ref(false)
const loadingTriggered = ref(false)
// 用 Set 存储展开节点 id
const expandedIds = ref(new Set());
const dropdown1 = ref()
const ToDocument = (data: Tree) => {
  //路由跳转
  router.push(`/${data.id}`)
}

//初始数据
const treeData = ref([
  {
    id: -1,
    title: '文档库',
    children: [] as Tree[]
  },
])

const defaultProps = {
  children: 'children',
  label: 'title',
}


//节点点击
const handleNodeClick = (data: Tree) => {
  router.push(`/${data.id}`)
}

//获取树形数据
const getTreeData = async (page: number, pageSize: number) => {
  //加载完
  if (loading.value || !hasMore.value) return

  //加载中
  loading.value = true
  const data = await getDocumentList(page, pageSize)
  documentList.value = [...documentList.value, ...data.data.list]
  treeData.value[0].children = documentList.value
  total.value = data.data.total

  // ✅ 判断是否还有数据
  if (documentList.value.length >= total.value) {
    hasMore.value = false
    // observer?.disconnect?.() // 停止监听
  }
  console.log("数据加载完成");
  loading.value = false
}
getTreeData(page.value, pageSize.value)


//触底加载更多
const loadMore = () => {
  page.value += 1
  getTreeData(page.value, pageSize.value)
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.isIntersecting && hasMore.value && !loading.value) {
      loadMore()
    }
  }, {
    root: document.querySelector('.scroll-container'), // ✅ 要确保这里是可滚动容器
    rootMargin: '0px',
    threshold: 1.0,
  })

  if (infiniteRef.value) {
    observer.observe(infiniteRef.value)
  }
})
</script>
<style scoped lang="scss">
.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  // padding: 4px 8px;
  font-size: 15px;
  color: #1f2329;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  // margin: 3px 0;

  &:hover {
    background-color: #f5f5f5;
  }

  span {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .el-button {
    padding: 0 4px;
    font-size: 16px;
    color: #6b778c;
  }
}


// 标题的样式
.is-title {
  font-weight: bold;
  font-size: 16px;
  // color: #;
}

:deep(.el-tree-node__content) {
  height: 32px;
  line-height: 32px;
}

:deep(.el-dropdown) {
  &:hover {
    background-color: #e6e6e6;
  }
}

.tree-wrapper {
  max-height: calc(100vh - 32px - 160px); // 👉 控制高度，超出出现滚动条
  overflow-y: auto;
  // border: 1px solid #f0f0f0;
  padding: 0px 4px 4px 4px;
  // border-radius: 4px;
  background-color: #fafafa;

  // 自定义滚动条（Webkit）
  &::-webkit-scrollbar {
    width: 6px;
    /* 滚动条宽度 */
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    /* 滚动条轨道背景 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    /* 滚动块颜色 */
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

.infinite-trigger {
  height: 30px;
}

.list-title {
  font-weight: bold;
  font-size: 16px;
  padding: 12px 8px 4px;
  color: #1f2329;
}

.custom-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  .title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .actions {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}
</style>