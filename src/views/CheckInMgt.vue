<template>
  <div class="checkInBox">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>教学管理</el-breadcrumb-item>
      <el-breadcrumb-item>考勤管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 搜索栏 -->
    <div class="searchBox">
      <div class="addAbsence">
        <el-button class="addAbsenceBtn">添加缺勤记录</el-button>
      </div>
      <div class="selectAbsenceExam">
        <el-input
          v-model="selectStuName"
          placeholder="请输入学生姓名"
        ></el-input>
        <el-date-picker
          v-model="CheckInDateStart"
          align="right"
          type="date"
          placeholder="选择开始日期"
          :picker-options="pickerCheckInDate"
        >
        </el-date-picker>
        <el-date-picker
          v-model="CheckInDateEnd"
          align="right"
          type="date"
          placeholder="选择结束日期"
          :picker-options="pickerCheckInDate"
        >
        </el-date-picker>
        <el-button plain class="selectAbsenceBtn">查看考勤信息</el-button>
        <el-button type="info" plain>重置</el-button>
      </div>
    </div>
    <div class="mainbox">
      <!-- 表格 -->
      <div class="checkInTable">
        <el-table :data="checkInTableData" style="width: 100%">
          <el-table-column prop="id" label="学生id" align="center" width="100"> </el-table-column>
          <el-table-column prop="name" label="学生姓名" align="center" width="150"> </el-table-column>
          <el-table-column prop="startTime" label="上学打卡时间" align="center" width="250"> </el-table-column>
          <el-table-column prop="endTime" label="放学打卡时间" align="center" width="300"> </el-table-column>
          <el-table-column label="操作" align="center">
            <template>
              <!--  slot-scope="scope" -->
              <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 图表 -->
      <div
        id="checkInEchartsBox"
        ref="myChart"
        style="width: 600px; height: 400px"
      ></div>
    </div>
  </div>
</template>
<script>
import examMixins from '../mixins/examMixins'
export default {
  data() {
    return {
      selectStuName: "",
      selectAbsenceList: [], //查询的考勤年级
      pickerCheckInDate: {
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
      },
      CheckInDateStart: "",
      CheckInDateEnd: "",
      checkInTableData: [
        {id:1,name:'大大',startTime:'2021年5月12日 8:30',endTime:'2021年5月12日 18:00'},
        {id:2,name:'小小',startTime:'2021年5月12日 8:30',endTime:'2021年5月12日 18:00'},
        {id:3,name:'喜洋洋',startTime:'2021年5月12日 8:30',endTime:'2021年5月12日 18:00'},
        {id:4,name:'美羊羊',startTime:'2021年5月12日 8:30',endTime:'2021年5月12日 18:00'},
        {id:5,name:'懒洋洋',startTime:'2021年5月12日 8:30',endTime:'2021年5月12日 18:00'},
        {id:6,name:'灰太狼',startTime:'2021年5月12日 8:30',endTime:'2021年5月12日 18:00'},

      ],
    };
  },
  mixins: [examMixins],
  methods: {
    drawChart() {
      console.log(document.getElementById("checkInEchartsBox"));
      // 基于准备好的dom，初始化echarts实例
      // let myChart = echarts.init(document.getElementById("checkInEchartsBox"));
      let myChart = this.$echarts.init(
        document.getElementById("checkInEchartsBox")
      );
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "学生出勤表",
        },
        tooltip: {},
        legend: {
          data: ["正常出勤"],
        },
        series: [
          {
            name: "出勤情况",
            type: "pie",
            data: [
              { name: "正常出勤", value: 80 },
              { name: "迟到", value: 5 },
              { name: "旷课", value: 10 },
              { name: "早退", value: 5 },
            ],
            color: ["#78c5b0", "#C5E3D2", "#B2DBD4", "#16B387", "#F9D789"],
          },
        ],
      };
      myChart.setOption(option);
    },
    // 获取考勤信息
    getAttendanceDataFn(){
      this.selectAllData({
        name:'ATTENDANCEALL',
        data:{},
      }).then((data)=>{
        console.log(data);
      })
    }
  },
  mounted() {
    this.drawChart();
  },
  created(){
    this.getAttendanceDataFn();
  }
};
</script>
<style lang="less" scoped>
.checkInBox {
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
.addAbsence {
  width: 20%;
}
// 添加缺勤记录按钮
.addAbsenceBtn {
  background-color: #16b387;
  border: 1px solid #16b387;
  color: #fff;
}
.addAbsenceBtn:hover {
  border: 1px solid #16b387;
  color: #16b387;
  background-color: white;
}
// 查询考勤
.selectAbsenceExam {
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
// 查询考勤信息按钮
.selectAbsenceBtn {
  border: 1px solid #16b387;
  color: #16b387;
}
.selectAbsenceBtn:hover {
  background-color: #b2dbd4;
  border: 1px solid #b2dbd4;
  color: #fff;
}
// 下
.mainbox{
  width: 100%;
  margin-top: 2rem;
  display: flex;
}
// 表格
.checkInTable {
  width: 70%;
  // border: 1px solid rgb(0, 255, 42);
  padding: 0 2%;

}
// 图表
#checkInEchartsBox {
  width: 30%;
  margin-top: 5%;
  // border: 1px solid red;
}
</style>