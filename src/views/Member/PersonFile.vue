<template>
  <div class="container" v-loading="isLoading">
    <el-form label-width="150px" :model="personInfo" class="form">
      <el-form-item label="职工号" class="form-item">
        <el-input v-model="personInfo.fid" :disabled="disabled.fid"></el-input>
      </el-form-item>
      <el-form-item label="姓名" class="form-item" prop="name">
        <el-input
          v-model="personInfo.name"
          :disabled="disabled.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" class="form-item" prop="sex">
        <el-radio
          v-model="personInfo.sex"
          label="男"
          class="sex-item"
          :disabled="disabled.sex"
          >男</el-radio
        >
        <el-radio v-model="personInfo.sex" label="女" :disabled="disabled.sex"
          >女</el-radio
        >
      </el-form-item>
      <el-form-item label="年龄" class="form-item" prop="age">
        <el-input v-model="personInfo.age" :disabled="disabled.age"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" class="form-item" prop="phone">
        <el-input
          v-model="personInfo.phone"
          :disabled="disabled.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" class="form-item" prop="email">
        <el-input
          v-model="personInfo.email"
          :disabled="disabled.email"
        ></el-input>
      </el-form-item>
      <el-form-item label="职位" class="form-item" prop="position">
        <el-select
          v-model="personInfo.positionId"
          placeholder="请选择职位"
          class="option-item"
          :disabled="disabled.position"
        >
          <el-option
            v-for="item in posOptions"
            :key="item.positionId"
            :label="item.positionName"
            :value="item.positionId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="岗位"
        class="form-item"
        prop="stationId"
        v-if="nowType === 'teacher'"
      >
        <el-col :span="10">
          <el-select
            v-model="personInfo.stationId"
            placeholder="未分配岗位"
            class="power-item"
            :disabled="disabled.station"
          >
            <el-option
              v-for="item in stationOptions"
              :key="item.stationId"
              :label="item.stationName"
              :value="item.stationId"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="space-item">
          <span class="iconfont icon-office-supplies"></span>
        </el-col>
        <el-col :span="10">
          <el-select
            v-model="personInfo.levelId"
            placeholder="未分配岗位等级"
            class="power-item"
            :disabled="disabled.station"
          >
            <el-option
              v-for="item in levelOptions"
              :key="item.levelId"
              :label="item.levelName"
              :value="item.levelId"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item
        label="部门"
        class="form-item"
        prop="section"
        v-if="nowType === 'section'"
      >
        <el-select
          v-model="personInfo.sectionId"
          placeholder="未分配部门"
          class="option-item"
          :disabled="disabled.section"
        >
          <el-option
            v-for="item in sectionOptions"
            :key="item.sectionId"
            :label="item.sectionName"
            :value="item.sectionId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="基础教学课时"
        class="form-item"
        prop="teachLoad"
        v-if="nowType === 'teacher'"
      >
        <el-input
          placeholder="未录入"
          v-model="personInfo.teachLoad"
          :disabled="disabled.teachLoad"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="教科研/公共工作量"
        class="form-item"
        prop="publicWork"
        v-if="nowType === 'teacher'"
      >
        <el-button class="option-item" @click="openDrawer">点击查看</el-button>
      </el-form-item>
      <el-form-item class="form-item" v-if="admin">
        <el-button
          type="danger"
          class="form-btn"
          :disabled="editable"
          @click="editInfo"
          >修改</el-button
        >
        <el-button
          type="primary"
          class="form-btn"
          :disabled="!editable"
          @click="saveInfo"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <el-drawer
      title="工作量"
      :visible.sync="drawer"
      :with-header="false"
      size="40%"
      class="drawer"
    >
      <p class="drawer-title">工作量列表</p>
      <el-table :data="personInfo.workLoadList" class="table" height="900">
        <el-table-column
          prop="uploadTime"
          align="center"
          label="日期"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="workLoadType"
          align="center"
          label="工作量类型"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="workLoad" align="center" label="工作量项">
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import { getPersonFile, setPersonFile, positionList } from "@/api/memberFile";
import { mapGetters } from "vuex";
var info_able = {
  fid: false,
  name: false,
  sex: false,
  age: false,
  phone: false,
  email: false,
  station: true,
  section: true,
  teachLoad: true,
  position: true
};
var info_disable = {
  fid: true,
  name: true,
  sex: true,
  age: true,
  phone: true,
  email: true,
  station: true,
  section: true,
  teachLoad: true,
  position: true
};
export default {
  created() {
    this.disabled = info_disable;
    this.doGetLevel();
    if (this.$route.params.mode && this.$route.params.mode === "admin") {
      this.admin = true;
      this.doGetPersonFile(this.$route.params.fid);
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    } else {
      this.doGetPersonFile(this.uid);
    }
  },
  data() {
    return {
      mode: "", //teacher、section
      isLoading: true,
      admin: false,
      editable: false,
      drawer: false,
      disabled: {},
      personInfo: {},
      posOptions: [],
      sectionOptions: [],
      stationOptions: [],
      levelOptions: []
    };
  },
  computed: {
    ...mapGetters(["power", "uid"]),
    nowType() {
      if (this.personInfo.positionId === 4) {
        delete this.personInfo.sectionId;
        return "teacher";
      } else if (this.personInfo.positionId === 3) {
        delete this.personInfo.stationId;
        delete this.personInfo.levelId;
        return "section";
      } else {
        delete this.personInfo.sectionId;
        delete this.personInfo.stationId;
        delete this.personInfo.levelId;
        return "";
      }
    }
  },
  methods: {
    async doSetPersonFile(data) {
      let res = await setPersonFile(data);
      if (res.success) {
        this.$message({
          message: res.msg,
          type: "success"
        });
      } else {
        this.$message({
          message: res.msg,
          type: "error"
        });
      }
    },
    async doGetLevel() {
      let res = await positionList();
      if (res.success) {
        this.levelOptions = res.data.levelRow;
        this.posOptions = res.data.positionRow;
        this.stationOptions = res.data.stationRow;
        this.sectionOptions = res.data.sectionRow;
      }
    },
    async doGetPersonFile(uid) {
      let res = await getPersonFile(uid);
      console.log(res.data);
      if (res.success) {
        this.personInfo = res.data;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    },
    editInfo() {
      this.disabled = info_able;
      this.editable = true;
    },
    saveInfo() {
      this.disabled = info_disable;
      this.editable = false;
      this.doSetPersonFile(this.personInfo);
    },
    openDrawer() {
      this.drawer = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 1540px;
  display: flex;
  .form {
    width: 600px;
    margin-top: 50px;
    .form-item {
      margin-bottom: 20px;
      .option-item {
        width: 450px;
        @media screen and (max-width: $screenChangeSize) {
          width: 300px;
        }
      }
      .space-item {
        display: flex;
        justify-content: center;
        .iconfont {
          font-size: 22px;
          color: #666666;
        }
      }
      .sex-item {
        margin: 0 30px;
      }
      .form-btn {
        width: 100px;
        margin-left: 70px;
        margin-top: 30px;
      }
    }
  }
  .table {
    padding: 20px;
  }
  .drawer-title {
    height: 60px;
    line-height: 60px;
    width: 100%;
    text-align: center;
    font-size: 24px;
    color: #666;
  }
}
</style>
