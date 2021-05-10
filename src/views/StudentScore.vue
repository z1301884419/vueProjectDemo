<template>
  <div class="stu-score">
    <div class="filter-cpns">
      <yy_FilterByBianHao/>
      <yy_FilterByClass/>
      <yy_FilterBySubject/>
      <yy_FilterByTestType/>
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
        margin: 3rem 1rem;
      }
    }
    .score-table{
      width: 100%;
      margin: 0 auto;

    }
  }
</style>