<template>
  <div class="song_list">
    <back-header></back-header>
    <h2>精品歌单</h2>
    <ul
      class="more"
      infinite-scroll-distance="20"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-immediate-check="true"
    >
      <li v-for="(item, index) of lists" :key="index">
        <router-link :to="{ path: '/list', query: { id: item.id } }">
          <img v-lazy="item.coverImgUrl" alt="" />
          <!-- <span>{{ item.updateFrequency }}</span -->
          <!-- ><br /> -->
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style scoped>
h2 {
  margin: 60px 20px 10px 20px;
  font-weight: bold;
}
.more {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.more > li {
  width: 100px;
}
.more > li img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin: 8px 0;
}
.more a {
  font-size: 12px;
  position: relative;
  text-decoration: none;
  color: black;
}
/* .more a > span:nth-child(2) {
  position: absolute;
  left: 5px;
  color: #fff;
  top: 40px;
  white-space: nowrap;
} */
</style>
<script>
import { getHighquality } from "../api/search.js";
export default {
  data() {
    return {
      // 保存精品歌单
      lists: [],
      // 参数
      before: 1503639064232,
      // 首次加载数量
      limit: 18,
      // 是否禁用下拉刷新
      busy: false,
    };
  },
  mounted() {
    // 获取精品歌单
    getHighquality(this.before, this.limit).then((res) => {
      console.log(res.data);
      this.lists = res.data.playlists;
    });
  },
  methods: {
    loadMore() {
      // 显示加载框
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "double-bounce",
      });
      // 每次加载6条数据
      this.limit += 6;
      this.busy = true;
      getHighquality(this.before, this.limit).then((res) => {
        this.lists = res.data.playlists;
        this.busy = false;
        // 清除加载框
        this.$indicator.close();
      });
    },
  },
};
</script>
