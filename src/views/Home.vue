<template>
  <div class="home">
    <my-header></my-header>
    <div class="banner">
      <mt-swipe :showIndicators="true" :auto="3000" :speed="1000">
        <mt-swipe-item v-for="(images, index) of banner_data" :key="index">
          <img :src="images.imageUrl" alt="" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <ul class="nav">
      <li>
        <router-link to="/songs"
          ><img src="/images/icons/day.png" alt=""
        /></router-link>
        <span>每日推荐</span>
      </li>
      <li>
        <router-link to="/playlist"
          ><img src="/images/icons/song.png" alt=""
        /></router-link>
        <span>歌单</span>
      </li>
      <li>
        <router-link to="/ranking"
          ><img src="/images/icons/top.png" alt=""
        /></router-link>
        <span>排行榜</span>
      </li>
    </ul>
    <h3>推荐歌单</h3>
    <!-- 下拉加载更多 距底部20像素开始加载 -->
    <ul
      class="lists"
      infinite-scroll-distance="20"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
    >
      <li v-for="(item, index) of result" :key="index">
        <router-link :to="{ path: '/list', query: { id: item.id } }">
          <img v-lazy="item.picUrl" alt="" />
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
    <my-footer></my-footer>
  </div>
</template>
<style scoped>
.banner {
  height: 150px;
  margin-bottom: 10px;
}
.banner img {
  width: 100%;
  height: 100%;
}
.nav {
  display: flex;
  justify-content: space-around;
}
.nav a {
  display: inline-block;
  background: linear-gradient(to right, #ff5a4a 0%, #ff1e12 100%);
  padding: 5px;
  border-radius: 50%;
}
.nav li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav li span {
  padding-top: 10px;
  font-size: 14px;
}
h3 {
  margin: 30px 0 20px 20px;
  font-weight: bold;
}
.lists {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 65px;
}
.lists li {
  width: 46%;
  margin: 5px 0;
}
.lists > li img {
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
}
a {
  color: gray;
  font-size: 12px;
  text-decoration: none;
}
</style>
<script>
import { getBanner, getPersonalized } from "../api/search.js";
export default {
  data() {
    return {
      // 轮播图
      banner_data: [],
      // 歌单数据
      result: [],
      // 是否禁用下拉刷新
      busy: false,
      // 歌单个数参数 首次加载8个
      limit: 8,
    };
  },
  mounted() {
    // 轮播图
    getBanner().then((res) => {
      this.banner_data = res.data.banners;
    });
    // 推荐歌单

    getPersonalized(this.limit).then((res) => {
      console.log(res);
      this.result = res.data.result;
    });
  },
  methods: {
    loadMore() {
      // 每次下拉加载4条数据
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "double-bounce",
      });
      this.limit += 4;
      //此时的真正作用是：现在已经触发了滚动方法,既使现在再次进行
      //滚动范围也不再触发滚动方法了
      this.busy = true;
      getPersonalized(this.limit).then((res) => {
        // console.log(res);
        this.result = res.data.result;
        //真正的作用是：上一次的请求已经处理完成了
        //如果现在再次进行滚动范围，则仍然要触发滚动方法
        this.busy = false;
        this.$indicator.close();
      });
    },
  },
};
</script>
