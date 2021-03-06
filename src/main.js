import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import MintUI from "mint-ui";
// 导入样式文件
import "mint-ui/lib/style.min.css";
import MyFooter from "./components/MyFooter.vue";
import MyHeader from "./components/MyHeader.vue";
import BackHeader from "./components/BackHeader.vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
// 注册为Vue的插件

Vue.use(MintUI);
Vue.component("my-footer", MyFooter);
Vue.component("my-header", MyHeader);
Vue.component("back-header", BackHeader);
Vue.config.productionTip = false;
axios.defaults.baseURL = "/";
Vue.prototype.axios = axios;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
