<template>
  <div>
    <!-- 面包屑导航部分 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生家长管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 表格部分 -->
    <el-table :data="tableData" style="width: 96%" >
      <el-table-column prop="parentId" label="家长编号" align="center"></el-table-column>
      <el-table-column prop="parentName" label="家长姓名" align="center"></el-table-column>
      <el-table-column prop="studentList.studentName" label="孩子姓名" align="center"></el-table-column>
      <el-table-column prop="parentPhone" label="电话" align="center"></el-table-column>
    </el-table>

    <!-- 页码 -->
    <el-pagination layout="prev, pager, next" :total="totalLength" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], //总数据
      pageSize: 10, //一页显示多少条
      totalLength: 0, //一共有多少条数据
      page: 1,
      searchForm: {
        subjectId: "",
        staffNumber: ""
      },
    }
  },
}
</script>

<style lang="less" scoped>
/* 面包屑导航 */
.el-breadcrumb {
  line-height: 3;
  padding-left: 1rem;
  font-size: 1.6rem;
}
.el-divider {
  margin: 0;
}
/* 搜索框按钮样式 */
.successBtn {
  background-color: #16B387;
  border: 1px solid #16B387;
  color: #fff;
}
.successBtn:hover {
  border: 1px solid #16B387;
  color: #16B387;
  background-color: white;
}
.plainBtn {
  border: 1px solid #16B387;
  color: #16B387;
}
.plainBtn:hover {
  background-color: #B2DBD4;
  border: 1px solid #B2DBD4;
  color: #fff;
}
// 搜索框
.el-form{
  padding-left: 1.5%;
  margin-top: 1rem;
  .successBtn{
    margin-right: 15rem;
  }
  .el-form-item{
    margin: 1rem;
  }
}
.tips{
  color: #F66077;
}

/* 表格 */
.el-table {
  margin: 2rem auto;
}
// 分页
.el-pagination {
  text-align: center;
}
// 模态框
/deep/.el-dialog{
  border-radius: 1rem;
}
.demo-ruleForm{
  padding-left: 0;
  /deep/.el-form-item__content{
    margin: 1rem;
  }
  /deep/.el-form-item__label{
    margin-top: 10px;
  }
  .el-form-item{
    text-align: left;
  }
  .btnBox{
    margin-top: 3rem;
    text-align: right;
    .successBtn{
      margin-right: 0;
    }
  }
}
</style>