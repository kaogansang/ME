<template>
  <div class="components">
    <div class="userInfoBlock">
      <img src="@/assets/img/无标题.png" alt="" class="avatar" />
      <div class="infoBox">
        <h1>{{ userInfo.username }}</h1>
        <p>个人介绍</p>
        <p>座右铭</p>
      </div>
      <div class="actionBox" v-show="isSelf">
        <div class="editorInfo">编辑个人资料</div>
      </div>
      <div class="actionBox" v-show="!isSelf">
        <div class="followBtn" @click="followHandle">{{ isFollow }}</div>
      </div>
    </div>
    <div class="listBlock">
      <div class="listHeader">
        <div>
          <router-link :to="'/blog/posts?userId=' + userId"> 文章 </router-link>
        </div>
        <div>
          <router-link :to="'/blog/activities?userId=' + userId">
            动态
          </router-link>
        </div>
        <div>
          <router-link :to="'/blog/watchlist?userId=' + userId">
            关注
          </router-link>
        </div>
        <div>赞</div>
        <div>展示</div>
        <div>收藏</div>
        <div>赞</div>
      </div>
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Blog",
  data() {
    return {
      myArticlesList: [],
      userInfo: {},
      isFollow: "关注",
    };
  },
  computed: {
    userId() {
      console.log("-----");
      return this.$route.query.userId;
    },
    isSelf() {
      return this.userId == this.$store.state.userId;
    },
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    followHandle() {
      this.isFollow = "已关注";
      let url = "localhostApi/user";
      let data = {
        starId: this.userId,
        followerId: this.$store.state.userId,
      };
      axios
        .put(url, qs.stringify(data))
        .then((res) => {
          if (res.data.followState) {
            this.isFollow = "已关注";
          } else {
            this.isFollow = "关注";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMyArticlesList() {
      let url = `localhostApi/articles/query?userId=${this.userId}`;
      axios
        .get(url)
        .then((res) => {
          this.myArticlesList = res.data;
        })
        .catch((err) => console.log(err));
    },
    getUserInfo() {
      let url = `localhostApi/user/${this.userId}?followerId=${this.$store.state.userId}`;
      axios
        .get(url)
        .then((res) => {
          this.userInfo = res.data;
          this.isFollow = res.data.followState ? "已关注" : "关注";
          console.log("userInfo:");
          console.log(this.userInfo);
        })
        .catch((err) => console.log(err));
    },
  },
  watch: {
    $route() {
      console.log(this.$route.query);
      this.getUserInfo();
    },
  },
};
</script>

<style lang="less" scoped>
.components {
  max-width: 700px;
  margin: auto;
}
@media screen {
  @media (min-width: 600px) {
    .userInfoBlock {
      // width: 600px;
      margin: auto;
      background: linear-gradient(90deg, #00f260 0%, #0575e6 100%);
      height: 150px;
      display: flex;
      align-items: center;
      padding: 0 30px;
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 30px;
        transition: 0.5s;
        &:hover {
          // transform: scale(1.2);
          box-shadow: 0 0 15px #000;
          width: 100px;
          height: 100px;
          animation: rotate 1s linear infinite normal;
        }
      }
      .infoBox {
        flex: 1;
        h1 {
          height: 27px;
          font-size: 27px;
          font-weight: bold;
        }
        p {
          padding-top: 10px;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
        }
      }
      .actionBox {
        //编辑用户个人信息
        .editorInfo {
          // width: 100px;
          padding: 10px 15px 10px 35px;
          border: 1px solid rgb(71, 176, 218);
          border-radius: 6px;
          text-align: center;
          position: relative;
          cursor: pointer;
          transition: 0.3s;
          &::before {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 14px;
            content: "+";
            font-size: 25px;
          }
          &:hover {
            background: rgb(71, 176, 218);
            box-shadow: 0 0 10px rgb(71, 176, 218);
          }
        }
        //关注按钮
        .followBtn {
          padding: 10px 15px;
          border: 1px solid rgb(71, 176, 218);
          border-radius: 6px;
          text-align: center;
          position: relative;
          cursor: pointer;
          transition: 0.5s;
          &:hover {
            border: 0px;
            background: #c7c5c4;
            box-shadow: 0 0 5px rgb(0, 0, 0);
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    .userInfoBlock {
      margin: auto;
      background: rgb(221, 217, 217);
      // height: 150px;
      flex-direction: column;
      display: flex;
      align-items: center;
      padding: 20px 0;
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        transition: 0.5s;
        &:hover {
          // transform: scale(1.2);
          box-shadow: 0 0 15px #000;
          width: 100px;
          height: 100px;
          animation: rotate 1s linear infinite normal;
        }
      }
      .infoBox {
        flex: 1;
        text-align: center;
        margin-top: 10px;
        h1 {
          height: 27px;
          font-size: 27px;
          font-weight: bold;
        }
        p {
          padding-top: 10px;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
        }
      }
      .actionBox {
        // width: 20px;
        margin-top: 20px;
        .editorInfo {
          width: 100px;
          padding: 10px 5px 10px 25px;
          border: 1px solid rgb(71, 176, 218);
          border-radius: 6px;
          text-align: center;
          position: relative;
          cursor: pointer;
          &::before {
            position: absolute;
            top: 15px;
            transform: translateY(-50%);
            left: 14px;
            content: "+";
            font-size: 25px;
          }
        }
      }
    }
  }
}
.listBlock {
  margin-top: 10px;
  background: rgba(0, 0, 0, 0.171);
  min-height: 500px;
  .listHeader {
    height: 40px;
    // display: flex;
    border-bottom: 1px solid #fff;
    overflow: auto;
    div {
      float: left;
      width: 2rem;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-right: 1px solid #fff;
    }
  }
}
</style>

<style lang="less">
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
