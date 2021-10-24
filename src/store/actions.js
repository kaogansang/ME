import axios from "axios";
import Qs from "qs";

//进行一些异步操作
export default {
  //多参数时使用对象传参
  //第一个参数为上下文（默认参数），无需手动传参
  userLogin(context, { userName, userPwd }) {
    //设置为加载状态，展示加载动画
    context.commit("setLoading", true);
    let url = "localhostApi/login";
    let data = {
      username: userName,
      password: userPwd,
    };
    //Qs.stringigy()将body内的值解析为x-www-from-urlencoded编码，详情见书签
    return axios
      .post(url, Qs.stringify(data))
      .then((res) => {
        //加载状态置0，关闭加载动画
        context.commit("setLoading", false);
        //检验请求是否成功，有无token
        if (res != null && res.data != undefined && "token" in res.data.data) {
          const token = res.data.data.token;
          const userId = res.data.data.userId;
          //将请求到的token及用户名添加到store
          //调用mutations固定方式
          context.commit("setUser", { userName, userToken: token, userId });
        }
      })
      .catch((error) => {
        //加载状态置0，关闭加载动画
        context.commit("setLoading", false);
        //打印错误信息
        console.log(error);
        //注意error并不是一个对象，error.response才是对象
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          alert(error.response.data.meta.msg);
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  },
  userRegister(context, { userName, userPwd }) {
    //设置为加载状态，展示加载动画
    context.commit("setLoading", true);

    let url = "localhostApi/register";
    let data = {
      username: userName,
      password: userPwd,
    };
    //Qs.stringigy()将body内的值解析为x-www-from-urlencoded编码，详情见书签
    return axios
      .post(url, Qs.stringify(data))
      .then((res) => {
        //加载状态置0，关闭加载动画
        context.commit("setLoading", false);
        //检验请求是否成功，有无token
        console.log(res);
        console.log("注册成功！");
        console.log(res.data.data.createUser);
      })
      .catch((error) => {
        //加载状态置0，关闭加载动画
        context.commit("setLoading", false);
        //打印错误信息
        console.log(error);
        //注意error并不是一个对象，error.response才是对象
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          alert(error.response.data.meta.msg);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  },
  getArticlesList(context, url) {
    // let url = "localhostApi/articles?pageSize=10";
    return axios
      .get(url)
      .then((req) => {
        // this.articlesList = this.articlesList.concat();
        context.commit("pushArticlesList", req.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
