<template>
  <div class="container">
    <el-form
      label-width="150px"
      :model="personInfo"
      class="form"
      ref="forms"
      :rules="rule"
    >
      <el-form-item label="职位类别" class="form-item" prop="posType">
        <el-select
          v-model="posType"
          placeholder="请选择职位类别"
          class="option-item"
        >
          <el-option
            v-for="item in posTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
        prop="sid"
        v-if="posType === 3"
      >
        <el-select
          v-model="personInfo.sid"
          placeholder="请选择部门"
          class="option-item"
        >
          <el-option
            v-for="item in sectionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="职位"
        class="form-item"
        v-if="posType === 4"
        prop="position"
      >
        <el-col :span="10">
          <el-form-item prop="pid">
            <el-select v-model="personInfo.pid" placeholder="请选择职位">
              <el-option
                v-for="item in posOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" class="space-item">
          <span class="iconfont icon-office-supplies"></span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="level">
            <el-select v-model="personInfo.level" placeholder="职位等级">
              <el-option
                v-for="item in levelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
import { memberRegister } from "@/api/memberFile";
import { TeachMember, SectionMember, DeanMember } from "@/lib/class";
import {
  validatePhone,
  validateEmail,
  validateAge,
  validateName
} from "@/lib/validate.js";
export default {
  data() {
    return {
      posType: 4,
      personInfo: {},
      rule: {
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        age: [{ required: true, validator: validateAge, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        sid: [{ required: true, message: "请选择部门", trigger: "change" }],
        pid: [{ required: true, message: "请选择职位", trigger: "change" }],
        level: [
          { required: true, message: "请选择职位等级", trigger: "change" }
        ]
      },
      posTypeOptions: [
        { value: 1, label: "院长" },
        { value: 2, label: "部门主管" },
        { value: 3, label: "教务员" },
        { value: 4, label: "教师" }
      ],
      sectionOptions: [
        { value: 1, label: "人事处" },
        { value: 2, label: "教务处" },
        { value: 3, label: "科研处" }
      ],
      posOptions: [
        {
          value: 1,
          label: "教师主体型"
        },
        {
          value: 2,
          label: "科研主体性"
        },
        {
          value: 3,
          label: "教学建设综合性"
        },
        {
          value: 4,
          label: "实践教学型"
        }
      ],
      levelOptions: [
        { value: 1, label: "一级" },
        { value: 2, label: "二级" },
        { value: 3, label: "三级" },
        { value: 4, label: "四级" },
        { value: 5, label: "五级" },
        { value: 6, label: "六级" },
        { value: 7, label: "七级" },
        { value: 8, label: "八级" },
        { value: 9, label: "九级" },
        { value: 10, label: "十级" },
        { value: 11, label: "十一级" },
        { value: 12, label: "十二级" }
      ]
    };
  },
  computed: {},
  methods: {
    handleSubmit() {
      let memberData = {};
      if (this.posType === 1 || this.posType === 2) {
        let { name, sex, age, phone, email } = this.personInfo;
        memberData = new DeanMember(name, sex, age, phone, email);
      } else if (this.posType === 3) {
        let { name, sex, age, phone, email, sid } = this.personInfo;
        memberData = new SectionMember(name, sex, age, phone, email, sid);
      } else {
        let { name, sex, age, phone, email, pid, level } = this.personInfo;
        memberData = new TeachMember(name, sex, age, phone, email, pid, level);
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
