export default {
  //已登录用户名
  get userName() {
    return sessionStorage.getItem("userName");
  },
  //token
  get userToken() {
    return sessionStorage.getItem("userToken");
  },
  //用户id
  get userId() {
    return sessionStorage.getItem("userId");
  },

  // //当前显示的article的id
  // thisArticleId: undefined,

  //loading组件显示标志
  loading: false,
  //文章列表
  articlesList: [],
};
