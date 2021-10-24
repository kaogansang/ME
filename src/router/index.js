import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/Home";
import Bookmark from "../views/bookmark/Bookmark";
import Blog from "../views/blog/Blog";
import Show from "../views/show/Show";
import Login from "../views/login/Login";
import Article from "../views/article/Article";
import axios from "axios";
import Write from "../views/write/Write";
import store from "../store/index";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      needLogin: false,
      title: "登录",
    },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      needLogin: true,
      title: "ME",
    },
  },
  {
    path: "/bookmark",
    name: "Bookmark",
    component: Bookmark,
    meta: {
      needLogin: true,
      title: "收藏",
    },
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
    meta: {
      needLogin: true,
      title: "博客",
    },
    children: [
      {
        path: "",
        component: import("../views/blog/components/Posts"),
        // component: import("../views/blog/components/Watchlist"),
      },
      {
        path: "posts",
        component: import("../views/blog/components/Posts"),
      },
      {
        path: "activities",
        component: import("../views/blog/components/Activities"),
      },
      {
        path: "watchlist",
        component: import("../views/blog/components/Watchlist"),
      },
    ],
  },
  {
    path: "/show",
    name: "Show",
    component: Show,
    meta: {
      needLogin: true,
      title: "展示",
    },
  },
  {
    path: "/article",
    name: "Article",
    component: Article,
    meta: {
      needLogin: true,
    },
  },
  {
    path: "/write",
    name: "Write",
    component: Write,
    meta: {
      needLogin: true,
      title: "创作",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//设置路由守卫，每次跳转前后执行下边的回调函数
//to: Route: 即将要进入的目标 路由对象
//from: Route: 当前导航正要离开的路由
//next: 下一地址

//验证登录状态
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  //检查是否拥有token
  if (store.getters.getUserToken) {
    //如果在登录页面则跳转到主页
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      //不在则放行
      next();
    }
  } else {
    //没有token
    if (to.path == "/login") {
      //在登录页下则放行
      next();
    } else {
      //不在则跳转到登录页面
      next({
        path: "/login",
      });
    }
  }
});

//axios拦截器，配置请求默认信息
//使每一次请求携带token
axios.interceptors.request.use((config) => {
  config.headers.Authorization = sessionStorage.getItem("userToken");
  return config;
});

export default router;
