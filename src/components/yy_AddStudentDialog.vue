<template>
  <div class="add-stu">
    <el-button type="primary" plain @click="openDialog">添加学生</el-button>

    <el-dialog title="录入学生信息" top="40px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学号" label-width="150px">
          <el-input v-model="form.xuehao" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="150px">
          <el-input v-model="form.mima" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" label-width="150px">
          <el-input v-model="form.banji" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="150px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="150px">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" label-width="150px">
          <el-date-picker
                  v-model="form.birthday"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="获奖情况" label-width="150px">
          <el-input v-model="form.huojiang" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="150px">
          <el-input v-model="form.beizhu" autocomplete="off"></el-input>
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
    name: "yy_AddStudentDialog",
    data() {
      return {
        dialogFormVisible: false,
        form: {
          xuehao: '',
          mima:'',
          banji: '',
          name: '',
          birthday: '',
          sex: '',
          huojiang:'',
          beizhu: '',
        },
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

<style scoped>

</style>