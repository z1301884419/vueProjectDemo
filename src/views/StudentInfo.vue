<template>
  <div class="stu-info">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!--学生的页面-->
    <div v-if="shenfen=='学生'||shenfen=='家长'" class="this-stu-info">
      <div class="left">
        <div>
          <img src="" style="width: 200px;height: 200px; vertical-align: top" alt="">
        </div>
        <div class="beizhu">
          <h3>备注信息</h3>
          <div class="beizhu-text">
            {{stuData.studentDesc}}
          </div>
        </div>
      </div>
      <div class="xinxi right">
        <ul>
          <li>学号：<span>{{stuData.studentNumber}}</span></li>
          <li>姓名：<span>{{stuData.studentName}}</span></li>
          <li>性别：<span>{{stuData.studentGender}}</span></li>
          <li>年龄：<span>{{stuData.studentAge}}</span></li>
          <li>名族：<span>{{stuData.studentNation}}</span></li>
          <li>政治面貌：<span>{{stuData.studentPolitics}}</span></li>
          <li>获奖情况：<span>{{stuData.studentExperience}}</span></li>
          <li>在读状态：<span>{{stuData.studentState==1?'在读':stuData.student_state==2?'休学':'退学'}}</span></li>
          <li>班主任：<span>{{stuData.classId}}</span></li>
          <li>班级：<span>{{stuData.classId}}</span></li>
          <li>身份证号：<span>{{stuData.studentIdcardno}}</span></li>
          <li>住址：<span>{{stuData.studentHome}}</span></li>
          <li>联系方式：<span>{{stuData.studentContact}}</span></li>
          <li>入学日期：<span>{{stuData.studentDate}}</span></li>
        </ul>
      </div>
    </div>
    <!--老师的页面-->
    <div v-if="shenfen=='老师'||shenfen=='班主任'||shenfen=='管理员'">
      <div class="filter-cpns">
        <!--学号-->
        <yy_FilterByInput :filterData="{data:AllStuXiangData,text:'请输入学号',filterProperty:'student_number'}"
                          @filteredData="filteredByXuehaoFn"/>

        <!--联级班级选择-->
        <yy_FilterByClass/>
        <!--姓名-->
        <yy_FilterByInput :filterData="{data:AllStuXiangData,text:'请输入姓名',filterProperty:'student_name'}"
                          @filteredData="filteredByNameFn"/>
        <!--性别-->
        <yy_FilterBySelect :filterData="{
        optionData:{label:'lable',value:'value',data:[{lable:'男',value:'男'},{lable:'女',value:'女'}]},
        data:AllStuXiangData,
        text:'请选择性别',
        filterProperty:'student_gender'
        }" @filteredData="filteredBySexFn"/>
        <!--出生日期-->
        <yy_FilterByBirthday/>
      </div>
      <div class="add-student">
        <el-button style="padding:0 1rem;margin: 0 0.5rem;" size="small" plain>
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
                :page-size="5"
                :pager-count="9"
                layout="prev, pager, next"
                :total="renderData.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import { getStorage } from "../utils/storage";
  // import formatDate from '../utils/formatDate'

  import yy_FilterBySelect from '@/components/yy_FilterBySelect'
  import yy_FilterByInput from '@/components/yy_FilterByInput'
  import yy_FilterByClass from '@/components/yy_FilterByClass'

  import yy_FilterByBirthday from '@/components/yy_FilterByBirthday'
  import yy_StudentInfoTable from '@/components/yy_StudentInfoTable'
  import yy_AddOrSetStudentDialog from '@/components/yy_AddOrSetStudentDialog'

  import {mapState,mapActions} from 'vuex'
  export default {
    name:'StudentInfo',
    components:{
      yy_FilterBySelect,
      yy_FilterByInput,
      yy_FilterByClass,
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
        checkedClass: [],//联级菜单选的班级
      }
    },
    computed:{
      ...mapState('yy_module',['AllStuXiangData']),
      shenfen(){
        return getStorage('shenfen')
      },
      stuData(){
        return getStorage('user')
      },
      //生成新的学生信息
      newStuData(){

        return this.AllStuXiangData.map(v=>{
          this.$set(v,'calssFullName',v.grade.gradeName+v.clazz.className)
          let listNotNull = v.parentList.length>0? v.parentList.reduce((prev,cur)=>{
                prev += cur.parentName+','
                return prev
              },''):''
          this.$set(v,'newParentList',listNotNull?listNotNull.substr(0,listNotNull.length-1):'暂未添加')
          return v
        })
      },

      // //生成新的联级班级选择
      // newClassList(){
      //   //生成新的班级列表
      //   let newClassArr = [];
      //   this.AllClass.map(v=>{
      //     newClassArr.push({value:v.classGradeId,label:v.gradeName,children:[]})
      //     return
      //   })
      //   newClassArr = newClassArr.map((v)=>{
      //     return JSON.stringify(v)
      //   })
      //   newClassArr =[...new Set(newClassArr)]
      //   newClassArr = newClassArr.map(v=>{
      //     return JSON.parse(v)
      //   })
      //   //生成新的年级列表结束
      //   //根据年级取该年纪的班级列表
      //   this.AllClass.forEach(v=>{
      //     newClassArr.forEach((vG,vI)=>{
      //       if(v.classGradeId==vG.value){
      //         newClassArr[vI].children.push({value:v.classId,label:v.className})
      //       }
      //     })
      //   })
      //   //根据年级取该年纪的班级列表结束
      //   return newClassArr
      // }
    },
    created() {
      // this.getAllClass()//获取待所有班级
      // console.log(this.AllClass);

      if(this.AllStuXiangData.length==0){
        this.getAllStuXiangData().then(()=>{
          this.renderData = this.newStuData//初始化表格数据
        })
      }else {
        this.renderData = this.newStuData//初始化表格数据
      }
      this.filteredByNameData = this.allStuData//初始化通过名字筛选出的数据
      this.filteredBySexData = this.allStuData//性别
      this.filteredByClassData = this.allStuData//班级
      this.filteredByXuehaoData = this.allStuData//学号
      this.filteredByBirthdayData = this.allStuData//出生日期
      this.filteredByDescData = this.allStuData//备注
    },
    methods:{
      ...mapActions('yy_module',['getAllStuXiangData']),
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
      // selectClass(value) {
      //   console.log(value);
      //   console.log(value[1]);//班级id
      // },
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
    .this-stu-info{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .left{
        .beizhu{
          width: 200px;
          white-space: normal;
          text-align: left;
          margin-top: 30px;
          .beizhu-text{
            margin-top: 20px;
            border: 1px solid gray;
            padding: 10px 4px;
            border-radius: 2px;
            min-height: 250px;
            max-height: 300px;
          }
        }
      }
      .xinxi{
        display: inline-block;
        width: 60%;
        ul{
          text-align: left;
          li{
            white-space: normal;
            margin: 1px 2px;
            padding: 8px 0;
            font-size: 16px;
            font-weight: bold;
            span{
              font-weight: normal;
            }
          }
        }
      }
    }
     .filter-cpns{
       display: flex;
       width: 98%;
       margin:  0 auto;
       >div{
         width: 150px;
         margin: 2.5rem 1rem;
       }
     }
    .add-student{
      margin: 0 1.5rem;
    }
     .stu-table{
       width: 98%;
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
  .add-student>.el-button{
    background-color: #16B387;
    border: 1px solid #16B387;
  }
  .add-student>.el-button .add-btn span{
    color: #fff!important;
  }
  .add-student>.el-button:hover .add-btn span{
    color: #16B387!important;
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