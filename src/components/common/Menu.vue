<template>
  <div class="showList">
    <ul class="firstList">
      <li
        class="firstItem"
        v-for="(firstItem, index) in listData"
        :key="index"
        @click="changeDisplay($event.target.nextElementSibling)"
      >
        <p class="firstTitle">
          <span class="iconfont icon-wenjianjia1" style="color: #dfd10e"></span>
          &nbsp;
          {{ firstItem.title }}
        </p>
        <!-- <ul class="secendList" :style="{ display: openList }"> -->
        <ul class="secendList" style="display: none">
          <li
            v-for="(secendItem, secendIndex) in firstItem.list"
            :key="secendIndex"
            class="sencendItem"
            @click.stop="changeIframeUrl($event, secendItem.url)"
          >
            {{ secendItem.title }}
            <!-- <span class="targetArrow" style="display: none">&lt;======</span> -->
            <span
              class="targetArrow iconfont icon-xingzhuang4kaobei12zhuanhuan"
              style="color: #fff; display: none"
              >&nbsp;
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: ["listData"],
  methods: {
    changeDisplay(e, destination) {
      if (destination) {
        e.style.display = destination;
      } else {
        if (e.style.display == "none") {
          e.style.display = "unset";
        } else {
          e.style.display = "none";
        }
      }
    },
    changeIframeUrl(e, url) {
      this.$emit("iframeUrlChange", url);
      console.log(url);
      let arrowList = document.getElementsByClassName("targetArrow");
      for (let i = 0; i < arrowList.length; i++) {
        this.changeDisplay(arrowList[i], "none");
      }
      this.changeDisplay(e.target.children[0]);
    },
  },
};
</script>

<style lang="less" scoped>
.showList {
  float: left;
  width: 150px;
  // width: 35vw;
  height: 800px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  color: rgba(255, 255, 255, 0.667);
  li {
    margin: 20px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    color: rgba(175, 174, 174, 0.667);
    transition: 0.3s;
    &:hover {
      color: white;
    }
  }
}
</style>
