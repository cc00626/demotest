import { createApp } from "vue";
import "./styles/reset.scss"; //重置默认样式
import App from "./App.vue";
import router from "./router"; //引入路由
import "element-plus/dist/index.css"; //引入element-plus样式
import pinia from "./store"; //使用状态管理
import "@/styles/github-markdown-dark.css";
import "@/styles/github-markdown-light.css";
import "@/styles/github-markdown.css";
import "@kangc/v-md-editor/lib/style/base-editor.css";
createApp(App).use(router).use(pinia).mount("#app");
