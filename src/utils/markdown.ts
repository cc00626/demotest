import MarkdownIt from "markdown-it";
// import cjk_breaks from "markdown-it-cjk-breaks";
//显示markdown格式
const md = MarkdownIt({
  html: true, // 在源码中启用 HTML 标签
  linkify: true, // 将类似 URL 的文本自动转换为链接。
  // typographer: true, // 双 + 单引号替换对，当 typographer 启用时。
  breaks: false, // 转换段落里的 '\n' 到 <br>。
});
// md.use(cjk_breaks);
export function renderMarkdown(text: string) {
  return md.render(text);
}
