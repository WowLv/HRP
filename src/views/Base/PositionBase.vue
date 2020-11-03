<template>
  <div class="container">
    <el-form
      label-width="150px"
      :model="loadInfo"
      class="form"
      ref="forms"
      :rules="rule"
    >
      <el-form-item
        label="职位名称"
        class="form-item"
        prop="positionId"
        v-if="mode === 'modify'"
      >
        <el-select
          v-model="loadInfo.positionId"
          placeholder="请选择职位"
          class="option-item"
        >
          <el-option
            v-for="item in positionOptions"
            :key="item.positionId"
            :label="item.positionName"
            :value="item.positionId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新职位名称" class="form-item" prop="newName">
        <el-input v-model="loadInfo.newName"></el-input>
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
          @click="handleSubmit"
          >确认新增</el-button
        >
        <el-button v-else type="primary" class="form-btn" @click="handleSubmit"
          >确认修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { positionList } from "@/api/memberFile";
import { handleMsg } from "@/lib/util";
import { setPosition } from "@/api/station";
export default {
  created() {
    this.doPositionList();
  },
  data() {
    return {
      loadInfo: {
        positionId: "",
        newName: ""
      },
      positionOptions: [],
      mode: "",
      rule: {
        positionId: [
          {
            required: true,
            message: "请选择职位",
            trigger: "change"
          }
        ],
        newName: [
          { required: true, message: "请填写新职位名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async doSetPosition(data) {
      const res = await setPosition(data);
      handleMsg(res);
    },
    async doPositionList() {
      const res = await positionList();
      if (res.success) {
        this.positionOptions = res.data.positionRow;
      }
    },
    handleSubmit() {
      this.$refs["forms"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.doSetPosition(
            Object.assign(this.loadInfo, { mode: this.mode })
          ).then(() => {
            this.doPositionList();
          });
          this.$refs["forms"].resetFields();
        }
      });
    },
    handleSwitch() {
      this.$refs["forms"].resetFields();
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
        width: 160px;
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
