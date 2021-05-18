<template>
  <div class="teInfo">
    <!-- 面包屑导航部分 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教室管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索部分 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-button class="successBtn" @click="addTeacher = true">添加教室</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.subjectId" placeholder="请选择教室使用状态">
          <el-option label="已使用" value="1"></el-option>
          <el-option label="未使用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button plain class="plainBtn" @click="searchFn">查询</el-button>
        <el-button type="info" plain @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <el-table :data="tableData" style="width: 96%" >
      <el-table-column prop="classroomId" label="教室编号" align="center"></el-table-column>
      <el-table-column prop="classroomName" label="教室名称" align="center"></el-table-column>
      <el-table-column prop="classroomStatus" label="教室使用状态" align="center"></el-table-column>
      <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button class="editBtn" icon="el-icon-edit" circle  @click="modifyDialogShow(scope.row)"></el-button>
          <el-button class="deleteBtn" type="danger" icon="el-icon-delete" circle @click="deleteTeacherRequest(scope.row)"></el-button>
        </template>
        
      </el-table-column> -->
    </el-table>

    <!-- 页码 -->
    <el-pagination layout="prev, pager, next" :total="totalLength" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
import TeachInfoMixins from "../mixins/TeachInfoMixins"
export default {
  data(){
    return {
      tableData: [], //总数据
      pageSize: 10, //一页显示多少条
      totalLength: 20, //一共有多少条数据
      page: 1,
      searchForm: {
        subjectId: "",
        staffNumber: ""
      },
    }
  },
  mixins: [TeachInfoMixins], //使用mixins里的模块
  methods: {
    getAllClassRoom(){ //获取一页教室
      this.getAllData({
        name: 'SELECT_CLASSROOMALL',
        data: {
          page: this.page,
          pageSize: this.pageSize
        }
      }).then(data => {
        console.log(data);
        data.data.map(item=> item.classroomStatus = item.classroomStatus == 1 ? '已使用' : '未使用');
        this.tableData = data.data;
        this.totalLength = data.count;
      })
    },
    handleCurrentChange(val){
      console.log(val);
    },
    searchFn(){
      this.searchForm.page = this.page;
      this.searchForm.pageSize = this.pageSize;
      // this.getAllData({
      //   name: 'CLASS_ALL',
      //   data: this.searchForm
      // }).then(data => {
      //   this.tableData = data;
      //   this.totalLength = data.length;
      // })
    },
    resetFn(){
      // this.searchForm = {
      //   gradeId: '',
      //   clazzId: ''
      // }
      this.getAllClassRoom();
    },
  },
  created(){
    this.getAllClassRoom()
  }
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

/* 表格 */
.el-table {
  margin: 2rem auto;
}
// 分页
.el-pagination {
  text-align: center;
}
</style>