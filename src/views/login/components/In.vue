<template>
  <div id="in">
    <form @submit="submit" onsubmit="return false">
      <p>
        <span> 用户名： </span>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="请输入用户名"
          required
          maxlength="20"
        />
      </p>
      <p>
        <span> 密码: </span>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="请输入6-20位密码"
          required
          minlength="6"
          maxlength="20"
        />
      </p>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "In",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["userLogin"]),
    //提交登录信息
    submit() {
      console.log("lll");
      this.userLogin({
        userName: this.username,
        userPwd: this.password,
        appObj: this,
      })
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
#in {
  background: rgba(0, 0, 0, 0.534);
  height: 230px;
  padding: 20px;
  box-sizing: border-box;
  p {
    height: 80px;
    line-height: 80px;
    span {
      display: inline-block;
      width: 80px;
      padding: 0, 15px;
      color: azure;
      font-weight: bolder;
    }
    input {
      width: 170px;
      border-radius: 5px;
      padding: 0 5px;
    }
  }
}
</style>
