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
        <el-button
          class="addExamBtn"
          @click="(dialogAddExam = true), addExamFn()"
          >发起考试</el-button
        >
      </div>
      <div class="selectExam">
        <el-input
          v-model="examSelectId"
          placeholder="请输入查询的考试编号"
        ></el-input>
        <el-date-picker
          v-model="searchStartDate"
          type="date"
          placeholder="选择查询开始日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-date-picker
          v-model="searchEndDate"
          type="date"
          placeholder="选择查询结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-button plain class="selectExamBtn" @click="searchExamInfo()"
          >查询考试信息</el-button
        >
        <el-button type="info" plain @click="resetExamInfo()">重置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="examTable">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#D4EDF9', color: 'rgb(54, 53, 53)' }"
      >
        <el-table-column prop="examUuid" label="考试编号" align="center">
        </el-table-column>
        <el-table-column prop="examName" label="考试名称" align="center">
        </el-table-column>
        <el-table-column prop="examTypeName" label="考试类型" align="center">
        </el-table-column>
        <el-table-column prop="examTimeStr" label="考试时间" align="center">
        </el-table-column>
        <el-table-column prop="staffName" label="考试发起人" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="delExam(scope.row.examId)"
              type="danger"
              plain
              round
              v-if="scope.row.examTimeMS2 > Date.now()"
              icon="el-icon-delete"
              >取消考试</el-button
            >
            <el-button
              size="mini"
              type="success"
              plain
              round
              @click="
                selectExamClassList(scope.row), (dialogSelectClassList = true)
              "
              icon="el-icon-search"
              >查看考试班级/年级</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 页码 -->
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="pageTotal"
        :page-size="pageSize"
        @current-change="changePage"
      ></el-pagination>
    </div>
    <!-- 发起考试模态框 -->
    <el-dialog title="发起考试" :visible.sync="dialogAddExam">
      <el-form
        :model="addExamFormData"
        :rules="rules"
        ref="addExamFormData"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="考试名称" prop="examName">
          <el-input v-model="addExamFormData.examName"></el-input>
        </el-form-item>
        <!-- 班主任和家长发起的考试 -->
        <el-form-item
          label="考试班级"
          prop="classList"
          v-if="
            $store.state.loginModules.userShenfen == '老师' ||
            $store.state.loginModules.userShenfen == '班主任'
          "
        >
          <el-checkbox-group v-model="addExamFormData.classList">
            <el-checkbox
              :label="item.classId"
              name="classList"
              v-for="item in classTeacherArr"
              :key="item.className"
              >{{ item.gradeName+' '+item.className }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="考试年级"
          prop="classList"
          v-if="$store.state.loginModules.userShenfen == '管理员'"
        >
          <el-checkbox-group v-model="addExamFormData.classList">
            <el-checkbox
              :label="item.gradeId"
              name="classList"
              v-for="item in classArr"
              :key="item.gradeId"
              >{{ item.gradeName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="考试科目"
          prop="subjectList"
          v-if="$store.state.loginModules.userShenfen == '管理员'"
        >
          <el-checkbox-group v-model="addExamFormData.subjectList">
            <el-checkbox
              :label="item.subjectId"
              name="classList"
              v-for="item in subjectArr"
              :key="item.subjectId"
              >{{ item.subjectName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="考试科目"
          prop="name"
          v-if="
            $store.state.loginModules.userShenfen == '老师' ||
            $store.state.loginModules.userShenfen == '班主任'
          "
        >
          <el-input v-model="subjectNameTeacher" disabled></el-input>
        </el-form-item>
        <el-form-item label="考试日期" required>
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="addExamFormData.date1"
              style="width: 100%"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="考试时间" required>
          <el-form-item prop="time2">
            <el-time-picker
              is-range
              v-model="addExamFormData.time2"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              type="fixed-time"
              value-format="HH:mm:ss"
            >
            </el-time-picker>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddExam = false">取 消</el-button>
        <el-button class="addExamBtn" @click="addExamTrue('addExamFormData')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 查看考试班级模态框 -->
    <el-dialog title="查看考试班级/年级" :visible.sync="dialogSelectClassList">
      <el-table :data="selectExamClassData">
        <el-table-column
          property="examUuid"
          label="考试编号"
          align="center"
        ></el-table-column>
        <el-table-column
          property="examName"
          label="考试名称"
          align="center"
        ></el-table-column>
        <el-table-column
          property="classOrGrade"
          align="center"
          label="考试班级/年级"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import examMixins from "../mixins/examMixins";
export default {
  data() {
    return {
      examSelectId: "", //查询的考试编号
      selectClassList: [], //查询的考试年级
      tableData: [], //表格数据
      // 页码
      pageTotal: 0,
      pageSize: 8,
      nowPage: 1,
      dialogAddExam: false,
      // 模态框数据
      classArr: [], //管理员的班级年级
      subjectArr: [], //管理员的科目
      classTeacherArr:[],//老师班主任的班级年级
      subjectNameTeacher:'',//老师班主任的科目名称
      // form的
      addExamFormData: {
        examName: "",
        date1: "",
        time2: "",
        delivery: false,
        classList: [],
        subjectList: [],
      },
      // 日期选择器条件不能添加之前的日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
      rules: {
        examName: [
          { required: true, message: "请输入考试名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        date1: [
          {
            // type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        time2: [
          {
            // type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        classList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个班级/年级",
            trigger: "change",
          },
        ],
        subjectList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个科目",
            trigger: "change",
          },
        ],
      },
      dialogSelectClassList: false, // 查看班级信息模态框
      selectExamClassData: [],
      searchStartDate: "", //搜索的开始日期
      searchEndDate: "", //搜索的结束日期
    };
  },
  mixins: [examMixins],
  methods: {
    // 取消考试
    delExam(id) {
      console.log(id);
      this.mixinDelFn({
        name: "DELEXAM",
        data: {
          examId: id,
        },
      }).then((data) => {
        if (data == 200) {
          this.selectExam();
        }
      });
    },
    // 查询考试
    selectExam() {
      this.seletcExamInfo({
        name: "SELECTEXAMALL",
        data: {
          limit: this.pageSize,
          page: this.nowPage,
        },
      }).then((data) => {
        if (data.code == 200) {
          this.tableData = data.data;
          // 判断考试类型
          this.tableData.forEach((item) => {
            item.examTypeName =
              item.examTypeId == 1
                ? "班级考"
                : item.examTypeId == 2
                ? "年级考"
                : "123";
            item.examTimeStr = item.examDate + " " + item.examTime;
            item.examTimeMS = item.examDate.replace(new RegExp("-", "gm"), "/");
            item.examTimeMS2 = new Date(item.examTimeMS).getTime();
          });
          this.pageTotal = data.count;
        }
      });
    },
    changePage(num) {
      this.nowPage = num;
      this.selectExam();
    },
    // 发起考试
    addExamFn() {
      this.seletcExamInfo({
        name: "SELECTEXAMCLASS",
        data: {},
      }).then((data) => {
        console.log(data);
        // 管理员
        if (data.data.status == 1) {
          this.classArr = data.data.grades;
          this.subjectArr = data.data.subjects;
        } else if (data.data.status == 2) {
          // 老师班主任
          this.classTeacherArr=data.data.clazzes;
          this.subjectNameTeacher=data.data.subjectName;
        }
      });
    },
    // 确定添加考试
    addExamTrue(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogAddExam = false;
          let tempobj = {
            examDate: this.addExamFormData.date1,
            examName: this.addExamFormData.examName,
            examTime:this.addExamFormData.time2[0] +"-" +this.addExamFormData.time2[1],
            objectIds: this.addExamFormData.classList,
            subjectIds: this.addExamFormData.subjectList,
          };
          console.log(tempobj);
          this.addExamInfo({
            name: "ADDEXAM",
            data: tempobj,
          }).then((data) => {
            console.log(data);
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: data.msg,
              });
              this.addExamFormData = {
                examName: "",
                date1: "",
                time2: "",
                delivery: false,
                classList: [],
                subjectList: [],
              };
              this.selectExam();
            } else {
              this.$message({
                type: "error",
                message: data.msg,
              });
              this.addExamFormData = {
                examName: "",
                date1: "",
                time2: "",
                delivery: false,
                classList: [],
                subjectList: [],
              };
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 查看考试班级
    selectExamClassList(obj) {
      let uuid = obj.examUuid;
      this.seletcExamInfo({
        name: "SELECTCLASSLIST",
        data: {
          examUUID: uuid,
        },
      }).then((data) => {
        console.log(data);
        this.selectExamClassData = data.data;
        data.data.forEach((item) => {
          if (item.className == null) {
            item.className = "";
          }
          item.classOrGrade = item.gradeName + item.className;
        });
        this.selectExamClassData.forEach((item) => {
          item.examUuid = obj.examUuid;
          item.examName = obj.examName;
        });
      });
    },
    // 搜索考试
    searchExamInfo() {
      this.seletcExamInfo({
        name: "SELECTEXAMALL",
        data: {
          limit: this.pageSize,
          page: this.nowPage,
          endDate: this.searchEndDate,
          examUUID:this.examSelectId,
          startDate: this.searchStartDate,
        },
      }).then(data=>{
        this.tableData = data.data;
          // 判断考试类型
          this.tableData.forEach((item) => {
            item.examTypeName =
              item.examTypeId == 1
                ? "班级考"
                : item.examTypeId == 2
                ? "年级考"
                : "123";
            item.examTimeStr = item.examDate + " " + item.examTime;
            item.examTimeMS = item.examDate.replace(new RegExp("-", "gm"), "/");
            item.examTimeMS2 = new Date(item.examTimeMS).getTime();
          });
          this.pageTotal = data.count;
      })
    },
    // 搜索栏--重置按钮
    resetExamInfo(){
      this.selectExam()
      this.searchStartDate="";//搜索的开始日期
      this.searchEndDate=''; //搜索的结束日期
      this.examSelectId='';
    }
  },
  created() {
    this.selectExam();
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
  // color: rgb(54, 53, 53);
}
// 搜索栏：
.searchBox {
  padding-left: 1.5%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 1rem 1rem;
}
.el-date-editor.el-input[data-v-51faa29e],
.el-date-editor.el-input__inner[data-v-51faa29e] {
  width: 100%;
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
  .el-date-editor.el-input[data-v-51faa29e]{
    width: 18%;
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
.el-pagination {
  text-align: center;
  margin-top: 2rem;
}
/deep/.el-dialog {
  width: 33%;
}
// 新增考试模态框
.addpeople {
  width: 50%;
}
.el-select {
  width: 100%;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-form-item__label {
  width: 100px !important;
  padding: 0;
}
.addpeople {
  width: 100%;
}
</style>