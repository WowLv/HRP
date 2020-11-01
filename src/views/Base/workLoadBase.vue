<template>
  <div class="container" v-loading="isLoading">
    <el-form
      label-width="150px"
      :model="loadInfo"
      class="form"
      ref="forms"
      :rules="rule"
    >
      <!-- 通用 -->
      <el-form-item label="工作量类型" class="form-item">
        <el-select
          v-model="loadInfo.workLoadTypeId"
          placeholder="请选择工作量类型"
          class="option-item"
          @change="handleTypeChange"
        >
          <el-option
            v-for="item in workLoadTypeOptions"
            :key="item.workLoadTypeId"
            :label="item.workLoadType"
            :value="item.workLoadTypeId"
            :disabled="item.workLoadTypeId === 3"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 新增教科研工作量时显示 -->
      <el-form-item
        label="教科研工作量类型"
        class="form-item"
        v-show="mode === 'add' && loadInfo.workLoadTypeId === 1"
        :prop="
          mode === 'add' && loadInfo.workLoadTypeId === 1 ? 'scientTypeId' : ''
        "
      >
        <el-select
          v-model="loadInfo.scientTypeId"
          placeholder="请选择类型"
          class="option-item"
        >
          <el-option
            v-for="item in scientTypeOptions"
            :key="item.scientTypeId"
            :label="item.scientLoadType"
            :value="item.scientTypeId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 修改公共工作量时显示 -->
      <el-form-item
        label="工作量项"
        class="form-item"
        prop="workLoadId"
        v-show="mode === 'modify' && loadInfo.workLoadTypeId === 2"
      >
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
      <!-- 修改教科研工作量时显示 -->
      <el-form-item
        label="工作量项"
        class="form-item"
        prop="workLoadId"
        v-show="mode === 'modify' && loadInfo.workLoadTypeId === 1"
      >
        <el-select
          v-model="loadInfo.workLoadId"
          placeholder="请选择工作量项"
          class="option-item"
          @change="handleLoadChange"
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
      <!-- 新增工作量时显示 -->
      <el-form-item
        label="工作量项"
        class="form-item"
        :prop="mode === 'add' ? 'workLoad' : ''"
        v-show="mode === 'add'"
      >
        <el-input
          v-model="loadInfo.workLoad"
          placeholder="请填写工作量项"
        ></el-input>
      </el-form-item>
      <!-- 通用 -->
      <el-form-item label="绩点" class="form-item">
        <el-col :span="11">
          <el-form-item prop="gpa">
            <el-input
              type="number"
              placeholder="请输入绩点"
              v-model="loadInfo.gpa"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2"
          ><i class="icon-item el-icon-document-add"></i
        ></el-col>
        <el-col :span="11">
          <!-- 新增时可编辑 -->
          <el-form-item prop="measure">
            <el-input
              :disabled="mode !== 'add'"
              placeholder="单位"
              v-model="loadInfo.measure"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- 教科研工作量通用 -->
      <el-form-item
        label="附加绩点"
        class="form-item"
        v-show="
          extraList.includes(loadInfo.workLoadId) ||
            (mode === 'add' && loadInfo.workLoadTypeId === 1)
        "
      >
        <el-col :span="11">
          <el-form-item
            :prop="
              extraList.includes(loadInfo.workLoadId) ||
              (mode === 'add' && loadInfo.workLoadTypeId === 1)
                ? 'extraGpa'
                : ''
            "
          >
            <el-input
              type="number"
              placeholder="请输入绩点"
              v-model="loadInfo.extraGpa"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2"
          ><i class="icon-item el-icon-document-add"></i
        ></el-col>
        <el-col :span="11">
          <el-form-item
            :prop="
              extraList.includes(loadInfo.workLoadId) ||
              (mode === 'add' && loadInfo.workLoadTypeId === 1)
                ? 'extraMeasure'
                : ''
            "
          >
            <!-- 新增时可编辑 -->
            <el-input
              :disabled="mode !== 'add'"
              placeholder="附加项单位"
              v-model="loadInfo.extraMeasure"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item class="btn-group form-item">
        <el-switch
          class="switch-item"
          v-model="mode"
          active-value="add"
          inactive-value="modify"
          active-text="新增"
          inactive-text="修改"
          @change="handleSwitch"
          :width="50"
        >
        </el-switch>
        <el-button
          v-if="mode === 'add'"
          type="primary"
          class="form-btn"
          @click="handleAdd"
          >确认新增</el-button
        >
        <el-button v-else type="primary" class="form-btn" @click="handleModify"
          >确认修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateCalc } from "@/lib/validate";
