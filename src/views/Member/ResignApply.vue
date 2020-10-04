<template>
  <div class="conatiner">
    <div class="step" v-if="isResign">
      <el-steps :active="resignStep" finish-status="success" class="step-item">
        <el-step title="申请"></el-step>
        <el-step title="审核"></el-step>
      </el-steps>
    </div>
    <el-form
      v-else
      ref="form"
      :model="applyForm"
      label-width="80px"
      class="form"
      :rules="rule"
    >
      <el-form-item label="职工号" class="form-item" prop="operator">
        <el-input v-model="applyForm.operator" @input="checkFid"></el-input>
      </el-form-item>
      <el-form-item label="申请人" class="form-item" prop="applicant">
        <el-input v-model="applyForm.applicant"></el-input>
      </el-form-item>
      <el-form-item label="职位" class="form-item" prop="positionId">
        <el-select v-model="applyForm.positionId" class="option-item" disabled>
          <el-option
            v-for="item in posTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请时间" class="form-item" prop="applyTime">
        <el-date-picker
          type="datetime"
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
import { mapGetters } from "vuex";
import { validateUid } from "@/lib/validate";
import { getPersonFile, resignApply } from "@/api/memberFile";
import { checkResign } from "@/api/notification";
export default {
  mounted() {
    this.doCheckResign(this.uid);
  },
  data() {
    return {
      isResign: false,
      resignStep: 0,
      applyForm: {
        operator: "",
        positionId: "",
        applicant: "",
        applyTime: "",
        reason: ""
      },
      posTypeOptions: [
        { value: 1, label: "院长" },
        { value: 2, label: "部门主管" },
        { value: 3, label: "教务员" },
        { value: 4, label: "教师" }
      ],
      rule: {
        operator: [{ required: true, validator: validateUid, trigger: "blur" }],
        applicant: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        positionId: [
          { required: true, message: "请填写职位", trigger: "change" }
        ],
        applyTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["uid"])
  },
  methods: {
    checkFid(e) {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        this.doGetPersonFile(e);
      }, 2000);
    },
    async doCheckResign(fid) {
      let res = await checkResign(fid);

      if (res.success && res.data.modeId === 0) {
        this.isResign = true;
        this.resignStep = 1;
      } else if (res.success && res.data.modeId === 1) {
        this.isResign = true;
        this.resignStep = 2;
      } else if (res.success && res.data.modeId === 2) {
        this.$notify({
          title: "新通知",
          message: this.$createElement(
            "div",
            { style: "color: #CD5C5C" },
            "您的离职申请被驳回！"
          )
        });
      }
    },
    async resignApply() {
      let res = await resignApply(
        Object.assign(this.applyForm, {
          applyTypeId: 2,
          modeId: 0
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
        let { name, positionId } = res.data;
        this.applyForm.applicant = name;
        this.applyForm.positionId = positionId;
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
  .step {
    margin-top: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    .step-item {
      width: 700px;
    }
  }
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
