<template>
  <div>
    <div class="bodyTitle">文章</div>
    <div class="listBody">
      <ul>
        <li class="detialItem" v-for="item of articlesList" :key="item.id">
          <ul class="metaList">
            <li>kogee</li>
            <li>{{ item.createdAt }}</li>
          </ul>
          <router-link
            :to="'/article?articleId=' + item.id"
            class="itemTitle"
            >{{ item.title }}</router-link
          >
          <ul class="actionList">
            <li>赞</li>
            <li>评论</li>
            <li class="hoverShow" v-if="isSelf" @click="deleteArticle(item.id)">
              删除
            </li>
            <li class="hoverShow" v-if="isSelf" @click="modifyArticle(item.id)">
              修改
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Posts",
  data() {
    return {
      articlesList: [],
    };
  },
  computed: {
    userId() {
      return this.$route.query.userId;
    },
    isSelf() {
      return this.userId == this.$store.state.userId;
    },
  },
  created() {
    this.getMyArticlesList();
  },
  methods: {
    getMyArticlesList() {
      let url = `/localhostApi/articles/query?userId=${this.userId}`;
      axios
        .get(url)
        .then((res) => {
          this.articlesList = res.data;
          console.log(this.articlesList);
        })
        .catch((err) => console.log(err));
    },
    deleteArticle(articleId) {
      let url = `/localhostApi/articles/${articleId}`;
      axios
        .delete(url)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(articleId);
    },
    // modifyArticle(articleId) {
    //   let url = `/localhostApi/articles/${articleId}`
    //   axios
    //     .put(url)
    //     .then((res => {
    //       console.log(res);
    //     }))
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //   console.log(articleId)
    // },
  },
  watch: {
    userId() {
      this.getMyArticlesList();
    },
  },
};
</script>

<style lang="less" scoped>
.bodyTitle {
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  padding-left: 30px;
  border-bottom: 1px dashed #fff;
}
.listBody {
  ul {
    .detialItem {
      height: 60px;
      flex-direction: column;
      padding: 20px 30px;
      border-bottom: 1px solid #fff;
      display: flex;
      position: relative;
      z-index: 0;
      overflow: hidden;
      &::after {
        content: "";
        display: block;
        width: 120%;
        height: 100%;
        background: linear-gradient(90deg, #108dc7 0%, #ef8e38 100%);
        opacity: 0;
        transition: 1s;
        z-index: -1;
        position: absolute;
        top: 0;
        left: -120%;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
      }
      &:hover {
        &::after {
          left: 0;
          opacity: 1;
        }
        .itemTitle {
          color: #fff;
        }
      }
      .metaList {
        flex: 1;
        display: flex;
        font-size: 10px;
        li {
          &::after {
            display: inline-block;
            content: "";
            background: #000;
            width: 2px;
            height: 2px;
            margin: 3px;
            border-radius: 2px;
          }
        }
      }
      .itemTitle {
        height: 20px;
        padding: 7px 0;
        line-height: 20px;
        font-size: 17px;
        font-weight: bold;
        color: rgb(126, 122, 122);
        transition: 1s;
      }
      .actionList {
        display: flex;
        li {
          text-align: center;
          width: 50px;
          padding: 4px;
          border: 1px solid rgb(255, 255, 255);
        }
        .hoverShow {
          display: none;
          transition: 1s;
        }
        &:hover {
          .hoverShow {
            display: unset;
          }
        }
      }
    }
  }
}
</style>
