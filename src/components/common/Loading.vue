<template>
  <div class="loadingComponent">
    <div class="load">
      <hr />
      <hr />
      <hr />
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="less">
.loadingComponent {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: rgba(7, 7, 7, 0.699);
  .load {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*change these sizes to fit into your project*/
    width: 100px;
    height: 100px;
    hr {
      border: 0;
      margin: 0;
      width: 40%;
      height: 40%;
      position: absolute;
      border-radius: 50%;
      animation: spin 2s ease infinite;
    }
    & :first-child {
      background: #19a68c;
      animation-delay: -1.5s;
    }
    & :nth-child(2) {
      background: #f63d3a;
      animation-delay: -1s;
    }
    & :nth-child(3) {
      background: #fda543;
      animation-delay: -0.5s;
    }
    & :last-child {
      background: #193b48;
    }
  }
  @keyframes spin {
    0%,
    100% {
      transform: translate(0);
    }
    25% {
      transform: translate(160%);
    }
    50% {
      transform: translate(160%, 160%);
    }
    75% {
      transform: translate(0, 160%);
    }
  }
}
</style>
