<template>
  <div class="show">
    <Menu @iframeUrlChange="iframeUrlChangeHandle" :listData="listData" />
    <iframe :src="iframeUrl" frameborder="0"></iframe>
  </div>
</template>

<script>
import axios from "axios";
import Menu from "../../components/common/Menu.vue";
export default {
  name: "Show",
  components: { Menu },
  data() {
    return {
      iframeUrl: "/",
      listData: false,
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    iframeUrlChangeHandle(iframeUrl) {
      this.iframeUrl = iframeUrl;
    },
    getListData() {
      axios("localhostApi/jsonData/showListData.json")
        .then((res) => {
          this.listData = res.data.listData;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="less" scoped>
.show {
  background: rgba(0, 0, 0, 0.66);
  height: 100vh;
  padding: 20px;
  iframe {
    width: calc(100% - 150px);
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 15px;
    background: linear-gradient(90deg, #00f260 0%, #0575e6 100%);
  }
}
</style>
