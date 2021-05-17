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
        <el-select v-model="selectClassList" placeholder="请选择查询的考试年级">
          <el-option label="高一一班" value="shanghai"></el-option>
          <el-option label="高一二班" value="beijing"></el-option>
        </el-select>
        <el-button plain class="selectExamBtn">查询考试信息</el-button>
        <el-button type="info" plain>重置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="examTable">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#D4EDF9', color: 'rgb(54, 53, 53)' }"
      >
        <el-table-column prop="examId" label="考试编号" align="center">
        </el-table-column>
        <el-table-column prop="examName" label="考试名称" align="center">
        </el-table-column>
        <el-table-column prop="examTypeName" label="考试类型" align="center">
        </el-table-column>
        <el-table-column prop="examTime" label="考试时间" align="center">
        </el-table-column>
        <el-table-column prop="staffName" label="考试发起人" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="400">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="delExam(tableData[scope.$index].id)"
              type="danger"
              plain
              round
              >取消考试</el-button
            >
            <el-button
              size="mini"
              type="warning"
              plain
              round
              @click="modifyExam(scope.row)"
              >修改考试信息</el-button
            >
            <el-button
              size="mini"
              type="warning"
              plain
              round
              @click="selectExamClass(scope.row)"
              >查看考试班级</el-button
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
        <el-form-item label="考试年级/班级" prop="classList">
          <el-checkbox-group v-model="addExamFormData.classList">
            <el-checkbox :label="item.className" name="classList" v-for="item in dataArr" :key='item.classId'></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="考试科目" prop="subjectList">
          <el-checkbox-group v-model="addExamFormData.subjectList">
            <el-checkbox :label="item.subjectList" name="classList" v-for="item in subjectArr" :key='item.classId'></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="考试科目" prop="name">
          <el-input v-model="addExamFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="addExamFormData.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                v-model="addExamFormData.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddExam = false">取 消</el-button>
        <el-button class="addExamBtn" @click="addExamTrue('addExamFormData')">确 定</el-button
        >
      </div>
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
      dataArr: [],
      subjectArr:[],
      addExamFormData: {
        name: "",
        date1: "",
        date2: "",
        delivery: false,
        classList: [],
        subjectList:[],
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
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
    };
  },
  mixins: [examMixins],
  methods: {
    // 取消考试
    delExam(obj) {
      console.log(obj);
      // this.mixinDelFn({
      //   name: "POST_DELDROM_API",
      //   method: "post",
      //   params: {
      //     id: val,
      //   },
      // }).then((data) => {
      //   if (data == 200) {
      //     this.getSusheData();
      //   }
      // });
    },
    // 查询考试
    selectExam() {
      this.seletcExamInfo({
        name: "SELECTEXAMALL",
        data: {
          examParam: {
            limit: this.pageSize,
            page: this.nowPage,
          },
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
        this.dataArr=data.data;
        this.subjectArr=data.data;

      });
    },
    // 修改考试信息
    modifyExam(obj) {
      console.log(obj);
    },
    addExamTrue(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogAddExam = false;
          console.log(this.addExamFormData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 查看考试班级
    selectExamClass(obj) {
      console.log(obj);
    },
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