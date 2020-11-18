<template>
  <div class="home">
    <my-header></my-header>
    <h1>歌手榜TOP({{ topList.length }})</h1>
    <ul class="singer-list">
      <li v-for="(item, index) of topList" :key="index">
        <img v-lazy="item.picUrl" alt="" />
        {{ item.name }}
      </li>
    </ul>
    <my-footer></my-footer>
  </div>
</template>
<style scoped>
h1 {
  margin: 60px 20px 0 30px;
}
.singer-list {
  margin: 20px;
}
.singer-list li {
  margin: 10px;
}
.singer-list img {
  width: 50px;
}
</style>
<script>
import { getTopList } from "../api/search";

export default {
  data() {
    return {
      topList: [],
    };
  },
  mounted() {
    getTopList().then((res) => {
      console.log(res.data.list);
      this.topList = res.data.list.artists;
    });
  },
};
</script>
