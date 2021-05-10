<template>
  <div class="stu-info">
    <div class="filter-cpns">
      <yy_FilterByBianHao/>
      <yy_FilterByClass/>
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
  export default {
    name:'StudentInfo',
    components:{
      yy_FilterByBianHao,
      yy_FilterByClass,
      yy_StudentInfoTable,
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
         margin: 3rem 1rem;
       }
     }
     .stu-table{
       width: 100%;
       margin: 0 auto;

     }
   }

</style>