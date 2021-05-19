<template>
  <div class="stu-score">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生成绩管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="filter-cpns">
      <!--通过学号-->
<!--      v-if="shenfen=='学生'||shenfen=='家长'"-->
      <el-input
              placeholder="请输入学号"
              v-model="filteredByXueHao"
              @change="filteredByXueHaoFn"
              clearable>
      </el-input>
      <!--通过班级-->
      <yy_teacherClassList
              v-if="shenfen=='老师'||shenfen=='班主任'||shenfen=='管理员'"
              @getClassId="filteredByClassFn"/>

      <!--通过考试类型-->
      <el-select v-model="filteredExamNumber" @change="filteredByTestTypeFn" placeholder="请选择考试">
        <el-option
                v-for="item in filteredByTestType"
                :key="item.examUuid"
                :label="item.examName"
                :value="item.examUuid">
        </el-option>
      </el-select>
    </div>
<!--    显示班级排名（学生）-->
    <div class="show-class-score" v-if="shenfen=='学生'||shenfen=='家长'">
      <el-button size="small" plain>显示班级排名</el-button>
    </div>
<!--    批量录入成绩（老师）-->

    <!--通过excel表格批量添加学生-->
    <div class="show-class-score" v-if="shenfen=='老师'||shenfen=='班主任'" style="margin-left: -15px">

      <el-button
              type="text"
              class="add-score"
              size="small"
              style="padding:0 1rem;margin: 0 0.5rem;"
              @click="openDialog">批量录入成绩</el-button>

      <el-dialog
              :modal-append-to-body="false"
              :close-on-click-modal="false"
              title="通过excel表格批量添加学生"
              top="40px"
              width="500px"
              @close="closeDialog"
              :visible.sync="dialogFormVisible">

        <div v-if="isSelectClass&&isInputExamNumber">
          <div style="text-align: left">
            <el-button
                    type="primary"
                    size="small"
                    style="margin-left: 20%;background:#16B387" @click="downLoadExcel">下载模板</el-button>
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
          <div style="margin-left: 100px">
            <yy_teacherClassList @getClassId="downExcelClass"/>
          </div>
          <br>
          <el-form>
            <el-form-item label="考试编号" label-width="100px">
              <el-select style="width: 70%" v-model="InputExamNumber" placeholder="请选择考试">
                <el-option
                        v-for="item in InputExamNumberList"
                        :key="item.examUuid"
                        :label="item.examName"
                        :value="item.examUuid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button class="close-exam-btn" @click="closeDialog">取消</el-button>
          <el-button class="sure-exam-btn" @click="sureDownSelect">确认</el-button>
        </div>
      </el-dialog>
    </div>

<!--    成绩表-->
    <div class="score-table">
      <yy_ClassGreadTable :tableData="renderData" :shenfen="shenfen"/>
    </div>
    <!--分页-->
    <div class="fenye">
      <el-pagination
              :hide-on-single-page="true"
              :page-size="5"
              :pager-count="7"
              :current-page="nowPage"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="AllStuScoresLength">
      </el-pagination>
    </div>


  </div>
