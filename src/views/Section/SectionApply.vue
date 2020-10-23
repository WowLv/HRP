<template>
  <div class="container">
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
        label="原部门"
        class="form-item"
        prop="oldSectionId"
        required
      >
        <el-select
          class="option-item"
          v-model="applyForm.oldSectionId"
          placeholder="未分配部门"
          disabled
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
        label="目标部门"
        class="form-item"
        prop="sectionId"
        required
      >
        <el-select
          class="option-item"
          v-model="applyForm.sectionId"
          placeholder="请选择部门"
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
import { applySection } from "@/api/section";
export default {
  created() {
    this.doPositionList();
  },
  data() {
    return {
      applyForm: {
        fid: "",
        applicant: "",
        oldSectionId: "",
        sectionId: "",
        applyTime: "",
        reason: "",
        modeId: 0
      },
      sectionOptions: [],
      rule: {
        fid: [{ required: true, validator: validateUid, trigger: "blur" }],
        applicant: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sectionId: [
          { required: true, message: "请选择部门", trigger: "change" }
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
    async doApplySection(data) {
      let res = await applySection(data);
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
    async doPositionList() {
      let res = await positionList();
      if (res.success) {
        this.sectionOptions = res.data.sectionRow;
      }
    },
    checkFid(e) {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        this.doGetPersonFile(e);
      }, 2000);
    },
    async doGetPersonFile(fid) {
      let res = await getPersonFile(fid);
      if (res.success) {
        let { name, sectionId } = res.data;
        this.applyForm.applicant = name;
        this.applyForm.oldSectionId = sectionId;
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
          let { fid, oldSectionId, sectionId } = this.applyForm;
          this.doApplySection(
            Object.assign(this.applyForm, {
              fid: parseInt(fid),
              oldSectionId: oldSectionId ? parseInt(oldSectionId) : null,
              sectionId: parseInt(sectionId)
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
  height: 100%;
  width: 1540px;
  display: flex;
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
