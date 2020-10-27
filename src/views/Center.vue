<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <h3 class="title">常用应用<i class="icon-item el-icon-s-data"></i></h3>
        <el-card class="app-box box-card">
          <div class="app-item" v-for="item in appList" :key="item.index">
            <i
              class="icon-big iconfont"
              :class="item.iconClass"
              @click="toApp(item.path)"
            ></i>
            <p class="app-title">{{ item.title }}</p>
          </div>
        </el-card>
      </div>
      <div class="right">
        <h3 class="title">消息通知<i class="icon-item el-icon-s-data"></i></h3>
        <el-card class="msg-box box-card">敬请期待</el-card>
      </div>
    </div>

    <h3 class="title">人员占比<i class="icon-item el-icon-pie-chart"></i></h3>
    <el-card class="percent-box box-card">
      <div class="left">
        <div class="card-item" v-for="item in memberList" :key="item.name">
          <el-progress
            stroke-width="12"
            type="circle"
            :percentage="item.percent.toFixed(2)"
          ></el-progress>
          <el-tag color="#e5f2ff" class="tag-item">{{ item.name }}</el-tag>
        </div>
      </div>
      <div class="right">
        <div class="card-item" v-for="item in sectionList" :key="item.name">
          <el-progress
            stroke-width="12"
            type="circle"
            color="#009999"
            :percentage="item.percent.toFixed(2)"
          ></el-progress>
          <el-tag type="success" class="tag-item">{{ item.name }}</el-tag>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getPercent } from "@/api/login";
export default {
  data() {
    return {
      appList: [
        {
          index: 1,
          iconClass: "icon-account",
          title: "个人信息",
          path: { name: "InfoModify" }
        },
        {
          index: 2,
          iconClass: "icon-feeds",
          title: "个人档案",
          path: { name: "PersonFile" }
        },
        {
          index: 3,
          iconClass: "icon-upload",
          title: "公共工作量",
          path: { name: "PublicLoad" }
        },
        {
          index: 4,
          iconClass: "icon-shenqingjilu",
          title: "加课报备",
          path: { name: "TeachAdd" }
        },
        {
          index: 5,
          iconClass: "icon-upload",
          title: "教科研工作量",
          path: { name: "ScientificLoad" }
        },
        {
          index: 6,
          iconClass: "icon-shenqingjilu",
          title: "请假报备",
          path: { name: "TeachMinus" }
        }
      ],
      memberList: [
        { name: "教师", percent: 0 },
        { name: "教务员", percent: 0 },
        { name: "院长", percent: 0 }
      ],
      sectionList: [
        { name: "人事处", percent: 0 },
        { name: "教务处", percent: 0 },
        { name: "科研处", percent: 0 }
      ]
    };
  },
  created() {
    this.doGetPercent();
  },
  methods: {
    async doGetPercent() {
      const { data } = await getPercent();
      setTimeout(() => {
        this.memberList = data.memberList;
        this.sectionList = data.sectionList;
      }, 200);
    },
    toApp(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 1500px;
  height: 794px; // 与其他分页样式相同
  position: relative;
  margin: 0 20px;
  .top {
    display: flex;
    .left {
      flex: 2;
      margin-right: 10px;
    }
    .right {
      flex: 1;
      margin-left: 10px;
    }
  }
  .title {
    color: #999;
    margin-top: 30px;
    margin-left: 20px;
    .icon-item {
      margin-left: 5px;
    }
  }
  .box-card {
    margin-top: 20px;
    width: 100%;
    position: relative;
    .left,
    .right {
      display: inline-block;
      position: absolute;
    }
    .left {
      left: 30px;
    }
    .right {
      right: 50px;
    }
    .card-item {
      margin: 0 20px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      .tag-item {
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
  .percent-box {
    height: 240px;
  }
  .app-box {
    height: 400px;
    display: flex;
    // flex-wrap: wrap;
    .app-item {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      color: $theme-back-color;
      width: 120px;
      height: 90px;
      margin: 40px 30px 0 30px;
      .icon-big {
        cursor: pointer;
        position: absolute;
        font-size: 70px;
        &:hover {
          font-size: 75px;
        }
      }
      .app-title {
        position: absolute;
        top: 80px;
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
  .msg-box {
    height: 400px;
    color: #666;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
