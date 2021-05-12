<template>
  <div class="home">
    <div class="heder">
      <div class="logo"><img src="../assets/img/logo.png" alt=""></div>
      <div class="a">易欣智慧家校通</div>
      <div class="b">关于家校通</div>
      <div class="c">产品介绍</div>
      <div class="d">百宝箱</div>
      <div class="e">关注我们</div>
    </div>
    <div class="loginWindow">
    <!-- <img src="../../public/img/icons/login.jpg" /> -->
    <!-- <img src="../../" /> -->
    <div class="contenct"><img src="../assets/img/bg.gif" alt=""></div>
    <div class="loginBox">
      <p
        style="
          text-align: center;
          margin-top: 20px;
          color: white;
          font-size: 18px;
        "
      >
        <b class="biaoti">易欣智慧家校通</b>
      </p>
      <el-form ref="form" :model="form" label-width="80px"  :rules="rules">
        <el-row style="margin-top: 30px">
          <i
            class="el-icon-user-solid"
            style="
              float: left;
              font-size: 40px;
              color: white;
              margin-left: 50px;
            "
          ></i>
            <el-form-item prop="userName">
          <el-input
            placeholder="请输入账号"
            style="width: 200px; float: left; margin-left: 10px"
            v-model="form.userName"
          ></el-input>
            </el-form-item>
        </el-row>
        <el-row style="margin-top: 30px">
          <i
            class="el-icon-lock"
            style="
              float: left;
              font-size: 40px;
              color: white;
              margin-left: 50px;
            "
          ></i>
            <el-form-item prop="password">

          <el-input
          type="password"
            placeholder="请输入密码"
            style="width: 200px; float: left; margin-left: 10px"
            v-model="form.password"
          ></el-input>
            </el-form-item>

        </el-row>
        <el-row style="margin-top: 30px">
          <i
            class="el-icon-s-custom"
            style="
              float: left;
              font-size: 40px;
              color: white;
              margin-left: 50px;
            "
          ></i>
          <el-select v-model="form.role" placeholder="请选择"  style="width: 120px; float: left; margin-left: 10px">
    <el-option
      v-for="(item,index) in options"
      :key="index"
      :label="item.label"
      :value="item.value1">
    </el-option>
  </el-select>
        </el-row>
        <el-row style="margin-top: 30px" class="aaaa1">
          <el-button plain style="width: 80px;margin-left:90px; float: left" @click="subMitfn"
            >登录</el-button
          >
          <el-button plain style="width: 80px;margin-left:20px; float: left" @click="dialogFormVisible1 = true"
            >注册</el-button
          >
        </el-row>
      </el-form>
    </div>
    <el-dialog title="注册家长账号" :visible.sync="dialogFormVisible1" style="width: 1500px;margin-left: 40px;">
  <el-form :model="form1" ref="form1" class="bb">
    <el-form-item label="家长姓名" :label-width="formLabelWidth" style="text-align: left;">
      <el-input v-model="form1.parentName" autocomplete="off" style="width: 200px"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth" style="text-align: left;">
      <el-input v-model="form1.parentPhone" autocomplete="off" style="width: 200px"></el-input>
    </el-form-item>
    <el-form-item label="验证码" :label-width="'120px'" class="yanzheng1" style="text-align: left;">
      <el-input class="yanzheng" v-model="form1.vertifyCode" autocomplete="off" style="width: 200px"></el-input>
      <el-button @click="huoQu()" plain class="plainBtn">获取验证码</el-button>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" style="text-align: left;">
      <el-input v-model="form1.parentPassword" autocomplete="off" style="width: 200px"></el-input>
    </el-form-item>
    <el-form-item label="子女学号" :label-width="formLabelWidth" style="text-align: left;">
      <el-input v-model="form1.studentCode" autocomplete="off" style="width: 200px"></el-input>
    </el-form-item>
    
    <el-form-item label="性别" :label-width="formLabelWidth" style="text-align: left;">
      <el-radio v-model="form1.parentSex" label="m">男</el-radio>
      <el-radio v-model="form1.parentSex" label="w">女</el-radio>
    </el-form-item>
    <el-upload
  action="http://172.16.14.8:8091/register/upload"
  list-type="picture-card"
  :on-success="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
    <!-- <el-form-item label="宿舍" :label-width="formLabelWidth">
      <el-select v-model="form.region1" placeholder="请选择" >
        <el-option :label="item.mingCheng" :value="item.id" v-for="item in tableData1" :key="item.id"></el-option> -->
        <!-- <el-option label="太和殿" value="太和殿"></el-option>
        <el-option label="永寿殿" value="永寿殿"></el-option>
        <el-option label="钟粹宫" value="钟粹宫"></el-option> -->

      <!-- </el-select>
    </el-form-item> -->

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <!-- <el-button type="primary" @click="TianJia(),dialogFormVisible = false,resetForm('form')" >确 定</el-button>
     -->
         <el-button type="primary" @click="XiugaiInfo(),dialogFormVisible1 = false" >确 定</el-button>
  </div>
