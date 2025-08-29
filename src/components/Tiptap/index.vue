<template>
  <div v-if="editor" class="toolbar">
    <!-- 加粗 -->
    <button @click="editor.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }">
      加粗
    </button>

    <!-- 斜体 -->
    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }">
      斜体
    </button>

    <!-- 删除线 -->
    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ active: editor.isActive('strike') }">
      删除线
    </button>

    <!-- 字体颜色 -->
    <input type="color" @input="editor.chain().focus().setColor($event.target.value).run()" :value="getCurrentColor()"
      title="选择字体颜色" />

    <!-- 段落 -->
    <button @click="editor.chain().focus().setParagraph().run()" :class="{ active: editor.isActive('paragraph') }">
      段落
    </button>

    <!-- 标题等级 -->
    <button v-for="level in 6" :key="level" @click="editor.chain().focus().toggleHeading({ level }).run()"
      :class="{ active: editor.isActive('heading', { level }) }">
      标题{{ level }}
    </button>
    <!-- 代码块 -->
    <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ active: editor.isActive('codeBlock') }">
      代码块
    </button>
    <!-- 撤销 -->
    <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()">
      撤销
    </button>

    <!-- 前进 -->
    <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()">
      前进
    </button>

    <!-- 插入图片按钮 -->
    <button @click="addImage">插入图片</button>

    <!-- 无序列表 -->
    <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ active: editor.isActive('bulletList') }">
      无序列表
    </button>

    <!-- 有序列表 -->
    <button @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ active: editor.isActive('orderedList') }">
      有序列表
    </button>
    <button @click="htmlToWord">导出word</button>
  </div>
  <div class="editor-layout">
    <div class="editor-main">
      <editor-content :editor="editor" ref="editorRef" />
    </div>
    <div class="editor-sidebar">
      <!-- 这里是 AI 辅助栏 -->
      <div class="ai-box">AI 智能助手</div>
      <!-- <div class="outline-box">
        <div class="outline-title">📑 文档大纲</div>
        <div v-for="item in outlineList" :key="item.id" class="outline-item"
          :style="{ paddingLeft: `${(item.level - 1) * 12}px` }" @click="scrollToHeading(item.id)">
          {{ item.text }}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watchEffect } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Strike } from '@tiptap/extension-strike'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { asBlob } from 'html-docx-js-typescript'
import { Node } from '@tiptap/core'
// if you want to save the docx file, you need import 'file-saver'
import { saveAs } from 'file-saver'
const CustomNode = Node.create({
  // Your code here
})
const editor = useEditor({
  extensions: [
    // CustomNode,
    StarterKit,
    Strike,
    TextStyle,
    Color,],
})

const aaa = () => {
  console.log('Button clicked!')
}

//获取文字颜色
const getCurrentColor = () => {
  if (editor !== null) {
    return editor.value.getAttributes('textStyle')?.color || '#000000'
  }
}

//添加图片
function addImage() {
  const url = window.prompt('请输入图片URL')
  if (url) {
    editor.chain().focus().setImage({ src: url }).run()
  }
}

//导出word
// const editorRef = ref(null)
const htmlToWord = () => {
  //获取html
  const html = editor.value.getHTML().replace(/<strong>/g, '<b>')
    .replace(/<\/strong>/g, '</b>')
    // 背景色不生效问题
    .replace(/<mark/g, '<span')
    .replace(/<\/mark>/g, '</span>')

  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Document</title>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `
  asBlob(fullHtml).then(data => {
    saveAs(data, 'file.docx') // save as docx file
  }) // asBlob() return Promise<Blob|Buffer>
}


//生成大纲显示
function getOutlineFromEditor(editor: any) {
  const outline: { id: string; text: string; level: number }[] = []
  const doc = editor.state.doc

  doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const text = node.textContent
      const level = node.attrs.level
      // 动态生成 id，避免修改文档导致死循环
      const id = `heading-${pos}`

      outline.push({ id, text, level })
    }
  })

  return outline
}

const outlineList = ref([])

function addHeadingIdsToDOM(outline: { id: string; text: string; level: number }[]) {
  nextTick(() => {
    outline.forEach(({ id }) => {
      const pos = Number(id.split('-')[1])
      const doms = document.querySelectorAll('.ProseMirror h1, .ProseMirror h2, .ProseMirror h3, .ProseMirror h4, .ProseMirror h5, .ProseMirror h6')
      // 这里简单处理，给对应索引的标题加id，具体可根据pos映射
      if (doms[pos]) {
        doms[pos].setAttribute('id', id)
      }
    })
  })
}

// 修改 watchEffect 中
// watchEffect(() => {
//   if (editor.value) {
//     const update = () => {
//       const list = getOutlineFromEditor(editor.value)
//       outlineList.value = list
//       addHeadingIdsToDOM(list)
//     }
//     editor.value.on('update', update)
//     update()
//   }
// })
</script>

<style scoped lang="scss">
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 12px;
  background-color: #f6f7f9;
  border-radius: 8px;
  margin-bottom: 16px;
  align-items: center;
  border: 1px solid #e5e6eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.toolbar button {
  padding: 5px 10px;
  border: none;
  background-color: transparent;
  color: #4e5969;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e6eb;
  }
}

.toolbar button.active {
  background-color: #409eff;
  color: #fff;
}

.toolbar button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background-color: transparent;
  color: #999;
}

.toolbar input[type='color'] {
  width: 26px;
  height: 26px;
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
}

:deep(.ProseMirror) {
  border: 1px solid #e5e6eb;
  padding: 20px 24px;
  width: 100%;
  border-radius: 10px;
  min-height: 500px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease-in-out;
  font-size: 16px;
  line-height: 1.75;
  color: #1f2329;

  &:focus {
    outline: none;
    border-color: #409eff;
  }

  p {
    margin: 1em 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    margin: 1.2em 0 0.5em;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.75em;
  }

  h3 {
    font-size: 1.5em;
  }

  h4 {
    font-size: 1.25em;
  }

  h5 {
    font-size: 1.1em;
  }

  h6 {
    font-size: 1em;
  }

  pre {
    background-color: #f4f5f5;
    color: #2d2d2d;
    padding: 14px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    line-height: 1.6;
  }

  ul,
  ol {
    padding-left: 1.6em;
    margin: 1em 0;
  }

  b,
  strong {
    font-weight: bold;
  }

  em,
  i {
    font-style: italic;
  }

  del,
  s {
    text-decoration: line-through;
  }
}

:deep(.ProseMirror-focused) {
  border-color: #409eff;
}

.editor-layout {
  display: flex;
  gap: 24px;
}

.editor-main {
  flex: 1;
  max-height: 500px;
  /* 或者你页面需要的高度 */
  overflow-y: auto;
  scroll-behavior: smooth;
  /* 平滑滚动 */
  border: 1px solid #e5e6eb;
  border-radius: 10px;
  background: #fff;
}

.editor-sidebar {
  width: 260px;
}

.ai-box {
  background: #ffffff;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
  padding: 16px;
  min-height: 300px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.outline-box {
  background: #fff;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
  margin-top: 16px;
  padding: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  max-height: 300px;
  overflow: auto;
  font-size: 14px;
}

.outline-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f2329;
  font-size: 15px;
}

.outline-item {
  margin: 4px 0;
  color: #4e5969;
  cursor: pointer;
  line-height: 1.6;
  transition: color 0.2s;

  &:hover {
    color: #409eff;
  }
}
</style>