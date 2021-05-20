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
        <el-button class="addAbsenceBtn" @click="dialogAddAtt = true"
          >添加缺勤记录</el-button
        >
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
          value-format="yyyy-MM-dd"
          :picker-options="pickerCheckInDate"
        >
        </el-date-picker>
        <el-date-picker
          v-model="CheckInDateEnd"
          align="right"
          type="date"
          placeholder="选择结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerCheckInDate"
        >
        </el-date-picker>
        <el-button plain class="selectAbsenceBtn" @click="searchAttData"
          >查看考勤信息</el-button
        >
        <el-button type="info" plain @click="resetAttData">重置</el-button>
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
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="student.studentName"
            label="学生姓名"
            align="center"
            width="100"
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
            width="250"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                round
                plain
                v-if="scope.row"
                @click="modifyStatus(scope.row), (dialogModifyAttAM = true)"
                >修改签到状态</el-button
              >
              <el-button
                size="mini"
                type="warning"
                round
                plain
                v-if="scope.row"
                @click="modifyStatus(scope.row), (dialogModifyAttPM = true)"
                >修改签退状态</el-button
              >
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
    <!-- 修改签到状态模态框 -->
    <el-dialog title="修改考勤状态" :visible.sync="dialogModifyAttAM">
      <el-form :model="attDataformAM">
        <el-form-item label="学生ID" :label-width="formLabelWidth">
          <el-input
            v-model="attDataformAM.student.studentId"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" :label-width="formLabelWidth">
          <el-input
            v-model="attDataformAM.student.studentName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="当前签到状态" :label-width="formLabelWidth">
          <el-input
            v-model="attDataformAM.attendabnceAmStatus"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="当前签到时间" :label-width="formLabelWidth">
          <el-input
            v-model="attDataformAM.attendabnceAmTime"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="修改签到状态" :label-width="formLabelWidth">
          <el-select
            v-model="attDataformAM.modifyAMstatus"
            placeholder="请选择修改状态"
          >
            <el-option label="正常" value="0"></el-option>
            <el-option label="迟到" value="1"></el-option>
            <el-option label="待考勤" value="2"></el-option>
            <el-option label="早退" value="3"></el-option>
            <el-option label="请假" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改签到时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="attDataformAM.modifyAMDate1"
              type="date"
              placeholder="选择修改日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            -
            <el-time-picker
              v-model="attDataformAM.modifyAMTime1"
              placeholder="选择签到时间"
              type="fixed-time"
              value-format="HH:mm:ss"
            >
            </el-time-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyAttAM = false">取 消</el-button>
        <el-button
          type="primary"
          @click="modifyAttAMTrue(), (dialogModifyAttAM = false)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!--  修改签退状态模态框 -->
    <el-dialog title="修改考勤状态" :visible.sync="dialogModifyAttPM">
      <el-form :model="attDataformPM">
        <el-form-item label="学生ID" :label-width="formLabelWidth">
          <el-input
            v-model="attDataformPM.student.studentId"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" :label-width="formLabelWidth">
          <el-input
            v-model="attDataformPM.student.studentName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="当前签退状态" :label-width="formLabelWidth">
          <el-input
            v-model="attDataformPM.attendabncePmStatus"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="当前签退时间" :label-width="formLabelWidth">
          <el-input
            v-model="attDataformPM.attendabncePmTime"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="修改签退状态" :label-width="formLabelWidth">
          <el-select
            v-model="attDataformPM.modifyPMstatus"
            placeholder="请选择修改状态"
          >
            <el-option label="正常" value="0"></el-option>
            <el-option label="迟到" value="1"></el-option>
            <el-option label="待考勤" value="2"></el-option>
            <el-option label="早退" value="3"></el-option>
            <el-option label="请假" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改签退时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="attDataformPM.modifyPMDate2"
              type="date"
              placeholder="选择修改日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            -
            <el-time-picker
              v-model="attDataformPM.modifyPMTime2"
              placeholder="选择签退时间"
              type="fixed-time"
              value-format="HH:mm:ss"
            >
            </el-time-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyAttPM = false">取 消</el-button>
        <el-button
          type="primary"
          @click="modifyAttPMTrue(), (dialogModifyAttPM = false)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 添加考勤记录模态框 -->
    <el-dialog title="添加考勤记录" :visible.sync="dialogAddAtt">
      <el-form
        :model="addAttRecordFormData"
        :rules="rules"
        ref="addAttRecordFormData"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-form-item label="学生id" prop="attStuId">
          <el-input v-model="addAttRecordFormData.attStuId"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="attStuName">
          <el-input v-model="addAttRecordFormData.attStuName"></el-input>
        </el-form-item>
        <el-form-item label="添加早上考勤状态" prop="attAmStatus">
          <el-select
            v-model="addAttRecordFormData.attAmStatus"
            placeholder="选择早上考勤状态"
          >
            <el-option label="正常" value="0"></el-option>
            <el-option label="迟到" value="1"></el-option>
            <el-option label="待考勤" value="2"></el-option>
            <el-option label="早退" value="3"></el-option>
            <el-option label="请假" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加早上考勤时间" required>
          <el-col :span="11">
            <el-form-item prop="Amdate1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="addAttRecordFormData.Amdate1"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="AmTime1">
              <el-time-picker
                placeholder="选择时间"
                v-model="addAttRecordFormData.AmTime1"
                style="width: 100%"
                type="fixed-time"
                value-format="HH:mm:ss"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="添加晚上考勤状态" prop="attPmStatus">
          <el-select
            v-model="addAttRecordFormData.attPmStatus"
            placeholder="选择晚上考勤状态"
          >
            <el-option label="正常" value="0"></el-option>
            <el-option label="迟到" value="1"></el-option>
            <el-option label="待考勤" value="2"></el-option>
            <el-option label="早退" value="3"></el-option>
            <el-option label="请假" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加晚上考勤时间" required>
          <el-col :span="11">
            <el-form-item prop="Pmdate1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="addAttRecordFormData.Pmdate1"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="PmTime1">
              <el-time-picker
                placeholder="选择时间"
                v-model="addAttRecordFormData.PmTime1"
                style="width: 100%"
                type="fixed-time"
                value-format="HH:mm:ss"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddAtt = false">取 消</el-button>
        <el-button class="addAttBtn" @click="addAttTrue('addAttRecordFormData')"
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
      dialogModifyAttAM: false, //修改签到信息模态框
      attDataformAM: {
        //修改签到信息数据
        student: {},
        modifyAMstatus: "",
        modifyAMDate1: "",
        modifyAMTime1: "",
      },
      formLabelWidth: "100px",
      dialogModifyAttPM: false, //修改签退信息模态框
      attDataformPM: {
        //修改签到信息数据
        student: {},
        modifyPMstatus: "",
        modifyPMDate2: "",
        modifyPMTime2: "",
      },
      dialogAddAtt: false, //添加缺勤记录模态框
      // 添加缺勤记录数据
      addAttRecordFormData: {
        attStuId: "",
        attStuName: "",
        attAmStatus: "",
        Amdate1: "",
        AmTime1: "",
        attPmStatus: "",
        Pmdate1: "",
        PmTime1: "",
      },
      rules: {
        attStuId: [
          { required: true, message: "请输入学生ID", trigger: "blur" },
        ],
        attStuName: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
        ],
        attAmStatus: [
          { required: true, message: "请选择早上考勤状态", trigger: "change" },
        ],
        Amdate1: [
          {
            // type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        AmTime1: [
          {
            // type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        attPmStatus: [
          { required: true, message: "请选择晚上考勤状态", trigger: "change" },
        ],
        Pmdate1: [
          {
            // type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        PmTime1: [
          {
            // type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
      option:{},
      eachartData: [],
      myChart:null,
    };
  },
  mixins: [checkInMixins],
  methods: {
    drawChart() {
      console.log(document.getElementById("checkInEchartsBox"));
      // 基于准备好的dom，初始化echarts实例
      // let myChart = echarts.init(document.getElementById("checkInEchartsBox"));
      this.myChart = this.$echarts.init(
        document.getElementById("checkInEchartsBox")
      );
      console.log('饼子');
      console.log(this.eachartData);
      // 指定图表的配置项和数据
      this.option = {
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
            data: this.eachartData,
            color: ["#16b387", "#f66077", "#fdf17f", "#8adcff"],
          },
        ],
      };
      this.myChart.setOption(this.option);
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
          data.data.forEach((item) => {
            item.attendabncePmTime =
              item.attendabncePmTime == null
                ? "未打卡"
                : item.attendabncePmTime;
            item.attendabnceAmTime =
              item.attendabnceAmTime == null
                ? "未打卡"
                : item.attendabnceAmTime;
            item.attendabncePmStatus =
              item.attendabncePmStatus == null
                ? "未打卡"
                : item.attendabncePmStatus;
          });
          this.checkInTableData = data.data;
          this.pageTotal = data.count;
          this.eachartData=[];
          for (let key in data.date2) {
            if(key!='all'){
              this.eachartData.push({ name: key, value: data.date2[key]});
            }
          }
          this.eachartData.map(item=>item.name=item.name == "abnormalProbabilityAM"? "迟到": item.name == "abnormalProbabilityPM"? "早退": item.name == "leaveProbability"? "请假": item.name == "normalProbability"? "正常": "未打卡")
          this.eachartData.map(item=>item.value=item.value*100)
        }
      });
    },           
    // 修改考勤信息模态框
    modifyStatus(obj) {
      for (let i in obj) {
        if (i == "attendabnceAmStatus") {
          // 0 正常 1 迟到 默认2 2 待考勤 4 请假
          obj[i] =
            obj[i] == 0
              ? "正常"
              : obj[i] == 1
              ? "迟到"
              : obj[i] == 2
              ? "未签到"
              : obj[i] == 4
              ? "请假"
              : "无";
        } else if (i == "attendabncePmStatus") {
          // 0 正常 1 迟到 2 待考情 默认2 3 早退 4 请假
          obj[i] =
            obj[i] == 0
              ? "正常"
              : obj[i] == 1
              ? "迟到"
              : obj[i] == 2
              ? "未签退"
              : obj[i] == 4
              ? "请假"
              : obj[i] == 3
              ? "早退"
              : "无";
        }
      }
      this.attDataformAM = { ...obj };
      this.attDataformPM = { ...obj };
    },
    // 确定修改签到状态
    modifyAttAMTrue() {
      let tempObj = {
        attendabnceAmStatus: this.attDataformAM.modifyAMstatus,
        attendabnceAmTime:
          this.attDataformAM.modifyAMDate1 +
          " " +
          this.attDataformAM.modifyAMTime1,
        attendanceId: this.attDataformAM.attendanceId,
        studentId: this.attDataformAM.studentId,
      };
      console.log(tempObj);
      this.modifydata({
        name: "MODIFYATTDATA",
        data: tempObj,
      }).then((data) => {
        if (data.code == 200) {
          this.$message({
            type: "success",
            message: data.msg,
          });
          this.getAttendanceDataFn();
        } else {
          this.$message({
            type: "error",
            message: data.msg,
          });
        }
      });
    },
    // 确定修改签退状态
    modifyAttPMTrue() {
      let tempObj = {
        attendabncePmStatus: this.attDataformPM.modifyPMstatus,
        attendabncePmTime:
          this.attDataformPM.modifyPMDate2 +
          " " +
          this.attDataformPM.modifyPMTime2,
        attendanceId: this.attDataformPM.attendanceId,
        studentId: this.attDataformPM.studentId,
      };
      console.log(tempObj);
      this.modifydata({
        name: "MODIFYATTDATA",
        data: tempObj,
      }).then((data) => {
        if (data.code == 200) {
          this.$message({
            type: "success",
            message: data.msg,
          });
          this.getAttendanceDataFn();
        } else {
          this.$message({
            type: "error",
            message: data.msg,
          });
        }
      });
    },
    // 搜索
    searchAttData() {
      let tempObj = {
        endTime: this.CheckInDateEnd,
        startTime: this.CheckInDateStart,
        name: this.selectStuName,
        page: this.nowPage,
        limit: this.pageSize,
      };
      this.selectAllData({
        name: "ATTENDANCEALL",
        data: tempObj,
      }).then((data) => {
        if (data.code == 200) {
          data.data.forEach((item) => {
            item.attendabncePmTime =
              item.attendabncePmTime == null
                ? "未打卡"
                : item.attendabncePmTime;
            item.attendabnceAmTime =
              item.attendabnceAmTime == null
                ? "未打卡"
                : item.attendabnceAmTime;
            item.attendabncePmStatus =
              item.attendabncePmStatus == null
                ? "未打卡"
                : item.attendabncePmStatus;
          });
          this.checkInTableData = data.data;
          this.pageTotal = data.count;
        }
      });
    },
    // 重置
    resetAttData() {
      this.getAttendanceDataFn();
      this.selectStuName = "";
      this.CheckInDateEnd = "";
      this.CheckInDateStart = "";
    },
    // 确定添加考勤信息
    addAttTrue(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogAddAtt = false;
          let tempobj = {
            attendabnceAmStatus: this.addAttRecordFormData.attAmStatus,
            attendabnceAmTime:
              this.addAttRecordFormData.Amdate1 +
              " " +
              this.addAttRecordFormData.AmTime1,
            attendabncePmStatus: this.addAttRecordFormData.attPmStatus,
            attendabncePmTime:
              this.addAttRecordFormData.Pmdate1 +
              " " +
              this.addAttRecordFormData.PmTime1,
            studentId: this.addAttRecordFormData.attStuId,
          };
          console.log(tempobj);
          this.addData({
            name: "ADDATTDATA",
            data: tempobj,
          }).then((data) => {
            console.log(data);
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: data.msg,
              });
              this.selectExam();
            } else {
              this.$message({
                type: "error",
                message: data.msg,
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  watch:{
    eachartData(value){
      console.log(value);
      console.log(123);
      this.option.series[0].data =value;
      this.myChart.setOption(this.option);
    }
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
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 1rem 0;
  // border: 1px solid red;
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
  width: 29%;
  margin-top: 4.5%;
  // border: 1px solid red;
}
</style>