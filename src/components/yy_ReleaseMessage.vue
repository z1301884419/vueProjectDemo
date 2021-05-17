<template>
  <div class="add-stu">
    <el-button type="text" class="message-btn" size="small" @click="openDialog">发布消息</el-button>

    <el-dialog
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            title="发布消息"
            top="40px"
            width="40%"
            @close="closeDialog('form')"
            :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="releaseRule" ref="form" status-icon>
        <el-form-item label="发布人" label-width="100px">
          <el-input :value="className" readonly="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" label-width="100px">
          <el-input :value="className" readonly="" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="消息内容" required label-width="100px" prop="releaseContent">
          <el-input type="textarea"
                    v-model="form.releaseContent"
                    :rows="4"
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
  //import yy_request from '@/utils/yy_request'
  export default {
    name: "yy_ReleaseMessage",
    components:{
    },
    props:['className'],
    data() {
      return {
        dialogFormVisible: false,
        form:{
          releaseContent:'',
        },
        //表单验证规则
        releaseRule:{
          releaseContent:[
            { required: true, message: '请输入发布内容', trigger: 'blur' },
            { min: 5, max: 80, message: '长度在 5 到 80 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      //打开模态框
      openDialog(){
        this.dialogFormVisible = true
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
            sureAgainBox.bind(this)({
              text:'修改',
            }).then(()=>{
              this.dialogFormVisible = false
            })
          } else {
            this.$message({
              type:'error',
              message:'请确认表单内容'
            })
            return false;
          }
        });
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