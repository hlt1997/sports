<template>
  <div class="suggest">
    <!-- 头部导航开始 -->
    <mt-header title="" fixed>
      <router-link to="/search" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="search" @click="searchSongs" slot="right"></mt-button>
    </mt-header>
    <input
      type="text"
      placeholder="搜索歌曲、歌手"
      v-model="value"
      ref="search"
      @keydown.13="searchSongs"
    />
    <!-- 头部导航结束 -->
    <!-- 搜索结果列表开始 -->
    <ul class="lists">
      <li v-for="(item, index) of songs" :key="index">
        <router-link
          :to="{
            path: '/play',
            query: {
              id: item.id,
              name: item.name,
              uname: item.artists[0].name,
              pic: item.artists[0].img1v1Url,
            },
          }"
        >
          {{ item.name }} - {{ item.artists[0].name }}
        </router-link>
      </li>
    </ul>
    <!-- 搜索结果列表结束 -->
  </div>
</template>
<style scoped>
.mint-header {
  background-color: #ff5a4a;
  height: 42px;
}
input {
  width: 250px;
  height: 32px;
  position: fixed;
  left: 0;
  right: 0;
  top: 3px;
  margin: auto;
  background-color: #ff5a4a;
  outline: none;
  border: none;
  z-index: 111;
  line-height: 32px;
}
ul {
  margin-top: 50px;
}
li {
  padding: 15px;
  border-bottom: 1px solid #e8e8e8;
}
li a {
  color: gray;
  text-decoration: none;
  font-size: 14px;
}
</style>
<script>
import { getSearchSongs } from "../api/search";

export default {
  data() {
    return {
      // 绑定输入框的值
      value: "",
      // 保存搜索的歌曲结果
      songs: [],
    };
  },
  mounted() {
    // console.log(this.$route.query);
    this.value = this.$route.query.value;
    // 跳转到页面时 显示搜索结果
    getSearchSongs(this.value, 20).then((res) => {
      // console.log(res);
      console.log(res.data.result.songs);
      this.songs = res.data.result.songs;
    });
  },
  methods: {
    searchSongs() {
      getSearchSongs(this.value, 20).then((res) => {
        console.log(res.data.result.songs);
        this.songs = res.data.result.songs;
      });
    },
  },
};
</script>
