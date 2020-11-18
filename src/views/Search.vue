<template>
  <div class="search">
    <mt-header title="" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="search" slot="right" @click="change"></mt-button>
    </mt-header>
    <input
      type="text"
      placeholder="搜索歌曲、歌手"
      v-model="value"
      ref="search"
    />
    <div class="hot">
      <p>热门搜索</p>
      <span
        to=""
        v-for="(item, index) of hots"
        :key="index"
        ref="hot"
        @click="addChange(index)"
      >
        {{ item.first }}
      </span>
    </div>
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
  position: absolute;
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
.hot {
  margin: 60px 20px 0 20px;
}
.hot p {
  margin-bottom: 10px;
  font-size: 14px;
}
.hot span {
  display: inline-block;
  border: 1px solid #aaa;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  color: #666;
  font-size: 14px;
}
</style>
<script>
import { getSearchHot } from "../api/search";

export default {
  data() {
    return {
      value: "",
      hots: [],
    };
  },
  mounted() {
    // 热搜歌曲
    getSearchHot().then((res) => {
      console.log(res.data.result);
      this.hots = res.data.result.hots;
    });
  },
  methods: {
    // 用户输入不为空时，跳转到搜索结果页面
    change() {
      if (this.value.trim() != "") {
        this.$router.push({
          path: "/suggest",
          query: { value: this.value.trim() },
        });
      }
    },
    addChange(index) {
      // console.log(this.$refs.hot[index].innerHTML);
      // 将热搜词赋值给输入框
      this.value = this.$refs.hot[index].innerHTML;
    },
  },
};
</script>
