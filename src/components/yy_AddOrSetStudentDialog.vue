<template>
  <div class="add-stu">
    <el-button type="text" class="add-btn" size="small" @click="openDialog">{{stuData.text}}</el-button>

    <el-dialog
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            :title="stuData.title"
            top="40px"
            @close="closeDialog('form')"
            :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="addrule" ref="form" status-icon>
        <el-form-item label="学号" required label-width="100px" prop="studentNumber">
          <el-input v-model="form.studentNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" required label-width="100px" prop="studentPassword">
          <el-input v-model="form.studentPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" required label-width="100px" prop="classId">
          <yy_FilterByClass @getClassId="getClassId" :nowClass="[form.gradeId,form.classId]"/>
        </el-form-item>
        <el-form-item label="姓名" required label-width="100px" prop="studentName">
          <el-input v-model="form.studentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" required label-width="100px" prop="studentGender">
          <el-select v-model="form.studentGender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" required label-width="100px" prop="studentDate">
          <el-date-picker
                  v-model="form.studentDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号" required label-width="100px" prop="studentIdcardno">
          <el-input v-model="form.studentIdcardno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="民族" required label-width="100px" prop="studentNation">
          <el-input v-model="form.studentNation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" required label-width="100px" prop="studentPolitics">
          <el-select v-model="form.studentPolitics">
            <el-option label="共青团员" value='共青团员'></el-option>
            <el-option label="群众" value='群众'></el-option>
            <el-option label="预备党员" value='预备党员'></el-option>
          </el-select>
        </el-form-item>
        <!--班主任修改在读状态-->
        <el-form-item v-if="'班主任'" label="在读状态" required label-width="100px" prop="studentState">
          <el-select :value="form.studentState==1?'在读':form.studentState==2?'休学':'退学'" @change="stateChange">
            <el-option label="在读" :value=1></el-option>
            <el-option label="休学" :value=2></el-option>
            <el-option label="退学" :value=3></el-option>
          </el-select>
        </el-form-item>
        <!---->
        <el-form-item label="住址" label-width="100px">
          <el-input v-model="form.studentHome" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="100px">
          <el-input v-model="form.studentContact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="获奖情况" label-width="100px">
          <el-input
                  type="textarea"
                  v-model="form.studentExperience"
                  :rows="3"
                  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="100px">
          <el-input type="textarea"
                    v-model="form.studentDesc"
                    :rows="3"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('form')">取 消</el-button>
        <el-button type="primary" @click="sureAdd('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import sureAgainBox from '@/utils/sureAgainBox'
  import yy_FilterByClass from '@/components/yy_FilterByClass'
  export default {
    name: "yy_AddOrSetStudentDialog",
    components:{
      yy_FilterByClass,
    },
    props:['stuData'],
    data() {
      return {
        dialogFormVisible: false,
        form:'',
        nullform: {
          studentNumber: '',
          studentPassword:'',
          classId: '',
          studentName: '',
          studentDate: '',
          studentIdcardno:'',
          studentNation:'',
          studentPolitics:'',
          studentHome:'',
          studentState:1,
          studentContact:'',
          studentGender: '',
          studentExperience:'',
          studentDesc: '',
        },
        //表单验证规则
        addrule:{
          studentNumber:[{ validator: this.test_student_number, trigger: 'blur' }],//学号
          studentPassword:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
            ],//密码
          classId:[{required: true, message: '请选择班级', trigger: 'change'}],//班级
          studentName:[{ validator: this.test_student_name, trigger: 'blur' }],//姓名
          studentGender:[{required: true, message: '请选择性别', trigger: 'change'}],//性别
          studentDate:[{required: true, message: '请选择日期', trigger: 'change'}],//出生日期
          studentIdcardno:[{ validator: this.test_student_idcardno, trigger: 'blur' }],//身份证号
          studentNation:[{ validator: this.test_student_nation, trigger: 'blur' }],//民族
          studentPolitics:[{required: true, message: '请选择政治面貌', trigger: 'change'}],//政治面貌
          studentState:[{required: true, message: '请选择在读状态', trigger: 'change'}],//在读状态
        }
      }
    },
    methods:{
      //获取选择班级子组件传来的id
      getClassId(id){
        this.form.classId = id
      },
      //打开模态框
      openDialog(){
        this.dialogFormVisible = true
        if(this.stuData.data){
          this.form = {...this.stuData.data}
        }else{
          this.form = this.nullform
        }
      },
      //取消关闭模态框
      closeDialog(formName){
        this.dialogFormVisible = false
        this.$refs[formName].resetFields();
      },
      //确认按钮
      sureAdd(formName){
        console.log(this.form);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //调用确定操作的函数
            if(this.stuData.data){
              sureAgainBox.bind(this)({
                text:'修改',
              }).then(()=>{
                this.dialogFormVisible = false
              })

            }else {
              sureAgainBox.bind(this)({
                text:'添加',
              }).then(()=>{
                this.dialogFormVisible = false
              })

            }
          } else {
            this.$message({
              type:'error',
              message:'请确认表单内容'
            })
            return false;
          }
        });
      },
      //自定义v-model改变学生在读状态
      stateChange(e){
        this.form.studentState=e
      },
      //表单验证规则
      test_student_number(rule, value, callback){
        if (/\D/gim.test(value)||value.length!=9) {
          callback(new Error('学号只能是纯数字且为9位数'));
        } else {
          callback();
        }
      },//验证学号
      test_student_name(rule, value, callback){
        if(value===''){
          callback(new Error('姓名不能为空'));
        }else if(/\d/gim.test(value)) {
          callback(new Error('姓名不能包含数字'));
        } else {
          callback();
        }
      },//验证姓名
      test_student_idcardno(rule, value, callback){
        if (value===""){
          callback(new Error('身份证号不能为空'));
        } else {
          if(value.length!=18){
            callback(new Error('身份证号只能是18位'));
          }else{
            callback();
          }
        }
      },//验证身份证号
      test_student_nation(rule, value, callback){
        if(value===''){
          callback(new Error('民族不能为空'));
        }else if(/\d/gim.test(value)) {
          callback(new Error('民族不能包含数字'));
        } else {
          callback();
        }
      },//验证民族
    },

  }
</script>

<style scoped>

</style>
<style>
  @import '../assets/css/font.css';
  .add-stu{
    font-family: kaola;
  }
  .add-stu input{
    font-family: kaola;
  }
  .add-stu .el-form-item__content{
    text-align: left!important;
  }

</style>