<template>
  <div class="stu-score">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生成绩管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="filter-cpns">
      <!--通过考试编号-->
      <yy_FilterByInput v-if="shenfen=='学生'||shenfen=='家长'" :filterData="{data:classGreadData,text:'请输入考试编号',filterProperty:'bianhao'}"
                        @filteredData="filteredByBianHaoFn"/>
      <!--通过班级(老师)-->
      <yy_FilterBySelect v-if="shenfen=='老师'||shenfen=='班主任'||shenfen=='管理员'" :filterData="{
      optionData:{label:'classFullName',value:'classId',data:newAllClass},
      data:classGreadData,
      text:'请选择班级',
      filterProperty:'classFullName'
      }" @filteredData="filteredByClassFn"/>

      <!--通过学科(老师)-->
      <yy_FilterBySubject v-if="shenfen=='老师'||shenfen=='班主任'||shenfen=='管理员'"/>

      <!--通过考试类型(老师)-->
      <yy_FilterBySelect v-if="shenfen=='老师'||shenfen=='班主任'||shenfen=='管理员'" :filterData="{
      optionData:{label:'testType',value:'testType',data:[{testType_id:'1',testType:'班级考'},{testType_id:'2',testType:'年级考'},{testType_id:'3',testType:'校级考'}]},
      data:classGreadData,
      text:'请选择考试类型',
      filterProperty:'testType'
      }" @filteredData="filteredByTestTypeFn"/>
    </div>
<!--    显示班级排名（学生）-->
    <div class="show-class-score" v-if="shenfen=='学生'||shenfen=='家长'">
      <el-button size="small" plain>显示班级排名</el-button>
    </div>
<!--    批量录入成绩（老师）-->
    <div class="show-class-score add-score"  v-if="shenfen=='老师'||shenfen=='班主任'">
      <el-button @click="addScoreDialogFormVisible=true" size="small" plain>批量录入成绩</el-button>
    </div>

<!--    成绩表-->
    <div class="score-table">
      <yy_ClassGreadTable :tableData="renderData" :shenfen="shenfen"/>
    </div>
    <!--分页-->
    <div class="fenye">
      <el-pagination
              :hide-on-single-page="true"
              :page-size="8"
              :pager-count="9"
              layout="prev, pager, next"
              :total="100">
      </el-pagination>
    </div>

    <!--老师录入成绩-->
    <el-dialog
            width="30%"
            top="15%"
            title="选择具体内容导出EXCEL表格"
            :modal-append-to-body="false"
            @close="closeAddScoreDialog('importForm')"
            style="cursor: default"
            :visible.sync="addScoreDialogFormVisible">

      <el-form :model="importForm" :rules="importRule" ref="importForm" status-icon>
        <el-form-item label="班级" required label-width="100px" prop="classId">
          <el-input v-model="importForm.classId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考试编号" required label-width="100px" prop="exam_uuid">
          <el-input v-model="importForm.exam_uuid" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddScoreDialog('importForm')">取 消</el-button>
        <el-button type="primary" @click="getExcelForm('importForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getStorage } from "../utils/storage";
  import yy_FilterByInput from '@/components/yy_FilterByInput'
  import yy_FilterBySelect from '@/components/yy_FilterBySelect'
  import yy_FilterBySubject from '@/components/yy_FilterBySubject'
  import yy_ClassGreadTable from '@/components/yy_ClassGreadTable'

  import { mapState,mapActions } from 'vuex'
  export default {
    name:'StudentScore',
    components:{
      yy_FilterBySubject,
      yy_FilterByInput,
      yy_FilterBySelect,
      yy_ClassGreadTable,
    },
    data(){
      return{
        renderData:[],//表格渲染的数据
        filteredByBianHaoData:[],//通过考试编号筛选出的数据
        filteredByXueKeData:[],//通过学科筛选出的数据
        filteredByClassData:[],//通过班级筛选出的数据
        filteredByTestType:[],//通过考试类型筛选出的数据
        addScoreDialogFormVisible:false,
        //导出excel的要传的数据
        importForm:{
          classId:'',
          exam_uuid:'',
        },
        //导出excel验证
        importRule:{
          classId:[{required: true, message: '请选择班级', trigger: 'blur'}],
          exam_uuid:[{required: true, message: '请输入考试编号', trigger: 'blur'}]
        }
      }
    },
    computed:{
      ...mapState('yy_module',['classGreadData','AllClass']),
      shenfen(){
        return getStorage('shenfen')
      },
      //简洁的新的班级信息
      newAllClass(){
        return this.AllClass.map(v=>{
          this.$set(v,'classFullName',v.gradeName+v.className)
          return v
        })
      },
    },
    created(){
      this.getAllClass()
      this.renderData = this.classGreadData//初始化渲染数据
      this.filteredByBianHaoData = this.classGreadData//初始化编号数据
      this.filteredByClassData = this.classGreadData//初始化班级数据
      this.filteredByTestType = this.classGreadData//初始化考试类型数据
    },
    methods:{
      ...mapActions('yy_module',['getAllClass']),
      //接收子组件筛选出的数据
      filteredByBianHaoFn(data){
        this.filteredByBianHaoData = data
        this.filterFn()
      },
      filteredByClassFn(data){
        this.filteredByClassData = data
        this.filterFn()
      },
      filteredByTestTypeFn(data){
        this.filteredByTestType = data
        this.filterFn()
      },
      //筛选函数
      filterFn(){
        this.renderData = this.filteredByBianHaoData
            .filter(item=>this.filteredByClassData.includes(item))
            .filter(item=>this.filteredByTestType.includes(item))
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
  .show-class-score>.el-button{
    color: #fff!important;
  }
  .show-class-score>.el-button:hover{
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