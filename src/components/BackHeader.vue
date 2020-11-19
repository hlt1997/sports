<template>
  <div class="header">
    <mt-header title="听我，云音乐" fixed>
      <router-link to="/search" slot="right">
        <mt-button icon="search">搜索</mt-button>
      </router-link>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
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
  // methods: {
  //   back() {
  //     this.$router.go(-1);
  //   },
  // },
};
</script>
