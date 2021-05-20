/* eslint-disable no-undef */
<template>
  <div style="width: 95%; margin: 0 auto">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>教学管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="form-box" style="margin-top: 15px">


      <!-- 下拉选择框年级-->
      <el-select
        v-model="gradeValue"
        placeholder="一年级"
        style="margin-right: 15px"
        @change="handleGrade"
      >
        <el-option
          v-for="item in gradeData"
          :key="item.gradeId"
          :label="item.gradeName"
          :value="item.gradeId"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>

      <!-- 下拉选择框班级 -->
      <el-select
        v-model="classValue"
        placeholder="请选择班级"
        style="margin-right: 15px"
        @change="handleGlass"
      >
        <el-option
          v-for="item in tableData"
          :key="item.classId"
          :label="item.className"
          :value="item.classId"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>


      <!-- 提交按钮 -->
      <el-popover
        placement="top"
        width="160"
        v-model="visible"
        style="margin-left: 15px"
      >
        <p>是否提交</p>
        <div style="text-align: center; margin: 0">
          <el-button size="mini" type="text" @click="visible = false"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="visible = false"
            >确定</el-button
          >
        </div>
        <el-button
          slot="reference"
          style="color: #53b08a; background: white; border: 1px solid #53b08a"
          @click="tijiaoclass"
          >提交</el-button
        >
      </el-popover>
    </div>

    <!-- 课程表 -->
    <el-table :data="newtableData" border style="width: 100%">
      <el-table-column prop="week" label="week"> </el-table-column>
      <el-table-column prop="className" :label = this.classNametable>
        <el-table-column prop="courseOne" label="第一节课"> </el-table-column>
        <el-table-column prop="courseTwo" label="第二节课"> </el-table-column>
        <el-table-column prop="courseThree" label="第三节课"> </el-table-column>
        <el-table-column prop="courseFour" label="第四节课"> </el-table-column>
        <el-table-column prop="courseFive" label="第五节课"> </el-table-column>
        <el-table-column prop="courseSix" label="第六节课"> </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <!-- 修改课程表 -->
    <el-dialog title="修改课程" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="班级名称" :label-width="formLabelWidth">
          <div>
            <el-input
              v-model="form.className"
              clearable
              disabled
              style="width: 200px; margin-right: 15px"
            >
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="第一节课" :label-width="formLabelWidth">
          <div>
            <el-select v-model="form.courseOne" placeholder="请选择学科科目">
              <el-option label="语文" value="yuwen"></el-option>
              <el-option label="数学" value="shuxue"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="第二节课" :label-width="formLabelWidth">
          <el-select v-model="form.courseTwo" placeholder="请选择学科科目">
            <el-option label="语文" value="yuwen"></el-option>
            <el-option label="数学" value="shuxue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第三节课" :label-width="formLabelWidth">
          <el-select v-model="form.courseThree" placeholder="请选择学科科目">
            <el-option label="语文" value="yuwen"></el-option>
            <el-option label="数学" value="shuxue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第四节课" :label-width="formLabelWidth">
          <el-select v-model="form.courseFour" placeholder="请选择学科科目">
            <el-option label="语文" value="yuwen"></el-option>
            <el-option label="数学" value="shuxue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第五节课" :label-width="formLabelWidth">
          <el-select v-model="form.courseFive" placeholder="请选择学科科目">
            <el-option label="语文" value="yuwen"></el-option>
            <el-option label="数学" value="shuxue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第六节课" :label-width="formLabelWidth">
          <el-select v-model="form.courseSix" placeholder="请选择学科科目">
            <el-option label="语文" value="yuwen"></el-option>
            <el-option label="数学" value="shuxue"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bianji from "../mixins/courseALL";
export default {
  data() {
    return {
      gradeValue:'',
      classValue:'',
      visible: false,
      gradeclassAate: [],
      weekAll: [
        {
          value: "选项1",
          name: "第一周",
        },
        {
          value: "选项2",
          name: "第二周",
          // disabled: true,
        },
        {
          value: "选项3",
          name: "第三周",
        },
        {
          value: "选项4",
          name: "第四周",
        },
        {
          value: "选项5",
          name: "第五周",
        },
      ],
      tableData: [],//班级
      newtableData: [],//新班级
      gradeData:[],//年级
      formLabelWidth: "30%",
      form: {
        classId: "",
        className: "",
        courseOne: "",
        courseTwo: "",
        courseThree: "",
        courseFour: "",
        courseFive: "",
        courseSix: "",
      },
      value: [],
      list: [],
      loading: false,
      dialogFormVisible: false,
      classNametable:''
    };
  },
  mixins: [bianji],

  methods: {
    handleClick(row) {
      console.log(row);

    },
    handleSubmit() {

  
      // this.$http.post('url', this.form).then((res) => {
      //   console.log(res)
      //   this.dialogFormVisible = false
      // }).catch((err) => {
      //   console.log(err)
      // })
    },
    handleGrade(){    //班级change函数班级
      this.classallList({
        name: "CLASS_ALL",
        data: {gradeId:this.gradeValue},
      }).then((data) => {
        console.log(123)
        console.log(data.data)
        this.tableData = data.data
      }); 
    },
  
    gradeAllList(){  //获取年级信息
      this.gradeallList({
        name:"GRADE_ALL",
        data:{},
      }).then((data)=>{
        this.gradeData = data.data
      })
    },

    handleGlass(){
       console.log(this.gradeValue)
       console.log(this.classValue)
        this.classallList({
        name: "CLASS_ALL",
        data: {gradeId:this.gradeValue,clazzId:this.classValue},
      }).then((data) => {
        console.log(123)
        console.log(data.data)
        this.newtableData = data.data
        this.classNametable=data.data[0].gradeName+' '+data.data[0].className
      }); 
    },
    tijiaoclass() {},
  },
  created() {
    this.gradeAllList();
   
  },
};
</script>


<style lang="less" scoped>
.form-box {
  display: flex;
  margin-bottom: 2px;
  padding-bottom: 15px;
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

el-button :active {
  background-color: #b2dbd4;
  border: 1px solid #b2dbd4;
  color: #fff;
}
</style>