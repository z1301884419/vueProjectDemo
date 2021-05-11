<template>
  <div class="stu-info">
    <div class="filter-cpns">
      <!--学号-->
      <yy_FilterByInput :filterData="{data:allStuData,text:'请输入学号',filterProperty:'student_number'}"
                        @filteredData="filteredByXuehaoFn"/>
      <!--班级-->
      <yy_FilterBySelect :filterData="{
      optionData:{label:'class_name',value:'class_id',data:[{class_id:'1',class_name:'高一一班'},{class_id:'2',class_name:'高一二班'},{class_id:'3',class_name:'高一三班'}]},
      data:allStuData,
      text:'请选择班级',
      filterProperty:'class_id'
      }" @filteredData="filteredByClassFn"/>
      <!--姓名-->
      <yy_FilterByInput :filterData="{data:allStuData,text:'请输入姓名',filterProperty:'student_name'}"
                        @filteredData="filteredByNameFn"/>
      <!--性别-->
      <yy_FilterBySelect :filterData="{
      optionData:{label:'lable',value:'value',data:[{lable:'男',value:'男'},{lable:'女',value:'女'}]},
      data:allStuData,
      text:'请选择性别',
      filterProperty:'student_gender'
      }" @filteredData="filteredBySexFn"/>
      <!--出生日期-->
      <yy_FilterByBirthday/>
    </div>
    <div class="add-stu">
      <el-button style="padding:0 1rem;margin: 0 0.5rem " type="primary" size="small" plain>
        <yy_AddOrSetStudentDialog :stuData="{text:'添加学生',title:'添加学生信息'}"/>
      </el-button>
    </div>
    <!--    学生信息表-->
    <div class="stu-table">
      <yy_StudentInfoTable :tableData="renderData"/>
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
  import yy_FilterBySelect from '@/components/yy_FilterBySelect'
  import yy_FilterByInput from '@/components/yy_FilterByInput'

  import yy_FilterByBirthday from '@/components/yy_FilterByBirthday'
  import yy_StudentInfoTable from '@/components/yy_StudentInfoTable'
  import yy_AddOrSetStudentDialog from '@/components/yy_AddOrSetStudentDialog'

  import {mapState} from 'vuex'
  export default {
    name:'StudentInfo',
    components:{
      yy_FilterBySelect,
      yy_FilterByInput,
      yy_FilterByBirthday,
      yy_StudentInfoTable,
      yy_AddOrSetStudentDialog,
    },
    data(){
      return{
        renderData:[],//表格数据
        filteredByNameData:[],//通过名字筛选出的数据
        filteredBySexData:[],//通过性别筛选出的数据
        filteredByBirthdayData:[],//通过出生日期筛选出的数据
        filteredByDescData:[],//通过备注筛选出的数据
        filteredByXuehaoData:[],//通过学号筛选出的数据
        filteredByClassData:[],//通过班级筛选出的数据
      }
    },
    computed:{
      ...mapState('yy_module',['allStuData'])
    },
    created() {
      this.renderData = this.allStuData//初始化表格数据
      this.filteredByNameData = this.allStuData//初始化通过名字筛选出的数据
      this.filteredBySexData = this.allStuData//性别
      this.filteredByClassData = this.allStuData//班级
      this.filteredByXuehaoData = this.allStuData//学号
      this.filteredByBirthdayData = this.allStuData//出生日期
      this.filteredByDescData = this.allStuData//备注
    },
    methods:{
      //筛选姓名
      filteredByNameFn(data){
        this.filteredByNameData = data
        this.filterFn()
      },
      //筛选性别
      filteredBySexFn(data){
        console.log(data);
        this.filteredBySexData = data
        this.filterFn()
       },
      //筛选学号
      filteredByXuehaoFn(data){
        this.filteredByXuehaoData = data
        this.filterFn()
      },
      //筛选班级
      filteredByClassFn(data){
        this.filteredByClassData = data
        this.filterFn()
      },
      //筛选出生日期
      filteredByBirthdayFn(data){
        this.filteredByXuehaoData = data
        this.filterFn()
      },
      //筛选备注
      filteredByDescFn(data){
        this.filteredByXuehaoData = data
        this.filterFn()
      },
      //筛选函数
      filterFn(){
        this.renderData = this.filteredByNameData.filter(item=>this.filteredBySexData.includes(item))
            .filter(item=>this.filteredByClassData.includes(item))
            .filter(item=>this.filteredByXuehaoData.includes(item))
            .filter(item=>this.filteredByBirthdayData.includes(item))
            .filter(item=>this.filteredByDescData.includes(item))
      },
    },
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
  .stu-info input{
    font-family: kaola;
  }
  .stu-info button{
    font-family: kaola;
  }
  .el-main{
    overflow: hidden!important;
  }
  /*.stu-info .el-pagination button{*/
  /*  height: 35px;*/
  /*  line-height: 35px;*/
  /*  font-size: 15px;*/
  /*}*/
  /*.stu-info .el-pager li{*/
  /*  height: 35px;*/
  /*  line-height: 35px;*/
  /*  font-size: 15px;*/
  /*}*/
</style>