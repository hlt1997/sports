<template>
  <div class="login">
    <router-link to="/me" class="back">
      <img src="/images/left.png" alt="" />
    </router-link>
    <img src="/images/logo.png" alt="" />
    <input type="text" placeholder="手机号码" v-model="phone" />
    <input type="password" placeholder="密码" v-model="password" />
    <button
      :disabled="selected"
      :class="{ disabled: selected == true }"
      @click="login"
    >
      登 录
    </button>
    <router-link to="/register" class="title">免费注册 >></router-link>
    <div>
      <input type="checkbox" v-model="ischb" />
      <span>我同意《用户协议》《隐私政策》</span>
    </div>
  </div>
</template>
<style scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("/images/login_bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.back {
  position: absolute;
  left: 20px;
  top: 20px;
}
.login > img {
  margin-bottom: 100px;
}
.login > input {
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 5px 10px;
  border: none;
  opacity: 0.6;
}
.login > button {
  width: 200px;
  text-align: center;
  outline: none;
  background: #ff3023;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  margin-bottom: 20px;
}
.login > span:hover {
  background-color: red;
}
.login > div > input {
  margin-right: 5px;
  vertical-align: middle;
}
.login > div > span {
  color: #fff;
  font-size: 12px;
}
.title {
  font-size: 14px;
  color: #ff3023;
  margin-bottom: 15px;
}
a {
  text-decoration: none;
}
.disabled {
  background-color: gray !important;
}
</style>
<script>
import { getLogin } from "../api/search";

export default {
  data() {
    return {
      ischb: false,
      selected: true,
      phone: "",
      password: "",
    };
  },
  methods: {
    // 验证手机号
    handlePhone() {
      if (this.phone.trim() != "") {
        // 手机号的正则表达式，
        let phoneReg = /^1[3-9]\d{9}$/;
        // 验证手机号码是否符合格式
        if (phoneReg.test(this.phone)) {
          console.log("用户名正确");
          return true;
        } else {
          console.log("错误");
          this.$toast({
            message: "手机号码格式不正确",
            position: "top",
          });
          return false;
        }
      }
    },

    // 验证密码
    handlePwd() {
      // 密码正则表达式，数字字母或下划线的组合，6-20位
      if (this.password.trim() != "") {
        let passwordReg = /^[0-9a-zA-Z_\.]{6,20}$/;
        if (passwordReg.test(this.password)) {
          console.log("密码正确");
          return true;
        } else {
          console.log("密码错误");
          this.$toast({
            message: "密码格式不正确",
          });
        }
      }
    },
    // 登录 当密码和手机号都验证成功后

    login() {
      if (this.handlePhone && this.handlePwd) {
        getLogin(this.phone, this.password)
          .then((res) => {
            console.log(res);
            // 登录成功后，跳转到主页
            if ((res.data.status = 200)) {
              this.$router.push("/");
            }
          })
          // 当返回结果axios请求失败，获取后端接口返回的状态码及错误信息
          .catch((error) => {
            if (error.response) {
              this.$toast({ message: "手机号或密码错误" });
              console.log(error.response);
            }
            // else if (error.request) {
            //   console.log(error.request);
            // } else {
            //   console.log("Error", error.message);
            // }
            // console.log(error.config);
          });
      }
    },
  },
  // 登录状态

  watch: {
    ischb() {
      this.selected = !this.ischb;
    },
  },
};
</script>
