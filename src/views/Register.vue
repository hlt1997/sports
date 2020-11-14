<template>
  <div class="login">
    <img src="/images/logo.png" alt="" />
    <!-- 手机号码框 -->
    <input
      type="text"
      placeholder="手机号注册"
      v-model="phone"
      @blur="handlePhone"
    />
    <!-- 昵称输入框 -->
    <input
      type="text"
      placeholder="您的昵称"
      v-model="nickname"
      @blur="handleName"
    />
    <!-- 密码输入框 -->
    <input
      type="password"
      placeholder="密码"
      v-model="password"
      @blur="handlePwd"
    />
    <input
      type="password"
      placeholder="确认密码"
      v-model="conpassword"
      @blur="handlePwd2"
    />
    <!-- 验证码 -->
    <div class="code">
      <input type="text" v-model="captcha" placeholder="输入验证码" /><button
        @click="getCode"
      >
        获取验证码
      </button>
    </div>
    <!-- 注册按钮 -->
    <button
      :disabled="selected"
      :class="{ disabled: selected == true }"
      @click="register"
    >
      注 册
    </button>
    <router-link to="/login" class="title">已有账号，去登录 >></router-link>
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
  width: 215px;
  text-align: center;
  outline: none;
  background: #ff3023;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  margin-bottom: 20px;
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
.code {
  width: 215px;
  margin-bottom: 20px;
}
.code input {
  width: 90px;
  border-radius: 10px;
  padding: 5px 5px;
  border: none;
  opacity: 0.6;
}
.code button {
  width: 100px;
  outline: none;
  background-color: #ff3023;
  border: none;
  color: #fff;
  border-radius: 5px;
  padding: 5px 0;
}
</style>
<script>
export default {
  data() {
    return {
      // 用户协议选中状态
      ischb: false,
      // 注册按钮是否禁用
      selected: true,
      // 手机号变量
      phone: "",
      // 密码
      password: "",
      // 确认密码
      conpassword: "",
      // 验证码
      captcha: "",
      // 昵称
      nickname: "",
    };
  },
  methods: {
    // 获取验证码
    getCode() {
      this.axios
        .get("/captcha/sent?", {
          params: {
            phone: this.phone,
          },
        })
        .then((res) => {
          console.log(res);
        });
    },
    // 点击登录 发送请求

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
    // 验证昵称
    handleName() {
      // 昵称的正则表达式 汉字字母数字组合，不能包含特殊字符，3-8位
      if (this.nickname.trim() != "") {
        let nicknameReg = /^[\w\u4e00-\u9fa5]{3,8}$/;
        if (nicknameReg.test(this.nickname)) {
          console.log("昵称正确");
          return true;
        } else {
          console.log("昵称错误"),
            this.$toast({
              message: "昵称非法",
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
    // 验证两次输入密码
    handlePwd2() {
      if (this.conpassword != "") {
        if (this.password != this.conpassword) {
          this.$toast({
            message: "两次密码不一致",
          });
          return false;
        } else {
          console.log("两次一样");
          return true;
        }
      }
    },
    register() {
      // 点击注册时先验证码是否正确
      if (this.captcha.trim() != "") {
        this.axios
          .get("/captcha/verify?", {
            params: {
              phone: this.phone,
              captcha: this.captcha,
            },
          })
          .then((res) => {
            console.log(res.data);
            // 当验证码正确时 且 所有输入的内容都返回了true，就像服务器发送请求进行注册
            if (res.data.code == 200) {
              console.log(this.handlePhone());
              console.log(this.handleName());
              console.log(this.handlePwd());
              console.log(this.handlePwd2());
              if (
                this.handlePhone() &&
                this.handleName() &&
                this.handlePwd() &&
                this.handlePwd2()
              ) {
                console.log("格式正确");
                // 验证手机号是否已被占用
                this.axios
                  .get("/cellphone/existence/check?", {
                    params: {
                      phone: this.phone,
                    },
                  })
                  .then((res) => {
                    console.log(res.data);
                    if (res.data.exist == 1) {
                      console.log("手机号已被占用");
                      this.$toast({ message: "手机号已被占用" });
                    } else {
                      // 如果手机号未被占用就发送请求注册
                      // 发送注册请求
                      this.axios
                        .post("/register/cellphone?", {
                          phone: this.phone,
                          password: this.password,
                          captcha: this.captcha,
                          nickname: this.nickname,
                        })
                        .then((res) => {
                          console.log("注册成功");
                          this.$router.push("/login");
                        })
                        // 当返回结果axios请求失败，获取后端接口返回的状态码及错误信息
                        .catch((error) => {
                          if (error.response) {
                            console.log(error.response);
                          }
                        });
                    }
                  });
              }
            }
          })
          // 解决vue自身的错误
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  watch: {
    ischb() {
      this.selected = !this.ischb;
    },
  },
};
</script>
