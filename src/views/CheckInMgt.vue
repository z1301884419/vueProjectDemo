<template>
  <div class="checkInBox">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }"
        >首页</el-breadcrumb-item
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
        <el-select v-model="selectAbsenceList" placeholder="请选择查询的考勤班级">
          <el-option label="高一一班" value="shanghai"></el-option>
        </el-select>
          <el-date-picker
            v-model="CheckInDate1"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerCheckInDate"
          >
          </el-date-picker>
        <el-button plain class="selectAbsenceBtn">查看考勤信息</el-button>
        <el-button type="info" plain>重置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <!-- <div class="checkInTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="考试编号" width="180">
        </el-table-column>
        <el-table-column prop="type" label="考试类型" width="180">
        </el-table-column>
        <el-table-column prop="class" label="考试班级"> </el-table-column>
        <el-table-column prop="time" label="考试时间"> </el-table-column>
        <el-table-column prop="people" label="考试发起人"> </el-table-column>
        <el-table-column label="操作">
          <template> -->
            <!--  slot-scope="scope" -->
            <!-- <el-button size="mini">取消考试</el-button>
            <el-button size="mini" type="danger">修改考试信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
    <!-- 图表 -->
    <div id="checkInEchartsBox" ref="myChart" style="width: 600px;height:400px;"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      selectAbsenceList: [],//查询的考勤年级
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
      CheckInDate1: '',
      tableData: [],
    };
  },
  methods:{
    drawChart(){
      console.log(document.getElementById("checkInEchartsBox"))
      // 基于准备好的dom，初始化echarts实例
      // let myChart = echarts.init(document.getElementById("checkInEchartsBox"));
      let myChart = this.$echarts.init(document.getElementById("checkInEchartsBox"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [555,1111,222,333,222,444]
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted(){
    this.drawChart();
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
</style>