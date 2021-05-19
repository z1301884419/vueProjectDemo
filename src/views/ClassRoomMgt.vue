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
        <el-button class="successBtn" @click="addClassRoom = true">添加教室</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.classroomStatus" placeholder="请选择教室使用状态" @change="searchFn">
          <el-option label="已使用" value="1"></el-option>
          <el-option label="未使用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="info" plain @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <el-table :data="tableData" style="width: 96%" >
      <el-table-column prop="classroomId" label="教室编号" align="center"></el-table-column>
      <el-table-column prop="classroomName" label="教室名称" align="center"></el-table-column>
      <el-table-column prop="classroomStatus" label="教室使用状态" align="center"></el-table-column>
    </el-table>

    <!-- 页码 -->
    <el-pagination layout="prev, pager, next" :total="totalLength" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>

    <!-- 添加教室的弹框 -->
    <el-dialog title="添加教室" :visible.sync="addClassRoom" width="33%">
      <el-form :model="addClassRoomForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="教学楼">
          <el-select v-model="addClassRoomForm.classBuildingName" placeholder="请选择教学楼">
            <el-option label="教学楼" value="教学楼"></el-option>
            <el-option label="逸夫楼" value="逸夫楼"></el-option>
            <el-option label="实验楼" value="实验楼"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教室位置">
          <el-input v-model="addClassRoomForm.classroomName" @change="checkClassRoom"></el-input>
          <span class="tips" v-if="validClassRoomName != 0">该班级已存在!</span>
        </el-form-item>
        <el-form-item class="btnBox">
          <el-button @click="addClassRoom = false">取 消</el-button>
          <el-button class="successBtn" @click="addClassRoomRequest">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import TeachInfoMixins from "../mixins/TeachInfoMixins"
export default {
  data(){
    return {
      tableData: [], //总数据
      pageSize: 10, //一页显示多少条
      totalLength: 0, //一共有多少条数据
      page: 1,
      searchForm: {
        subjectId: "",
        staffNumber: ""
      },
      addClassRoom: false,
      addClassRoomForm: {},
      classroomName: '',
      allClassArr: []
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
    getAll(){ //获取所有教室
      this.getAllData({
        name: 'SELECT_CLASSROOMALL',
        data: {
          page: 1,
          pageSize: 100
        }
      }).then(data => {
        this.allClassArr = data.data
      })
    },
    handleCurrentChange(val){
      this.page = val; 
      this.getAllClassRoom();
    },
    checkClassRoom(){
      this.classroomName = this.addClassRoomForm.classBuildingName + this.addClassRoomForm.classroomName
    },
    addClassRoomRequest(){
      console.log(this.addClassRoomForm);
      if(this.validClassRoomName == 0){
        this.InsertDateT({
          name: 'SELECT_CLASSROOMADD',
          data: {
            classroomName: this.classroomName,
            classroomStatus: 0
          }
        }).then(data=> {
          if(data === 200){
            this.getAllClassRoom();
            this.addClassRoom = false;
            this.addClassRoomForm = {
              classBuildingName: '',
              classroomName: ''
            }
          }
        })
      }
    },
    searchFn(){ 
      this.page = 1;
      this.getAllData({
        name: 'SELECT_CLASSROOMALL',
        data: {
          classroomStatus: this.searchForm.classroomStatus,
          page: this.page,
          pageSize: this.pageSize
        }
      }).then(data => {
        data.data.map(item=> item.classroomStatus = item.classroomStatus == 1 ? '已使用' : '未使用');
        this.tableData = data.data;
        this.totalLength = data.count;
      })
    },
    resetFn(){
      this.searchForm = {
        classroomStatus: ''
      }
      this.getAllClassRoom();
    },
  },
  created(){
    this.getAllClassRoom()
    this.getAll()
  },
  computed: {
    validClassRoomName(){ //验证班级名称是否已存在
      let classroomNameArr = this.allClassArr.filter(value =>value.classroomName == this.classroomName)
      return classroomNameArr.length
    }
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
</style>