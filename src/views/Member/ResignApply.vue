<template>
  <div class="conatiner">
    <el-form
      ref="form"
      :model="applyForm"
      label-width="100px"
      class="form"
      :rules="rule"
    >
      <el-form-item label="职工号" class="form-item" prop="operator">
        <el-input v-model="applyForm.operator" @input="checkFid"></el-input>
      </el-form-item>
      <el-form-item label="申请人" class="form-item" prop="applicant">
        <el-input v-model="applyForm.applicant"></el-input>
      </el-form-item>
      <el-form-item label="职位" class="form-item" prop="positionName">
        <el-input v-model="applyForm.positionName" disabled></el-input>
      </el-form-item>
      <el-form-item label="申请时间" class="form-item" prop="applyTime">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="applyForm.applyTime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="申请原因" class="form-item">
        <el-input type="textarea" v-model="applyForm.reason"></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" class="form-btn" @click="handleSubmit"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
let timer = null;
import { validateUid } from "@/lib/validate";
import { getPersonFile, resignApply } from "@/api/memberFile";
export default {
  data() {
    return {
      applyForm: {
        operator: "",
        positionName: "",
        applicant: "",
        applyTime: "",
        reason: ""
      },
      rule: {
        operator: [{ required: true, validator: validateUid, trigger: "blur" }],
        applicant: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        positionName: [
          { required: true, message: "请填写职位", trigger: "blur" }
        ],
        applyTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    checkFid(e) {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        this.doGetPersonFile(e);
      }, 2000);
    },
    async resignApply() {
      let res = await resignApply(
        Object.assign(this.applyForm, {
          applyType: 2,
          processMode: 0
        })
      );
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
    async doGetPersonFile(fid) {
      let res = await getPersonFile(fid);
      if (res.success) {
        console.log(res.data);
        let { name, positionName } = res.data;
        this.applyForm.applicant = name;
        this.applyForm.positionName = positionName;
      } else {
        this.applyForm = {
          operator: parseInt(this.applyForm.operator),
          reason: this.applyForm.reason,
          applyTime: this.applyForm.applyTime
        };
      }
    },
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.resignApply();
          this.$refs["form"].resetFields();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .form {
    width: 600px;
    margin-top: 50px;
    .form-item {
      margin-bottom: 20px;
      margin-left: 70px;
      .option-item {
        width: 450px;
        @media screen and (max-width: 1600px) {
          width: 320px;
        }
      }
      .form-btn {
        width: 150px;
        height: 40px;
        margin-left: 150px;
      }
    }
  }
}
</style>
