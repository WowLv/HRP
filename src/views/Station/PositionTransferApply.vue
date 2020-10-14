<template>
  <div class="conatiner">
    <el-form
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
      <el-form-item
        label="原职位"
        class="form-item"
        prop="oldPositionId"
        required
      >
        <el-select
          class="option-item"
          v-model="applyForm.oldPositionId"
          placeholder="请选择职位"
          disabled
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
        label="目标职位"
        class="form-item"
        prop="positionId"
        required
      >
        <el-select
          class="option-item"
          v-model="applyForm.positionId"
          placeholder="请选择职位"
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
      <el-form-item label="申请时间" class="form-item" prop="applyTime">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="applyForm.applyTime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="申请原因" class="form-item" prop="reason">
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
import { getPersonFile, positionList } from "@/api/memberFile";
import { posTransferApply } from "@/api/station";
export default {
  created() {
    this.doPositionList();
  },
  data() {
    return {
      applyForm: {
        fid: "",
        applicant: "",
        oldPositionId: "",
        positionId: "",
        applyTime: "",
        reason: ""
      },
      posOptions: [],
      rule: {
        fid: [{ required: true, validator: validateUid, trigger: "blur" }],
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
    ...mapGetters(["uid"])
  },
  methods: {
    async doPositionList() {
      let res = await positionList();
      if (res.success) {
        this.posOptions = res.data.positionRow;
      }
    },
    checkFid(e) {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        this.doGetPersonFile(e);
      }, 2000);
    },
    async doPosTransferApply(data) {
      let res = await posTransferApply(data);
      if (res.success) {
        this.$message({
          message: res.msg,
          type: "success"
        });
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    async doGetPersonFile(fid) {
      let res = await getPersonFile(fid);
      if (res.success) {
        let { name, positionId } = res.data;
        this.applyForm.applicant = name;
        this.applyForm.oldPositionId = positionId;
      }
    },
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return false;
        } else if (this.uid !== parseInt(this.applyForm.fid)) {
          this.$message({
            message: "请使用本人职工号",
            type: "warning"
          });
        } else {
          this.doPosTransferApply(
            Object.assign(this.applyForm, {
              transferTypeId: 2,
              fid: parseInt(this.applyForm.fid),
              modeId: 0
            })
          );
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
      .space-item {
        display: flex;
        justify-content: center;
        .iconfont {
          font-size: 22px;
          color: #666666;
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
