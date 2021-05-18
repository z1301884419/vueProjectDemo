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
        <el-table
          :data="checkInTableData"
          style="width: 100%"
          :header-cell-style="{ background: '#D4EDF9', color: '#000' }"
        >
          <el-table-column
            prop="student.studentId"
            label="学生id"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="student.studentName"
            label="学生姓名"
            align="center"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="attendabnceAmTime"
            label="上学打卡时间"
            align="center"
            width="250"
          >
          </el-table-column>
          <el-table-column
            prop="attendabncePmTime"
            label="放学打卡时间"
            align="center"
            width="300"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                round
                v-if="scope.row"
                @click="modifyStatus(scope.row), (dialogModifyAtt = true)"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block pageBox">
          <el-pagination
            layout="prev, pager, next"
            :total="pageTotal"
            :page-size="pageSize"
            @current-change="changePage"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 图表 -->
      <div
        id="checkInEchartsBox"
        ref="myChart"
        style="width: 600px; height: 400px"
      ></div>
    </div>
    <!-- 修改考勤信息模态框 -->
    <el-dialog title="修改考勤状态" :visible.sync="dialogModifyAtt">
      <el-form :model="attDataform">
        <el-form-item label="学生ID" :label-width="formLabelWidth">
          <el-input v-model="attDataform.student.studentId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" :label-width="formLabelWidth">
          <el-input v-model="attDataform.student.studentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前签到状态" :label-width="formLabelWidth">
          <el-input v-model="attDataform.attendabnceAmStatus" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前签退状态" :label-width="formLabelWidth">
          <el-input v-model="attDataform.attendabncePmStatus" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改状态" :label-width="formLabelWidth">
          <el-select v-model="attDataform.status" placeholder="请选择修改状态">
            <el-option label="正常" value="0"></el-option>
            <el-option label="迟到" value="1"></el-option>
            <el-option label="待考勤" value="2"></el-option>
            <el-option label="早退" value="3"></el-option>
            <el-option label="请假" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加记录时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
            <el-time-picker
              v-model="time1"
              :picker-options="{
                selectableRange: '18:30:00 - 20:30:00',
              }"
              placeholder="任意时间点"
            >
            </el-time-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyAtt = false">取 消</el-button>
        <el-button type="primary" @click="dialogModifyAtt = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import checkInMixins from "../mixins/checkInMixins";
export default {
  data() {
    return {
      selectStuName: "", //查询的数据类型
      selectAbsenceList: [], //查询的考勤年级
      pickerCheckInDate: {
        //日期选择器
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
      CheckInDateStart: "", //开始日期
      CheckInDateEnd: "", //查询结束日期
      checkInTableData: [], //表格数据
      pageTotal: 20, //表格页码----最大条数
      pageSize: 8, //表格页码----一页显示多少条
      nowPage: 1, //表格页码----当前页
      dialogModifyAtt: false, //修改考勤信息模态框
      attDataform: {
        student:{},
        status:''
      },
      formLabelWidth: "100px",
      value1: "",
      time1: new Date(2016, 9, 10, 18, 40),
    };
  },
  mixins: [checkInMixins],
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
          orient: "vertical",
          right: "20",
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
    // 点击页码切换当前页
    changePage(val) {
      this.nowPage = val;
      this.getAttendanceDataFn();
    },
    // 获取考勤信息
    getAttendanceDataFn() {
      this.selectAllData({
        name: "ATTENDANCEALL",
        data: {
          page: this.nowPage,
          limit: this.pageSize,
        },
      }).then((data) => {
        console.log(data);
        if (data.code == 200) {
          this.checkInTableData = data.data;
          this.pageTotal = data.count;
        }
      });
    },
    // 修改考勤信息
    modifyStatus(obj) {
      console.log(obj);
      this.attDataform={...obj};
      // for (let key in this.attDataform){
      //   // if(key==attendabnceAmStatus){
      //   //   // 0 正常 1 迟到 默认2 2 待考勤 4 请假
          
      //   // }
      // }

    },
  },
  mounted() {
    this.drawChart();
  },
  created() {
    this.getAttendanceDataFn();
  },
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
.mainbox {
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
// 页码
.pageBox {
  text-align: center;
  margin-top: 10px;
}
// 图表
#checkInEchartsBox {
  width: 30%;
  margin-top: 5%;
  // border: 1px solid red;
}
</style>