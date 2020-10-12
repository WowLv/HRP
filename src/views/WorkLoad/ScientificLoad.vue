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
        >
          <el-option-group
            v-for="group in workLoadOptions"
            :key="group.scientTypeId"
            :label="group.scientLoadType"
          >
            <el-option
              v-for="item in group.options"
              :key="item.workLoadId"
              :label="item.workLoad"
              :value="item.workLoadId"
            >
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item
        label="附加项"
        class="form-item"
        v-if="extraList.includes(loadInfo.workLoadId)"
      >
        <el-col :span="11">
          <el-form-item prop="extra">
            <el-input
              type="number"
              placeholder="请输入数量"
              v-model="loadInfo.extra"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2"
          ><i class="icon-item el-icon-document-add"></i
        ></el-col>
        <el-col :span="11">
          <el-form-item>
            <el-select
              placeholder="请选择附加项类型"
              v-model="loadInfo.extraMeasureId"
            >
              <el-option
                v-for="item in extraMeasureOptions"
                :key="item.extraMeasureId"
                :label="item.extraMeasureName"
                :value="item.extraMeasureId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-upload
        class="upload-item"
        action="/api/scientLoad"
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
          请上传教科研工作量相关佐证
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
import { getScientLoadSum } from "@/api/workLoad";
import { validateUid, validateName, validateTeachLoad } from "@/lib/validate";
import { mapGetters } from "vuex";
export default {
  created() {
    this.doGetScientLoadSum();
  },
  data() {
    return {
      readyCount: 0,
      successCount: 0,
      loadInfo: {
        workLoadType: "scientific",
        workLoadTypeId: 1,
        modeId: 0,
        extra: 0
      },
      workLoadOptions: [],
      fileList: [],
      extraList: [],
      extraMeasureOptions: [],
      rule: {
        fid: [{ required: true, validator: validateUid, trigger: "blur" }],
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        workLoadId: [
          { required: true, message: "请选择工作量项", trigger: "change" }
        ],
        extra: [{ validator: validateTeachLoad, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["uid"])
  },
  methods: {
    async doGetScientLoadSum() {
      let res = await getScientLoadSum();
      let workLoadList = [];
      let flag = false;
      if (res.success) {
        this.extraList = res.data.extraList;
        this.extraMeasureOptions = res.data.extraMeasureList;
        res.data.scientList.map(resItem => {
          for (let i = 0; i < workLoadList.length; i++) {
            if (workLoadList[i].scientTypeId === resItem.scientTypeId) {
              flag = true;
              workLoadList[i].options.push(resItem);
              break;
            }
          }

          if (flag) {
            flag = false;
          } else {
            workLoadList.push({
              scientTypeId: resItem.scientTypeId,
              scientLoadType: resItem.scientLoadType,
              options: [resItem]
            });
          }
        });
        this.workLoadOptions = workLoadList;
      }
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    handleBefore() {
      //通过检查，当所有文件都上传成功后才提示成功
      this.readyCount = this.fileList.filter(item => {
        return item.status === "ready";
      }).length;
    },
    handleRes(res) {
      if (res.success) {
        this.successCount++;
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
            console.log(this.uid);
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
