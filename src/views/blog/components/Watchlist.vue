<template>
  <div>
    <div class="bodyTitle">关注</div>
    <div class="listBody">
      <ul>
        <li
          class="detialItem"
          v-for="item of starList"
          :key="item.id"
          @click="$router.push('/blog?userId=' + item.id)"
        >
          <span class="itemTitle">{{ item.username }} </span>
          <button class="follow" @click.stop="follow(item.id)">关注</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Watchlist",
  data() {
    return {
      starList: [],
    };
  },
  computed: {
    userId() {
      return this.$route.query.userId;
    },
  },
  created() {
    this.getMyStarList();
  },
  methods: {
    getMyStarList() {
      let url = `/localhostApi/user/${this.userId}/starlist`;
      axios
        .get(url)
        .then((res) => {
          this.starList = res.data;
          console.log(this.starList);
        })
        .catch((err) => console.log(err));
    },
    follow(starId) {
      let url = "/localhostApi/user";
      let data = {
        starId: starId,
        followerId: this.$store.state.userId,
      };
      axios
        .put(url, qs.stringify(data))
        .then((res) => {
          alert(res.data.msg);
        })
        .catch((err) => {
          alert("出错了~请重新尝试！");
          console.log(err);
        });
    },
  },
  watch: {
    userId() {
      this.getMyStarList();
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
      padding: 20px 30px;
      border-bottom: 1px solid #fff;
      cursor: pointer;
      position: relative;
      transition: 1s;
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
      }
      .itemTitle {
        height: 60px;
        line-height: 60px;
        font-size: 17px;
        font-weight: bold;
        color: rgb(54, 53, 53);
      }
      .follow {
        width: 60px;
        height: 40px;
        border-radius: 10px;
        float: right;
        margin-top: 10px;
        transition: 0.5s;
        &:hover {
          background: rgb(57, 173, 168);
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
