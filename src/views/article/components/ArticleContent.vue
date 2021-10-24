<template>
  <div class="component">
    <div class="author">
      <img class="authorHead" src="../../../assets/img/logo.png" />
      <div class="authorInfo">
        <p class="authorName" @click="toAuthorPage">
          {{ article.user.username }}
        </p>
        <p class="time">{{ article.createdAt }}</p>
      </div>
      <button class="follow" @click="follow">关注</button>
    </div>
    <div class="article">
      <h1 class="articleTitle">{{ article.title }}</h1>
      <!-- <v-md-editor :value="markdown" mode="preview"></v-md-editor> -->
      <v-md-preview :text="article.content"></v-md-preview>
    </div>
    <div class="comment">
      <div class="writeComment">
        <img src="../../../assets/img/logo.png" alt="" />
        <input type="text" placeholder="输入评论..." v-model="comment" />
        <button @click="submitComment">提交</button>
      </div>
      <ul class="commentsList">
        <li class="commentsItem" v-for="item of comments" :key="item.id">
          <img src="../../../assets/img/logo.png" alt="" />
          <div>
            <p>{{ item.user.username }}</p>
            <p>{{ item.content }}</p>
            <p>{{ item.createdAt }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "ArticleContent",
  props: { article: Object },
  data() {
    return {
      comment: "",
      comments: this.article.Comments,
      markdown: "# 123",
    };
  },
  methods: {
    submitComment() {
      let articleId = this.$route.query.articleId;
      let data = {
        articleId,
        content: this.comment,
        userId: this.$store.state.userId,
      };
      let username = this.$store.state.userName;
      axios
        .post(`localhostApi/articles/${articleId}`, qs.stringify(data))
        .then((req) => {
          console.log(req);
          let newComment = req.data.comment;
          console.log(newComment);
          this.comments.push({
            content: newComment.content,
            createdAt: newComment.createdAt,
            user: { username },
          });
          this.comment = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    follow() {
      let url = "localhostApi/user";
      let data = {
        starId: this.article.userId,
        followerId: this.$store.state.userId,
      };
      axios
        .put(url, qs.stringify(data))
        .then((res) => {
          alert(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toAuthorPage() {
      console.log(this.article.userId);
      this.$router.push("/blog?userId=" + this.article.userId);
    },
  },
};
</script>

<style lang="less" scoped>
.component {
  width: 100%;
  flex: 1;
  min-height: 100vh;
  .author {
    height: 80px;
    border-bottom: 2px solid rgb(170, 161, 161);
    display: flex;
    align-items: center;
    .authorHead {
      height: 60px;
      border-radius: 50%;
      box-shadow: 1px 1px 3px black;
      margin: 10px;
      // background: rgb(255, 255, 255);
    }
    .authorInfo {
      height: 80px;
      flex: 1;
      .authorName {
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        font-size: 20px;
      }
      .time {
        height: 50%;
        line-height: 40px;
      }
    }
    .follow {
      text-align: right;
      height: 24px;
      width: 53px;
      text-align: center;
      font-weight: 500;
      color: rgb(255, 255, 255);
      border: 2px solid rgb(255, 255, 255);
      margin: 20px;
      background: #b1afaf;
      transition: 0.3s;
      border-radius: 5px;
      &:hover {
        font-weight: 900;
        color: #41b882;
        border: 2px solid #03c26c;
        transform: scale(1.2);
      }
    }
  }
  .article {
    border-bottom: 1px solid rgba(255, 255, 255, 0.541);
    .articleTitle {
      height: 40px;
      margin: 20px;
      position: relative;
      line-height: 40px;
      font-size: 30px;
    }
  }
  .comment {
    padding: 20px;
    .writeComment {
      // background: #000;
      display: flex;
      height: 40px;
      align-items: center;
      img {
        height: 100%;
        border-radius: 50%;
        box-shadow: 1px 1px 3px black;
        margin-right: 10px;
      }
      input {
        flex: 1;
        height: 90%;
        padding-left: 10px;
        border-radius: 10px;
        // background: #575757;
        border: 2px solid rgb(150, 144, 144);
        &:focus {
          box-shadow: 0 0 5px #000000;
        }
      }
      button {
        height: 90%;
        width: 50px;
        margin-left: 10px;
        border-radius: 10px;
        opacity: 0.7;
        transition: 0.2s;
        cursor: pointer;
        background: #b1afb0;
        &:hover {
          opacity: 1;
        }
      }
    }
    .commentsList {
      height: 300px;
      margin: 30px 0 0 40px;
      // background: #000;
      .commentsItem {
        margin-bottom: 20px;
        border-bottom: 1px dashed #0f0f0f8f;
        img {
          width: 40px;
          float: left;
          border-radius: 50%;
          box-shadow: 1px 1px 3px black;
        }
        div {
          margin-left: 45px;
          p {
            margin-bottom: 10px;
          }
          :nth-child(1) {
            font-size: 13px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
