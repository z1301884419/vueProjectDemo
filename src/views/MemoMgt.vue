<template>
  <div class="memoBox">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>留言板</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="liuyanMain">
      <el-card shadow="never">
        <el-input type="textarea" v-model="form.input"></el-input>
        <el-select  v-model="form.region1" value-key="id" placeholder="请选择">
          <!-- @change="selectSublist($event)" -->
          <!-- :value="{aa:item.id,bb:item.type}" -->
        <el-option :label="item.name" :value="item" v-for="item in tableData1" :key="item.id"></el-option>
        </el-select>
        <!-- <el-button size="mini" class="successBtn">选择老师</el-button> -->
        <el-button size="mini" class="successBtn fabiaoBtn" @click="sendMessage()">发表</el-button>
      </el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- ,getData2() -->
        <el-tab-pane label="已发表留言" name="first">
          <el-card shadow="hover" v-for="item in tableData" :key="item.id">
            <div class="contentCard">
              <div class="content">
                <span class="contentTitle"
                v-if="$store.state.loginModules.userShenfen == '班主任'||$store.state.loginModules.userShenfen =='老师'"
                  >{{ item.receivePersonName}}学生:</span
                >
                 <span class="contentTitle"
          v-else

                  >{{ item.receivePersonName}}老师:</span
                >
                <span>{{ item.messageContent }}</span>
                <p
                  v-for="subItem in item.replayList"
                  :key="subItem.id"
                  class="repalyBox"
                >
                  <span class="replyTitle">{{ subItem.receivePersonName }}：</span>
                  <span>{{ subItem.replayContent }}</span>
                  <el-button
                  size="mini"
                  v-if="subItem.replayId != id"
                  round
                  @click="replyClick(subItem.replayId)"
                  >回复</el-button
                >
                <!-- </p> -->
                <el-input
                  v-if="subItem.replayId == id"
                  class="inputBox"
                  type="textarea"
                  v-model="form.input2"
                ></el-input>
                <el-button @click="replyliuyanClick1()" v-if="subItem.replayId == id" size="mini" class="successBtn"
                  >回复</el-button
                >
                </p>

              </div>
          <!-- <template slot-scope="scope"> -->

              <div class="caozuoBox">

                <el-button 
                size="mini" 
                round 
              @click="deleteUser(item.messageId)"
                >删除</el-button>
                <!-- <el-button
                  size="mini"
                  v-if="item.messageId != id"
                  round
                  @click="replyClick(item.messageId)"
                  >回复</el-button
                > -->

              </div>
          <!-- </template> -->

            </div>
            
          </el-card>
           <div class="block">
          <el-pagination layout="prev, pager, next" :total="pageTotal" :page-size="pageSize" @current-change="changePage"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已收到留言" name="second" >
          <el-card shadow="hover" v-for="item in tableData" :key="item.id">
            <div class="contentCard">
              <div class="content">
                <span class="contentTitle"
          v-if="$store.state.loginModules.userShenfen == '班主任'||$store.state.loginModules.userShenfen =='老师'"

                  >{{ item.sendPersonName}}学生:</span
                >
                <span class="contentTitle"
          v-else

                  >{{ item.sendPersonName}}老师:</span
                >
                <span>{{ item.messageContent }}</span>
                <p
                  v-for="subItem in item.replayList"
                  :key="subItem.replayId"
                  class="repalyBox"
                >
                  <span class="replyTitle">{{ subItem.receivePersonName }}：</span>
                  <span>{{ subItem.replayContent }}</span>
                </p>
                <el-input
                  v-if="item.messageId == id"
                  class="inputBox"
                  type="textarea"
                  v-model="form.input2"
                ></el-input>
                <el-button @click="replyliuyanClick()" v-if="item.messageId == id" size="mini" class="successBtn"
                  >回复</el-button
                >
              </div>
              <div class="caozuoBox">
                <el-button size="mini" round
              @click="deleteUser1(item.messageId)"

                >删除</el-button>
                <el-button
                  size="mini"
                  v-if="item.messageId != id"
                  round
                  @click="replyClick(item.messageId)"
                  >回复</el-button
                >
              </div>
            </div>
          </el-card>
          <div class="block">
          <el-pagination layout="prev, pager, next" :total="pageTotal" :page-size="pageSize" @current-change="changePage1"></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- <h3>
        <span class="selectMyMemo memoActive">我的留言板</span>
        <el-divider direction="vertical"></el-divider>
        <span class="selectHuiFu">我收到的回复</span>
      </h3> -->
    </div>
  </div>
</template>
<script>
import liuYan from "../mixins/liuYan";
import { mapActions } from "vuex";



