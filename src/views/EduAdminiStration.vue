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
        <el-button class="successBtn" @click="addClass = true">添加班级</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.gradeId" placeholder="请选择年级" @change="changeClassRequest">
          <el-option v-for="item in gradeArr" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.classId" placeholder="请选择班级">
          <el-option  v-for="item in classArr" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button plain class="plainBtn" @click="searchInfo">查询</el-button>
        <el-button type="info" plain @click="resizeFn">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 班级卡片 -->
    <div class="cardBox">
      <el-col :span="4" v-for="item in tableData" :key="item.id">
        <el-card shadow="hover">
          <p>{{ item.gradeName }} {{ item.className }}</p>
          <p>班主任: {{item.staffName==null?"未分配":item.staffName}}</p>
          <p>教室地址: {{ item.classroomName }}</p>
          <div v-if="item.staffName===null"><el-button round plain class="plainBtn">分配班主任</el-button></div>
          <div v-else><el-button round plain class="plainBtn">调换班主任</el-button></div>
          <div><el-button round plain class="plainBtn">分配任课教师</el-button></div>
          <div><el-button round plain class="plainBtn">删除班级</el-button></div>
        </el-card>
      </el-col>
    </div>
    <!-- 分页 -->
    <el-pagination layout="prev, pager, next" :total="totalLength" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>

    <!-- 模态框部分 -->
    <!-- 添加班级的弹框 -->
    <el-dialog title="添加班级" :visible.sync="addClass" width="33%">
      <el-form :model="addClassForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="教室">
          <el-select v-model="addClassForm.classClassroomId" placeholder="请选择教室" @change="changeClassRequest">
            <el-option v-for="item in classRoomArr" :key="item.classroomId" :label="item.classroomName" :value="item.classroomId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="addClassForm.classGradeId" placeholder="请选择年级" @change="changeClassRequest">
            <el-option v-for="item in gradeArr" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称">
          <el-input v-model="addClassForm.className"></el-input>
          <span class="tips" v-if="validClassName != 0">该班级已存在!</span>
        </el-form-item>
        <el-form-item class="btnBox">
          <el-button @click="addClass = false">取 消</el-button>
          <el-button class="successBtn" @click="addClassRequest">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import TeachInfoMixins from "../mixins/TeachInfoMixins"
import TeacherMixins from "../mixins/TeacherMixins"
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      tableData: [],
      searchForm: {  //搜索框值
        gradeId: null,
        classId: null
      },
      page: 1, //当前第几页
      pageSize: 12, //一页显示多少条
      totalLength: 0, //一共有多少条数据
      addClassForm: { //添加班级的表单
        classClassroomId: '',
        classGradeId: '',
        className: '',
      },
      addClass: false,
      gradeArr: [], //年级
      classArr: [], //班级
      classRoomArr: [], //空教室
      classAllArr: [], //所有班级
    };
  },
  mixins: [TeachInfoMixins, TeacherMixins], //使用mixins里的模块
  methods: {
    ...mapActions(["teacherModules/SearchAllGradeAction"]),
    ...mapActions(["teacherModules/SearchAllClassRoomAction"]),
    getAllClass(){ //获取一页班级
      this.getAllData({
        name: 'CLASS_ALL',
        data: {
          page: this.page,
          pageSize: this.pageSize
        }
      }).then(data => {
        console.log(data);
        this.tableData = data;
        this.totalLength = data.length;
      })
    },
    getTotalClassData(){ //获取所有班级
      this.getAllData({
        name: 'CLASS_TOTALDATA',
        data: {}
      }).then(data => {
        this.classAllArr = data;
      })
    },
    getAllGrade(){ //获取年级
      this["teacherModules/SearchAllGradeAction"]({
        name: 'GRADE_ALL',
        data: {}
      }).then(data => {
        console.log(data);
      })
    },
    handleCurrentChange(val) { // 获取页码
      console.log(`当前页: ${val}`);
    },
    addClassRequest() {  // 添加班级
      this.addClass = false;
      if(this.validClassName == 0){
        // 名字不重复时提交请求 CLASS_ADD
        this.InsertDate({
          name: 'CLASS_ADD',
          data: this.addClassForm
        }).then(data=>{
          console.log(data);
          this.getAllClass()
          this.addClassForm = {
            classClassroomId: '',
            classGradeId: '',
            className: '',
          }
        })
      } else {
        this.openError('错误', '该班级已存在!')
      }
    },
    changeClassRequest(){ //选择年级之后请求班级信息
      this.getAllData({
        name: 'CLASS_SELECTBYCONDITION',
        data: {
          gradeId: this.searchForm.gradeId
        }
      }).then(data => {
        this.classArr = data;
      })
    },
    getClassRoomNotUse(){  //获取没有班级的空教室
      this["teacherModules/SearchAllClassRoomAction"]({
        name: 'CLASSROOM_NOTUSE',
        data: {}
      }).then(data => {
        console.log(data);
      })
    },
    searchInfo(){
      console.log(this.searchForm);
    },
    resizeFn(){
      this.searchForm = {
        gradeId: null,
        classId: null
      }
      this.getAllClass()
    }
  },
  computed: {
    validClassName(){ //验证班级名称是否已存在
      let classNameArr = this.classAllArr.filter(value =>value.className == this.addClassForm.className && value.classGradeId == this.addClassForm.classGradeId)
      return classNameArr.length
    }
  },
  created() {
    this.getAllGrade(); //获取所有年级
    this.gradeArr = this.$store.state.teacherModules.grade;
    this.getAllClass(); //获取一页班级信息
    this.getClassRoomNotUse() //获取所有没有使用过的教室
    this.classRoomArr = this.$store.state.teacherModules.classroom;
    this.getTotalClassData() //获取所有班级的信息
  }
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
  .tips{
    color: #F66077;
  }
}
.btnBox{
  margin-top: 3rem;
  text-align: right;
  .successBtn{
    margin-right: 0;
  }
}
// 卡片
.cardBox{
  padding: 1rem;
  overflow: hidden;
}
.el-card {
  background-color: #f7efa7c7;
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