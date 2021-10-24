<template>
  <div class="WriteComponent">
    <div class="title">
      <input type="text" placeholder="请输入文章标题" v-model="title" />
    </div>
    <div class="content">
      <!-- <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="在此输入文章内容"
                v-model="content"
            ></textarea> -->
      <v-md-editor
        v-model="content"
        height="700px"
        v-on:change="onSaveHandle"
        ref="vme"
        @click="release"
      ></v-md-editor>
    </div>
    <button class="submit" @click="release">发布</button>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Write",
  data() {
    return {
      title: "",
      content: "",
      value: "",
      html: "",
    };
  },
  methods: {
    release() {
      let article = {
        userId: this.$store.state.userId,
        title: this.title,
        content: this.content,
        // author: this.$store.state.username
      };
      console.log(article);
      console.log(qs.stringify(article));
      axios
        .post("localhostApi/articles", qs.stringify(article))
        .then((req) => {
          alert("发布成功！");
          console.log(req);
        })
        .catch((err) => {
          alert("发布失败");
          console.log(err);
        });
    },
    onSaveHandle() {
      console.log(this.content);
    },
  },
};
</script>

<style lang="less" scoped>
.WriteComponent {
  background: #e8ecef;
  // height: 100vh;
  padding-bottom: 80px;
  .title {
    // height: 50px;
    // margin: 26px;
    overflow: hidden;
    padding: 20px 20px;
    input {
      width: 100%;
      height: 50px;
      border-radius: 5px;
      padding: 0 20px;
      box-sizing: border-box;
      line-height: 50px;
      font-size: 25px;
      &:focus {
        box-shadow: 0 0 20px #920edf;
      }
    }
  }
  .content {
    margin: 20px;
    textarea {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 5px;
      height: 75vh;
      &:focus {
        box-shadow: 0 0 20px #920edf;
      }
    }
  }
  .submit {
    height: 40px;
    width: 60px;
    border-radius: 5px;
    float: right;
    margin-right: 20px;
    background: rgba(0, 0, 0, 0.288);
    // margin: auto;
  }
}
</style>
