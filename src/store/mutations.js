export default {
  setUser(state, user) {
    const { userName, userToken, userId } = user;
    console.log("将用户名和token添加到localStorage");
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userToken", userToken);
    sessionStorage.setItem("userId", userId);
  },
  // setArticleId(state, id) {
  //   state.thisArticleId = id;
  //   sessionStorage.setItem("thisArticleId", id);
  // },
  setLoading(state, flag) {
    state.loading = flag;
  },
  setArticlesList(state, articlesList) {
    state.articlesList = articlesList;
  },
  pushArticlesList(state, articlesList) {
    state.articlesList = state.articlesList.concat(articlesList);
  },
};
