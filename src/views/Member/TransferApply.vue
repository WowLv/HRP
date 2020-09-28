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
        <el-input v-model="applyForm.positionName"></el-input>
      </el-form-item>
      <el-form-item label="岗位" class="form-item" required>
        <el-col :span="10">
          <el-form-item prop="stationId">
            <el-select v-model="applyForm.stationId" placeholder="请选择岗位">
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
            <el-select v-model="applyForm.level" placeholder="职位等级">
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
import { getPersonFile } from "@/api/memberFile";
export default {
  data() {
    return {
      applyForm: {
        operator: "",
        positionName: "",
        stationId: "",
        level: "",
        applicant: "",
        applyTime: "",
        reason: ""
      },
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
      ],
      rule: {
        operator: [{ required: true, validator: validateUid, trigger: "blur" }],
        applicant: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        positionName: [
          { required: true, message: "请填写职位", trigger: "blur" }
        ],
        stationId: [
          { required: true, message: "请选择岗位", trigger: "change" }
        ],
        level: [
          { required: true, message: "请选择岗位等级", trigger: "change" }
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
    // async transferApply() {},
    async doGetPersonFile(fid) {
      let res = await getPersonFile(fid);
      if (res.success) {
        console.log(res.data);
        let { name, positionName, stationId, level } = res.data;
        this.applyForm.applicant = name;
        this.applyForm.positionName = positionName;
        this.applyForm.stationId = stationId;
        this.applyForm.level = level;
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
