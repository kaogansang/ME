import { createStore } from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default createStore({
  state,
  mutations,
  actions,
  getters,

  //大型项目单文件存储繁杂，分多个模块后合并时使用modules
  // modules: {},
});
