<template>
  <div class="bookmark">
    <div class="content">
      <Menu :listData="bookmarkList" @iframeUrlChange="setBookmarkDetialList" />
      <bookmark-detail :bookmarkDetailsList="bookmarkDetialList" />
    </div>
  </div>
</template>

<script>
import Menu from "../../components/common/Menu.vue";
import BookmarkDetail from "./components/BookmarkDetail";
import axios from "axios";
export default {
  components: { Menu, BookmarkDetail },
  name: "Bookmark",
  data() {
    return {
      bookmarkList: Array,
      bookmarkDetialList: Array,
    };
  },
  created() {
    axios("localhostApi/jsonData/bookmarkData.json")
      .then((res) => this.ajaxHandle(res))
      .catch((err) => console.log(err));
  },
  methods: {
    ajaxHandle(res) {
      this.bookmarkList = res.data.listData;
      this.initialDetialList(this.bookmarkList[0].list[0].url);
    },
    initialDetialList(data) {
      this.bookmarkDetialList = data;
    },
    setBookmarkDetialList(data) {
      console.log(data instanceof Array);
      this.bookmarkDetialList = data;
      console.log(this.bookmarkDetialList);
    },
  },
};
</script>

<style lang="less" scoped>
.bookmark {
  background: #575757;
  padding-top: 30px;
  height: 100vh;
}
</style>
