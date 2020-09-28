import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/styles/iconfont.css";
import "./assets/styles/index.scss";
import {
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tabs,
  TabPane,
  Input,
  Form,
  FormItem,
  Button,
  Message,
  MessageBox,
  Radio,
  Loading,
  Tag,
  Table,
  TableColumn,
  Select,
  Option,
  Drawer,
  DatePicker,
  Pagination,
  Upload
} from "element-ui";
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Radio);
Vue.use(Tag);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
Vue.use(Drawer);
Vue.use(DatePicker);
Vue.use(Pagination);
Vue.use(Upload);
Vue.use(Loading.directive);
Vue.component(Message); //基于组件使用，不用use避免报错

Vue.config.productionTip = false;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
