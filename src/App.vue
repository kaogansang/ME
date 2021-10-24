<template>
  <div id="app">
    <common-header />
    <float-menu />
    <Loading v-if="loading" />
    <!-- <transition name="silde"> -->
    <router-view :key="$route.path" />
    <!-- </transition> -->
  </div>
</template>

<script>
import CommonHeader from "./components/common/CommonHeader.vue";
import FloatMenu from "./components/common/FloatMenu.vue";
import Loading from "./components/common/Loading.vue";

export default {
  components: {
    CommonHeader,
    FloatMenu,
    Loading,
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>

<style>
.silde-leave-active,
.silde-enter-active {
  transition: opacity 1s, transform 1s;
  /* transition: 2s; */
}
.silde-leave-to,
.silde-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* transform: scale(2); */
  transform: translateX(-30%);
}
</style>
