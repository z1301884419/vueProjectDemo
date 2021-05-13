<template>
  <div>
    <el-table
            :data="tableData"
            :header-cell-style="{'background-color':'#d4edf9'}"
            :default-sort = "{prop: 'total', order: 'descending'}"
            style="width: 100%">
      <el-table-column
              align="center"
              prop="class_name"
              label="班级">
      </el-table-column>
      <el-table-column
              fixed
              align="center"
              prop="name"
              label="姓名">
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
              prop="total"
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
    <el-dialog title="修改考试成绩" width="300px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="考试成绩(语文)" label-width="100">
          <el-input v-model="form.value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureSet">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import delAgain from '@/utils/sureAgainBox'
  export default {
    name: "yy_ClassGreadTable",
    data(){
      return{
        form:{
          index:'',
          value:'',
        },
        dialogFormVisible:false,
      }
    },
    props:['tableData','shenfen'],
    methods:{
      //修改学生成绩，老师只能修改自己科的成绩
      setGread(index,row){
        this.dialogFormVisible=true
        this.form.index = index
        this.form.value = row.yuwen
      },
      //删除学生信息(任课老师只能删自己的学科)
      delStu(index,row){
        console.log(index);
        console.log(row);
        delAgain.bind(this)({
          text:'删除'
        }).then(()=>{
          console.log(22);
        })
      },
      sureSet(){
        this.tableData[this.form.index].yuwen = this.form.value
        this.dialogFormVisible = false
      },
    },
  }
</script>

<style scoped>

</style>

