<template>
  <div class="list">
    <!-- 顶部导航容器开始 -->
    <back-header></back-header>
    <!-- 顶部导航结束 -->
    <!--  背景图片区域开始 -->
    <div class="bg">
      <img v-lazy="result.coverImgUrl" alt="" />
      <h1>{{ result.name }}</h1>
    </div>
    <!-- 背景图片区域结束 -->
    <!-- 歌单列表开始 -->
    <ul class="list_music">
      <h2>全部({{ result.tracks.length }})</h2>
      <li v-for="(item, index) of result.tracks" :key="index">
        <router-link
          :to="{
            path: '/play',
            query: {
              id: item.id,
              name: item.name,
              uname: item.ar[0].name,
              pic: item.al.picUrl,
            },
          }"
        >
          <div>
            <div class="center">{{ index + 1 }}</div>
            <p>
              <span>{{ item.name }}</span
              ><br />
              <span>{{ item.ar[0].name }}</span>
            </p>
          </div>
          <div>
            <img src="/images/play.png" alt="" />
          </div>
        </router-link>
      </li>
    </ul>
    <!-- 歌单列表结束 -->
  </div>
</template>
<style scoped>
/* 顶部 背景图 */
.bg {
  z-index: -100;
}
.bg img {
  margin-top: 39px;
  width: 100%;
  opacity: 0.5;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -100;
}
.bg h1 {
  color: #fff;
  font-size: 24px;
  margin: 120px 40px 0 40px;
  font-weight: bold;
}
/* 歌单列表容器 */
.list_music {
  padding: 20px;
  margin-top: 40px;
  background: #fff;
  border-radius: 20px 20px 0 0;
}
.list_music h2 {
  margin-bottom: 20px;
}
/* 每首歌曲容器 */
.list_music > li > a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}
a {
  text-decoration: none;
  color: gray;
}
.list_music > li div:first-child {
  display: flex;
  align-items: center;
}
.list_music > li div > p {
  width: 280px;
  margin-left: 0 30px 0 15px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.center {
  width: 25px;
  text-align: center;
}
.list_music > li div > p > span:first-child {
  color: black;
}
.list_music > li div > p > span:last-child {
  font-size: 12px;
  display: inline-block;
  padding-top: 5px;
  color: gray;
}
</style>
<script>
import MyHeader from "../components/MyHeader.vue";
import { getPlaylist } from "../api/search.js";
import BackHeader from "../components/BackHeader.vue";
export default {
  components: { MyHeader, BackHeader },
  data() {
    return {
      // 保存从歌单传来的id
      mid: "",
      // 保存歌单信息
      result: { tracks: [] },
    };
  },
  mounted() {
    // 接收传来的id值
    this.mid = this.$route.query.id;
    // console.log(this.mid);
    // 发送请求歌单列表信息
    getPlaylist(this.mid).then((res) => {
      console.log(res);
      this.result = res.data.playlist;
      console.log(this.result);
    });
  },
};
</script>
