<template>
  <!--底部导航开始-->
  <div class="nav">
    <mt-tabbar v-model="tabbar" fixed>
      <mt-tab-item id="shequ">
        社区
        <img
          src="/images/icons/shequ_enabled.png"
          slot="icon"
          v-if="tabbar == 'shequ'"
        />
        <img src="/images/icons/shequ_disabled.png" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="xunlian">
        训练
        <img
          src="/images/icons/xunlian_enabled.png"
          slot="icon"
          v-if="tabbar == 'xunlian'"
        />
        <img src="/images/icons/xunlian_disabled.png" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="kecheng">
        课程
        <img
          src="/images/icons/kecheng_enabled.png"
          slot="icon"
          v-if="tabbar == 'kecheng'"
        />
        <img src="/images/icons/kecheng_disabled.png" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="shop">
        商城
        <img
          src="/images/icons/shop_enabled.png"
          slot="icon"
          v-if="tabbar == 'shop'"
        />
        <img src="/images/icons/shop_disabled.png" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="me">
        我的
        <img
          src="/images/icons/me_enabled.png"
          slot="icon"
          v-if="tabbar == 'me'"
        />
        <img src="/images/icons/me_disabled.png" slot="icon" v-else />
      </mt-tab-item>
    </mt-tabbar>
  </div>
  <!--底部导航结束-->
</template>
<style scoped>
/* .mint-tabbar>.mint-tab-item.is-selected{
  background-color: #fff;
} */
/*设置底部选项卡选中时的颜色 */
a.is-selected {
  color: #00e2c5;
}
</style>
<script>
export default {
  data() {
    return {
      // 选项卡变量\
      tabbar: "index",
    };
  },
  mounted() {
    // console.log(this.$route.path);
    if (this.$route.path == "/shequ") {
      this.tabbar = "shequ";
    } else if (this.$route.path == "/xunlian") {
      this.tabbar = "xunlian";
    } else if (this.$route.path == "/") {
      this.tabbar = "kecheng";
    } else if (this.$route.path == "/shop") {
      this.tabbar = "shop";
    } else if (this.$route.path == "/me") {
      this.tabbar = "me";
    }
  },
  watch: {
    tabbar(value) {
      // 跳转到主页
      console.log(this.tabbar);
      if (value == "shequ") {
        this.$router.push("/shequ").catch((e) => {});
      }
      if (value == "xunlian") {
        // 跳转到我的页面
        this.$router.push("/xunlian").catch((e) => {});
      }
      if (value == "kecheng") {
        // 跳转到消息页面
        this.$router.push("/").catch((e) => {});
      }
      if (value == "shop") {
        // 跳转到购物车
        // if(this.$store.state.isLogined == 0){
        //   this.$router.push('/login')
        // }else{
        this.$router.push("/shop").catch((e) => {});
        // }
      }
      if (value == "/me") {
        // 跳转到消息页面
        this.$router.push("/me").catch((e) => {});
      }
    },
  },
  // $route: {
  //   deep: true,
  //   handler(to, from) {
  //     if (to.path != from.path) {
  //       this.$router.push(to.path);
  //     }
  //   },
  // },
};
</script>
