<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
  <div class="router-view">
    <router-view></router-view>
  </div>
  <div class="white_shd full margin_bottom_30 information-box">
    <!-- 头像 -->
     <div class="touxiang" v-if="$store.state.loginModules.userShenfen == '学生'">
    <img :src="user1" alt="">
 
     </div>
       <div class="touxiang" v-else-if="$store.state.loginModules.userShenfen == '家长'">
    <img :src="user" alt="">
 
     </div>
       <div class="touxiang" v-else>
    <img  :src="user2" alt="">
 
     </div>
     <!-- 学生 -->
     <ul class="list-group" v-if="$store.state.loginModules.userShenfen == '学生'">
       <li class="list-group-item"><i>我的姓名</i>
           <span class="name">{{tableData.studentName}}</span>
       </li>
       <li class="list-group-item"><i>班级</i>
           <span class="banji">{{tableData.classId}}</span>
       </li>
       <li class="list-group-item"><i>性别</i>
           <span class="xingbie">{{tableData.studentGender}}</span>
       </li>
        <li class="list-group-item"><i>年龄</i>
           <span class="age">{{tableData.studentAge}}</span>
       </li>
        <li class="list-group-item"><i>民族</i>
           <span class="minzu">{{tableData.studentNation}}</span>
       </li>
        <li class="list-group-item"><i>政治面貌</i>
           <span class="zhengzhimianmao">{{tableData.studentPolitics}}</span>
       </li>
        <li class="list-group-item"><i>身份证号</i>
           <span class="idcard">{{tableData.studentIdcardno}}</span>
       </li>
        <li class="list-group-item"><i>入学日期</i>
           <span class="date">{{tableData.studentDate}}</span>
       </li>
        <li class="list-group-item"><i>住址</i>
           <span class="zhuzhi">{{tableData.studentHome}}</span>
       </li>
        <li class="list-group-item"><i>联系方式</i>
           <span class="phone">{{tableData.studentContact}}</span>
       </li>
        <li class="list-group-item"><i>我的账号</i>
           <span class="zhanghao">{{tableData.studentNumber}}</span>
       </li>
       <li class="list-group-item xiugaimima"><a href="#" @click="gaiMi()"><i>修改密码</i></a></li>
     </ul>

<!-- 家长 -->
    <ul class="list-group" v-else-if="$store.state.loginModules.userShenfen == '家长'">
       <li class="list-group-item"><i>我的姓名</i>
           <span class="name">{{tableData.parentName}}</span>
       </li>
       <li class="list-group-item"><i>性别</i>
           <span class="xingbie">{{tableData.parentSex}}</span>
       </li>

        <li class="list-group-item"><i>联系方式</i>
           <span class="phone">{{tableData.parentPhone}}</span>
           <button class="phonebtn" @click="shoujihao(),dialogFormVisible1=true">修改手机号</button>
       </li>

       <li class="list-group-item xiugaimima"><a href="#" @click="gaiMi()"><i>修改密码</i></a></li>
     </ul>

