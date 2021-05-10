<template>
  <div class="examMgtBox">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>教学管理</el-breadcrumb-item>
      <el-breadcrumb-item>考试管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 搜索栏 -->
    <div class="searchBox">
      <div class="addExam">
        <el-button class="addExamBtn">发起考试</el-button>
      </div>
      <div class="selectExam">
        <el-input v-model="input" placeholder="请输入查询的考试编号"></el-input>
        <el-select v-model="selectClassList" placeholder="请选择查询的考试年级">
          <el-option label="高一一班" value="shanghai"></el-option>
          <el-option label="高一二班" value="beijing"></el-option>
        </el-select>
        <el-button plain class="selectExamBtn">查询考试信息</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="examTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="考试编号" width="180">
        </el-table-column>
        <el-table-column prop="type" label="考试类型" width="180">
        </el-table-column>
        <el-table-column prop="class" label="考试班级"> </el-table-column>
        <el-table-column prop="time" label="考试时间"> </el-table-column>
        <el-table-column prop="people" label="考试发起人"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <!--  slot-scope="scope" -->
            <el-button size="mini">取消考试</el-button>
            <el-button size="mini" type="danger">修改考试信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 页码 -->
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="70"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      selectClassList: [],
      tableData: [],
    };
  },
};
</script>

<style lang="less" scoped>
// 大盒子
.examMgtBox {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
}
// 分割线
.el-divider--horizontal {
  margin: 0;
}
// 面包屑导航
.el-breadcrumb {
  padding-left: 1rem;
  line-height: 3;
  font-size: 1.6rem;
}
// 搜索栏：
.searchBox {
  padding-left: 1.5%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 1rem 1rem;
}
// 发起考试
.addExam {
  width: 20%;
}
// 发起考试按钮
.addExamBtn {
  background-color: #16b387;
  border: 1px solid #16b387;
  color: #fff;
}
.addExamBtn:hover {
  border: 1px solid #16b387;
  color: #16b387;
  background-color: white;
}
// 查询考试
.selectExam {
  width: 90%;
  display: flex;
  justify-content: flex-start;
  .el-input {
    width: 20rem;
    margin-right: 1rem;
  }
  .el-select {
    width: 20rem;
    margin-right: 2rem;
  }
}
// 查询考试按钮
.selectExamBtn {
  border: 1px solid #16b387;
  color: #16b387;
}
.selectExamBtn:hover {
  background-color: #b2dbd4;
  border: 1px solid #b2dbd4;
  color: #fff;
}
// 表格
.examTable {
  width: 96%;
  margin: 0 auto;
  margin-top: 2rem;
}
// 页码
.el-pagination{
  text-align: center;
  margin-top: 2rem;
}
</style>