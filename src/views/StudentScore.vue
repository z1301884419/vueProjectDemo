<template>
  <div class="stu-score">
    <div class="filter-cpns">
      <yy_FilterByBianHao/>
      <yy_FilterByClass/><!--老师-->
      <yy_FilterBySubject/><!--老师-->
      <yy_FilterByTestType/><!--老师-->
    </div>
<!--    显示班级排名（学生）-->
    <div class="show-class-score">
      <el-button type="primary" size="small" plain>显示班级排名</el-button>
    </div>

<!--    成绩表-->
    <div class="score-table">
      <yy_ClassGreadTable/>
    </div>
  </div>
</template>
<script>
  import yy_FilterByClass from '@/components/yy_FilterByClass'
  import yy_FilterBySubject from '@/components/yy_FilterBySubject'
  import yy_FilterByTestType from '@/components/yy_FilterByTestType'
  import yy_FilterByBianHao from '@/components/yy_FilterByBianHao'
  import yy_ClassGreadTable from '@/components/yy_ClassGreadTable'
  export default {
    name:'StudentScore',
    components:{
      yy_FilterByClass,
      yy_FilterBySubject,
      yy_FilterByTestType,
      yy_FilterByBianHao,
      yy_ClassGreadTable,
    },
    data(){
      return{

      }
    }
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