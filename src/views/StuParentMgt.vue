<template>
  <div>
    <!-- 面包屑导航部分 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生家长管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索框 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchForm.studentName" placeholder="请输入学生姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain class="plainBtn" @click="searchInfo">查询</el-button>
        <el-button type="info" plain @click="resizeFn">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <el-table :data="tableData" style="width: 96%" >
      <el-table-column prop="parentId" label="家长编号" align="center"></el-table-column>
      <el-table-column prop="parentName" label="家长姓名" align="center"></el-table-column>
      <el-table-column prop="childrenName" label="孩子姓名" align="center"></el-table-column>
      <el-table-column prop="parentPhone" label="电话" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button class="deleteBtn" type="danger" icon="el-icon-delete" circle @click="deleteTeacherRequest(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码 -->
    <el-pagination layout="prev, pager, next" :total="totalLength" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
import stuParentsMixins from '../mixins/stuParentsMixins'
export default {
  data() {
    return {
      tableData: [], //总数据
      pageSize: 10, //一页显示多少条
      totalLength: 0, //一共有多少条数据
      searchForm: {
        studentName: "",
      },
    }
  },
  mixins: [stuParentsMixins],
  methods: {
    getAllParents(){ //获取第一页数据
      this.getAllData({
        name: 'SELETE_PARENTS',
        data:{},
        pageSize: this.pageSize,
      }).then(data=>{
        console.log(data);
        data.onePageData.map(item=>{
          item.childrenName = ''
          for(let i = 0; i < item.studentList.length; i++){
            if(item.studentList.length > 1){
              item.childrenName += item.studentList[i].studentName + '、'
            
            } else {
              item.childrenName = item.studentList[0].studentName + '、'
            }
          }
          item.childrenName = item.childrenName.substr(0, item.childrenName.length - 1);
        })
        this.tableData = data.onePageData;
        this.totalLength = data.totalPages;
      })
    },
    handleCurrentChange(val) {
      let data = this.Paging(val);
      this.tableData = data.onePageData;
    },
    searchInfo(){
      console.log(this.searchForm);
      this.getAllData({
        name: 'SELETE_PARENTS',
        data: this.searchForm,
        pageSize: this.pageSize,
      }).then(data=>{
        console.log(data);
        data.onePageData.map(item=>{
          item.childrenName = ''
          for(let i = 0; i < item.studentList.length; i++){
            if(item.studentList.length > 1){
              item.childrenName += item.studentList[i].studentName + '、'
            
            } else {
              item.childrenName = item.studentList[0].studentName + '、'
            }
          }
          item.childrenName = item.childrenName.substr(0, item.childrenName.length - 1);
        })
        this.tableData = data.onePageData;
        this.totalLength = data.totalPages;
      })
    },
    resizeFn(){
      this.getAllParents()
    },
    deleteTeacherRequest(row){
      console.log(row.parentId);
      this.DeleteData({
        name: 'DELETE_PARENT',
        data:{
          parentId: row.parentId
        }
      }).then(data=>{
        if(data === 200){
          this.getAllParents();
        }
      });
    }
  },
  created(){
    this.searchForm = {
      studentName: "",
    },
    this.getAllParents()
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
.deleteBtn {
  background-color: #F9D789;
  border: 1px solid #F9D789;
  color: #08ac7e;
}
.deleteBtn:hover {
  background-color: #f7db9a;
  border: 1px solid #f7db9a;
}
</style>