</el-dialog>
  </div>
  <div class="footer">
    <div class="footer-left">
      <div class="left1">
        <h3>教师频道</h3>
        <p>如何成为一名合格的老师？</p>
        <p>如何成为一名合格的老师？</p>
        <p>如何成为一名合格的老师？</p>
      </div>
      <div class="left2">
        <h3>家长频道</h3>
        <p>如何和孩子正确沟通</p>
        <p>如何成为一名合格的老师？</p>
        <p>如何成为一名合格的老师？</p>
      </div>
      <div class="left3">
        <h3>学生频道</h3>
        <p>自己的事情要自己做</p>
        <p>如何成为一名合格的老师？</p>
        <p>如何成为一名合格的老师？</p>
      </div>

    </div>
    <div class="footer-right">
      <div class="right1">
        <h2>{{mytime}}</h2>
        <h3>{{weekn1}}</h3>

      </div>
    </div>
  </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <button @click="goMain">首页</button> -->
  </div>
</template>

<script>
// import qs from "qs";

// @ is an alias to /src
import huoQu from  "../mixins/huoQu"
import {mapActions} from 'vuex'
export default {
  name: 'Login',
  components: {
  },
  mixins:[huoQu],
  data() {
    return {
      dialogImageUrl: '',
        dialogVisible: false,
      radio:'1',
      formLabelWidth: '120px',
      dialogFormVisible1: false,

      options: [{
          value1: '学生',
          label: '学生'
        }, {
          value1: '家长',
          label: '家长'
        }, {
          value1: '班主任',
          label: '班主任'
        }, {
          value1: '老师',
          label: '老师'
        }, {
          value1: '管理员',
          label: '管理员'
        }],
        value:"",
      mytime:"",
      weekn1:'',
      form1:{
        parentName:'',
        parentPhone:'',
        parentSex:'',
        parentPassword:'',
        studentCode:'',
        vertifyCode:'',
        parentImg:'',

      },
      form: {
        password: "",
        
        userName: "",
        role:""
      },
      rules: {
          userName: [
            { required: true, message: '请输入用户账号', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
              {required: true, message: '密码不能为空',trigger: 'blur'},
              { type: 'number', message: '密码必须为数字值',trigger: 'change'}
          ],
         
        }
    
    }
  },
  mounted() {
     let _this=this
    setInterval(function(){
      _this.getmydate()
    },1000)
  
  },
  methods: {
    ...mapActions(["loginModules/LoginAction"]),
    

handleRemove(file, fileList) {
        console.log(file,fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.data;
        console.log(file);
        this.form1.parentImg=this.dialogImageUrl
        this.dialogVisible = true;
      },




    goMain(){
      this.$router.push("/main")
    },

getmydate(){
  
  let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      let mytime=new Date;
      // console.log(mytime);
      let year=mytime.getFullYear()
      let month=parseInt(mytime.getMonth())+1
      let date=mytime.getDate()
      let weekn=mytime.getDay()
      // console.log(date);

      let hours=mytime.getHours()
      let minutes=mytime.getMinutes()
      let second=mytime.getSeconds()
      this.mytime=year+'年'+month+'月'+date+'日'+' '+hours+'时'+minutes+'分'+second+'秒'
      this.weekn1=weeks[weekn]
    },
    subMitfn(){
      this["loginModules/LoginAction"]({
        name:'LOGIN_API',
        data:this.form,
      }).then((data)=>{
        console.log(data);
      })
    },
huoQu(){
  console.log(this.form1.parentPhone);
   this.LoginAction1({
        name:'HUOQU_API',
        data:{
          parentPhone: this.form1.parentPhone
        }
        
      }).then((data)=>{
        console.log(data);
      })
},

     onSubmit() {

       let password=this.form.miMa
       let username=this.form.zhangHao
      //  let quanXian=this.form.quanXian

      //  console.log(aa);
        // let miMa=this.form.uPwd
        // console.log(LoginUser);
      this.axios({
        method: "post",
        url:'/api/login',

        // data: qs.stringify({}),
        data:{username,password}
        // headers: {
        //   "content-type": "application/x-www-form-urlencoded",
        // },
      })
        .then((response) => {
          console.log(response.data.user.id);
          if (response.data.code!= 200) {
            confirm("用户名或者密码不正确，请重新输入！");
            this.form.miMa = "";
            this.form.zhangHao = "";
          } else {
            
            console.log(JSON.stringify(this.form.miMa));
            console.log(JSON.stringify(this.form.zhangHao));
            sessionStorage.setItem("id", response.data.user.id);

            sessionStorage.setItem("loginState", true);
            sessionStorage.setItem("username", JSON.stringify(this.form.zhangHao));
            sessionStorage.setItem("password", JSON.stringify(this.form.miMa));
            sessionStorage.setItem(
              "permissionList",
              JSON.stringify(this.permissionList)
            );
            //  sessionStorage.setItem(
            //   "userInfo",
            //   JSON.stringify(response.data.data)
            // );
            //修改登录状态
             this.$store.dispatch({
              type: "setMtsLoginState",
              v: true,
            });
            // 修改store中的 用户名
            // console.log(response.data.data[0].u_name);
            // this.$store.dispatch({
            //   type: "AsetUserInfo",
            //   user: response.data.data[0].u_name,
            // });

            //修改目录
            this.$store.dispatch({
              type:"setAsideList",
              list:this.permissionList,
            });
            this.$router.push({ path: "/main" });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // to(){
    //   this.$router.push({
    //     path：'/Manager',
    //   })
     
    // }
  },
}
</script>
<style lang="less" scope>
.home{
  width: 100%;
  height: 100%;
}
  .loginWindow {
  // float: left;
  margin-top: 10px;
  width: 100%;
  height: 450px;
  // border: 1px solid red;

  // text-align: center;

}
.contenct{
  float: left;
  width: 55%;
  height: 450px;
  // border: 1px solid red;
  margin-left: 20px;

  // margin: 0 auto;

}
.contenct>img{
  width: 100%;
  height: 100%;

}
// .loginWindow > img {
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 100%;
// }
.loginBox {
  // position: absolute;
  float: left;
  // left: 450px;
  // top: 180px;
  width: 25%;
  height: 100%;
  margin-left: 60px;
  background-color: rgba(151, 226, 210, 0.308);
}
.heder{
  width: 100%;
  height: 60px;
  background-color: rgb(176, 221, 219);
}
.logo{
  width: 100px;
  height: 90%;
  margin-top: 1px;
  
}
.logo>img{
width: 100%;
height: 100%;
}
.logo,.a{
  float: left;
  line-height: 60px;
  text-align: center;
  margin-left: 20px;

}
.a{
  margin-left: 10px;
  color: rgb(104, 135, 177);

}
.b,.c,.d,.e{
  cursor: pointer;
  float: right;
  line-height: 60px;
  text-align: center;
  margin-right: 20px;
  color: rgb(104, 135, 177);
}
.b:hover{
  color: rgb(181, 93, 189);
}
.c:hover{
  color: rgb(181, 93, 189);
}
.d:hover{
  color: rgb(181, 93, 189);
}
.e:hover{
  color: rgb(181, 93, 189);
}
.footer{
  width: 100%;
  height: 150px;
  // border: 1px solid red;
  margin-top: 5px;
}
.footer-left,.footer-right{
  float: left;
}
.footer-left{
  width: 55%;
  height: 100%;
  // border: 1px solid red;
  margin-left: 20px;

}
.left1,.left2,.left3{
  float: left;
  // border:1px  solid rgb(22, 32, 128);
  width: 33.3%;
  height: 100%;
  text-align: left;
}
.left1>h3{
  margin-left: 10px;
  margin-top: 20px;
  color: rgb(110, 223, 223);
}
.left2>h3{
  margin-left: 10px;
  margin-top: 20px;
  color: rgb(110, 223, 223);

}.left3>h3{
  margin-left: 10px;
  margin-top: 20px;
  color: rgb(110, 223, 223);

}
.left1>p{
  font-size: 10px;
  margin-left: 20px;
  margin-top: 5px;
  cursor: pointer;
  color: rgb(7, 134, 92);
}
.left2>p{
  font-size: 10px;
   margin-left: 20px;
  margin-top: 5px;
  cursor: pointer;
  color: rgb(7, 134, 92);


}.left3>p{
  font-size: 10px;
   margin-left: 20px;
  margin-top: 5px;
  cursor: pointer;
  color: rgb(7, 134, 92);
}
.footer-right{
  text-align: center;
  // border: 1px solid red;
  width: 35%;
  height: 100%;
}
.right1>h2{
  margin-top: 40px;
  color: rgb(35, 218, 127);
}
.right1>h3{
  margin-top: 10px;
  color: rgb(35, 218, 127);

}
.aaaa1{
  text-align: center;
}
.biaoti{
color: rgb(41, 207, 19);
}
// .el-dialog{
//         width: 50% !important;
//     }
    .yanzheng{
      width: 200px;
    }
    .yanzheng1{
      text-align: left;
    }
.plainBtn {
  border: 1px solid #16B387 !important; 
  color: #16B387 !important;
  margin-left: 20px !important;
}
.plainBtn:hover {
  background-color: #B2DBD4 !important;
  border: 1px solid #B2DBD4 !important;
  color: #fff !important;
}
.el-upload{
  width: 100px !important;
  height: 100px !important;
  line-height: 100px !important;
  margin-left: 80px !important;
}
</style>
