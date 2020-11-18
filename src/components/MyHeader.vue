<template>
  <div class="header">
    <mt-header title="听我，云音乐" fixed>
      <router-link to="/search" slot="right">
        <mt-button icon="search">搜索</mt-button>
      </router-link>
      <mt-button icon="more" slot="left"></mt-button>
    </mt-header>
  </div>
</template>
<style scoped>
.header {
  margin-bottom: 40px;
}
.mint-header {
  background-color: #ff5a4a;
}
</style>
<script>
export default {
  data() {
    return {
      value: "",
      result: [],
    };
  },
};
</script>