import { handleMsg } from "@/lib/util";
import { getWorkLoadType, getGpa } from "@/api/base";
import {
  getPublicLoadSum,
  getScientLoadSum,
  getMeasure,
  modWorkLoad,
  addWorkLoad
} from "@/api/workLoad";
export default {
  created() {
    setTimeout(() => {
      this.mode = "add";
      this.loadInfo.workLoadTypeId = 1;
      this.isLoading = false;
    }, 500);
    this.doGetWorkLoadType();
  },
  data() {
    return {
      isLoading: true,
      loadInfo: {
        workLoadTypeId: "",
        workLoadId: "",
        workLoad: "",
        scientTypeId: "",
        gpa: "",
        extraGpa: "",
        measure: "",
        extraMeasure: ""
      },
      mode: "",
      workLoadOptions: [],
      scientTypeOptions: [],
      workLoadTypeOptions: [],
      extraList: [],
      rule: {
        gpa: [{ required: true, validator: validateCalc, trigger: "blur" }],
        scientTypeId: [
          {
            required: true,
            message: "请选择教科研工作量类别",
            trigger: "change"
          }
        ],
        workLoad: [
          { required: true, message: "请填写工作量项", trigger: "blur" }
        ],
        measure: [{ required: true, message: "请填写单位", trigger: "blur" }],
        // workLoadId: [
        //   { required: true, message: "请选择工作量项", trigger: "change" }
        // ],
        extraGpa: [
          { required: true, validator: this.validateExtraGpa, trigger: "blur" }
        ],
        extraMeasure: [
          {
            required: true,
            validator: this.validateExtraMeasure,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async doAddWorkLoad(data) {
      let res = await addWorkLoad(data);
      handleMsg(res);
    },
    async doModWorkLoad(data) {
      let res = await modWorkLoad(data);
      handleMsg(res);
    },
    async doGetGpa(workLoadTypeId, workLoadId) {
      const res = await getGpa(workLoadTypeId, workLoadId),
        { gpa, extraGpa } = res.data;
      if (res.success) {
        this.loadInfo.gpa = gpa;
        this.loadInfo.extraGpa = extraGpa || 0;
      }
    },
    async doGetMeasure(workLoadTypeId, workLoadId) {
      const res = await getMeasure(workLoadTypeId, workLoadId),
        { measure, extraMeasure } = res.data;
      if (res.success) {
        this.loadInfo.measure = measure || "";
        this.loadInfo.extraMeasure = extraMeasure || "";
      }
    },
    async doGetWorkLoadType() {
      const res = await getWorkLoadType(),
        { workLoadTypeRow, scientTypeRow } = res.data;
      this.workLoadTypeOptions = workLoadTypeRow;
      this.scientTypeOptions = scientTypeRow;
    },
    async doGetPublicLoadSum() {
      const { data } = await getPublicLoadSum();
      this.workLoadOptions = data;
    },
    async doGetScientLoadSum() {
      const res = await getScientLoadSum();
      console.log(res);
      let workLoadList = [];
      let flag = false;
      if (res.success) {
        this.extraList = res.data.extraList;
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

    validateExtraGpa(rule, value, callback) {
      if (value < 0) {
        callback(new Error("额外加分绩点不能为负数"));
      }
    },
    validateExtraMeasure(rule, value, callback) {
      if (this.loadInfo.extraGpa > 0 && !value.trim()) {
        callback(new Error("加分项单位不能为空"));
      }
    },
    handleLoadChange() {
      this.doGetMeasure(this.loadInfo.workLoadTypeId, this.loadInfo.workLoadId);
      this.doGetGpa(this.loadInfo.workLoadTypeId, this.loadInfo.workLoadId);
    },
    handleTypeChange() {
      this.$refs["forms"].resetFields();
      this.loadInfo.workLoadTypeId === 1
        ? this.doGetScientLoadSum()
        : this.doGetPublicLoadSum();
    },
    handleSwitch() {
      this.$refs["forms"].resetFields();
      if (this.mode === "modify") {
        this.loadInfo.workLoadTypeId === 1
          ? this.doGetScientLoadSum()
          : this.doGetPublicLoadSum();
      }
    },
    handleAdd() {
      this.$refs["forms"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.doAddWorkLoad(this.loadInfo);
          this.$refs["forms"].resetFields();
          this.loadInfo.workLoad = "";
          this.loadInfo.scientTypeId = "";
        }
      });
    },
    handleModify() {
      this.$refs["forms"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.doModWorkLoad(this.loadInfo).then(() => {
            this.doGetScientLoadSum();
            this.doGetPublicLoadSum();
          });
          this.$refs["forms"].resetFields();
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
    .btn-group {
      width: 100%;
      display: flex;
      // justify-content: center;
    }
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
        @media screen and (max-width: $screenChangeSize) {
          width: 300px;
        }
      }
      .form-btn {
        width: 200px;
        margin-left: 80px;
        margin-top: 30px;
      }
    }
  }
  .table {
    padding: 20px;
  }
}
</style>
