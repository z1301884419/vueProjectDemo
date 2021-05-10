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
              prop="student_state"
              label="在读状态">
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
  export default {
    name: "yy_StudentInfoTable",
    components:{
      yy_StudentInfoDialog,
      yy_AddOrSetStudentDialog,
    },
    data() {
      return {
        tableData: [{
          student_number: '201500021',
          student_password:'123456',
          class_name: '高三二班',
          student_name: '张三',
          student_birthday: '2005-05-15',
          student_age:'20',
          student_idcardno:'511302200505155223',
          student_nation:'汉族',
          student_politics:'共青团员',
          student_state:'1',
          student_home:'成都市武侯区桂溪街道高新青年公寓一栋6-666',
          student_contact:'120110119115',
          student_parent:'张大五',
          student_gender: '男',
          student_date:'2018-09-21',
          student_experience:'四川省高中生篮球比赛一等奖',
          student_desc: '我是一个好人，我每天都要干三碗饭',
        },{
          student_number: '201500021',
          student_password:'123456',
          class_name: '高三一班',
          student_name: '张三分',
          student_birthday: '2002-05-15',
          student_age:'18',
          student_idcardno:'5121412200505155223',
          student_nation:'汉族',
          student_politics:'共青团员',
          student_state:'1',
          student_home:'成都市武侯区桂溪街道高新青年公寓一栋6-666',
          student_contact:'120110119115',
          student_parent:'张二权',
          student_gender: '男',
          student_date:'2018-09-21',
          student_experience:'四川省高中生篮球比赛一等奖',
          student_desc: '我是一个好人，我每天都要干三碗饭',
        },{
          student_number: '201500021',
          student_password:'123456',
          class_name: '高三二班',
          student_name: '李四',
          student_birthday: '2005-01-15',
          student_age:'20',
          student_idcardno:'511302200505155223',
          student_nation:'汉族',
          student_politics:'共青团员',
          student_state:'1',
          student_home:'成都市武侯区桂溪街道高新青年公寓一栋6-666',
          student_contact:'120110119115',
          student_parent:'李铁牛',
          student_gender: '男',
          student_date:'2018-09-21',
          student_experience:'四川省高中生篮球比赛一等奖',
          student_desc: '我是一个好人，我每天都要干三碗饭',
        }, {
          student_number: '201500021',
          student_password:'123456',
          class_name: '高三二班',
          student_name: '王七八',
          student_birthday: '2005-05-15',
          student_age:'20',
          student_idcardno:'511302200505155223',
          student_nation:'汉族',
          student_politics:'共青团员',
          student_state:'3',
          student_home:'成都市武侯区桂溪街道高新青年公寓一栋6-666',
          student_contact:'120110119115',
          student_parent:'王建邺',
          student_gender: '男',
          student_date:'2018-09-21',
          student_experience:'四川省高中生篮球比赛一等奖',
          student_desc: '我是一个好人，我每天都要干三碗饭',
        }, {
          student_number: '201500021',
          student_password:'123456',
          class_name: '高一二班',
          student_name: '刘三山',
          student_birthday: '2000-05-15',
          student_age:'20',
          student_idcardno:'511302200505155223',
          student_nation:'汉族',
          student_politics:'共青团员',
          student_state:'2',
          student_home:'成都市武侯区桂溪街道高新青年公寓一栋6-666',
          student_contact:'120110119115',
          student_parent:'刘大',
          student_gender: '男',
          student_date:'2018-09-21',
          student_experience:'四川省高中生篮球比赛一等奖',
          student_desc: '我是一个好人，我每天都要干三碗饭',
        }],

      }
    },
    methods:{
      setStu(index,row){
        console.log(index);
        console.log(row);
      },
      delStu(index,row){
        console.log(index);
        console.log(row);
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
</style>