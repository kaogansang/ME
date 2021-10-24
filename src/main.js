import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/style/reset.css";
import "./assets/style/iconfont/iconfont.css";

/* -------------------------markdown编译器插件------------------------------------------ */
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

import Prism from "prismjs";

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
/* -------------------------markdown编译器插件------------------------------------------ */
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
// 引入你所使用的主题 此处以 github 主题为例
import githubTheme from "@kangc/v-md-editor/lib/theme/github";
import "@kangc/v-md-editor/lib/theme/style/github.css";

// highlightjs
import hljs from "highlight.js";

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

createApp(App)
  .use(store)
  .use(router)
  .use(VueMarkdownEditor)
  .use(VMdPreview)
  .mount("#app");

// const app = createApp(App);
// app.use(store).use(router);
// // 分环境处理
// if (process.env.NODE_ENV === "development") {
//   if ("__VUE_DEVTOOLS_GLOBAL_HOOK__" in window) {
//     // 这里__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue赋值一个createApp实例 window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
//   }
//   app.config.devtools = true;
// }
// app.mount("#app");
