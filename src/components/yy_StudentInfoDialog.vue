<template>
  <div class="stu-info-dialog">
    <el-button
            type="text"
            size="small"
            @click="openDialog">查看详情</el-button>

    <el-dialog
            width="60%"
            top="20px"
            title="学生详情信息"
            :modal-append-to-body="false"
            style="cursor: default"
            :visible.sync="dialogFormVisible">

      <div class="left">
        <div>
          <img src="" style="width: 200px;height: 200px; vertical-align: top" alt="">
        </div>
        <div class="beizhu">
          <h3>备注信息</h3>
          <div class="beizhu-text">
            {{stuData.studentDesc}}
          </div>
        </div>
      </div>
      <div class="xinxi right">
        <ul>
          <li>学号：<span>{{stuData.studentNumber}}</span></li>
          <li>姓名：<span>{{stuData.studentName}}</span></li>
          <li>性别：<span>{{stuData.studentGender}}</span></li>
          <li>年龄：<span>{{stuData.studentAge}}</span></li>
          <li>名族：<span>{{stuData.studentNation}}</span></li>
          <li>政治面貌：<span>{{stuData.studentPolitics}}</span></li>
          <li>获奖情况：<span>{{stuData.studentExperience}}</span></li>
          <li>在读状态：<span>{{stuData.studentState==1?'在读':stuData.student_state==2?'休学':'退学'}}</span></li>
          <li>班主任：<span>{{stuData.studentNumber}}</span></li>
          <li>班级：<span>{{stuData.calssFullName}}</span></li>
          <li>身份证号：<span>{{stuData.studentIdcardno}}</span></li>
          <li>住址：<span>{{stuData.studentHome}}</span></li>
          <li>联系方式：<span>{{stuData.studentContact}}</span></li>
          <li>入学日期：<span>{{stuData.studentDate}}</span></li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "yy_StudentInfoDialog",
    props:['stuData'],
    data(){
      return{
        dialogFormVisible:false
      }
    },
    methods:{
      openDialog(){
        console.log(this.stuData);
        this.dialogFormVisible = true
      },
      closeDialog(){
        this.dialogFormVisible = false
      },
    },
  }
</script>

<style scoped lang="less">
  .left{
     .beizhu{
       width: 200px;
       white-space: normal;
       text-align: left;
       margin-top: 50px;
       .beizhu-text{
         margin-top: 20px;
         border: 1px solid gray;
         padding: 10px 4px;
         border-radius: 2px;
         min-height: 250px;
         max-height: 300px;
       }
     }
   }
  .xinxi{
    display: inline-block;
    width: 60%;
    ul{
      text-align: left;
      li{
        white-space: normal;
        margin: 5px 2px;
        padding: 8px 0;
        font-size: 16px;
        font-weight: bold;
        span{
          font-weight: normal;
        }
      }
    }
  }
</style>
<style>
  @import '../assets/css/font.css';
  .stu-info-dialog{
    font-family: kaola;
  }
  .stu-info-dialog .el-dialog__body{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
</style>