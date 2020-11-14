<template>
  <div class="play">
    <!-- 背景图区域 -->
    <div class="bg"></div>
    <!-- 顶部导航 -->
    <div class="nav">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </div>
    <!-- 顶部歌曲信息 -->
    <div class="info">
      <span>{{ data.name }}</span
      ><br />
      <span>{{ data.uname }}</span>
    </div>
    <!-- 顶部歌曲信息结束 -->
    <!-- 歌词区域开始 -->
    <div class="music-content-lrc">
      <div class="music-content-lrc-playing" id="lc">
        {{ lyric.lyric }}
      </div>
    </div>
    <!-- 歌词区域结束 -->
    <!-- 控件区域开始 -->
    <div class="control">
      <audio controls="true" :src="url"></audio>
    </div>
    <!-- 控件区域结束 -->
  </div>
</template>
<style scoped>
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("/images/login_bg.jpg") no-repeat;
  background-size: cover;
  /* opacity: 0.5; */
  filter: blur(4px);
}
.nav button {
  background: rgba(0, 0, 0, 0);
  color: #fff;
}
.control {
  width: 300px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  margin: auto;
}
.info {
  position: absolute;
  left: 48px;
  top: 10px;
  color: #fff;
  font-family: "Bahnschrift Light";
}
.info > span:first-child {
  font-weight: bold;
}
.info > span:last-child {
  font-size: 12px;
}
.music-content-lrc {
  position: absolute;
  width: 300px;
  height: 400px;
  left: 0;
  right: 0;
  top: 230px;
  margin: auto;
  color: #fff;
  overflow: hidden;
}
</style>
<script>
export default {
  data() {
    return {
      // 保存从歌单传来的信息（id，name，uname）
      data: {},
      // 保存歌曲url
      url: "",
      // 保存歌词信息
      lyric: "",
    };
  },
  mounted() {
    // 接收传来的id值

    this.data = this.$route.query;
    // 发送请求获取歌曲url
    this.axios
      .get("/song/url?", {
        params: {
          id: this.data.id,
        },
      })
      .then((res) => {
        console.log(res);
        this.url = res.data.data[0].url;
      });
    // 获取歌词信息
    this.axios
      .get("/lyric?", {
        params: {
          id: this.data.id,
        },
      })
      .then((res) => {
        console.log(res);
        let text = res.data.lrc;
        let arr = text.split("\n");
        let row = arr.length;
        console.log(row);
      });
  },
};
</script>
