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
    <!-- 歌曲封面开始 -->
    <div class="pic">
      <img :src="data.pic" alt="" />
    </div>
    <!-- 歌曲封面结束 -->
    <!-- 歌词区域开始 -->
    <div class="lrcContainer" v-if="lrcs">
      <div class="lrc" ref="lrc">
        <!-- 当前播放时间位于要显示的歌词区间时，高亮显示改歌词 -->
        <p
          :class="{
            active:
              currentTime > allKeys[index] && currentTime < allKeys[index + 1],
          }"
          v-for="(item, name, index) of lrcs"
          :key="index"
        >
          {{ scrollLRC(index) }}
          {{ item }}
        </p>
      </div>
    </div>
    <!-- 歌词区域结束 -->
    <!-- 控件区域开始 -->
    <div class="control">
      <!-- controls:控件显示 -->
      <!--  -->
      <audio ref="player" muted autoplay="autoplay" controls :src="url"></audio>
    </div>
    <!-- 控件区域结束 -->
  </div>
</template>
<style scoped>
.active {
  color: red;
  font-size: 20px;
  white-space: nowrap;
}
/* 背景图 */
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("/images/login_bg.jpg") no-repeat;
  background-size: cover;
  /* opacity: 0.5; */
  /* filter: blur(4px); */
}
/* 导航栏 */
.nav button {
  background: rgba(0, 0, 0, 0);
  color: #fff;
}
/* 歌曲封面 */
.pic img {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  border-radius: 50%;
  margin: auto;
}
/* 歌曲控件 */
.control {
  width: 300px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  margin: auto;
}
/* 顶部歌名歌手区域 */
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
/* 歌词区域最外层容器 */
.lrcContainer {
  position: relative;
  height: 200px;
  width: 100%;
  top: 230px;
  /* margin: auto; */
  color: #fff;
  overflow: hidden;
  /* 在当前容器内可以进行滚动 */
  overflow: scroll;
  font-family: "Bahnschrift Light";
}
.lrc {
  width: 100%;
  position: absolute;
  top: 0;
}

/* 每条歌词容器 */
.lrc p {
  height: 30px;
  line-height: 30px;
  text-align: center;
  /* margin: 10px; */
}
</style>
<script>
export default {
  data() {
    return {
      // 保存从歌单传来的信息（id，name，uname,pic）
      data: {},
      // 保存歌曲url
      url: "",
      // 保存经过处理的歌词内容
      lrcs: [],
      // 保存歌词对应时长的数组
      allKeys: [],
      // 保存当前播放时长
      currentTime: 0,
      // 保存总时长
      duration: 0,
    };
  },
  mounted() {
    // 接收传来的id值

    this.data = this.$route.query;
    console.log(this.data);
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
        // 调用函数获取当前播放时长
        // DOM更新之后再调用函数，防止异步渲染未完成时调用函数
        this.$nextTick(() => {
          this.addEventHandle();
        });

        // 获取到的原始歌词文本
        let text = res.data.lrc.lyric;
        // 用于保存歌词和对应时间的空对象
        let lrc = {};
        // 利用获取到的歌词内容自带的回车符切割
        let lyrics = text.split("\n");
        // 正则匹配时间
        let reg = /\[\d*:\d*(\.|:)\d*]/g;
        // for循环，利用正则得到歌词中对应的时间，及歌词内容
        for (let i = 0; i < lyrics.length; i++) {
          // 正则匹配到歌词文件中的对应时间
          let timeRegArr = lyrics[i].match(reg);
          // console.log(timeRegArr);
          if (!timeRegArr) continue; // 跳过null
          // console.log(timeRegArr);
          // 获取时间
          let t = timeRegArr[0];
          // 正则匹配
          // 获取分钟
          let min = parseInt(
            t
              .match(/\[\d*/i)
              .toString()
              .slice(1)
          );
          // console.log(min);
          // 获取秒  毫秒忽略不计
          let sec = parseInt(
            t
              .match(/:\d*/i)
              .toString()
              .slice(1)
          );
          // console.log(sec);
          // 完整时间 分钟转换为秒，加上秒数
          let time = min * 60 + sec;
          // 获取歌词内容
          // 将歌词中的时间替换为空字符，保存到content中，就得到了只有歌词的
          let content = lyrics[i].replace(timeRegArr, "");
          // 将得到的每段歌词push到lrcs中，保存歌词内容
          this.lrcs.push(content);
          // 将lrc对象中的时间和歌词内容对应起来就得到了{12: "You love me no longer, I know and"} 这种形式的对象
          lrc[time] = content;
        }
        // console.log(lrc);
        // 赋值给lrcs 并遍历得到下标对应时间的数组,保存到allKeys中
        this.lrcs = lrc;
        for (let key in this.lrcs) {
          this.allKeys.push(key);
        }
      });
  },
  methods: {
    // 利用ref属性获取标签的当前播放时长
    addEventHandle() {
      this.$refs.player.addEventListener("timeupdate", () => {
        this.currentTime = this.$refs.player.currentTime;
      });
      // 获取当前歌曲的总时长
      this.$refs.player.addEventListener("canplay", () => {
        this.duration = this.$refs.player.duration;
      });
    },
    // 该方法在歌词显示标签内调用，控制歌词滚动
    scrollLRC(index) {
      if (
        this.currentTime > this.allKeys[index] &&
        this.currentTime < this.allKeys[index + 1]
      ) {
        this.$refs.lrc.style.top = -30 * (index - 2) + "px";
      }
    },
  },
};
</script>
