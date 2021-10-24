<template>
  <div id="register">
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
          placeholder="请输入密码"
          required
          minlength="6"
          maxlength="20"
        />
      </p>
      <p>
        <span> 确认密码: </span>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="请再次输入密码"
          required
          minlength="6"
          maxlength="20"
        />
      </p>
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    ...mapActions(["userRegister", "userLogin"]),
    //提交登录信息
    submit() {
      if (this.password !== this.confirmPassword) {
        alert("两次密码不一致，请重新输入");
        this.password = "";
        this.confirmPassword = "";
        return;
      }
      this.userRegister({
        userName: this.username,
        userPwd: this.password,
      })
        .then(() => {
          this.userLogin({
            userName: this.username,
            userPwd: this.password,
          });
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
#register {
  background: rgba(0, 0, 0, 0.534);
  height: 230px;
  padding: 20px;
  box-sizing: border-box;
  p {
    height: 70px;
    line-height: 40px;
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
