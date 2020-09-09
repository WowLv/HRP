import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import store from "@/store";
import { check } from "@/api/login.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "userbase",
        name: "UserBase",
        component: () => import("../views/Base/UserBase/UserBase.vue")
      },
      {
        path: "rolebase",
        name: "RoleBase",
        component: () => import("../views/Base/RoleBase/RoleBase.vue")
      },
      {
        path: "mapbase",
        name: "MapBase",
        component: () => import("../views/Base/MapBase/MapBase.vue")
      },
      {
        path: "formbase",
        name: "FormBase",
        component: () => import("../views/Base/FormBase/FormBase.vue")
      },
      {
        path: "timebase",
        name: "TimeBase",
        component: () => import("../views/Base/TimeBase/TimeBase.vue")
      },
      {
        path: "infomodify",
        name: "InfoModify",
        component: () => import("../views/Person/InfoModify.vue")
      },
      {
        path: "pwmodify",
        name: "PwModify",
        component: () => import("../views/Person/PwModify.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log("check");
  if (from.name !== "Login") {
    check()
      .then(res => {
        if (to.name !== "Login" && !res.success) {
          next({
            name: "Login"
          });
        } else {
          if (!store.getters.user && res.success) {
            store.dispatch("setUser", res.data.user);
          }
          next();
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    next();
  }
});

//解决导航守卫报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

export default router;
