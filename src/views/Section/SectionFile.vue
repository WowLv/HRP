<template>
  <div class="container">
    <el-tabs v-model="activeName" v-loading="isLoading">
      <el-tab-pane label="教务处" name="teach" class="tab-pane">
        <el-table :data="teachData" class="table" max-height="690">
          <el-table-column
            prop="fid"
            label="职工号"
            align="center"
            width="175"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="175"
          ></el-table-column>
          <el-table-column
            prop="sectionName"
            label="部门"
            width="175"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="入职时间"
            width="175"
            align="center"
          >
          </el-table-column>
        </el-table>
        <div class="table-pagination">
          <el-pagination
            background
            :pageSize="10"
            layout="prev, pager, next, jumper"
            @current-change="teachPageChange"
            :total="teachSum"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人事处" name="member" class="tab-pane">
        <el-table :data="memberData" class="table" max-height="690">
          <el-table-column
            prop="fid"
            label="职工号"
            align="center"
            width="175"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="175"
          ></el-table-column>
          <el-table-column
            prop="sectionName"
            label="部门"
            width="175"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="入职时间"
            width="175"
            align="center"
          >
          </el-table-column>
        </el-table>
        <div class="table-pagination">
          <el-pagination
            background
            :pageSize="10"
            layout="prev, pager, next, jumper"
            @current-change="memberPageChange"
            :total="memberSum"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="科研处" name="scient" class="tab-pane">
        <el-table :data="scientData" class="table" max-height="690">
          <el-table-column
            prop="fid"
            label="职工号"
            align="center"
            width="175"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="175"
          ></el-table-column>
          <el-table-column
            prop="sectionName"
            label="部门"
            width="175"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="入职时间"
            width="175"
            align="center"
          >
          </el-table-column>
        </el-table>
        <div class="table-pagination">
          <el-pagination
            background
            :pageSize="10"
            layout="prev, pager, next, jumper"
            @current-change="scientPageChange"
            :total="scientSum"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getSectionFile } from "@/api/section";
export default {
  created() {
    this.getTeachData(1);
    this.getMemberData(1);
    this.getScientData(1);
  },
  data() {
    return {
      isLoading: true,
      activeName: "teach",
      teachData: [],
      memberData: [],
      scientData: [],
      teachSum: 0,
      memberSum: 0,
      scientSum: 0
    };
  },
  methods: {
    async doGetSectionFile(page, sectionId) {
      let res = await getSectionFile({ page, sectionId });
      // console.log(res);
      if (res.success) {
        let data = res.data.data,
          sum = res.data.sum;
        if (sectionId === 1) {
          this.memberData = data;
          this.memberSum = sum;
        } else if (sectionId === 2) {
          this.teachData = data;
          this.teachSum = sum;
        } else {
          this.scientData = data;
          this.scientSum = sum;
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    },
    getMemberData(page) {
      this.doGetSectionFile(page, 1);
    },
    getTeachData(page) {
      this.doGetSectionFile(page, 2);
    },
    getScientData(page) {
      this.doGetSectionFile(page, 3);
    },
    teachPageChange(page) {
      this.getTeachData(page);
    },
    memberPageChange(page) {
      this.getMemberData(page);
    },
    scientPageChange(page) {
      this.getScientData(page);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 1500px;
  margin: 0 20px;
  position: relative;
  .tab-pane {
    height: 740px;
    .table {
      width: 700px;
      .table-expand {
        width: 500px;
      }
      .tag {
        padding: 0 20px;
        margin: 0 5px;
      }
      ._icon {
        font-size: 20px;
        margin: 5px 10px;
      }
    }
    .table-pagination {
      width: 100%;
      position: absolute;
      top: 705px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