<!-- 班主任 -->
    <ul class="list-group" v-else-if="$store.state.loginModules.userShenfen == '班主任'">
       <li class="list-group-item"><i>我的姓名</i>
           <span class="name">{{tableData.staffName}}</span>
       </li>
       <li class="list-group-item"><i>年龄</i>
           <span class="xingbie">{{tableData.staffAge}}</span>
       </li>
      <li class="list-group-item"><i>账号</i>
           <span class="phone">{{tableData.staffNumber}}</span>
       </li>
        <li class="list-group-item"><i>创建时间</i>
           <span class="phone">{{tableData.staffCreateTime}}</span>
       </li>
        <li class="list-group-item"><i>联系方式</i>
           <span class="phone">{{tableData.staffPhone}}</span>
       </li>

       <li class="list-group-item xiugaimima"><a href="#" @click="gaiMi()"><i>修改密码</i></a></li>
     </ul>

     <!-- 管理员 -->
    <ul class="list-group" v-else-if="$store.state.loginModules.userShenfen == '管理员'">
       <li class="list-group-item"><i>我的姓名</i>
           <span class="name">{{tableData.staffName}}</span>
       </li>
       <li class="list-group-item"><i>年龄</i>
           <span class="xingbie">{{tableData.staffAge}}</span>
       </li>
        <li class="list-group-item"><i>职称</i>
           <span class="xingbie">{{tableData.staffDesc}}</span>
       </li>
      <li class="list-group-item"><i>账号</i>
           <span class="phone">{{tableData.staffNumber}}</span>
       </li>
        <li class="list-group-item"><i>创建时间</i>
           <span class="phone">{{tableData.staffCreateTime}}</span>
       </li>
        <li class="list-group-item"><i>联系方式</i>
           <span class="phone">{{tableData.staffPhone}}</span>
       </li>

       <li class="list-group-item xiugaimima"><a href="#" @click="gaiMi()"><i>修改密码</i></a></li>
     </ul>

     <div class="touxiangkuang">
          <div class="list-group-item"><i>上传头像</i>
           <span >(上传头像图片只能是 JPG 格式!上传头像图片大小不能超过 2MB!)</span>
       </div>
    <!-- 头像上传 -->
    <el-upload
  action="http://172.16.14.46:8410/loginOrRegist/register/upload"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
 
 <div class="touxiangbtn">
    <el-button type="primary" @click="baocun()">保存</el-button>
    <el-button >取消</el-button>
 </div>
     </div>

    <!-- 修改框密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <!-- <el-tabs>
  <el-tab-pane label="密码修改"> -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPass">
           <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off" clearable ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="ruleForm.newPass" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="dialogFormVisible = false;submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
  <!-- </el-tab-pane>
  <el-tab-pane label="手机号修改">手机</el-tab-pane>
</el-tabs> -->
    </el-dialog>
    

        <el-dialog title="修改手机号" :visible.sync="dialogFormVisible1">

        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧手机号" prop="oldPhone">
           <el-input type="text" v-model="tableData.parentPhone" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="yanzhengma" class="yanzhengma1">
            <el-input type="tel" placeholder="请输入验证码" v-model="yanzheng1"  class="yanzhengma1inp"></el-input>
            <el-button @click="sendPhone()" class="yanzhengma1btn">获取验证码</el-button>
        </el-form-item>
     
        <el-form-item label="请输入新手机号" prop="newPhone">
          <el-input type="text" v-model="form2.newPhone" autocomplete="off" clearable name="inp1" ></el-input>
        </el-form-item>
        <el-form-item label="验证新手机" prop="yanzhengphone" class="yanzhengma2">
            <el-input type="tel" placeholder="请输入验证码" v-model="form2.yanzheng"  class="yanzhengma2inp"></el-input>
            
            <el-button @click="checkPhone()"  class="yanzhengma2btn">验证新手机号</el-button>
        </el-form-item>
  

        <el-form-item>
          <el-button @click="gengxinPhone()" class="shoujibtn">更新手机号</el-button>
          <!-- <el-button>重置</el-button> -->
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>




</div>





</template>
<script>
import gerenCenter from '../mixins/gerenCenter'
export default {
  name: '',
  components: {

  },
  computed: {

  },
data() {

  var validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
     
      callback();
    }
  };
  var validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (this.ruleForm.checkPass !== this.ruleForm.newPass) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  };
    var validatePass3 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入原密码'));
    } else if (value != this.ruleForm.oldPass) {
      callback(new Error('原密码输入错误!'));
    } else {
      callback();
    }
  };
//     var validatePass4 = (rule, value, callback) => {
//     if (value === '') {
//       callback(new Error('请输入新的手机号码'));
//     } else {
     
//       callback();
//     }
//   };
  return {
      yanzheng1:'',
    user: this.$store.state.loginModules.user.parentImg,
    user1:this.$store.state.loginModules.user.studentPhoto,
    user2:this.$store.state.loginModules.user.staffImg,
    imageUrl: '',
    tableData:[],
    form2:{newPhone:"",yanzheng:""},
    dialogImageUrl: '',
    dialogVisible: false,

    ruleForm: {
    oldPass:'',
    newPass: '',
    checkPass: '',
    yangzhengma:'',
    yanzhengphone:'',
    newPhone:'',
    },

    form1:{
        parentImg: "",
    },
    rules: {
      newPass: [
        { validator: validatePass, trigger: 'blur' }
      ],
      checkPass: [
        { validator: validatePass2, trigger: 'blur' }
      ],
      oldPass: [
        { validator: validatePass3, trigger: 'blur' }
      ],
    //   newPhone:[
    //         { validator: validatePass4, trigger: 'blur' }
    //   ]
    },
    dialogFormVisible:false,  
    dialogFormVisible1:false,  
  };
},
mixins:[gerenCenter],

