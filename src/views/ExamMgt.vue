<template>
  <div class="examMgtBox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教学管理</el-breadcrumb-item>
      <el-breadcrumb-item>考试管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="searchBox">
      <div class=""><el-button type="success">发起考试</el-button></div>
      <div>
        <el-input v-model="input" placeholder="请输入要查询的考试编号"></el-input>
        <el-input v-model="input" placeholder="请选择考试班级"></el-input>
        <el-button type="success">查询考试信息</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
// 大盒子
.examMgtBox {
  width: 100%;
  height: 100%;
  border: 1px solid red;
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
.searchBox{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  // align-items: center;
}
</style>