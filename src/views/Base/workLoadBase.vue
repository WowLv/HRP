<template>
  <div class="container">
    <el-form
      label-width="150px"
      :model="loadInfo"
      class="form"
      ref="forms"
      :rules="rule"
    >
      <el-form-item label="工作量类型" class="form-item" prop="fid">
        <el-input v-model="loadInfo.workLoadType"></el-input>
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
      <el-form-item label="绩点" class="form-item" prop="classHour">
        <el-input v-model="loadInfo.gpa" type="number"></el-input>
      </el-form-item>
      <el-form-item label="附加绩点" class="form-item" prop="recordTime">
        <el-input v-model="loadInfo.extraGpa" type="number"></el-input>
      </el-form-item>
      <el-form-item class="btn-group form-item">
        <el-switch
          class="switch-item"
          v-model="mode"
          active-value="add"
          inactive-value="modify"
          active-text="新增"
          inactive-text="修改"
          width="50"
        >
        </el-switch>
        <el-button type="primary" class="form-btn">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { validateUid, validateName, validateTeachLoad } from "@/lib/validate";
// import { handleMsg } from "@/lib/util";
// import { setTeachRecord } from "@/api/teach";
export default {
  data() {
    return {
      loadInfo: {
        recordTypeId: 1,
        workLoadType: "",
        workLoadId: "",
        gpa: "",
        extraGpa: ""
      },
      mode: "modify",
      workLoadOptions: [],
      rule: {}
    };
  },
  methods: {}
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
