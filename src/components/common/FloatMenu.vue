<template>
  <div
    id="floatMenu"
    @click="showList"
    @mousedown="mouseDown"
    @touchstart="touchStart"
  >
    <span>MENU</span>
    <div :style="showListFlag" id="floatMenuList" class="listInRight">
      <button @click="write">创作</button>
      <button @click="config">设置</button>
      <button @click="logout">注销</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FloatMenu",
  data() {
    return {
      showListFlag: { display: "none" },
      mousePosition: {
        offsetX: 0,
        offsetY: 0,
      },
      //标识当前是否处于移动中
      movedFlag: false,
    };
  },
  methods: {
    showList() {
      if (this.movedFlag) {
        this.movedFlag = 0;
      } else {
        if (this.showListFlag.display == "none") {
          this.showListFlag.display = "unset";
        } else {
          this.showListFlag.display = "none";
        }
      }
    },
    write() {
      this.$router.push({ path: "/write" });
    },
    config() {},
    logout() {
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("userToken");
      this.$router.push({ path: "/login" });
    },
    mouseDown(e) {
      this.mousePosition = {
        offsetX: e.offsetX,
        offsetY: e.offsetY,
      };
      document.addEventListener("mousemove", this.mouseMove);
      document.addEventListener("mouseup", this.mouseUp);
    },
    mouseMove(e) {
      this.movedFlag = true;
      let target = document.getElementById("floatMenu");
      target.style.top = e.clientY - this.mousePosition.offsetY + "px";
      target.style.left = e.clientX - this.mousePosition.offsetX + "px";
    },
    mouseUp() {
      let target = document.getElementById("floatMenu");
      let menuList = document.getElementById("floatMenuList");
      let left = target.style.left.split("px")[0];

      if (left < window.innerWidth / 2) {
        target.style.left = 0;
        menuList.classList = "listInRight";
      } else {
        target.style.left = window.innerWidth - 50 + "px";
        menuList.classList = "listInLeft";
      }
      document.removeEventListener("mousemove", this.mouseMove);
    },
    touchStart(e) {
      // e.preventDefault();
      let target = document.getElementById("floatMenu");
      this.mousePosition = {
        offsetX:
          e.targetTouches[0].clientX - target.getBoundingClientRect().left,
        offsetY:
          e.targetTouches[0].clientY - target.getBoundingClientRect().top,
      };
      document.addEventListener("touchmove", this.touchMove);
      document.addEventListener("touchend", this.touchEnd);
    },
    touchMove(e) {
      this.movedFlag = true;
      let target = document.getElementById("floatMenu");
      target.style.top =
        e.targetTouches[0].clientY - this.mousePosition.offsetY + "px";
      target.style.left =
        e.targetTouches[0].clientX - this.mousePosition.offsetX + "px";
      // console.log(e.touches[0].clientX);
    },
    touchEnd() {
      let target = document.getElementById("floatMenu");
      // let menuList = document.getElementById('floatMenuList');
      let left = target.style.left.split("px")[0];

      if (left < window.innerWidth / 2) {
        target.style.left = "10px";
        // menuList.classList = 'listInRight';
      } else {
        target.style.left = window.innerWidth - 50 + "px";
        // menuList.classList = 'listInLeft';
      }
      document.removeEventListener("touchmove", this.touchMove);
    },
  },
};
</script>

<style lang="less" scoped>
#floatMenu {
  user-select: none;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.719);
  position: fixed;
  top: 50%;
  left: 10px;
  border-radius: 25px;
  line-height: 50px;
  color: white;
  text-align: center;
  // transition: 0.1s;
  z-index: 888;
  #floatMenuList {
    height: 150px;
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    margin-top: -75px;
    button {
      width: 50px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: rgba(0, 0, 0, 0.726);
      border-radius: 10px;
      color: white;
    }
  }
  .listInRight {
    right: -130%;
  }
  .listInLeft {
    left: -130%;
  }
}
#floatMenu:hover {
  color: yellow;
  background: #000;
}
</style>
