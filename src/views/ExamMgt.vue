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
        <el-button class="addExamBtn" @click="dialogAddExam = true"
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="考试编号" align="center">
        </el-table-column>
        <el-table-column prop="type" label="考试类型" align="center">
        </el-table-column>
        <el-table-column prop="class" label="考试班级" align="center">
        </el-table-column>
        <el-table-column prop="time" label="考试时间" align="center">
        </el-table-column>
        <el-table-column prop="people" label="考试发起人" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
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
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 页码 -->
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="70"></el-pagination>
    </div>
    <!-- 发起考试模态框 -->
    <el-dialog title="发起考试" :visible.sync="dialogAddExam">
      <el-form
        :model="addExamFormData"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="考试年级" label-width="100px" prop="grade">
          <el-select
            v-model="addExamFormData.grade"
            placeholder="请选择考试年级"
          >
            <el-option label="一年级" value="shanghai"></el-option>
            <el-option label="二年级" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试类型" label-width="100px" prop="type">
          <el-select
            v-model="addExamFormData.type"
            placeholder="请选择考试类型"
          >
            <el-option label="中考" value="shanghai"></el-option>
            <el-option label="月考" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试日期" label-width="100px" prop="date1">
          <el-date-picker
            v-model="addExamFormData.date1"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerAddExamDate"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="考试发起人" label-width="100px">
          <el-input
            v-model="addExamFormData.people"
            class="addpeople"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddExam = false">取 消</el-button>
        <el-button class="addExamBtn" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      examSelectId: "", //查询的考试编号
      selectClassList: [], //查询的考试年级
      tableData: [
        //渲染的表格数据
        {
          id: "1",
          type: "中考",
          people: "老王",
          class: "1班",
          time: "2021/5/10",
        },
        {
          id: "2",
          type: "中考",
          people: "老王",
          class: "1班",
          time: "2021/5/10",
        },
      ],
      dialogAddExam: false, //发起考试模态框
      addExamFormData: {
        grade: "",
        type:'',
        date1:'',
      }, //模态框 表单数据
      // 发起考试的日期选择
      pickerAddExamDate: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      }, //日期选择器
      // addExamData: "", //发起考试时间
      ruleForm: {
        grade: "",
        type: "",
        date1: "",
      },
      rules: {
        grade: [
          { required: true, message: "请选择考试年级", trigger: "change" },
        ],
        type: [
          { required: true, message: "请选择考试类型", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
    };
  },
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
    // 修改考试信息
    modifyExam(obj) {
      console.log(obj);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        console.log(this.date1);
        console.log(this.grade);
        if (valid) {
          this.dialogAddExam = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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