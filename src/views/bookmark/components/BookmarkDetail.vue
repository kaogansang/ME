<template>
  <div class="bookmartDetail">
    <div>
      <ul>
        <li v-for="(item, index) in bookmarkDetailsList" :key="index">
          <div class="changeItem">
            <span class="iconfont icon-shezhi"></span>
            <span class="iconfont icon-shanchu"></span>
            <span class="iconfont icon-xiugai" @click="modify"></span>
          </div>
          <div>
            <a :href="item.url">{{ item.title }}</a>
          </div>
        </li>
      </ul>
    </div>
    <modify-bookmark
      v-if="modifySwitch"
      @confirmModify="confirmModifyHandle"
      @cancelModify="cancelModifyHandle"
    />
  </div>
</template>

<script>
import ModifyBookmark from "./ModifyBookmark.vue";
export default {
  components: { ModifyBookmark },
  name: "BookmarkDetail",
  data() {
    return {
      modifySwitch: false,
    };
  },
  props: {
    bookmarkDetailsList: Array,
  },
  methods: {
    modify() {
      this.modifySwitch = true;
    },
    confirmModifyHandle(data) {
      this.modifySwitch = false;
      console.log(data);
    },
    cancelModifyHandle() {
      this.modifySwitch = false;
    },
  },
};
</script>

<style lang="less" scoped>
.bookmartDetail {
  margin-left: 150px;
  margin-right: 30px;
  ul {
    max-width: 600px;
    margin: 0 auto;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.381);
    min-height: 600px;
    padding: 10px 5px;
    box-shadow: 0 0 10px #000;
    transition: 0.2s;
    &:hover {
      box-shadow: 0 0 30px #000;
    }
    li {
      // display: flex;
      overflow: hidden;
      height: 30px;
      border-radius: 10px;
      padding: 5px;
      margin: 5px;
      box-sizing: border-box;
      background: linear-gradient(90deg, #13dd3b 0%, #1a43d676 100%);
      color: rgba(255, 255, 255, 0.776);
      transition: 0.5s;
      position: relative;
      a {
        height: 20px;
        line-height: 20px;
        border-radius: 5px;
        display: block;
        background: rgb(125, 99, 99);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: 1s;
        &:hover {
          background: linear-gradient(90deg, #13dd3b 0%, #1a43d676 100%);
          color: #fff;
        }
      }
    }
    .changeItem {
      float: left;
      width: 20px;
      height: 20px;
      line-height: 20px;
      overflow: hidden;
      right: 5px;
      top: 5px;
      border-radius: 5px;
      transition: 1s;
      margin-right: 5px;
      & .iconfont {
        display: inline-block;
        display: unset;
        width: 20px;
        margin: 2px;
        transition: 0.5s;
      }
      &:hover {
        width: 60px;
        & .iconfont {
          display: unset;
        }
      }
    }
  }
}
</style>
