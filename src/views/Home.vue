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
        <router-link to=""
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
    <ul class="lists">
      <li v-for="(item, index) of result" :key="index">
        <router-link :to="{ path: '/list', query: { id: item.id } }">
          <img :src="item.picUrl" alt="" />
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
export default {
  data() {
    return {
      banner_data: [],
      result: [],
    };
  },
  mounted() {
    this.axios.get("/banner").then((res) => {
      // console.log(res.data.banners);
      this.banner_data = res.data.banners;
    });
    this.axios.get("/personalized?limit=8").then((res) => {
      console.log(res);
      this.result = res.data.result;
    });
  },
  // methods:{
  //   changed(){
  //     this
  //   }
  // }
};
</script>
