<template>
  <div class="sidebar">sidebar</div>
</template>

<script>
export default {
  name: "ArticleSidebar",
};
</script>

<style lang="less" scoped>
@media screen {
  @media (max-width: 1000px) {
    .sidebar {
      display: none;
    }
  }
  .sidebar {
    width: 200px;
    padding: 20px;
    border-radius: 10px;
    margin-left: 10px;
    background: #e9e9e9;
  }
}
</style>
