<template>
  <div class="headerComponent">
    <div class="header">
      <img src="@/assets/img/logo.png" class="logo" />
      <nav class="bigHeader">
        <ul>
          <li class="home">
            <router-link to="/">
              <div class="box cupe">
                <div id="top" class="cupe">主页</div>
                <div id="bottom" class="cupe">主页</div>
                <div id="left" class="cupe"></div>
                <div id="right" class="cupe">主页</div>
                <div id="positive" class="cupe">主页</div>
                <div id="negative" class="cupe">主页</div>
              </div>
            </router-link>
          </li>
          <li class="show">
            <router-link to="/show">
              <div class="box cupe">
                <div id="top" class="cupe">展示</div>
                <div id="bottom" class="cupe">展示</div>
                <div id="left" class="cupe"></div>
                <div id="right" class="cupe">展示</div>
                <div id="positive" class="cupe">展示</div>
                <div id="negative" class="cupe">展示</div>
              </div>
            </router-link>
          </li>
          <li class="library">
            <router-link to="bookmark">
              <div class="box cupe">
                <div id="top" class="cupe">收藏</div>
                <div id="bottom" class="cupe">收藏</div>
                <div id="left" class="cupe"></div>
                <div id="right" class="cupe">收藏</div>
                <div id="positive" class="cupe">收藏</div>
                <div id="negative" class="cupe">收藏</div>
              </div>
            </router-link>
          </li>
          <li class="blog">
            <!-- <router-link :to="'/blog?userId=' + userId"> -->
            <div class="box cupe" @click="toBlog">
              <div id="top" class="cupe">博客</div>
              <div id="bottom" class="cupe">博客</div>
              <div id="left" class="cupe"></div>
              <div id="right" class="cupe">博客</div>
              <div id="positive" class="cupe">博客</div>
              <div id="negative" class="cupe">博客</div>
            </div>
            <!-- </router-link> -->
          </li>
        </ul>
      </nav>
      <nav class="smallHeader">
        <input
          type="text"
          class="search"
          placeholder="不妨sou一sou！"
          v-model="search"
          @keyup.enter="searchHandle"
        />
        <img src="@/assets/img/无标题.png" class="userHeader" />
        <div class="menu">
          <span class="menuBtn iconfont icon-ego-menu"></span>
          <ul class="menuList">
            <li class="menuItem">
              <router-link to="/">主页</router-link>
            </li>
            <li class="menuItem">
              <router-link to="/show">展示</router-link>
            </li>
            <li class="menuItem">
              <router-link to="/bookmark">收藏</router-link>
            </li>
            <li class="menuItem">
              <router-link :to="'/blog?userId=' + userId">博客</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="deOcclude"></div>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: "HomeHeader",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    userId() {
      console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
      return this.$store.state.userId;
    },
  },
  methods: {
    toBlog() {
      console.log("to Blog");
      this.$router.push("/blog?userId=" + this.$store.state.userId);
    },
    async searchHandle() {
      let url = "localhostApi/articles?title=" + this.search;
      this.$router.push("/");
      await this.$store.commit("setArticlesList", []);
      await this.$store.dispatch("getArticlesList", url);
      // axios
      //   .get('localhostApi/articles?title='+this.search)
      //   .then(res=>{
      //     console.log(res);
      //   })
      //   .catch(err=>{
      //     console.log(err);
      //   })
      // }
    },
    // blogClickHandle() {
    //   let userId =
    //   this.$router.push({ path: "/blog", query: { userId: userId } });
    // },
  },
};
</script>

<style lang="less" scoped>
@gold: rgb(211, 238, 211);
.headerComponent {
  @media screen {
    @media (max-width: 502px) {
      @headerHeight: 50px;
      .header {
        position: fixed;
        top: 0;
        width: 100%;
        background: @gold;
        display: flex;
        flex-direction: row;
        z-index: 777;
        .logo {
          width: @headerHeight;
          height: @headerHeight;
          margin: 0 10px;
        }
        .bigHeader {
          display: none;
        }
        .smallHeader {
          flex: 1;
          display: flex;
          .search {
            flex: 1;
            height: 30px;
            margin-top: 10px;
            border-radius: 5px;
            padding: 0 10px;
          }
          .userHeader {
            width: 30px;
            height: 30px;
            border-radius: 15px;
            margin: 10px;
          }
          .menu {
            line-height: @headerHeight;
            // margin-right: 20px;
            position: relative;
            .menuBtn {
              display: block;
              text-align: center;
              width: 40px;
              padding: 0 10px;
              &:hover {
                background: rgba(0, 0, 0, 0.116);
              }
            }
            .menuList {
              display: none;
            }
            &:hover {
              .menuList {
                display: unset;
                top: 50px;
                right: 0;
                width: 100%;
                background: rgb(114, 226, 160);
                position: absolute;
                text-align: center;
                .menuItem {
                  &:hover {
                    background: rgba(0, 0, 0, 0.096);
                  }
                }
              }
            }
          }
        }
      }
      //占位，填充Header,防止阻挡之后的元素
      .deOcclude {
        height: ceil(@headerHeight);
      }
    }
    @media (min-width: 502px) {
      @headerHeight: 80px;
      .header {
        position: fixed;
        top: 0;
        width: 100%;
        background: @gold;
        display: flex;
        flex-direction: row;
        z-index: 777;
        .logo {
          width: @headerHeight;
          height: @headerHeight;
          margin-right: 30px;
        }
        .bigHeader {
          flex-grow: 1;
          overflow: auto;
          ul {
            padding-left: 30px;
            height: 80px;
            display: flex;
            flex-direction: row;
            justify-self: space-between;
            overflow-x: hidden;
            li {
              flex-grow: 1;
              text-align: center;
              line-height: 40px;
              .box {
                width: 80px;
                height: 80px;
                top: 0;
                left: 0;
                &:hover {
                  transform: rotateY(-270deg) rotateX(-270deg);
                }
                div {
                  width: 80px;
                  height: 80px;
                  line-height: 80px;
                  position: absolute;
                }
                #top {
                  background: blueviolet;
                  transform: translateY(-40px) rotateX(90deg);
                }
                #bottom {
                  background: cadetblue;
                  transform: translateY(40px) rotateX(-90deg);
                }
                #left {
                  background: darkmagenta;
                  transform: translateX(-40px) rotateY(-90deg) rotateZ(90deg);
                  background-image: url("@/assets/img/logo.png");
                  background-size: 100%;
                }
                #right {
                  background: cornflowerblue;
                  transform: translateX(40px) rotateY(90deg);
                }
                #positive {
                  background: @gold;
                  transform: translateZ(40px);
                }
                #negative {
                  background: hotpink;
                  transform: translateZ(-40px);
                }
              }
            }
          }
        }
        .smallHeader {
          display: none;
        }
      }
      //占位，填充Header,防止阻挡之后的元素
      .deOcclude {
        height: ceil(@headerHeight);
      }
    }
  }
}
//3d样式，需要给正方体所有面及外层盒子添加
.cupe {
  transition: 1s;
  width: 80px;
  margin: 0 auto;
  transform-style: preserve-3d;
}
</style>
