<template>
  <div class="ranking">
    <!-- 顶部导航容器开始 -->
    <div class="nav">
      <router-link to="/" slot="left">
        <mt-button icon="back"> 排行榜</mt-button>
      </router-link>
    </div>
    <!-- 顶部导航结束 -->
    <!-- 榜单列表开始 -->
    <ul class="lists">
      <h2>官方榜</h2>
      <li v-for="(item, index) of result" :key="index">
        <router-link :to="{ path: '/list', query: { id: item.id } }">
          <img v-lazy="item.coverImgUrl" alt="" />
          <span class="update">{{ item.updateFrequency }}</span>
          <div>
            <div v-for="(music, i) of item.tracks" :key="i">
              <span>{{ i + 1 }}. </span>
              <span>{{ music.first }}</span> -
              <span>{{ music.second }}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <h2>更多榜单</h2>
    <ul class="more">
      <li v-for="(item, index) of data" :key="index">
        <router-link :to="{ path: '/list', query: { id: item.id } }">
          <img v-lazy="item.coverImgUrl" alt="" />
          <span>{{ item.updateFrequency }}</span
          ><br />
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
    <!-- 榜单列表结束 -->
  </div>
</template>
<style scoped>
.nav button {
  background: rgba(0, 0, 0, 0);
  color: black;
}
h2 {
  margin: 20px 10px 5px 10px;
  font-weight: bold;
}
/* 每个榜单图片 */
.lists img {
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 5px;
}
/* 每个榜单歌曲容器 */
.lists > li > a > div {
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 每个榜单容器 */
.lists > li > a {
  display: flex;
  text-decoration: none;
  color: gray;
  font-size: 14px;
  position: relative;
}
/* 更新频率 */
.update {
  position: absolute;
  left: 15px;
  top: 88px;
  color: #fff;
  font-size: 12px;
}
/* 更多榜单 */
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
.more a > span:nth-child(2) {
  position: absolute;
  left: 5px;
  color: #fff;
  top: 40px;
  white-space: nowrap;
}
</style>
<script>
import { getTopSongs } from "../api/search";
export default {
  data() {
    return {
      // 保存tracks不为空的榜单
      result: [],
      // 保存tracks为空的榜单
      data: [],
    };
  },
  mounted() {
    getTopSongs().then((res) => {
      console.log(res);
      let list = res.data.list;
      for (let item of list) {
        if (item.tracks.length != 0) {
          this.result.push(item);
        } else {
          this.data.push(item);
        }
      }
    });
  },
};
</script>
