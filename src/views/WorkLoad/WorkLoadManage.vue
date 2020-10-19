<template>
  <div class="container" v-loading="isLoading">
    <div class="header">
      <el-input
        placeholder="请输入职工号或名字"
        v-model="search"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"
          v-if="!searched"
        ></el-button>
        <el-button slot="append" v-else @click="handleBack">返回</el-button>
      </el-input>
    </div>
    <el-table
      ref="filterTable"
      :data="nowAllInfo"
      style="width: 100%"
      class="table"
      max-height="700"
    >
      <el-table-column
        prop="uploadTime"
        align="center"
        label="提交时间"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="fid"
        align="center"
        label="职工号"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column prop="name" align="center" label="姓名" width="180">
      </el-table-column>
      <el-table-column
        prop="workLoadType"
        align="center"
        label="工作量类型"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="workLoad"
        align="center"
        label="工作量项"
        width="350"
      >
      </el-table-column>
      <el-table-column prop="proof" align="center" label="佐证" width="150">
        <template slot-scope="scope">
          <i
            class="el-icon-document icon-item"
            @click="
              getProof(
                scope.row.destination,
                scope.row.filename,
                scope.row.originalname
              )
            "
          ></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <!-- <template slot-scope="scope"> -->
        <el-button size="mini" type="sunccess" @click="handlePass()"
          >通过</el-button
        >
        <el-button size="mini" type="danger" @click="handleCancel()"
          >驳回</el-button
        >
        <!-- </template> -->
      </el-table-column>
    </el-table>
    <div class="table-pagination">
      <el-pagination
        background
        :pageSize="10"
        layout="prev, pager, next, jumper"
        @current-change="handlePageChange"
        :total="sum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getWorkLoadList } from "@/api/workLoad";
export default {
  created() {
    this.doGetWorkLoadList(this.currentPage);
  },
  data() {
    return {
      currentPage: 1,
      sum: 0,
      isLoading: true,
      allInfo: [],
      search: "",
      searched: false,
      tagType: {
        1: "warning",
        2: "warning",
        3: "success",
        4: "primary"
      }
    };
  },
  computed: {
    nowAllInfo() {
      let list = this.allInfo;
      list = list.sort((a, b) => {
        return (
          parseInt(b.uploadTime.replace(/-/g, "")) -
          parseInt(a.uploadTime.replace(/-/g, ""))
        );
      });
      return list;
    }
  },
  methods: {
    async doGetWorkLoadList(page) {
      let res = await getWorkLoadList(page);
      if (res.success) {
        this.allInfo = res.data.data;
        this.sum = res.data.sum;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    },
    handlePageChange() {
      this.currentPage++;
      this.doGetWorkLoadList(this.currentPage);
    },
    filterTag(value, row) {
      return row.power === value;
    },
    getProof(destination, filename, originalname) {
      window.open(
        `api/download_load?destination=${destination}&filename=${filename}&originalname=${originalname}`
      );
    },
    handlePass() {},
    async handleSearch() {},
    handleBack() {}
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 1540px;
  margin: 0 20px;
  height: 794px; // 与其他分页样式相同
  position: relative;
  .header {
    .input-with-select {
      margin-left: 40px;
      width: 400px;
    }
    .add-btn {
      margin-left: 910px;
    }
  }
  .table {
    .icon-item {
      font-size: 24px;
      cursor: pointer;
    }
  }
  .table-pagination {
    width: 100%;
    position: absolute;
    top: 758px;
    display: flex;
    justify-content: center;
  }
}
</style>
