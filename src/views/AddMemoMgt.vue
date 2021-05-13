<template>
  <div class="addMemoBox">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>关键词管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 搜索栏 -->
    <div class="searchBox">
      <div class="addKeyWord">
        <el-button class="addKeyWordBtn" @click="dialogAddExam = true"
          >添加关键字</el-button
        >
      </div>
    </div>
        <!-- 表格 -->
    <div class="KeyWordTable">
      <el-table :data="KeyWordTableData" style="width: 100%">
        <el-table-column label="全选" align="center" width="50">
          <template>
            <el-checkbox v-model="KeyWordTableData.checked" ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="关键词id" align="center">
        </el-table-column>
        <el-table-column prop="wordName" label="关键词" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button
              size="mini"
              type="danger"
              plain
              round
              >删除关键字</el-button
            >
            <el-button
              size="mini"
              type="warning"
              plain
              round
              >修改关键字</el-button
            >
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
  data(){
    return{
      KeyWordTableData:[
        {id:1,wordName:'中国',checked:false}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
// 大盒子
.addMemoBox {
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
// 添加关键字
.addKeyWord {
  width: 20%;
}
// 添加关键字按钮
.addKeyWordBtn {
  background-color: #16b387;
  border: 1px solid #16b387;
  color: #fff;
}
.addKeyWordBtn:hover {
  border: 1px solid #16b387;
  color: #16b387;
  background-color: white;
}
// 表格
.KeyWordTable {
  width: 96%;
  margin: 0 auto;
  margin-top: 2rem;
}
// 页码
.el-pagination {
  text-align: center;
  margin-top: 2rem;
}
/deep/.el-dialog {
  width: 33%;
}
</style>