</template>
<script>
  import { getStorage } from "../utils/storage";
  import axios from 'axios'
  import yy_request from "@/utils/yy_request"
  import yy_teacherClassList from '@/components/yy_teacherClassList'
  import yy_ClassGreadTable from '@/components/yy_ClassGreadTable'

  import { mapState,mapActions } from 'vuex'
  export default {
    name:'StudentScore',
    components:{
      yy_ClassGreadTable,
      yy_teacherClassList,
    },
    data(){
      return{
        renderData:[],//表格渲染的数据
        filteredByXueHao:'',//输入的学号
        filteredByXueKe:'',//选择的学科
        filteredByClass:'',//选择的班级
        teacherClassList:[],//该老师教的班级
        filteredExamNumber:'',//选择的考试类型
        filteredByTestType:[],//改班级的所有考试类型
        addScoreDialogFormVisible:false,
        nowPage:1,
        //导出excel的要传的数据
        importForm:{
          classId:'',
          exam_uuid:'',
        },
        //导出excel验证
        importRule:{
          classId:[{required: true, message: '请选择班级', trigger: 'blur'}],
          exam_uuid:[{required: true, message: '请输入考试编号', trigger: 'blur'}]
        },

        dialogFormVisible: false,
        formMaxSize: 10, // 上传文件大小
        formFileList: [], // 显示上传文件
        uploadFormFileList: [], // 确定上传文件
        isSelectClass:false,
        isInputExamNumber:false,
        InputExamNumber:'',
        InputExamNumberList:[],
        selectGaredId:'',
        selectClassId:'',
        downExcelAdress:'',//下载的模板地址
      }
    },
    computed:{
      ...mapState('yy_module',['AllStuScores','AllStuScoresLength']),
      shenfen(){
        return getStorage('shenfen')
      },
    },
    created(){
      this.renderData = this.AllStuScores//初始化渲染数据
    },
    methods:{
      ...mapActions('yy_module',['getAllStuScores']),
      //接收子组件筛选出的数据
      filteredByXueHaoFn(data){//学号
        this.filteredByXueHao = data
        console.log(this.filteredByXueHao);
        this.filterFn()
      },
      filteredByClassFn(value){//班级
        this.filteredByClass = value[1]
        if(value[1]){
          yy_request.SelectClassByClassFn(value[1]).then(res=>{
            this.filteredByTestType = res.data
            this.filteredExamNumber = ''
          })
        }else {
          this.filteredByTestType = []
        }
      },
      filteredByTestTypeFn(){//考试类型
        console.log(this.filteredExamNumber);
        this.filterFn()
      },
      //筛选函数
      filterFn(){
        this.nowPage = 1
        if(this.filteredByXueHao){
          this.getAllStuScores({
            examNumber:"202105144a6d43",//必须
            limit: 5,
            page: 1,
            studentNumber: this.filteredByXueHao
          }).then(res=>{
            if(res.code==500){
              this.$message({
                type:'error',
                message:'查询失败'
              })
            }else {
              this.$message({
                type:'success',
                message:'查询成功'
              })
              this.renderData = res.data
            }
          })
        }else {
          this.getAllStuScores({
            classId: this.filteredByClass,
            examNumber:this.filteredExamNumber,//必须
            limit: 5,
            page: 1,
          }).then(res=>{
            this.renderData = res.data
          })
        }
      },
      //点击取消批量录入dialog
      closeAddScoreDialog(formName){
        this.addScoreDialogFormVisible = false
        this.$refs[formName].resetFields();
      },
      //点击确定得到excel表格
      getExcelForm(formName){
        console.log(this.importForm);

        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('ok');
          } else {
            //后端找不到数据提示
            this.$message({
              type:'error',
              message:'考试编号不存在'
            })
            return false;
          }
        })
      },
      //分页
      currentChange(value){
        this.nowPage = value
        this.getAllStuScores({
          classId: this.filteredByClass,
          examNumber:"dsfiosdgisdgmo16161615",//必须
          limit: 5,
          page: value,
        }).then(res=>{
          this.renderData = res.data
        })
      },
      //打开模态框
      openDialog() {
        this.dialogFormVisible = true
      },
      //取消关闭模态框
      closeDialog() {
        this.InputExamNumber = ''
        this.dialogFormVisible = false
        this.isSelectClass = false
        this.isInputExamNumber = false
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
        let thiz = this
        let formData = new FormData()
        formData.append('file', param.file)
        let loading = thiz.$loading({
          lock: true,
          text: '上传中，请稍候...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        yy_request.UploadScoreExcelFn(formData).then((data) => {
          console.log(data);
          if (data.data.code === 200) {
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
          url:"http://172.16.14.46:8092/instructor/score/export/excel",
          method:"post",
          data:{
            classId:this.selectClassId,
            examNumber:this.InputExamNumber,
            staffId:getStorage('user').staffId,
          }
        }).then(res=>{
          console.log(res);
          this.downExcelAdress = res.data.data
        })
      },
      //下载模板时的班级考试编号联级选择
      downExcelClass(value){
        this.selectGaredId = value[0]
        this.selectClassId = value[1]
        value[1]?this.isSelectClass = true:this.isSelectClass = false
        if(value[1]){
          yy_request.SelectClassByClassFn(value[1]).then(res=>{
            this.InputExamNumberList = res.data
          })
        }
      },
      //确认选择班级和考试编号
      sureDownSelect(){
        this.InputExamNumber?this.isInputExamNumber = true:this.isInputExamNumber = false
      },
    },

  }
</script>
<style scoped lang="less">
  .stu-score{
    .filter-cpns{
      display: flex;
      width: 98%;
      margin: 0 auto;
      >div{
        width: 150px;
        margin: 2.5rem 1rem;
      }
    }
    .show-class-score{
      padding:0 2rem;
      button{
        height: 34px;
      }

    }
    .score-table{
      width: 96%;
      margin: 1rem auto;

    }
    .fenye{
      .el-pagination{
        margin: 0 auto;
        text-align: center;
      }
    }
  }
</style>
<style>
  @import '../assets/css/font.css';
  .stu-score input{
    font-family: kaola;
  }
  .stu-score button{
    font-family: kaola;
  }
  .show-class-score>.el-button{
    background-color: #16B387;
    border: 1px solid #16B387;
  }
  .show-class-score .el-button--text{
    color: #fff!important;
  }
  .show-class-score .add-score:hover{
    color: #16B387!important;
    background-color: white;
  }
  .show-class-score .close-exam-btn{
    margin-left: 100px;
  }
  .show-class-score .sure-exam-btn{
    background-color: #16B387;
    border: 1px solid #16B387;
    color: white;
    margin-left: 140px;
  }
  /*.el-input__inner*/
  .show-class-score .sure-exam-btn:hover{
    color: #16B387!important;
    background-color: white;
  }
  .el-divider--horizontal{
    margin: 0;
  }
  .el-breadcrumb{
    padding-left: 1rem;
    line-height: 3;
    font-size: 1.6rem;
  }
</style>