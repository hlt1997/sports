<template>
  <div class="me">
    <my-header></my-header>
    <div class="user-info">
      <img src="/images/avatar/avatar.jpg" alt="" />
      <p v-if="this.$store.state.isLogined == 0" class="user-name">
        登录立享手机电脑多端同步
        <span @click="login">登录</span>
      </p>
      <p v-else>
        <span @click="logout">注销</span>
      </p>
    </div>
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
    <my-footer></my-footer>
  </div>
</template>
<style scoped>
.me {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("/images/avatar/user-bg.jpg") no-repeat;
  background-size: cover;
}
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
/* .music > ul > li:first-child {
  background: #ff5a4a;
} */
</style>
<script>
import MyHeader from "../components/MyHeader.vue";
import { getLogout } from "../api/search.js";
export default {
  components: { MyHeader },
  data() {
    return {
      data: [],
      NameStatus: "success",
    };
  },
  methods: {
    logout() {
      getLogout().then((res) => {
        console.log(res);
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
