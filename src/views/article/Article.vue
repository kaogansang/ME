<template>
  <div class="content">
    <article-content v-if="contentShow" :article="article" />
    <article-sidebar />
  </div>
</template>

<script>
import ArticleContent from "./components/ArticleContent.vue";
import ArticleSidebar from "./components/ArticleSidebar";
import axios from "axios";
export default {
  name: "Article",
  components: { ArticleContent, ArticleSidebar },
  data() {
    return {
      article: {},
      contentShow: false,
    };
  },
  computed: {
    thisArticleId() {
      return this.$store.state.thisArticleId;
    },
    showSidebarFlag() {
      let windowWidth = window.innerWidth;
      console.log(windowWidth);
      if (window.innerWidth < 951) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      axios
        .get("localhostApi/articles/" + this.$route.query.articleId)
        .then((res) => {
          this.contentShow = true;
          this.article = res.data.article;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 90vw;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px;
  overflow: auto;
  display: flex;
}
@media screen and (max-width: 500px) {
  .content {
    width: 100vw;
    max-width: 1200px;
    min-height: 100vh;
    overflow: auto;
    display: flex;
    margin: 0;
    padding: 0;
  }
}
</style>
