<template>
  <el-table
          :data="tableData"
          header-cell-style="background-color:#d4edf9"
          style="width: 100%;">
    <el-table-column
            fixed
            align="center"
            prop="name"
            label="姓名">
    </el-table-column>
    <el-table-column
            align="center"
            prop="xuehao"
            label="学号">
    </el-table-column>
    <el-table-column
            align="center"
            prop="password"
            label="密码">
    </el-table-column>
    <el-table-column
            align="center"
            prop="sex"
            label="性别">
    </el-table-column>
    <el-table-column
            align="center"
            prop="age"
            label="年龄">
    </el-table-column>
    <el-table-column
            align="center"
            width="100"
            prop="birthday"
            label="出生日期">
    </el-table-column>
    <el-table-column
            align="center"
            width="200"
            prop="idNumber"
            label="身份证号">
    </el-table-column>
    <el-table-column
            align="center"
            prop="zaiduzhuangtai"
            label="在读状态">
    </el-table-column>
    <el-table-column
            align="center"
            prop="minzu"
            label="民族">
    </el-table-column>
    <el-table-column
            align="center"
            prop="jiguan"
            label="籍贯">
    </el-table-column>
    <el-table-column
            align="center"
            prop="parent"
            label="家长">
    </el-table-column>
    <!--操作-->
    <el-table-column
            fixed="right"
            label="操作"
            width="100">
      <template slot-scope="scope">
        <el-button
                @click="setStu(scope.$index,scope.row)"
                type="text"
                size="small">修改</el-button>
        <el-button
                type="text"
                style="color: red"
                @click="delStu(scope.$index,scope.row)"
                size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "yy_StudentInfoTable",
    data() {
      return {
        tableData: [{
          name: '张三',
          xuehao: '1001245',
          password: '12345',
          sex: '男',
          age: '20',
          birthday: '2020-5-15',
          idNumber: '511302211115155413',
          zaiduzhuangtai: '在读',
          minzu: '汉族',
          jiguan: '四川',
          parent: '张大三'
        },{
          name: '张三',
          xuehao: '1001245',
          password: '12345',
          sex: '男',
          age: '20',
          birthday: '2020-5-15',
          idNumber: '511302211115155413',
          zaiduzhuangtai: '在读',
          minzu: '汉族',
          jiguan: '四川',
          parent: '张大三'
        }, {
          name: '张三',
          xuehao: '1001245',
          password: '12345',
          sex: '男',
          age: '20',
          birthday: '2020-5-15',
          idNumber: '511302211115155413',
          zaiduzhuangtai: '在读',
          minzu: '汉族',
          jiguan: '四川',
          parent: '张大三'
        }, {
          name: '张三',
          xuehao: '1001245',
          password: '12345',
          sex: '男',
          age: '20',
          birthday: '2020-5-15',
          idNumber: '511302211115155413',
          zaiduzhuangtai: '在读',
          minzu: '汉族',
          jiguan: '四川',
          parent: '张大三'
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