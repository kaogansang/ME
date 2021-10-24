<template>
  <div class="modifyBookmark">
    <div class="modifyForm">
      <h2 class="title">修改书签：</h2>
      <p class="name">
        名称
        <input type="text" v-model="name" />
      </p>
      <p class="url">
        URL
        <input type="text" v-model="url" />
      </p>
      <p class="path">
        文件夹
        <input type="text" v-model="path" />
      </p>
      <button class="confirm" @click="confirm">确认</button>
      <button class="cancel" @click="cancel">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModifyBookmark",
  data() {
    return {
      name: "",
      url: "",
      path: "",
    };
  },
  methods: {
    confirm() {
      let data = {
        name: this.name,
        url: this.url,
        path: this.path,
      };
      this.$emit("confirmModify", data);
    },
    cancel() {
      this.$emit("cancelModify");
    },
  },
};
</script>

<style lang="less" scoped>
.modifyBookmark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.137);
  .modifyForm {
    position: absolute;
    width: 300px;
    height: 200px;
    padding: 10px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 30px #000;
    .title {
      height: 20px;
      line-height: 20px;
      font-size: 18px;
      padding-bottom: 15px;
    }
    p {
      padding: 4px 5px;
      height: 35px;
      line-height: 35px;
      font-size: 13px;
      input {
        height: 35px;
        width: 80%;
        border: 2px solid rgb(150, 143, 143);
        padding: 0 5px;
        box-sizing: border-box;
        border-radius: 5px;
        float: right;
        &:focus {
          border: 2px solid rgb(13, 199, 199);

          box-shadow: 0 0 5px rgb(13, 199, 199);
        }
      }
    }
    button {
      width: 50px;
      height: 30px;
      border-radius: 5px;
      cursor: pointer;
      position: absolute;
      bottom: 5px;
      background: rgba(0, 0, 0, 0.315);
      &:hover {
        box-shadow: 2px 2px 3px #000;
      }
    }
    .cancel {
      right: 15px;
    }
    .confirm {
      right: 75px;
    }
  }
}
</style>
