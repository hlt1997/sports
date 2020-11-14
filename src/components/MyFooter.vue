<template>
  <!--底部导航开始-->
  <div class="nav">
    <mt-tabbar v-model="tabbar" fixed>
      <mt-tab-item id="home">
        主页
        <img
          src="/images/icons/enabled_home.png"
          slot="icon"
          v-if="tabbar == 'home'"
        />
        <img src="/images/icons/disabled_home.png" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="find">
        发现
        <img
          src="/images/icons/enabled_find.png"
          slot="icon"
          v-if="tabbar == 'find'"
        />
        <img src="/images/icons/disabled_find.png" slot="icon" v-else />
      </mt-tab-item>

      <mt-tab-item id="me">
        我的
        <img
          src="/images/icons/enabeld_me.png"
          slot="icon"
          v-if="tabbar == 'me'"
        />
        <img src="/images/icons/disabled_me.png" slot="icon" v-else />
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
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: #fff;
  color: #ff3023;
}
</style>
<script>
export default {
  data() {
    return {
      // 选项卡变量\
      tabbar: "home",
    };
  },
  mounted() {
    // console.log(this.$route.path);

    if (this.$route.path == "/") {
      this.tabbar = "home";
    } else if (this.$route.path == "/find") {
      this.tabbar = "find";
      // } else if (this.$route.path == "/shop") {
      //   this.tabbar = "shop";
    } else if (this.$route.path == "/me") {
      this.tabbar = "me";
    }
  },
  watch: {
    tabbar(value) {
      // 跳转到主页
      console.log(this.tabbar);
      if (value == "home") {
        // 跳转到我的页面
        this.$router.push("/").catch((e) => {});
      }
      if (value == "find") {
        // 跳转到消息页面
        this.$router.push("/find").catch((e) => {});
      }
      // if (value == "shop") {
      //   // 跳转到购物车
      //   // if(this.$store.state.isLogined == 0){
      //   //   this.$router.push('/login')
      //   // }else{
      //   this.$router.push("/shop").catch((e) => {});
      //   // }
      // }
      if (value == "me") {
        // 跳转到消息页面
        this.$router.push("/me").catch((e) => {});
      }
    },
  },
};
</script>
