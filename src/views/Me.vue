<template>
  <div class="me">
    <my-header></my-header>
    <button @click="logout">退出登录</button>
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
  mounted() {
    console.log("nohao");
  },
  methods: {
    logout() {
      this.axios.get("/logout").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
