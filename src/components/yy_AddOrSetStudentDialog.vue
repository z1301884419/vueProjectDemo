<template>
  <div class="add-stu">
    <el-button type="text" size="small" @click="openDialog">{{stuData.text}}</el-button>

    <el-dialog
            :modal-append-to-body="false"
            :title="stuData.title"
            top="40px"
            :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学号" required label-width="100px">
          <el-input v-model="form.student_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" required label-width="100px">
          <el-input v-model="form.student_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" required label-width="100px">
          <el-input v-model="form.class_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" required label-width="100px">
          <el-input v-model="form.student_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" required label-width="100px">
          <el-select v-model="form.student_gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" required label-width="100px">
          <el-date-picker
                  v-model="form.student_birthday"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号" required label-width="100px">
          <el-input v-model="form.student_idcardno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="民族" required label-width="100px">
          <el-input v-model="form.student_nation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" required label-width="100px">
          <el-input v-model="form.student_politics" autocomplete="off"></el-input>
        </el-form-item>
        <!--班主任修改在读状态-->
        <el-form-item v-if="'班主任'" label="在读状态" required label-width="100px">
          <el-select :value="form.student_state==1?'在读':form.student_state==2?'休学':'退学'" @change="stateChange($event)">
            <el-option label="在读" :value=1></el-option>
            <el-option label="休学" :value=2></el-option>
            <el-option label="退学" :value=3></el-option>
          </el-select>
        </el-form-item>
        <!---->
        <el-form-item label="住址" label-width="100px">
          <el-input v-model="form.student_home" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="100px">
          <el-input v-model="form.student_contact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="获奖情况" label-width="100px">
          <el-input
                  type="textarea"
                  v-model="form.student_experience"
                  :rows="3"
                  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="100px">
          <el-input type="textarea"
                    v-model="form.student_desc"
                    :rows="3"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "yy_AddOrSetStudentDialog",
    props:['stuData'],
    data() {
      return {
        dialogFormVisible: false,
        form:'',
        nullform: {
          student_number: '',
          student_password:'',
          class_name: '',
          student_name: '',
          student_birthday: '',
          student_idcardno:'',
          student_nation:'',
          student_politics:'',
          student_home:'',
          student_state:1,
          student_contact:'',
          student_gender: '',
          student_experience:'',
          student_desc: '',
        },
      }
    },
    methods:{
      openDialog(){
        this.dialogFormVisible = true
        if(this.stuData.data){
          this.form = this.stuData.data
        }else{
          this.form = this.nullform
        }
      },
      closeDialog(){
        this.dialogFormVisible = false
      },
      sureAdd(){
        console.log(this.form);
      },
      stateChange(e){
        this.form.student_state=e
      },
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