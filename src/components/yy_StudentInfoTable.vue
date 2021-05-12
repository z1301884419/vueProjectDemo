<template>
  <div class="stu-table">
    <el-table
            :data="tableData"
            :header-cell-style="{'background-color':'#d4edf9'}"
            style="width: 100%;">
      <el-table-column
              fixed
              align="center"
              prop="student_number"
              width="100"
              label="学号">
      </el-table-column>
      <el-table-column
              fixed
              align="center"
              prop="student_name"
              label="姓名">
      </el-table-column>
      <el-table-column
              align="center"
              prop="student_gender"
              label="性别">
      </el-table-column>
      <el-table-column
              align="center"
              prop="student_age"
              label="年龄">
      </el-table-column>
      <el-table-column
              align="center"
              width="200"
              prop="student_idcardno"
              label="身份证号">
      </el-table-column>
      <el-table-column
              align="center"
              label="在读状态">
        <template slot-scope="scope">
          {{scope.row.student_state==1?'在读':scope.row.student_state==2?'休学':'退学'}}
        </template>
      </el-table-column>
      <el-table-column
              align="center"
              prop="student_nation"
              label="民族">
      </el-table-column>
      <el-table-column
              align="center"
              width="150"
              prop="student_contact"
              label="联系方式">
      </el-table-column>
      <el-table-column
              align="center"
              prop="student_parent"
              label="家长">
      </el-table-column>
      <!--操作-->
      <el-table-column
              fixed="right"
              label="操作"
              width="200">
        <template slot-scope="scope">
          <el-button
                  type="text"
                  size="small"><yy_StudentInfoDialog :stuData="scope.row"/></el-button>
          <el-button
                  type="text"
                  size="small">
            <yy_AddOrSetStudentDialog
                    :stuData="{data:scope.row,text:'修改学生',title:'修改学生信息'}"/>
          </el-button>
          <el-button
                  type="text"
                  style="color: red"
                  @click="delStu(scope.$index,scope.row)"
                  size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import yy_StudentInfoDialog from '@/components/yy_StudentInfoDialog'
  import yy_AddOrSetStudentDialog from '@/components/yy_AddOrSetStudentDialog'
  import delAgain from '@/utils/sureAgainBox'
  export default {
    name: "yy_StudentInfoTable",
    components:{
      yy_StudentInfoDialog,
      yy_AddOrSetStudentDialog,
    },
    data() {
      return {
      }
    },
    props:['tableData'],
    methods:{
      delStu(index,row){
        console.log(index);
        console.log(row);
        delAgain.bind(this)({
          text: "删除"
        })
      }
    }
  }
</script>

<style scoped>

</style>
<style>
  @import '../assets/css/font.css';
  .stu-table .el-button{
    font-family: kaola;
  }
  .stu-table .el-table td{
    padding: 0!important;
  }
</style>