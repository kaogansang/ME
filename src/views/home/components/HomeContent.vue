<template>
  <div class="wrapper">
    <div class="content">
      <ul class="content-list">
        <li class="content-item" v-for="item in articlesList" :key="item.id">
          <h2>
            <router-link :to="'/article?articleId=' + item.id">
              {{ item.title }}
            </router-link>
          </h2>
          <p>{{ item.content }}</p>
        </li>
      </ul>
    </div>
    <div class="right-content">
      <div class="user-info">
        <img class="user-img" src="@/assets/img/logo.png" alt="" />
        <p class="user-info-name">{{ userInfo.username }}</p>
        <ul class="user-info-list">
          <li class="user-info-item">
            <p>{{ userInfo.starNum }}</p>
            <p>关注</p>
          </li>
          <li class="user-info-item">
            <p>{{ userInfo.articleNum }}</p>
            <p>文章</p>
          </li>
          <li class="user-info-item">
            <p>{{ userInfo.followerNum }}</p>
            <p>粉丝</p>
          </li>
          <li class="user-info-item">
            <p>0</p>
            <p>收藏</p>
          </li>
        </ul>
      </div>
      <calendar />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Calendar from "./Calendar.vue";
export default {
  components: { Calendar },
  name: "HomeContent",
  data() {
    return {
      // articlesList: [],
      userInfo: {
        username: "*",
        starNum: "*",
        articleNum: "*",
        followerNum: "*",
      },
      currentPage: 1,
      loadingFlag: true,
    };
  },
  computed: {
    articlesList() {
      return this.$store.state.articlesList;
    },
  },
  created() {
    this.$store.commit("setArticlesList", []);
    this.getArticles();
    this.getUserInfo();
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandle, false);
  },
  unmounted() {
    window.removeEventListener("scroll", this.scrollHandle, false);
  },
  methods: {
    //无限下拉列表
    scrollHandle() {
      //滚动区域高度
      let scrollHeight =
        document.body.scrollHeight || document.documentElement.scrollHeight;
      //可视区域到顶部高度
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      //客户端可视区域高度
      let clientHeight = document.documentElement.clientHeight;
      //可视区到底部的高度
      let scrollBottom = scrollHeight - scrollTop - clientHeight;
      if (scrollBottom < 80 && !this.loadingFlag) {
        this.loadingFlag = true;
        this.getArticles();
      }
    },
    //请求文章列表
    async getArticles() {
      let url = "localhostApi/articles?pageSize=10";
      await this.$store.dispatch(
        "getArticlesList",
        `${url}&currentPage=${this.currentPage}`
      );
      this.loadingFlag = false;
      this.currentPage++;
      // axios
      //   .get(`${url}&currentPage=${this.currentPage}`)
      //   .then((req) => {
      //     this.articlesList = this.articlesList.concat(req.data.articles);
      //     this.currentPage++;
      //     this.loadingFlag = false;
      //   })
      //   .catch((err) => {
      //     this.loadingFlag = false;
      //     console.log(err);
      //   });
    },
    //请求用户信息
    getUserInfo() {
      let userId = this.$store.state.userId;
      axios
        .get(`localhostApi/user/${userId}`)
        .then((res) => {
          let data = res.data;
          this.userInfo = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  min-height: 80vh;
  max-width: 900px;
  box-shadow: 0 0 10px black;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  overflow: auto;
  display: flex;
  flex-direction: row;
  .content {
    flex-grow: 1;
    width: 300px;
    .content-list {
      .content-item {
        background: #d0cfd6;
        border-bottom: 3px dashed rgba(7, 7, 7, 0.435);
        height: 90px;
        padding: 20px;
        box-sizing: border-box;
        border-top-right-radius: 20px;
        transition: 0.3s;
        overflow: hidden;
        h2 {
          padding-bottom: 10px;
          font-weight: bold;
          line-height: 20px;
          font-size: 20px;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:hover {
          border-bottom: 3px solid rgba(7, 7, 7, 0.435);
        }
      }
    }
  }
  @media screen {
    .right-content {
      width: 200px;
      padding: 20px;
      border-radius: 10px;
      margin-left: 10px;
      background: #e9e9e9;
      .user-img {
        float: left;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background: white;
      }
      .user-info-name {
        margin-left: 60px;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        font-weight: bold;
        // background: #000;
      }
      .user-info-list {
        display: flex;
        flex-direction: row;
        li {
          flex-grow: 1;
          margin-right: 5px;
          border-right: 1px solid rgb(181, 178, 178);
        }
      }
    }
    @media (max-width: 1000px) {
      .right-content {
        display: none;
      }
    }
  }
}
</style>
