<template>
  <div class="teInfo">
    <!-- 面包屑导航部分 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>师资管理</el-breadcrumb-item>
      <el-breadcrumb-item>教师信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 搜索部分 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-button class="successBtn" @click="addTeacher = true">添加教师</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.subjectId" placeholder="请选择科目">
          <el-option v-for="item in subjectArr.subject" :key="item.subjectId" :label="item.subjectName" :value="item.subjectId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.staffNumber" placeholder="请输入教师编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain class="plainBtn" @click="searchFn">查询</el-button>
        <el-button type="info" plain @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <el-table :data="tableData" style="width: 96%" :header-cell-style="{ background: '#D4EDF9', color: '#000' }">
      <el-table-column prop="staffNumber" label="教师编号" align="center"></el-table-column>
      <el-table-column prop="staffName" label="姓名" align="center" width="100px"></el-table-column>
      <el-table-column prop="subjectId" label="课程代号" align="center" width="80px"></el-table-column>
      <el-table-column prop="subjectName" label="课程名称" align="center"></el-table-column>
      <el-table-column prop="staffDesc" label="教师描述" align="center"></el-table-column>
      <el-table-column prop="staffAge" label="教师年龄" align="center" width="100px"></el-table-column>
      <el-table-column prop="staffPhone" label="电话" align="center"></el-table-column>
      <el-table-column prop="roleId" label="教师身份" align="center"></el-table-column>
      <el-table-column prop="staffEntryTime" label="入职时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button class="editBtn" icon="el-icon-edit" circle  @click="modifyDialogShow(scope.row)"></el-button>
          <el-button class="deleteBtn" type="danger" icon="el-icon-delete" circle @click="deleteTeacherRequest(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码 -->
    <el-pagination layout="prev, pager, next" :total="totalLength" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>

    <!-- 模态框 -->
    
    <!-- 添加老师的模态框 -->
    <el-dialog title="添加教师" :visible.sync="addTeacher" width="33%">

      <el-form :model="addTeachForm" :rules="addTeachrules" ref="addTeachForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="staffName">
          <el-input v-model="addTeachForm.staffName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="staffPhone">
          <el-input v-model="addTeachForm.staffPhone"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="staffAge">
          <el-input v-model.number="addTeachForm.staffAge"></el-input>
        </el-form-item>
        <el-form-item label="入职日期" prop="staffEntryTime">
          <el-date-picker v-model="addTeachForm.staffEntryTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="科目" prop="subjectId">
          <el-select v-model="addTeachForm.subjectId" placeholder="请选择科目" style="width: 100%;">
            <el-option v-for="item in subjectArr.subject" :key="item.subjectId" :label="item.subjectName" :value="item.subjectId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教师描述" prop="staffDesc">
          <el-input type="textarea" v-model="addTeachForm.staffDesc"></el-input>
        </el-form-item>
        <el-form-item class="btnBox">
          <el-button @click="addTeacher = false">取 消</el-button>
          <el-button class="successBtn" @click="addTeacherRequest('addTeachForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑老师的模态框 -->
    <el-dialog title="修改教师信息" :visible.sync="editTeacher" width="33%">
      <el-form :model="editTeachForm" :rules="addTeachrules" ref="editTeachForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="staffName">
          <el-input v-model="editTeachForm.staffName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="staffPhone">
          <el-input v-model="editTeachForm.staffPhone"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="staffAge">
          <el-input v-model.number="editTeachForm.staffAge"></el-input>
        </el-form-item>
        <el-form-item label="教师描述" prop="staffDesc">
          <el-input type="textarea" v-model="editTeachForm.staffDesc"></el-input>
        </el-form-item>
        <el-form-item class="btnBox">
          <el-button @click="editTeacher = false">取 消</el-button>
          <el-button class="successBtn" @click="modifyTeacherRequest('editTeachForm')">确 定</el-button>
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
    // 手机号验证
    const validatorPhone = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      tableData: [], //总数据
      pageSize: 8, //一页显示多少条
      totalLength: 20, //一共有多少条数据
      page: 1,
      searchForm: {
        subjectId: "",
        staffNumber: ""
      },
      addTeacher: false, //控制添加老师的弹框显示隐藏
      addTeachForm: {
        staffName: '',
        staffPhone: '',
        staffAge: '',
        subjectId: '',
        staffDesc: '',
        staffEntryTime: '',
        staffStatus: 0
      },
      subjectArr:[],
      editTeacher: false, //控制修改老师的弹框显示隐藏
      editTeachForm: {
        staffName: '',
        staffPhone: '',
        staffAge: '',
        staffDesc: '',
      },
      addTeachrules: {
        staffName: [
          { required: true, message: '请输入教师姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        staffPhone: [
          { required: true, validator: validatorPhone, trigger: 'blur' }
        ],
        staffAge: [
          { required: true, message: '年龄不能为空'},
          { type: 'number', message: '年龄必须为数字值'}
        ],
        subjectId: [
          { required: true, message: '请选择科目', trigger: 'change' }
        ],
        staffDesc: [
          { required: true, message: '请填写教师描述', trigger: 'blur' }
        ],
        staffEntryTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
      },
      delTeacher: false, //控制删除老师的弹框显示隐藏
    };
  },
  mixins: [TeachInfoMixins, TeacherMixins], //使用mixins里的模块
  methods: {
    ...mapActions(["teacherModules/SearchAllDataAction"]),
    handleCurrentChange(val) { // 获取页码
      this.page = val;
      this.getAllTeacher();
    },
    validInfo(formName, successCallback, errorCallback){ //验证的方法封装
      this.$refs[formName].validate(valid => {
          if (valid) {
            // 接收处理验证成功以后的操作的回调函数
            successCallback && successCallback(); // 逻辑中断
          } else {
            // 接收处理验证失败以后的操作的回调函数
            errorCallback && errorCallback();
            return false;
          }
        });
    },
    addTeacherRequest(formName){ //添加老师的请求
      // this.validInfo(接收的表单名字，成功的函数，失败的函数)
      this.validInfo(formName, ()=>{
        // 验证成功需要穿过去的回调函数
        // 在这里写请求
        this.InsertDate({
          name: 'STAFF_ADD',
          data: this.addTeachForm
        }).then(data=> {
          console.log(data);
          this.getAllTeacher();
          this.addTeacher = false; // 请求之后关闭弹框
          this.$refs[formName].resetFields(); //清空输入框里的内容
          this.openSuccess("成功", "该教师已成功添加!"); //添加成功以后的弹框
        })
        
      }, ()=>{
        // 验证失败传过去的回调函数
        this.openError("错误", "您的消息填写有误，未能提交!"); //添加失败以后的弹框
      })
    },
    modifyDialogShow(row){ //打开修改教师数据的弹框
      this.editTeacher = true;
      this.editTeachForm = {
        staffName: row.staffName,
        staffPhone: row.staffPhone,
        staffAge: row.staffAge,
        staffDesc: row.staffDesc,
        staffId: row.staffId
      }
    },
    modifyTeacherRequest(formName){ //修改教师数据
      this.validInfo(formName, ()=>{
        // 验证成功需要穿过去的回调函数
        // 在这里写请求
        this.ModifyDate({
          name: 'STAFF_UPDATE',
          data: this.editTeachForm
        }).then(data=>{
          console.log(data);
          this.editTeacher = false; // 请求之后关闭弹框
          this.getAllTeacher()
        })
      }, ()=>{
        // 验证失败传过去的回调函数
        this.openError("错误", "您的消息填写有误，未能提交!"); //添加失败以后的弹框
      })
    },
    deleteTeacherRequest(row){ //删除教师信息的请求
      console.log(row);
      // 调用删除的方法，需要参数
      this.DeleteData({
        name: "STAFF_DELETE",
        data: {staffIds: [row.staffId]}
      }).then(data=>{
        console.log(data);
        this.getAllTeacher();
      });
    },
    searchFn(){ //搜索的方法
      this.searchForm.limit = this.pageSize;
      this.searchForm.page = this.page;
      this.getAllDataT({
        name: "STAFF_SELECT",
        data: this.searchForm
      }).then(data=>{
          data.data.map(item=> item.roleId = item.roleList.length > 0 ? '班主任' : '任课教师');
          this.tableData = data.data;
          this.totalLength = data.count;
      });
    },
    resetFn(){ //重置的方法
      this.searchForm = {
        subjectId: "",
        staffNumber: ""
      }
      this.getAllTeacher();
    },
    getAllSubject(){ //获取科目
      this["teacherModules/SearchAllDataAction"]({
        name: 'SUBJECT_ALL'
      }).then(data => {
        console.log(data);
      })
    },
    getAllTeacher(){ //查询第一页教师
      this.getAllDataT({
        name: 'STAFF_SELECT',
        data: {
          page: this.page,
          limit: this.pageSize
        }
      }).then(data => {
        console.log(121212,data.data);
        data.data.map(item=> item.roleId = item.roleList.length > 1 ? '班主任、任课教师' : '任课教师');
        this.tableData = data.data;
        this.totalLength = data.count;
      })
    }
  },
  created(){
    this.getAllSubject(); //获取所有学科
    this.subjectArr = this.$store.state.teacherModules;  // 科目信息
    this.getAllTeacher(); //获取当前页的老师
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