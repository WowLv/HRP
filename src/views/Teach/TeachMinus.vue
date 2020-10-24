<template>
  <div class="container">
    <el-form
      label-width="150px"
      :model="loadInfo"
      class="form"
      ref="forms"
      :rules="rule"
    >
      <el-form-item label="职工号" class="form-item" prop="fid">
        <el-input v-model="loadInfo.fid"></el-input>
      </el-form-item>
      <el-form-item label="姓名" class="form-item" prop="name">
        <el-input v-model="loadInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="请假课时量" class="form-item" prop="classHour">
        <el-input v-model="loadInfo.classHour" type="number"></el-input>
      </el-form-item>
      <el-form-item label="申请时间" class="form-item" prop="recordTime">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="loadInfo.recordTime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" class="form-btn" @click="handleSubmit"
          >确认</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { setTeachRecord } from "@/api/teach";
import { validateUid, validateName, validateTeachLoad } from "@/lib/validate";
export default {
  created() {
    this.loadInfo.fid = this.uid;
    this.loadInfo.name = this.username;
  },
  data() {
    return {
      loadInfo: {
        fid: "",
        name: "",
        recordTypeId: 2
      },
      rule: {
        fid: [{ required: true, validator: validateUid, trigger: "blur" }],
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        classHour: [
          { required: true, validator: validateTeachLoad, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["uid", "username"])
  },
  methods: {
    async doSetTeachRecord(data) {
      let res = await setTeachRecord(data);
      this.handleMsg(res);
    },
    handleMsg(res) {
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
    handleSubmit() {
      this.$refs["forms"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.doSetTeachRecord(
            Object.assign(this.loadInfo, {
              fid: parseInt(this.loadInfo.fid),
              classHour: -this.loadInfo.classHour
            })
          );
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
    .form-item {
      margin-bottom: 20px;
      .option-item {
        width: 450px;
        @media screen and (max-width: $screenChangeSize) {
          width: 300px;
        }
      }
      .form-btn {
        width: 100px;
        margin-left: 150px;
        margin-top: 30px;
      }
    }
  }
  .table {
    padding: 20px;
  }
}
</style>
