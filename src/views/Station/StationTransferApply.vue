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
      <el-form-item label="原岗位" class="form-item" required>
        <el-col :span="10">
          <el-form-item prop="oldStationId">
            <el-select
              v-model="applyForm.oldStationId"
              placeholder="请选择岗位"
              disabled
            >
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
          <el-form-item prop="oldLevel">
            <el-select
              v-model="applyForm.oldLevel"
              placeholder="职位等级"
              disabled
            >
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

      <el-form-item label="目标岗位" class="form-item" required>
        <el-col :span="10">
          <el-form-item prop="stationId">
            <el-select v-model="applyForm.stationId" placeholder="请选择岗位">
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
            <el-select v-model="applyForm.levelId" placeholder="职位等级">
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
import { getPersonFile, getLevel } from "@/api/memberFile";
export default {
  created() {
    this.doGetLevel();
  },
  data() {
    return {
      applyForm: {
        fid: "",
        oldStationId: "",
        oldLevel: "",
        stationId: "",
        levelId: "",
        applicant: "",
        applyTime: "",
        reason: ""
      },
      stationOptions: [],
      levelOptions: [],
      rule: {
        fid: [{ required: true, validator: validateUid, trigger: "blur" }],
        applicant: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        stationId: [
          { required: true, message: "请选择岗位", trigger: "change" }
        ],
        levelId: [
          { required: true, message: "请选择岗位等级", trigger: "change" }
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
    async doGetLevel() {
      let res = await getLevel();
      if (res.success) {
        this.stationOptions = res.data.stationRow;
        this.levelOptions = res.data.levelRow;
      }
    },
    checkFid(e) {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        this.doGetPersonFile(e);
      }, 2000);
    },
    // async transferApply() {},
    async doGetPersonFile(fid) {
      let res = await getPersonFile(fid);
      if (res.success) {
        let { name, positionName, stationId, levelId } = res.data;
        this.applyForm.applicant = name;
        this.applyForm.positionName = positionName;
        this.applyForm.oldStationId = stationId;
        this.applyForm.oldLevel = levelId;
      }
    },
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return false;
        } else if (this.uid !== this.applyForm.fid) {
          // this.transferApply();
          this.$message({
            message: "请使用本人职工号",
            type: "warning"
          });
        } else {
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
