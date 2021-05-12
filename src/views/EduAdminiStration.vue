<template>
  <div class="eduAdm">
    <!-- 面包屑导航部分 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>师资管理</el-breadcrumb-item>
      <el-breadcrumb-item>教务管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索框 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-button class="successBtn">添加班级</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.course" placeholder="请选择年级">
          <el-option label="高一" value="shanghai"></el-option>
          <el-option label="高二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.course" placeholder="请选择年级">
          <el-option label="一班" value="shanghai"></el-option>
          <el-option label="二班" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button plain class="plainBtn">查询</el-button>
        <el-button type="info" plain>重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 班级卡片 -->
    <div class="cardBox">
      <el-col :span="4" v-for="item in tableData" :key="item.id">
        <el-card shadow="hover">
          <p>{{ item.className }}</p>
          <p>班主任: {{item.headTeacher==""?"未分配":item.headTeacher}}</p>
          <div v-if="item.headTeacher===''"><el-button round plain class="plainBtn">分配班主任</el-button></div>
          <div v-else><el-button round plain class="plainBtn">调换班主任</el-button></div>
          <div><el-button round plain class="plainBtn">分配任课教师</el-button></div>
          <div><el-button round plain class="plainBtn">删除班级</el-button></div>
        </el-card>
      </el-col>
    </div>
    <!-- 分页 -->
    <el-pagination layout="prev, pager, next" :total="totalLength" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>

    <!-- 模态框部分 -->
    <!-- 分配任课教师的弹框 -->
    <!-- <el-dialog title="分配任课教师" :visible.sync="addTeacher" width="33%">
      <el-form :model="addTeachForm" :rules="addTeachrules" ref="addTeachForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="工号" prop="staff_number">
          <el-input v-model="addTeachForm.staff_number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="staff_name">
          <el-input v-model="addTeachForm.staff_name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="staff_password">
          <el-input type="password" v-model="addTeachForm.staff_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="staff_phone">
          <el-input v-model="addTeachForm.staff_phone"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="staff_age">
          <el-input v-model.number="addTeachForm.staff_age"></el-input>
        </el-form-item>
        <el-form-item class="btnBox">
          <el-button @click="addTeacher = false">取 消</el-button>
          <el-button class="successBtn" @click="addTeacherRequest('addTeachForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, className: "高一一班" , headTeacher: ""},
        { id: 2, className: "高一二班" , headTeacher: "李四"},
        { id: 3, className: "高一三班" , headTeacher: "张三"},
        { id: 4, className: "高一四班" , headTeacher: "王五"},
        { id: 5, className: "高一五班" , headTeacher: ""},
        { id: 6, className: "高一六班" , headTeacher: ""},
        { id: 7, className: "高一七班" , headTeacher: ""},
      ],
      searchForm: {},
      pageSize: 12, //一页显示多少条
      totalLength: 20, //一共有多少条数据
    };
  },
  methods: {
    handleCurrentChange(val) { // 获取页码
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
/* 78c5b0  C5E3D2   B2DBD4  16B387  F9D789  D4EDF9 EBF3FB  87C1EB FDF17F 8ADCFF F66077*/
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
  border: 1px solid #b2dbd4;
  color: #16b387;
}
.plainBtn:hover {
  background-color: #b2dbd4;
  border: 1px solid #b2dbd4;
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
// 卡片
.cardBox{
  padding: 2rem;
  overflow: hidden;
}
.el-card {
  background-color: #fdf07f85;
  text-align: center;
  border-radius: 2rem;
  min-height: 25rem;
  margin: 1rem;
  .el-button {
    width: 90%;
    margin: .5rem 1rem;
  }
  p{
    font-size: 1.6rem;
    padding: 1rem;
  }
  p:nth-child(1){
    color: #16b387;
    font-weight: 600;
  }
}
// 分页
.el-pagination {
  text-align: center;
}
</style>