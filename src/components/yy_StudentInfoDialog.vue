<template>
  <div class="stu-info-dialog">
    <el-button
            type="text"
            size="small"
            @click="openDialog">查看详情</el-button>
    <el-dialog
            width="70%"
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
            我是一名优秀的学生，我要考上清华，北大
          </div>
        </div>
      </div>
      <div class="xinxi right">
        <ul>
          <li>学号：<span>201800023</span></li>
          <li>密码：<span>123456</span></li>
          <li>姓名：<span>张三</span></li>
          <li>性别：<span>男</span></li>
          <li>年龄：<span>20</span></li>
          <li>名族：<span>汉族</span></li>
          <li>政治面貌：<span>共青团员</span></li>
          <li>获奖情况：<span>省打篮球一等奖</span></li>
          <li>在读状态：<span>在读</span></li>
          <li>班主任：<span>李四</span></li>
          <li>班级：<span>高三一班</span></li>
          <li>身份证号：<span>5111111221654533546</span></li>
          <li>住址：<span>四川省成都市武侯区桂溪街道高新青年公寓1栋6-666</span></li>
          <li>联系方式：<span>110110110110</span></li>
          <li>入学日期：<span>2000-6-6</span></li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "yy_StudentInfoDialog",
    data(){
      return{
        dialogFormVisible:false
      }
    },
    methods:{
      openDialog(){
        this.dialogFormVisible = true
      },
      closeDialog(){
        this.dialogFormVisible = false
      },
      sureAdd(){
        console.log(this.form);
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
        border-bottom: 1px solid gray;
        margin: 5px 2px;
        padding: 10px 0;
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
  .stu-info-dialog .el-dialog__body{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
</style>