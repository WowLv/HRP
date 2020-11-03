<template>
  <div class="container">
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
      <el-form-item label="职工号" class="form-item" prop="fid">
        <el-input v-model="applyForm.fid" @input="checkFid"></el-input>
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
        <el-input
          type="textarea"
          v-model="applyForm.reason"
          maxlength="200"
          show-word-limit
        ></el-input>
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
import { handleMsg } from "@/lib/util";
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
        fid: "",
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
        fid: [{ required: true, validator: validateUid, trigger: "blur" }],
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
      }
    },
    async resignApply() {
      let res = await resignApply(
        Object.assign(this.applyForm, {
          applyTypeId: 2,
          modeId: 0
        })
      );
      handleMsg(res);
    },
    async doGetPersonFile(fid) {
      let res = await getPersonFile(fid);
      if (res.success) {
        let { name, positionId } = res.data;
        this.applyForm.applicant = name;
        this.applyForm.positionId = positionId;
      } else {
        this.applyForm = {
          fid: parseInt(this.applyForm.fid),
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
  height: 100%;
  width: 1540px;
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
        @media screen and (max-width: $screenChangeSize) {
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
