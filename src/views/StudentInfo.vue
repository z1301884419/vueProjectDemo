<template>
  <div class="stu-info">
    <div class="filter-cpns">
      <yy_FilterByBianHao/>
      <yy_FilterByClass/>
    </div>
    <div class="add-stu">
      <el-button style="padding:0 1rem;margin: 0 0.5rem " type="primary" size="small" plain>
        <yy_AddOrSetStudentDialog :stuData="{text:'添加学生',title:'添加学生信息'}"/>
      </el-button>
    </div>
    <!--    学生信息表-->
    <div class="stu-table">
      <yy_StudentInfoTable/>
    </div>
  </div>
</template>
<script>
  import yy_FilterByBianHao from '@/components/yy_FilterByBianHao'
  import yy_FilterByClass from '@/components/yy_FilterByClass'
  import yy_StudentInfoTable from '@/components/yy_StudentInfoTable'
  import yy_AddOrSetStudentDialog from '@/components/yy_AddOrSetStudentDialog'
  export default {
    name:'StudentInfo',
    components:{
      yy_FilterByBianHao,
      yy_FilterByClass,
      yy_StudentInfoTable,
      yy_AddOrSetStudentDialog,
    },
    data(){
      return{

      }
    }
  }
</script>
<style scoped lang="less">
  .stu-info{
     .filter-cpns{
       display: flex;
       >div{
         width: 150px;
         margin: 2.5rem 1rem;
       }
     }
    .add-stu{
      margin: 0 0.5rem;
    }
     .stu-table{
       width: 100%;
       margin: 1rem auto;

     }
   }

</style>
<style>
  @import '../assets/css/font.css';
  .stu-info input{
    font-family: kaola;
  }
  .stu-info button{
    font-family: kaola;
  }
</style>