<template>
  <div class="add-stus">
    <el-button type="text" class="add-btn" size="small" @click="openDialog">批量添加学生</el-button>

    <el-dialog
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            title="通过excel表格批量添加学生"
            top="40px"
            width="500px"
            :visible.sync="dialogFormVisible">

      <div v-if="isSelectClass">
        <div style="text-align: left">
          <el-button
                  type="primary"
                  size="small"
                  style="margin-left: 26.5%;background:#16B387" @click="downLoadExcel">下载模板</el-button>
          <a v-if="downExcelAdress" :href="downExcelAdress" class="el-upload__tip" style="margin-left:20px;">模板地址</a>
        </div>
        <el-upload class="upload-demo"
                   action :limit="1"
                   :file-list="formFileList"
                   :http-request="handleUploadForm"
                   :on-exceed="formHandleExceed"
                   :on-remove="formHandleRemove"
                   :before-upload="beforeUploadForm"
                   accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
          <el-button style="background:#16B387" type="primary" size="small">上传文件</el-button>
          <span slot="tip" class="el-upload__tip" style="margin: 0 10px;">只能上传xlsx/xls/csv文件，且不超过{{formMaxSize}}M</span>
        </el-upload>
      </div>
      <div v-else>
        <yy_FilterByClass @getClassId="checkedClassID"/>
      </div>


    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import yy_FilterByClass from '@/components/yy_FilterByClass'
  export default {
    name: "yy_UploadExcel",
    components:{
      yy_FilterByClass
    },
    data() {
      return {
        dialogFormVisible: false,
        formMaxSize: 10, // 上传文件大小
        formFileList: [], // 显示上传文件
        uploadFormFileList: [], // 确定上传文件
        isSelectClass:false,
        selectGaredId:'',
        selectClassId:'',
        downExcelAdress:'',//下载的模板地址
      }
    },
    methods: {
      //打开模态框
      openDialog() {
        this.dialogFormVisible = true
      },
      //取消关闭模态框
      closeDialog() {
        this.dialogFormVisible = false
      },
      //确认按钮
      sureAdd() {
        console.log(this.formMaxSize); // 上传文件大小
        console.log(this.formFileList); // 显示上传文件
        console.log(this.uploadFormFileList); // 确定上传文件
      },
      // 开始上传前验证
      beforeUploadForm (file) {
        // 验证文件大小
        if (file.size / 1024 / 1024 > this.formMaxSize) {
          this.$message({
            message: `上传文件大小不能超过${this.formMaxSize}M!`,
            type: 'warning'
          })
          return false
        }
        // 中文乱码处理
        if (file.raw) {
          let reader = new FileReader() // 读取文件内容
          reader.readAsText(file.raw, 'gb2312') // 防止中文乱码问题，不加reader.onload方法都不会触发
          reader.onload = function (e) {
            this.contentHtml = e.target.result // txt文本内容，接下来就可以对其进行校验处理了
          }
        }
        // 验证文件类型
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const extension = testmsg === 'xlsx' || testmsg === 'xls' || testmsg === 'csv'
        if (!extension) {
          this.$message({
            message: '上传文件只能是xlsx/xls/csv格式!',
            type: 'warning'
          })
        }
        return extension
      },
      // 移除上传列表中文件
      formHandleRemove (file) {
        let thiz = this
        for (let i = 0; i < thiz.uploadFormFileList.length; i++) {
          if (thiz.uploadFormFileList[i].pname === file.name) {
            thiz.uploadFormFileList.splice(i, 1)
            break
          }
        }
      },
      // 允许上传文件个数验证
      formHandleExceed (files, formFileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + formFileList.length} 个文件`)
      },
      // 上传文件
      handleUploadForm (param) {
        console.log(this.selectGaredId);
        console.log(this.selectClassId);
        let thiz = this
        let formData = new FormData()
        formData.append('file', param.file)
        formData.append('classId', this.selectClassId)// 额外参数
        formData.append('gradeId', this.selectGaredId)// 额外参数
        let loading = thiz.$loading({
          lock: true,
          text: '上传中，请稍候...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        axios.post('http://172.16.14.46:8191/student/add/excel', formData).then(({data}) => {
          console.log(data);
          if (data.code === 200) {
            thiz.$message({
              type:'success',
              message:'上传文件成功',
            })
            thiz.formFileList = []
            thiz.uploadFormFileList = []
          } else {
            thiz.formFileList = []
            thiz.uploadFormFileList = []
            thiz.$message({
              type:'error',
              message:'上传文件失败',
            })
          }
          loading.close()
        })
      },
      //下载模板
      downLoadExcel() {
        axios({
          url:"http://172.16.14.46:8191/student/export/excel",
          method:"post",
        }).then(res=>{
          this.downExcelAdress = res.data.data
        })
       },
      checkedClassID(value){
        this.selectGaredId = value[0]
        this.selectClassId = value[1]
        value[0]?this.isSelectClass = true:this.isSelectClass = false
        console.log(this.isSelectClass);
      },





    }
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