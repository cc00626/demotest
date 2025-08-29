import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/upload",
    component: () => import("@/Layout/index.vue"),
    children: [
      {
        path: "/upload",
        component: () => import("@/views/Upload/index.vue"),
        name: "upload",
      },
      {
        path: "/previewAndEdit",
        component: () => import("@/views/PreviewAndEdit/index.vue"),
        name: "previewAndEdit",
        meta: {
          icon: "",
        },
      },
      {
        path: "/knowledgeBase",
        component: () => import("@/views/KnowledgeBase/index.vue"),
        name: "knowledgeBase",
      },
      {
        path: "/aichat",
        component: () => import("@/views/aichat/index.vue"),
        name: "aichat",
      },
      {
        path: "/textGeneration",
        component: () => import("@/views/textGeneration/index.vue"),
        name: "textGeneration",
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/Login/index.vue"),
    name: "login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
