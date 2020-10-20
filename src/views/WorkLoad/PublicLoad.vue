<template>
  <div class="container">
    <el-form
      label-width="150px"
      :model="loadInfo"
      class="form"
      ref="form"
      :rules="rule"
    >
      <el-form-item label="职工号" class="form-item" prop="fid">
        <el-input v-model="loadInfo.fid"></el-input>
      </el-form-item>
      <el-form-item label="姓名" class="form-item" prop="name">
        <el-input v-model="loadInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="工作量项" class="form-item" prop="workLoadId">
        <el-select
          v-model="loadInfo.workLoadId"
          placeholder="请选择工作量项"
          class="option-item"
          @change="handleLoadChange"
        >
          <el-option
            v-for="item in workLoadOptions"
            :key="item.workLoadId"
            :label="item.workLoad"
            :value="item.workLoadId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计量" class="form-item">
        <el-col :span="11">
          <el-form-item prop="calc">
            <el-input
              type="number"
              placeholder="请输入数量"
              v-model="loadInfo.calc"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2"
          ><i class="icon-item el-icon-collection-tag"></i
        ></el-col>
        <el-col :span="11">
          <el-form-item>
            <el-input
              disabled
              placeholder="单位"
              v-model="loadInfo.measure"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-upload
        class="upload-item"
        action="/api/publicLoad"
        ref="upload"
        drag
        multiple
        :file-list="fileList"
        :data="loadInfo"
        :on-success="handleRes"
        :on-change="handleChange"
        :before-upload="handleBefore"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          请上传公共工作量相关佐证
        </div>
      </el-upload>
      <el-form-item class="form-item">
        <el-button type="primary" class="form-btn" @click="submit"
          >确认</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateUid, validateName } from "@/lib/validate";
import { getPublicLoadSum, getMeasure } from "@/api/workLoad";
import { mapGetters } from "vuex";
export default {
  created() {
    this.doGetPublicLoadSum();
  },
  data() {
    return {
      readyCount: 0,
      successCount: 0,
      loadInfo: {
        workLoadType: "public",
        workLoadTypeId: 2,
        modeId: 0,
        extra: 0,
        calc: 0,
        measure: ""
      },
      workLoadOptions: [],
      fileList: [],
      rule: {
        fid: [{ required: true, validator: validateUid, trigger: "blur" }],
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        workLoadId: [
          { required: true, message: "请选择工作量项", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["uid"])
  },
  methods: {
    async doGetMeasure(workLoadTypeId, workLoadId) {
      let res = await getMeasure(workLoadTypeId, workLoadId);
      let { measure } = res.data;
      if (res.success) {
        this.loadInfo.measure = measure || "";
      }
    },
    async doGetPublicLoadSum() {
      let res = await getPublicLoadSum();
      if (res.success) {
        this.workLoadOptions = res.data;
      }
    },
    handleLoadChange() {
      this.doGetMeasure(this.loadInfo.workLoadTypeId, this.loadInfo.workLoadId);
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    handleBefore() {
      this.readyCount = this.fileList.filter(item => {
        return item.status === "ready";
      }).length;
    },
    handleRes(res) {
      if (res.success) {
        this.successCount++;
      } else {
        this.$message({
          message: res.msg,
          type: "danger"
        });
      }
      //当全部传成功才出现成功提示
      if (this.successCount === this.readyCount) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.successCount = 0;
      }
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          if (!this.fileList.length) {
            this.$message({
              message: "请添加工作量佐证",
              type: "warning"
            });
          } else if (this.uid !== parseInt(this.loadInfo.fid)) {
            this.$message({
              message: "请输入本人职工号",
              type: "warning"
            });
          } else {
            this.$refs.upload.submit();
            this.$refs["form"].resetFields();
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
  display: flex;
  .form {
    width: 600px;
    margin-top: 50px;
    .form-item {
      margin-bottom: 20px;
      .icon-item {
        display: flex;
        justify-content: center;
        height: 40px;
        line-height: 40px;
        font-size: 22px;
        color: #666666;
      }
      .option-item {
        width: 450px;
        @media screen and (max-width: 1600px) {
          width: 300px;
        }
      }
      .form-btn {
        width: 100px;
        margin-left: 150px;
        margin-top: 30px;
      }
    }
    .upload-item {
      margin-left: 195px;
    }
  }
  .table {
    padding: 20px;
  }
}
</style>
