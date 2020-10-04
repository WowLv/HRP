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
        path: "info_base",
        name: "InfoBase",
        component: () => import("../views/Base/InfoBase.vue")
      },
      {
        path: "map_base",
        name: "MapBase",
        component: () => import("../views/Base/MapBase.vue")
      },
      {
        path: "form_base",
        name: "FormBase",
        component: () => import("../views/Base/FormBase.vue")
      },
      {
        path: "time_base",
        name: "TimeBase",
        component: () => import("../views/Base/TimeBase.vue")
      },
      {
        path: "info_modify",
        name: "InfoModify",
        component: () => import("../views/Person/InfoModify.vue")
      },
      {
        path: "pw_modify",
        name: "PwModify",
        component: () => import("../views/Person/PwModify.vue")
      },
      {
        path: "user_register",
        name: "UserRegister",
        component: () => import("../views/Person/UserRegister.vue")
      },
      {
        path: "person_file",
        name: "PersonFile",
        component: () => import("../views/Member/PersonFile.vue")
      },
      {
        path: "member_file",
        name: "MemberFile",
        component: () => import("../views/Member/MemberFile.vue")
      },
      {
        path: "member_register",
        name: "MemberRegister",
        component: () => import("../views/Member/MemberRegister.vue")
      },
      {
        path: "entry_apply",
        name: "entryapply",
        component: () => import("../views/Member/EntryApply.vue")
      },
      {
        path: "s_transfer_apply",
        name: "StationTransferApply",
        component: () => import("../views/Station/StationTransferApply.vue")
      },
      {
        path: "p_transfer_apply",
        name: "PositionTransferApply",
        component: () => import("../views/Station/PositionTransferApply.vue")
      },
      {
        path: "resign_apply",
        name: "ResignApply",
        component: () => import("../views/Member/ResignApply.vue")
      },
      {
        path: "e_r_manage",
        name: "ERManage",
        component: () => import("../views/Member/ERManage.vue")
      },
      {
        path: "transfer_manage",
        name: "TransferManage",
        component: () => import("../views/Station/TransferManage.vue")
      },
      {
        path: "teach_load",
        name: "TeachingLoad",
        component: () => import("../views/WorkLoad/TeachingLoad.vue")
      },
      {
        path: "public_load",
        name: "PublicLoad",
        component: () => import("../views/WorkLoad/PublicLoad.vue")
      },
      {
        path: "scientific_load",
        name: "ScientificLoad",
        component: () => import("../views/WorkLoad/ScientificLoad.vue")
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
  if (from.name !== "Login" && to.name !== "Login") {
    console.log("check");
    check()
      .then(res => {
        if (!res.success) {
          next({
            name: "Login"
          });
        } else {
          if (!store.getters.user && res.success) {
            store.dispatch("setUser", res.data);
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
