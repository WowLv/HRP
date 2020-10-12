<template>
  <div class="container">
    <el-form
      label-width="150px"
      :model="personInfo"
      class="form"
      ref="forms"
      :rules="rule"
    >
      <el-form-item label="职位类别" class="form-item" prop="positionId">
        <el-select
          v-model="positionId"
          placeholder="请选择职位类别"
          class="option-item"
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
      <el-form-item label="姓名" class="form-item" prop="name">
        <el-input v-model="personInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" class="form-item" prop="sex">
        <el-radio v-model="personInfo.sex" label="男" class="sex-item"
          >男</el-radio
        >
        <el-radio v-model="personInfo.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄" class="form-item" prop="age">
        <el-input v-model="personInfo.age"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" class="form-item" prop="phone">
        <el-input v-model="personInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" class="form-item" prop="email">
        <el-input v-model="personInfo.email"></el-input>
      </el-form-item>
      <el-form-item
        label="部门"
        class="form-item"
        prop="sectionId"
        v-if="positionId === 3"
      >
        <el-select
          v-model="personInfo.sectionId"
          placeholder="请选择部门"
          class="option-item"
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
        label="岗位"
        class="form-item"
        v-if="positionId === 4"
        prop="station"
      >
        <el-col :span="10">
          <el-form-item prop="stationId">
            <el-select v-model="personInfo.stationId" placeholder="请选择岗位">
              <el-option
                v-for="item in stationOptions"
                :key="item.stationId"
                :label="item.stationName"
                :value="item.stationId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" class="space-item">
          <span class="iconfont icon-office-supplies"></span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="levelId">
            <el-select v-model="personInfo.levelId" placeholder="职位等级">
              <el-option
                v-for="item in levelOptions"
                :key="item.levelId"
                :label="item.levelName"
                :value="item.levelId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" class="form-btn" @click="handleSubmit"
          >确认</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { memberRegister, positionList } from "@/api/memberFile";
import { TeachMember, SectionMember, DeanMember } from "@/lib/class";
import {
  validatePhone,
  validateEmail,
  validateAge,
  validateName
} from "@/lib/validate.js";
export default {
  created() {
    this.doGetLevel();
  },
  data() {
    return {
      positionId: 4,
      personInfo: {},
      rule: {
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        age: [{ required: true, validator: validateAge, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        sectionId: [
          { required: true, message: "请选择部门", trigger: "change" }
        ],
        stationId: [
          { required: true, message: "请选择岗位", trigger: "change" }
        ],
        levelId: [
          { required: true, message: "请选择职位等级", trigger: "change" }
        ]
      },
      posOptions: [],
      sectionOptions: [],
      stationOptions: [],
      levelOptions: []
    };
  },
  computed: {},
  methods: {
    async doGetLevel() {
      let res = await positionList();
      if (res.success) {
        this.levelOptions = res.data.levelRow;
        this.posOptions = res.data.positionRow;
        this.sectionOptions = res.data.sectionRow;
        this.stationOptions = res.data.stationRow;
      }
    },
    handleSubmit() {
      let memberData = {};
      let {
        name,
        sex,
        age,
        phone,
        email,
        sectionId,
        stationId,
        levelId
      } = this.personInfo;
      if (this.positionId === 1 || this.positionId === 2) {
        memberData = new DeanMember(
          name,
          sex,
          age,
          phone,
          email,
          this.positionId
        );
      } else if (this.positionId === 3) {
        memberData = new SectionMember(
          name,
          sex,
          age,
          phone,
          email,
          sectionId,
          this.positionId
        );
      } else {
        memberData = new TeachMember(
          name,
          sex,
          age,
          phone,
          email,
          stationId,
          levelId,
          this.positionId
        );
      }
      this.$refs["forms"].validate(async valid => {
        if (!valid) {
          return false;
        } else {
          let res = await memberRegister(memberData);
          if (res.success) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.$refs["forms"].resetFields();
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  .form {
    width: 600px;
    margin-top: 50px;
    .form-item {
      margin-bottom: 20px;
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
      .option-item {
        width: 450px;
        @media screen and (max-width: 1600px) {
          width: 300px;
        }
      }
      .form-btn {
        width: 150px;
        margin-left: 120px;
        margin-top: 30px;
      }
    }
  }
}
</style>
