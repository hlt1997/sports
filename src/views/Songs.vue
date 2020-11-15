<template>
  <div class="songs">
    <!-- 顶部导航容器开始 -->
    <div class="nav">
      <my-header></my-header>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </div>
    <!-- 顶部导航结束 -->
    <!--  背景图片区域开始 -->
    <div class="bg">
      <img src="/images/cover.jpg" alt="" />
      <div class="time">
        <span>{{ date }}</span
        >/
        <span>{{ month }}</span>
      </div>
    </div>
    <!-- 背景图片区域结束 -->
    <!-- 歌曲列表开始 -->
    <ul class="list_music">
      <h2>全部({{ data.length }})</h2>
      <li v-for="(item, index) of data" :key="index">
        <router-link
          :to="{
            path: '/play',
            query: {
              id: item.id,
              name: item.name,
              uname: item.artists[0].name,
              pic: item.album.blurPicUrl,
            },
          }"
        >
          <div>
            <div class="center">
              <img :src="item.album.blurPicUrl" alt="" />
            </div>
            <p>
              <span>{{ item.name }}</span
              ><br />
              <span>{{ item.artists[0].name }}</span>
            </p>
          </div>
          <div>
            <img src="/images/play.png" alt="" />
          </div>
        </router-link>
      </li>
    </ul>
    <!-- 歌曲列表结束 -->
  </div>
</template>
<style scoped>
.nav {
  position: relative;
}
.nav button {
  background: rgba(0, 0, 0, 0);
}
/* 引入的组件 */
.search {
  margin-left: 20px;
}

/* 顶部返回按钮 */
.nav > a {
  position: absolute;
  left: 0;
  top: -5px;
  margin-right: 20px;
}
/* 顶部 背景图 */
.bg {
  z-index: -100;
}
.bg img {
  /* background: url('result.coverImgUrl'); */
  width: 100%;
  opacity: 0.5;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -100;
}
/* 日期 */
.time {
  color: #fff;
  font-family: "Bahnschrift Light";
  margin-top: 40px;
  margin-left: 20px;
}
.time > span:first-child {
  font-size: 32px;
  /* font-weight: bold; */
}
.time > span:last-child {
  font-size: 20px;
}
/* 歌单列表容器 */
.list_music {
  padding: 20px;
  margin-top: 20px;
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
  color: black;
  text-decoration: none;
}
.list_music > li div:first-child {
  display: flex;
  align-items: center;
}
.list_music > li div > p {
  font-size: 14px;
  margin-left: 15px;
}
.center {
  width: 25px;
  text-align: center;
  margin-right: 15px;
}
.center img {
  width: 40px;
  height: 40px;
}
.list_music > li div > p > span:last-child {
  font-size: 12px;
  display: inline-block;
  padding-top: 5px;
  color: gray;
}
</style>
<script>
export default {
  data() {
    return {
      data: [],
      month: "",
      date: "",
    };
  },
  // methods() {},
  mounted() {
    this.axios.get("/recommend/songs").then((res) => {
      console.log(res);
      this.data = res.data.recommend;
    })// 当返回结果axios请求失败，获取后端接口返回的状态码及错误信息
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });;
    let date = new Date();
    console.log(date.getMonth());
    console.log(date.getDate());
    this.month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    this.date = date.getDate(); //获取当前日(1-31)
  },
};
</script>
