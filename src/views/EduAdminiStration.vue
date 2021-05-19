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
        <el-select v-model="searchForm.clazzId" placeholder="请选择班级">
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
      <el-col :span="4" v-for="item in tableData" :key="item.classId">
        <el-card shadow="hover">
          <p>{{ item.gradeName }} {{ item.className }}</p>
          <p>班主任: {{item.staffName==null?"未分配":item.staffName}}</p>
          <p>教室地址: {{ item.classroomName }}</p>
          <div v-if="item.staffName===null"><el-button round plain class="plainBtn" @click="allotHearderTeacherShow(item.classId)">分配班主任</el-button></div>
          <div v-else><el-button round plain class="plainBtn" @click="changeHeaderTeacherShow(item.classId, item.staffName, item.classStaffId)">调换班主任</el-button></div>
          <div><el-button round plain class="plainBtn" @click="allotTeacherShow(item.classId)">分配任课教师</el-button></div>
          <div><el-button round plain class="plainBtn" @click="changeClassRoomShow(item.classId, item.classroomName)">调换教室</el-button></div>
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
          <el-select v-model="addClassForm.classClassroomId" placeholder="请选择教室" @change="changeClassRequest" style="width: 100%;">
            <el-option v-for="item in classRoomArr" :key="item.classroomId" :label="item.classroomName" :value="item.classroomId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="addClassForm.classGradeId" placeholder="请选择年级" @change="changeClassRequest" style="width: 100%;">
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

    <!-- 分配班主任的弹框 -->
    <el-dialog title="分配班主任" :visible.sync="allotHearderTeacher" width="33%">
      <el-form :model="allotHearderTeacherForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="分配班主任">
          <el-select v-model="allotHearderTeacherForm.classStaffId" placeholder="请选择要分配的班主任" style="width: 100%;">
            <el-option v-for="item in headerteacherArr" :key="item.staffNumber" :label="item.staffName" :value="item.staffId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btnBox">
          <el-button @click="allotHearderTeacher = false">取 消</el-button>
          <el-button class="successBtn" @click="allotHearderTeacherRequest">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 调换班主任的弹框 -->
    <el-dialog title="调换班主任" :visible.sync="changeHearderTeacher" width="33%">
      <el-form :model="changeHearderTeacherForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="当前班主任">
          <el-input v-model="changeHearderTeacherForm.staffName" disabled></el-input>
        </el-form-item>
        <el-form-item label="调换班主任">
          <el-select v-model="changeHearderTeacherForm.classStaffId" placeholder="请选择要调换的班主任" style="width: 100%;">
            <el-option v-for="item in headerteacherArr" :key="item.staffNumber" :label="item.staffName" :value="item.staffId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btnBox">
          <el-button @click="changeHearderTeacher = false">取 消</el-button>
          <el-button class="successBtn" @click="changeHearderTeacherRequest">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分配任课老师的弹框 -->
    <el-dialog title="分配任课教师" :visible.sync="allotTeacher" width="33%">
      <el-form :model="allotTeacherForm" label-width="80px" class="demo-ruleForm">
        <el-form-item :label="item.subjectName + '老师'" v-for="item in allSubjectTeacherArr" :key="item.subjectId">
          <el-select v-model="allotTeacherForm[item.subjectId]" placeholder="请选择要分配的任课教师" style="width: 100%;">
            <el-option v-for="(teacher, i) in item.data" :key="i" :label="teacher.staffName" :value="teacher.staffId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btnBox">
          <el-button @click="allotTeacher = false">取 消</el-button>
          <el-button class="successBtn" @click="allotTeacherRequest">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 调换教室的弹框 -->
    <el-dialog title="调换教室" :visible.sync="changeClassRoom" width="33%">
      <el-form :model="changeClassRoomForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="当前教室">
          <el-input v-model="changeClassRoomForm.classroomName" disabled></el-input>
        </el-form-item>
        <el-form-item label="调换教室">
          <el-select v-model="changeClassRoomForm.classClassroomId" placeholder="请选择要调换的教室" style="width: 100%;">
            <el-option v-for="item in classRoomArr" :key="item.classroomId" :label="item.classroomName" :value="item.classroomId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btnBox">
          <el-button @click="changeClassRoom = false">取 消</el-button>
          <el-button class="successBtn" @click="changeClassRoomRequest">确 定</el-button>
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
        gradeId: '',
        clazzId: ''
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
      headerteacherArr: [], //所有非班主任老师
      subjectArr: [], //所有的学科
      allotHearderTeacher: false, //显示分配班主任的弹框
      allotHearderTeacherForm: {}, //分配班主任
      changeHearderTeacher: false,
      changeHearderTeacherForm: {}, //调换班主任
      allotTeacher:false,
      allotTeacherForm: {}, //分配任课教师
      allSubjectTeacherArr: [], //老师和科目匹配的数据
      changeClassRoom: false, //调换教室
      changeClassRoomForm: {
        classroomName: ''
      }
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
        this.tableData = data.data;
        this.totalLength = data.count;
      })
    },
    getTotalClassData(){ //获取所有班级
      this.getAllData({
        name: 'CLASS_TOTALDATA',
        data: {}
      }).then(data => {
        this.classAllArr = data.data;
      })
    },
    getAllGrade(){ //获取年级
      this["teacherModules/SearchAllGradeAction"]({
        name: 'GRADE_ALL',
        data: {}
      })
    },
    handleCurrentChange(val) { // 获取页码
      this.page = val;
      this.getAllClass()
    },
    addClassRequest() {  // 添加班级
      this.addClass = false;
      if(this.validClassName == 0){
        // 名字不重复时提交请求 CLASS_ADD
        this.InsertDateT({
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
        this.classArr = data.data;
      })
    },
    getClassRoomNotUse(){  //获取没有班级的空教室
      this["teacherModules/SearchAllClassRoomAction"]({
        name: 'CLASSROOM_NOTUSE',
        data: {}
      })
    },
    getHeaderTeacher(){  //获取没有当班主任的老师
      this.getAllData({
        name: 'SELECT_HEADERTEACHER'
      }).then(data=>{
        this.headerteacherArr = data.data;
      })
    },
    changeClassRoomShow(classid, classroomName){ //调换教室
      this.changeClassRoom = true;
      this.changeClassRoomForm.classroomName = classroomName;
      this.changeClassRoomForm.classId = classid;
    },
    changeClassRoomRequest(){ //调换教室请求
      console.log(this.changeClassRoomForm);
      this.ModifyDateT({
        name: 'SELECT_UPDATE',
        data: this.changeClassRoomForm
      }).then(data=>{
        this.changeClassRoom = false;
        console.log(data);
        this.getAllClass()
      })
    },
    allotHearderTeacherShow(id){  //分配班主任的弹框显示
      this.allotHearderTeacher = true;
      this.allotHearderTeacherForm.classId = id;
    },
    allotHearderTeacherRequest(){ //分配班主任的请求
      this.ModifyDateT({
        name: 'SELECT_UPDATEHEADERTEACHER',
        data: this.allotHearderTeacherForm
      }).then(data=>{
        this.allotHearderTeacher = false;
        console.log(data);
        this.getAllClass();
        this.allotHearderTeacherForm = false;
        this.getHeaderTeacher();
      })
    },
    changeHeaderTeacherShow(id, name, oldClassStaffId){
      this.changeHearderTeacherForm.staffName = name;
      this.changeHearderTeacherForm.oldClassStaffId = oldClassStaffId;
      this.changeHearderTeacherForm.classId = id;
      this.changeHearderTeacher = true;
    },
    changeHearderTeacherRequest(){ //调换班主任的请求
      this.ModifyDateT({
        name: 'SELECT_UPDATEHEADERTEACHER',
        data: this.changeHearderTeacherForm
      }).then(data=>{
        this.changeHearderTeacher = false;
        console.log(data);
        this.getAllClass();
        this.getHeaderTeacher();
        this.changeHearderTeacherForm.classStaffId = null
      })
    },
    allotTeacherShow(id){ //分配任课教师的显示
      this.classId = id;
      this.allotTeacher = true;
    },
    allotTeacherRequest(){ //分配任课教师的请求
      let arr = [];
      for(let k in this.allotTeacherForm){
        arr.push({subjectId: parseInt(k), staffId: this.allotTeacherForm[k]})
      }
      this.ModifyDateT({
        name: 'SELECT_UPDATETEACHER',
        data: {
          clazzId: this.classId,
          teacherParams: arr
        }
      }).then(data=>{
        this.allotTeacher = false;
        console.log(data);
        this.getAllClass()
      })
    },
    getTeacherBySubject(){ //获取教当前科目的老师
      this.subjectArr.forEach(item => {
        this.getAllDataT({
          name: "STAFF_SELECT",
          data: {
            subjectId: item.subjectId
          }
        }).then(data=>{
          this.allSubjectTeacherArr.push({subjectId: item.subjectId, subjectName: item.subjectName, data: data.data})
        });
      });
      
    },
    searchInfo(){
      this.searchForm.page = this.page;
      this.searchForm.pageSize = this.pageSize;
      this.getAllData({
        name: 'CLASS_ALL',
        data: this.searchForm
      }).then(data => {
        this.tableData = data.data;
        this.totalLength = data.count;
      })
    },
    resizeFn(){
      this.searchForm = {
        gradeId: '',
        clazzId: ''
      }
      this.getAllClass();
    },
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
    this.getHeaderTeacher() //获取所有不是班主任的老师
    this.subjectArr = this.$store.state.teacherModules.subject;
    this.getTeacherBySubject();
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