<template>
  <div id="login" @click="clickWave">
    <div id="userFrom">
      <h1>
        <span @click="changeIn" :class="isIn">登录</span>
        <span @click="changeRegister" :class="isRigister">注册</span>
      </h1>
      <In v-if="inOrRegister" />
      <Register v-if="!inOrRegister" />
    </div>
    <!-- <Loading v-if="loading" /> -->
  </div>
</template>

<script>
import In from "./components/In.vue";
import Register from "./components/Register";
export default {
  name: "Login",
  components: { Register, In },
  data() {
    return {
      inOrRegister: true,
    };
  },
  computed: {
    isIn() {
      if (this.inOrRegister) {
        return "showPage";
      } else {
        return "hidePage";
      }
    },
    isRigister() {
      if (!this.inOrRegister) {
        return "showPage";
      } else {
        return "hidePage";
      }
    },
  },
  methods: {
    changeIn() {
      this.inOrRegister = true;
    },
    changeRegister() {
      this.inOrRegister = false;
    },
    //点击动画
    clickWave(e) {
      let mountedTarget = document.getElementById("login");
      let wave = document.createElement("span");
      wave.style.left = e.clientX + "px";
      wave.style.top = e.clientY + "px";
      wave.style.backgroundColor = `#${Math.floor(
        Math.pow(16, 3) * Math.random()
      ).toString(16)}`;
      wave.classList = "wave";
      mountedTarget.append(wave);
      setTimeout(function () {
        let spanList = document.getElementsByClassName("wave");
        if (spanList[0]) {
          spanList[0].remove();
        }
      }, 2000);
    },
  },
};
</script>

<style lang="less">
/* 
  注意：这里style不可以设置scoped属性，
  因为wave这个类是在渲染到页面上以后通过js动态添加的，
  但是设置了scoped的style内的所有class都会经过hash处理，
  所以动态添加的wave类样式就不能生效
*/
#login {
  top: 0px;
  z-index: 888;
  width: 100%;
  height: calc(100vh);
  background: #031321;
  background-image: url("../../assets/img/无标题1.png");
  // filter:blur(5px);
  background-size: 100% 100%;
  /* 
  设置overflow:hidden属性隐藏span产生的滚动条
  但是如果不设置position时，
  span会一直当上找特殊定位的元素，最后依赖外部元素，
  会导致overflow：hidden失效
*/
  position: fixed;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  #userFrom {
    z-index: 1;
    width: 300px;
    padding: 0 20px 70px;
    border-radius: 15px;
    position: absolute;
    background: rgba(255, 255, 255, 0.39);
    transition: 0.5s;
    &:hover {
      box-shadow: 0 0 20px #000;
    }
    h1 {
      display: flex;
      justify-content: space-evenly;
      span {
        display: inline-block;
        width: 80px;
        height: 60px;
        line-height: 60px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        text-align: center;
        font-size: 20px;
        color: wheat;
        cursor: pointer;
      }
    }
    button {
      background: rgba(20, 129, 219, 0.712);
      width: 80px;
      height: 40px;
      border-radius: 10px;
      position: absolute;
      bottom: 10px;
      left: 50%;
      margin-left: -50px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        box-shadow: 0 0 5px #000;
        transform: scale(1.1);
      }
    }
  }
  .wave {
    display: inline-block;
    position: absolute;
    background: #fff;
    border-radius: 50%;
    content: " ";
    animation: waveAni 2s linear alternate;
    transform: translate(-50%, -50%);
  }
  @keyframes waveAni {
    0% {
      width: 0;
      height: 0;
      opacity: 0.5;
    }
    98% {
      width: 1000px;
      height: 1000px;
      opacity: 0;
    }
    100% {
      width: 0;
      height: 0;
      opacity: 0;
    }
  }
}
.showPage {
  color: rgb(255, 255, 255);
  font-size: 30px;
  background: rgba(0, 0, 0, 0.534);
}
.hidePage {
  color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
}
</style>