created(){
this.getData()
},
methods: {
  submitForm(formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        // alert('submit!');
        //    if(this.ruleForm.oldPass === this.ruleForm.newPass){

        //    }
       
        console.log('0');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
    this.LoginAction2({
        name:'XIUGAI_API',
        data:{newPsw:this.ruleForm.newPass,old:this.ruleForm.oldPass}
   }).then((data)=>{
    console.log(data);
        if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '修改失败!'
            });
          }
})
  },
  getData(){
    this.LoginAction1({
        name:'GETDATA_API',
        data:{}
   }).then((data)=>{
    console.log(data);
    this.tableData=data.data
})
  },
baocun(){
    console.log(22222,this.form1.parentImg);
   this.LoginAction3({
        name:'TOUXIANG_API',
        data:{path:"http://"+this.form1.parentImg}
   }).then((data)=>{
    console.log(data);
   this.getData()
})

},

// 修改手机号
sendPhone(){
   this.LoginAction4({
        name:'SENDPHONE_API',
        data:{}
   }).then((data)=>{
    console.log(data);
})
},
checkPhone(){
   this.LoginAction5({
        name:'CHECK_API',
        data:{code:this.form2.newPhone}
   }).then((data)=>{
    console.log(data);
})
},
gengxinPhone(){
   this.LoginAction6({
        name:'GENGXIN_API',
        data:{code:this.form2.yanzheng,phone:this.newPhone}
   }).then((data)=>{
    console.log(data);
})
},
// blu1(){
//     console.log(123);
// if(this.yanzheng1!=''){
//     this.inp1.disabled="";
// }else{
//     this.inp1.disabled="disabled";
// }
// },
  // 修改密码重置
  resetForm(formName) {
    this.$refs[formName].resetFields();
  },
// 弹出修改密码
 gaiMi(){
    this.dialogFormVisible = true
    console.log(123);
  },
//   弹出修改手机号
shoujihao(){
 this.dialogFormVisible1 = true
},
//   上传头像
  handleRemove(file, fileList) {
        console.log(file, fileList);
    },
  handlePictureCardPreview(file) {
      console.log(1212,file.response.data);
        this.dialogImageUrl = file.response.data;
        console.log(this.dialogImageUrl);
        this.form1.parentImg = this.dialogImageUrl;
        console.log(this.form1.parentImg);
        this.dialogVisible = true;
    },
 }
}
</script>
<style lang="less" scoped>

.el-divider--horizontal{
  margin: 0;
}
.el-breadcrumb{
  padding-left: 1rem;
  line-height: 3;
  font-size: 1.6rem;
}
.touxiang{
    margin: 20px 0;
    // margin-bottom: 5px;
    margin-left: 70px;
    text-align: center;
}
.touxiang img{
    width: 110px;
    height: 110px;
    border-radius: 50%;
    // border: 1px solid black;
    
}

.xiugaimima a{
color: red;
}
.information-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
li{
  list-style: none;
}
.list-group {
    margin: 10px 0;
    margin-left: 40px;
    width: 70%;
}
.list-group-item{
    border: 0;
    cursor: pointer;
    margin-bottom: 15px;
    font-size: 1.8rem;
}
.list-group-item:hover{
    background:rgb(249,248,248) ;
}
.list-group-item i{
    font-style: normal;
    display: inline-block;
    text-align: right;
    padding: 4px 20px;
    width: 100px;
}
.list-group-item span{
    color: rgb(143, 143, 143);
    display: inline-block;
    // width: 100px;
    margin-left: 30px;
    padding: 4px 0;
}

 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
    
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
     background-color: #fff;
     
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.touxiangkuang{
    margin: 0 auto;
    
}
.touxiangbtn{
    text-align: center;
}
.phonebtn{
  background-color: #16B387;
  border: 1px solid #16B387;
  color: #fff;
}
.phonebtn:hover{
  border: 1px solid #16B387;
  color: #16B387;
  background-color: white;
  cursor: pointer;
}
.shoujibtn{
     background-color: #94bdb6;
}
// .yanzhengma1{
//     display: flex;
// }
.yanzhengma1inp{
    width: 86%;
}
.yanzhengma1btn{
    float: left;
}
.yanzhengma2inp{
    width: 84%;
}
.yanzhengma2btn{
    float: left;
}
</style>