export default {
  mixins: [liuYan],

  data() {
    return {
      // id:"",
       pageTotal:20,
      pageSize:5,
      nowPage:1,
      form:{
        region1:"",
        input: "",
        id:"",
        type:"",
      input2: "",


      },
      tableData1:"",
      activeName: "first",
      id: 0,
      tableData: [
        {
          id: 1,
          teacher: "李四",
          subject: "语文",
          content:
            "学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!",
          subList: [{ id: 1 - 1, repalyName: "大大", content: "谢谢老师！" }],
        },
        {
          id: 2,
          teacher: "张三",
          subject: "数学",
          content: "学习认真, 作业完成程度好, 继续发扬!!",
        },
        {
          id: 3,
          teacher: "王五",
          subject: "英语",
          content:
            "学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!",
        },
        {
          id: 4,
          teacher: "吴六",
          subject: "历史",
          content:
            "学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!",
        },
      ],
    };
  },
  created(){
this.getData()
// this.handleClick(tab, event)
    this.liuyanshuliang();

this.getData1()

  },
  methods: {
    ...mapActions(["loginModules/LoginAction1"]),

liuyanshuliang(){
        this["loginModules/LoginAction1"]({
        name: "LIUYANNUM_API",
        data: {},
      }).then((data) => {
        console.log(data);
        // if(data==200){
        //   console.log('chengg');
        //   this.$router.push("/Home");
          
        // }
      })
       .catch(function (error) {
          console.log(error);
        });
    },
    replyliuyanClick(){
      this.LoginAction12({
        name: "LIUYANHUIFU_API",
        data: {messageId:this.id,replayContent:this.form.input2},
      }).then((data) => {
        console.log(data);
        this.getData1()
        // this.KeyWordTableData=data.data
        // this.pageTotal=data.count
      });
    },
    replyliuyanClick1(){
      this.LoginAction13({
        name: "LIUYANPINGLUN_API",
        data: {replayId:this.id,replayContent:this.form.input2},
      }).then((data) => {
        console.log(data);
        this.getData1()
        // this.KeyWordTableData=data.data
        // this.pageTotal=data.count
      });
    },
    
     deleteUser(obj){
console.log(obj);
this.LoginAction11({
        name: "DELETE_API",
        data: {messageId:obj},
      }).then((data) => {
        console.log(data);
        this.getData1()
        // this.KeyWordTableData=data.data
        // this.pageTotal=data.count
      });
    },

    deleteUser1(obj){
console.log(obj);
this.LoginAction11({
        name: "DELETE_API",
        data: {messageId:obj},
      }).then((data) => {
        console.log(data);
        this.getData2()
        // this.KeyWordTableData=data.data
        // this.pageTotal=data.count
      });
    },
    selectSublist(event){
console.log(event);
this.form.id=event.aa
this.form.type=event.bb

    },
    sendMessage(){
       this.LoginAction9({
        name: "SENDMESSAGE_API",
        data: {
          messageContent:this.form.input,
          messageReceiveId:this.form.region1.id,
          messageReceiveType:this.form.region1.type
        },
      }).then((data) => {
        console.log(data);
        if(data.data.code==1006){
           this.$confirm('您输入的词语带有敏感词！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.form.input=""
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
        }
        // this.tableData1=data.data
        // this.pageTotal=data.count
      });
    },
     changePage(val){
      this.nowPage=val
      this.getData1()
    },
    changePage1(val){
      this.nowPage=val
      this.getData2()
    },
    getData() {
      // console.log(this.form1.parentPhone);
      this.LoginAction7({
        name: "LIUYAN_API",
        data: {
          // limit:this.pageSize,
          // page:this.nowPage
        },
      }).then((data) => {
        console.log(data);
        this.tableData1=data.data
        // this.pageTotal=data.count
      });
    },
     getData1() {
      // console.log(this.form1.parentPhone);
      this.LoginAction8({
        name: "MYFABIAO_API",
        data: {
          limit:this.pageSize,
          page:this.nowPage,
          type:"2"
        },
      }).then((data) => {
        console.log(data);
        this.tableData=data.data
        this.pageTotal=data.count
      });
    },
    getData2(){
      console.log("236");
      this.LoginAction8({
        name: "MYJIESHOU_API",
        data: {
          limit:this.pageSize,
          page:this.nowPage,
          type:"1"
        },
      }).then((data) => {
        console.log(data);
        this.tableData=data.data
        this.pageTotal=data.count
      });
    },
    replyClick(id) {
      this.id = id;
      console.log(id);
    },
    handleClick(tab, event) {
      console.log(tab.name,event);
       
      // console.log(this.form1.parentPhone);
      if(tab.name=='first'){
        var  aa="2"
      }else {
        aa="1"
      }
       this["loginModules/LoginAction1"]({
        name: "LIUYANNUM_API",
        data: {},
      }).then((data) => {
        console.log(data);
        // if(data==200){
        //   console.log('chengg');
        //   this.$router.push("/Home");
          
        // }
      });
      this.LoginAction8({
        name: "MYFABIAO_API",
        data: {
          limit:this.pageSize,
          page:this.nowPage,
          type:aa
        },
      }).then((data) => {
        console.log(data);
        this.tableData=data.data
        this.pageTotal=data.count
      });
    
    },
  },
};
</script>
<style lang="less" scoped>
.memoBox {
  width: 100%;
}
.liuyanMain {
  width: 98%;
  margin: 10px auto;
  h3 {
    margin: 10px 0;
    font-size: 1.8rem;
  }
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
.successBtn {
  background-color: #16b387;
  border: 1px solid #16b387;
  color: #fff;
}
.successBtn:hover {
  border: 1px solid #16b387;
  color: #16b387;
  background-color: white;
}
.el-button {
  margin-top: 1rem;
}
// 回复框
.contentCard {
  font-size: 1.6rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  .content {
    width: 90%;
    line-height: 2rem;
    padding: 1rem;
    .inputBox {
      margin-top: 1rem;
    }
    .contentTitle {
      color: #16b387;
    }
    .replyTitle {
      color: #2867ee;
    }
    .repalyBox {
      margin-left: 10px;
    }
  }
}
.content {
  width: 90%;
}
.caozuoBox {
  width: 10%;
}
.div1 {
  // border: 1px solid rebeccapurple;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
}
.memoActive {
  color: #16b33d;
}
.selectHuiFu,
.selectMyMemo {
  cursor: pointer;
}
/deep/.el-input__inner{
  height: 33px;
  line-height: 33px;
}
.fabiaoBtn{
  margin-left: 10px;
}
</style>