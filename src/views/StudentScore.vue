<template>
  <div class="stu-score">
    <div class="filter-cpns">
      <!--通过考试编号-->
      <yy_FilterByInput :filterData="{data:classGreadData,text:'请输入考试编号',filterProperty:'bianhao'}"
                        @filteredData="filteredByBianHaoFn"/>
      <!--通过班级(老师)-->
      <yy_FilterBySelect :filterData="{
      optionData:{label:'class_name',value:'class_id',data:[{class_id:'1',class_name:'高一一班'},{class_id:'2',class_name:'高一二班'},{class_id:'3',class_name:'高一三班'}]},
      data:classGreadData,
      text:'请选择班级',
      filterProperty:'class_id'
      }" @filteredData="filteredByClassFn"/>

      <!--通过学科(老师)-->
      <yy_FilterBySubject/>

      <!--通过考试类型(老师)-->
      <yy_FilterBySelect :filterData="{
      optionData:{label:'testType',value:'testType',data:[{testType_id:'1',testType:'班级考'},{testType_id:'2',testType:'年级考'},{testType_id:'3',testType:'校级考'}]},
      data:classGreadData,
      text:'请选择考试类型',
      filterProperty:'testType'
      }" @filteredData="filteredByTestTypeFn"/>
    </div>
<!--    显示班级排名（学生）-->
    <div class="show-class-score">
      <el-button type="primary" size="small" plain>显示班级排名</el-button>
    </div>

<!--    成绩表-->
    <div class="score-table">
      <yy_ClassGreadTable :tableData="renderData"/>
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
  </div>
</template>
<script>
  import yy_FilterByInput from '@/components/yy_FilterByInput'
  import yy_FilterBySelect from '@/components/yy_FilterBySelect'
  import yy_FilterBySubject from '@/components/yy_FilterBySubject'
  import yy_ClassGreadTable from '@/components/yy_ClassGreadTable'

  import { mapState } from 'vuex'
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
      }
    },
    computed:{
      ...mapState('yy_module',['classGreadData'])
    },
    created(){
      this.renderData = this.classGreadData//初始化渲染数据
      this.filteredByBianHaoData = this.classGreadData//初始化编号数据
      this.filteredByClassData = this.classGreadData//初始化班级数据
      this.filteredByTestType = this.classGreadData//初始化考试类型数据
    },
    methods:{
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
    },
  }
</script>
<style scoped lang="less">
  .stu-score{
    .filter-cpns{
      display: flex;
      >div{
        width: 150px;
        margin: 2.5rem 1rem;
      }
    }
    .show-class-score{
      padding:0 1rem;
      button{
        height: 34px;
      }

    }
    .score-table{
      width: 100%;
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
</style>