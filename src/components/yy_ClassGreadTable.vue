<template>
  <div>
    <el-table
            :data="newTableData"
            :header-cell-style="{'background-color':'#d4edf9'}"
            :default-sort = "{prop: 'total', order: 'descending'}"
            style="width: 100%">
      <el-table-column
              fixed
              align="center"
              prop="studentName"
              label="姓名">
      </el-table-column>
      <el-table-column
              align="center"
              prop="className"
              label="班级">
      </el-table-column>
      <el-table-column
              align="center"
              prop="yuwen"
              sortable
              label="语文">
      </el-table-column>
      <el-table-column
              align="center"
              prop="shuxue"
              sortable
              label="数学">
      </el-table-column>
      <el-table-column
              align="center"
              prop="yingyu"
              sortable
              label="英语">
      </el-table-column>
      <el-table-column
              align="center"
              prop="wuli"
              sortable
              label="物理">
      </el-table-column>
      <el-table-column
              align="center"
              prop="huaxue"
              sortable
              label="化学">
      </el-table-column>
      <el-table-column
              align="center"
              prop="shengwu"
              sortable
              label="生物">
      </el-table-column>
      <el-table-column
              align="center"
              prop="sumScore"
              sortable
              label="总分">
      </el-table-column>
      <el-table-column
              align="center"
              label="排名">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column
              align="center"
              prop="testType"
              label="考试类型">
      </el-table-column>
      <!--操作-->
      <el-table-column
              v-if="shenfen!='学生'&&shenfen!='家长'"
              fixed="right"
              label="操作"
              width="100">
        <template slot-scope="scope">
          <el-button
                  @click="setGread(scope.$index,scope.row)"
                  type="text"
                  size="small">{{scope.row.yuwen?'修改':'录入'}}</el-button>
          <el-button
                  type="text"
                  style="color: red"
                  @click="delStu(scope.$index,scope.row)"
                  size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--修改成绩模态框-->
    <el-dialog title="修改考试成绩" width="300px" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item
                :label="'考试成绩('+teacherSubject+')'"
                label-width="100"
                prop="scoreScore">
          <el-input v-model="form.scoreScore" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureSet('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import delAgain from '@/utils/sureAgainBox'
  import yy_request from '@/utils/yy_request'
  import {getStorage} from "../utils/storage";

export default {
    name: "yy_ClassGreadTable",
    data(){
      return{
        form:{
          scoreId:'',
          scoreScore:'',
        },
        studentId:'',
        rules:{
          scoreScore:[{ validator: this.validScoreScore, trigger: 'blur' }]
        },
        dialogFormVisible:false,
        teacherSubject:'',//保存当前老师所教的学科
      }
    },
    props:['tableData','shenfen','ExamNumber'],
    computed:{
      newTableData(){
        if(this.tableData.length>0){
         console.log(this.tableData);
          this.tableData.forEach((v,i)=>{
            if(v.subjectScore.length>0){
             v.subjectScore.forEach((sv)=>{
              if(sv.subjectName=="语文"){
                this.$set(this.tableData[i],'yuwen',sv.scoreScore)
                this.$set(this.tableData[i],'yuwenId',sv.scoreId)
              }
              if(sv.subjectName=="数学"){
                this.$set(this.tableData[i],'shuxue',sv.scoreScore)
                this.$set(this.tableData[i],'shuxueId',sv.scoreId)
              }
              if(sv.subjectName=="英语"){
                this.$set(this.tableData[i],'yingyu',sv.scoreScore)
                this.$set(this.tableData[i],'yingyuId',sv.scoreId)
              }
              if(sv.subjectName=="物理"){
                this.$set(this.tableData[i],'wuli',sv.scoreScore)
                this.$set(this.tableData[i],'wuliId',sv.scoreId)
              }
              if(sv.subjectName=="化学"){
                this.$set(this.tableData[i],'huaxue',sv.scoreScore)
                this.$set(this.tableData[i],'huaxueId',sv.scoreId)
              }
              if(sv.subjectName=="生物"){
                this.$set(this.tableData[i],'shengwu',sv.scoreScore)
                this.$set(this.tableData[i],'shengwuId',sv.scoreId)
              }
            })
          }
        })
        }
        return this.tableData
      }
    },
    created(){
      if(getStorage('user').staffNumber){
        yy_request.SelectTeacherFn(getStorage('user').staffNumber).then(res=>{
          console.log(res.data);
          this.teacherSubject = res.data[0].subjectName
        })
      }
    },
    methods:{
      validScoreScore(rule, value, callback){
        console.log(21212);
        if(isNaN(Number(value))){
          callback(new Error('分数只能是数字'));
        }else if(value<0||value>150){
          callback(new Error('请输入0-150之间的分数'));
        }else {
          callback()
        }
      },
      //修改学生成绩，老师只能修改自己科的成绩
      setGread(index,row){
        //获取到当前学生该学科的学科id
        console.log(row);
        this.studentId = row.studentId
        for(let i in row.subjectScore){
          if(row.subjectScore[i].subjectName==this.teacherSubject){
            this.form.scoreId = row.subjectScore[i].scoreId
            this.form.scoreScore = row.subjectScore[i].scoreScore
          }
        }
        this.dialogFormVisible=true
      },
      //删除学生信息(任课老师只能删自己的学科)
      delStu(index,row){
        console.log(index);
        console.log(row);
        yy_request.DelStuScoreOneFn([row.studentId]).then(res=>{
          console.log(res);
        })
        delAgain.bind(this)({
          text:'删除'
        }).then(()=>{
          console.log(22);
        })
      },
      //确认添加，修改
      sureSet(formName){
        this.$refs[formName].validate((valid) => {
          //验证通过
          if (valid) {
            console.log(this.form);
            //如果scoreId存在则用修改接口，如果不存在就用添加接口
            if(this.form.scoreId){
              console.log(this.form);
              //修改接口
              yy_request.UpdateStuScoreOneFn(this.form).then(res=>{
                console.log(res);
              })
            }else {
              //添加接口
              yy_request.AddStuScoreOneFn({
                examNumber: this.ExamNumber,
                scoreScore: this.form.scoreScore,
                studentId: this.studentId
              }).then(data=>{
                console.log(data);
              })
            }
            //this.dialogFormVisible = false
          }

      })
    },
  }
}
</script>

<style scoped>

</style>

