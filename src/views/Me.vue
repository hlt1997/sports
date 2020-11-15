<template>
  <div class="me">
    <my-header></my-header>
    <button v-if="this.$store.state.isLogined == 0">登录</button>

    <button v-else @click="logout">注销</button>
    <my-footer></my-footer>
  </div>
</template>
<style scoped></style>
<script>
import MyHeader from "../components/MyHeader.vue";
export default {
  components: { MyHeader },
  data() {
    return {
      data: [],
      NameStatus: "success",
    };
  },
  // mounted() {
    
    // this.axios.get("/user/account").then(res=>{
    //   console.log(res)
    // })// 当返回结果axios请求失败，获取后端接口返回的状态码及错误信息
    //   .catch((error) => {
    //     if (error.response) {
    //       console.log(error.response);
    //     }
    //      else if (error.request) {
    //       console.log(error.request);
    //     } else {
    //       console.log("Error", error.message);
    //     }
    //     console.log(error.config);
    //   });
  // },
  methods: {
    logout() {
      this.axios.get("/logout").then((res) => {
        console.log(res);
        if(res.data.code == 200){
          this.$store.commit("logout")
        }
      });

    },
  },
};
</script>
