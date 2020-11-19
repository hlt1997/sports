<template>
  <div class="me">
    <my-header></my-header>
    <!-- 未登录 -->
    <div class="user-info" v-if="this.$store.state.isLogined == 0">
      <img src="/images/avatar/avatar.jpg" alt="" />
      <div></div>
      <p class="user-name">
        登录立享手机电脑多端同步
        <span @click="login">登录</span>
      </p>
    </div>
    <!-- 未登录 -->
    <!-- 已登录 -->
    <div class="user-info" v-else>
      <img :src="userInfo.avatarUrl" alt="" />
      <div>{{ userInfo.nickname }}</div>
      <p class="user-name">
        <span @click="logout">注销</span>
      </p>
    </div>
    <!-- 已登录 -->
    <!-- 菜单 -->
    <div class="my-menus">
      <div>
        <img src="/images/icons/music.png" alt="" />
        <p class="text">本地音乐</p>
      </div>
      <div>
        <img src="/images/icons/down.png" alt="" />
        <p>下载管理</p>
      </div>
      <div>
        <img src="/images/icons/tai.png" alt="" />
        <p>我的电台</p>
      </div>
      <div>
        <img src="/images/icons/like.png" alt="" />
        <p>我的收藏</p>
      </div>
      <div>
        <img src="/images/icons/love.png" alt="" />
        <p>我的收藏</p>
      </div>
      <div>
        <img src="/images/icons/fm.png" alt="" />
        <p>我的收藏</p>
      </div>
    </div>
    <h2>专属歌单</h2>
    <!-- 歌单 -->
    <ul class="songs">
      <li v-for="(item, index) of result" :key="index">
        <router-link :to="{ path: '/list', query: { id: item.id } }">
          <img v-lazy="item.picUrl" alt="" />
          <p>{{ item.name }}</p>
        </router-link>
      </li>
    </ul>
    <my-footer></my-footer>
  </div>
</template>
<style scoped>
.me {
  position: absolute;
  width: 100%;
  /* height: 100%; */
  background: url("/images/avatar/user-bg.jpg") no-repeat;
  background-size: cover;
}
/* 用户登录容器 */
.user-info {
  margin-top: 80px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: #fff;
}
.user-info img {
  width: 80px;
  height: 80px;
  margin: 20px;
  border-radius: 50%;
}
.user-info p {
  font-size: 14px;
}
.user-info span {
  border: 1px solid #999;
  color: #fff;
  border-radius: 10px;
  padding: 5px 20px;
  /* opacity: 0.6; */
}
/* 菜单选项 */
.my-menus {
  background-color: #fff;
  padding-bottom: 20px;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /* align-items: center; */
  text-align: center;
  font-size: 14px;
  color: black;
}
.my-menus > div {
  width: 100px;
}
.my-menus img {
  margin: 10px 0;
}
h2 {
  background: #fff;
  font-weight: bold;
  padding: 0 0 10px 15px;
}
/* 歌单列表 */
.songs {
  background: #fff;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  font-size: 12px;
}
.songs li {
  width: 100px;
  margin: 10px 0;

  /* text-align: center; */
}
.songs li img {
  width: 100px;
  margin-bottom: 5px;
  border-radius: 10px;
}
a {
  text-decoration: none;
  color: black;
}
</style>
<script>
import MyHeader from "../components/MyHeader.vue";
import { getLogout, getPersonalized, getStatus } from "../api/search.js";
export default {
  components: { MyHeader },
  data() {
    return {
      // 歌单数量
      limit: 9,
      // 获取歌单结果
      result: [],
      // 用户信息
      userInfo: [],
    };
  },
  mounted() {
    // 获取精品歌单
    getPersonalized(this.limit).then((res) => {
      // console.log(res.data);
      this.result = res.data.result;
    });
    // 判断用户登录状态
    getStatus()
      .then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$store.commit("logined");
          localStorage.setItem("isLogined", 1);
          this.userInfo = res.data.profile;
        }
      })
      // 当返回结果axios请求失败，获取后端接口返回的状态码及错误信息
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  },
  methods: {
    // 退出登录
    logout() {
      getLogout().then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$store.commit("logout");
        }
      });
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>
