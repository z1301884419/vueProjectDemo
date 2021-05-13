<template>
  <div class="teInfo">
    <!-- 面包屑导航部分 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日志管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索部分 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="searchForm.course" placeholder="请选择任职课程">
          <el-option label="语文" value="shanghai"></el-option>
          <el-option label="数学" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.code" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain class="plainBtn" @click="searchFn">查询</el-button>
        <el-button type="info" plain @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <el-table :data="tableData" style="width: 96%" >
      <el-table-column prop="staff_number" label="编号" align="center"></el-table-column>
      <el-table-column prop="staff_name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="subject_id" label="课程代号" align="center"></el-table-column>
      <el-table-column prop="subject_name" label="课程名称" align="center"></el-table-column>
      <el-table-column prop="staff_entry_time" label="入职日期" align="center"></el-table-column>
      <el-table-column prop="staff_phone" label="电话" align="center"></el-table-column>
    </el-table>

    <!-- 页码 -->
    <el-pagination layout="prev, pager, next" :total="totalLength" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>


  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [  //总数据
        {staff_number:"5718349", subject_id: 1, subject_name: "语文", staff_name: "李四", staff_entry_time: "2020-01-29", staff_phone: "15342536353"},
        {staff_number:"5718349", subject_id: 1, subject_name: "语文", staff_name: "李四", staff_entry_time: "2020-01-29", staff_phone: "15342536353"},
        {staff_number:"5718349", subject_id: 1, subject_name: "语文", staff_name: "李四", staff_entry_time: "2020-01-29", staff_phone: "15342536353"},
      ], 
      pageSize: 5, //一页显示多少条
      totalLength: 20, //一共有多少条数据
      searchForm: {
        course: "",
        code: ""
      },
    };
  },
  methods: {
    handleCurrentChange(val) { // 获取页码
      console.log(`当前页: ${val}`);
    },
    searchFn(){ //搜索的方法
      console.log(this.searchForm);
    },
    resetFn(){ //重置的方法
      this.searchForm = {
        course: "",
        code: ""
      }
    },
    
  },
  created(){
  }
};
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

// 表格里的按钮样式
/* 78c5b0  C5E3D2   B2DBD4  16B387  F9D789  D4EDF9 EBF3FB  87C1EB FDF17F 8ADCFF F66077*/
.editBtn {
  border: 1px solid #87C1EB;
  background-color: #87C1EB;
  color: #fff;
}
.editBtn:hover {
  border: 1px solid #a3cfee;
  background-color: #a3cfee;
}
.deleteBtn {
  background-color: #F9D789;
  border: 1px solid #F9D789;
  color: #08ac7e;
}
.deleteBtn:hover {
  background-color: #f7db9a;
  border: 1px solid #f7db9a;
}
.searchBtn {
  background-color: #F66077;
  border: 1px solid #F66077;
}
.searchBtn:hover {
  background-color: #f0798b;
  border: 1px solid #f0798b;
}
</style>