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
    redirect: "/center",
    children: [
      {
        path: "center",
        name: "Center",
        meta: { reqPower: [1, 2, 3, 4, 5, 6, 7] },
        component: () => import("../views/Center.vue")
      },
      {
        path: "info_base",
        name: "InfoBase",
        meta: { reqPower: [1] },
        component: () => import("../views/Base/InfoBase.vue")
      },
      {
        path: "position_base",
        name: "PositionBase",
        meta: { reqPower: [1] },
        component: () => import("../views/Base/PositionBase.vue")
      },
      {
        path: "station_base",
        name: "StationBase",
        meta: { reqPower: [1] },
        component: () => import("../views/Base/StationBase.vue")
      },
      {
        path: "section_base",
        name: "SectionBase",
        meta: { reqPower: [1] },
        component: () => import("../views/Base/SectionBase.vue")
      },
      {
        path: "workLoad_base",
        name: "WorkLoadBase",
        meta: { reqPower: [1] },
        component: () => import("../views/Base/workLoadBase.vue")
      },
      {
        path: "info_modify",
        name: "InfoModify",
        meta: { reqPower: [1, 2, 3, 4, 5, 6, 7] },
        component: () => import("../views/Person/InfoModify.vue")
      },
      {
        path: "pw_modify",
        name: "PwModify",
        meta: { reqPower: [1, 2, 3, 4, 5, 6, 7] },
        component: () => import("../views/Person/PwModify.vue")
      },
      {
        path: "user_register",
        name: "UserRegister",
        meta: { reqPower: [1, 2, 3, 4, 5, 6, 7] },
        component: () => import("../views/Person/UserRegister.vue")
      },
      {
        path: "person_file",
        name: "PersonFile",
        meta: { reqPower: [1, 2, 3, 4, 5, 6, 7] },
        component: () => import("../views/Member/PersonFile.vue")
      },
      {
        path: "member_file",
        name: "MemberFile",
        meta: { reqPower: [1, 2, 3, 4] },
        component: () => import("../views/Member/MemberFile.vue")
      },
      {
        path: "member_register",
        name: "MemberRegister",
        meta: { reqPower: [1, 2, 3, 4] },
        component: () => import("../views/Member/MemberRegister.vue")
      },
      {
        path: "entry_apply",
        name: "entryapply",
        meta: { reqPower: [1, 2, 3, 4] },
        component: () => import("../views/Member/EntryApply.vue")
      },
      {
        path: "s_transfer_apply",
        name: "StationTransferApply",
        meta: { reqPower: [1, 7] },
        component: () => import("../views/Station/StationTransferApply.vue")
      },
      {
        path: "p_transfer_apply",
        name: "PositionTransferApply",
        meta: { reqPower: [1, 2, 3, 4, 5, 6, 7] },
        component: () => import("../views/Station/PositionTransferApply.vue")
      },
      {
        path: "resign_apply",
        name: "ResignApply",
        meta: { reqPower: [1, 2, 3, 4, 5, 6, 7] },
        component: () => import("../views/Member/ResignApply.vue")
      },
      {
        path: "e_r_manage",
        name: "ERManage",
        meta: { reqPower: [1, 2, 3, 4] },
        component: () => import("../views/Member/ERManage.vue")
      },
      {
        path: "transfer_manage",
        name: "TransferManage",
        meta: { reqPower: [1, 2, 3, 4] },
        component: () => import("../views/Station/TransferManage.vue")
      },
      {
        path: "section_file",
        name: "SectionFile",
        meta: { reqPower: [1, 2, 3, 4, 5, 6] },
        component: () => import("../views/Section/SectionFile.vue")
      },
      {
        path: "section_apply",
        name: "SectionApply",
        meta: { reqPower: [1, 2, 3, 4, 5, 6] },
        component: () => import("../views/Section/SectionApply.vue")
      },
      {
        path: "section_manage",
        name: "SectionManage",
        meta: { reqPower: [1, 2, 3] },
        component: () => import("../views/Section/SectionManage.vue")
      },
      {
        path: "teach_load",
        name: "TeachingLoad",
        meta: { reqPower: [1, 2, 3, 5] },
        component: () => import("../views/WorkLoad/TeachingLoad.vue")
      },
      {
        path: "public_load",
        name: "PublicLoad",
        meta: { reqPower: [1, 7] },
        component: () => import("../views/WorkLoad/PublicLoad.vue")
      },
      {
        path: "scientific_load",
        name: "ScientificLoad",
        meta: { reqPower: [1, 7] },
        component: () => import("../views/WorkLoad/ScientificLoad.vue")
      },
      {
        path: "load_manage",
        name: "WorkLoadManage",
        meta: { reqPower: [1, 2, 3, 6] },
        component: () => import("../views/WorkLoad/WorkLoadManage.vue")
      },
      {
        path: "teach_add",
        name: "TeachAdd",
        meta: { reqPower: [1, 7] },
        component: () => import("../views/Teach/TeachAdd.vue")
      },
      {
        path: "teach_minus",
        name: "TeachMinus",
        meta: { reqPower: [1, 7] },
        component: () => import("../views/Teach/TeachMinus.vue")
      },
      {
        path: "evaluate",
        name: "Evaluate",
        meta: { reqPower: [1, 2, 3, 4] },
        component: () => import("../views/Evaluation/Evaluate.vue")
      },
      {
        path: "person_evaluation",
        name: "PersonEvaluation",
        meta: { reqPower: [1, 7] },
        component: () => import("../views/Evaluation/PersonEvaluation.vue")
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
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (from.name !== "Login" && to.name !== "Login") {
    // console.log("check");
    check()
      .then(res => {
        if (!res.success) {
          next({
            name: "Login"
          });
        } else {
          if (!store.getters.user && res.success) {
            store.dispatch("setUser", res.data);
            if (to.meta.reqPower.includes(store.getters.power)) {
              next();
            } else {
              next({ name: "Center"});
            }
          }
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
