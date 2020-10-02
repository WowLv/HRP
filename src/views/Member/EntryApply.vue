<template>
  <div class="conatiner">
    <el-form
      ref="form"
      :model="applyForm"
      label-width="80px"
      class="form"
      :rules="rule"
    >
      <el-form-item label="负责人" class="form-item">
        <el-input disabled v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="申请人" class="form-item" prop="applicant">
        <el-input v-model="applyForm.applicant"></el-input>
      </el-form-item>
      <el-form-item label="职位类别" class="form-item" prop="positionId">
        <el-select
          v-model="applyForm.positionId"
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
      <el-form-item label="申请时间" class="form-item" prop="applyTime">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="applyForm.applyTime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="申请描述" class="form-item" prop="reason">
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
import { mapGetters } from "vuex";
import { entryApply } from "@/api/memberFile";
export default {
  data() {
    return {
      applyForm: {
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
        applicant: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        positionId: [
          { required: true, message: "请选择职位", trigger: "change" }
        ],
        applyTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["username", "uid"])
  },
  methods: {
    async doEntryApply() {
      let res = await entryApply(
        Object.assign(this.applyForm, {
          operator: this.uid,
          applyTypeId: 1,
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
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.doEntryApply();
          this.$refs["form"].resetFields();
          this.applyForm.reason = "";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
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
