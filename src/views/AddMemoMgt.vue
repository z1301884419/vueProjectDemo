<template>
  <div class="addMemoBox">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/HomePage' }">首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>关键词管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 搜索栏 -->
    <div class="searchBox">
      <div class="addKeyWord">
        <el-button class="addKeyWordBtn" @click="dialogFormVisible = true"
          >添加关键字</el-button
        >
      </div>
    </div>
    <!-- //模态框 -->
    <el-dialog title="添加关键字" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="关键字" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
   
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false,tianJia()">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="修改关键字" :visible.sync="dialogFormVisible1">
  <el-form :model="form1">
    <el-form-item label="关键字" :label-width="formLabelWidth">
      <el-input v-model="form1.name" autocomplete="off"></el-input>
    </el-form-item>
   
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible1 = false,xiugaiInfo()">确 定</el-button>
  </div>
</el-dialog>
        <!-- 表格 -->
    <div class="KeyWordTable">
      <el-table :data="KeyWordTableData" style="width: 100%;height:301.111px">
        <el-table-column label="全选" align="center" width="50">
          <template>
            <el-checkbox v-model="KeyWordTableData.checked" ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="keywordId" label="关键词id" align="center">
        </el-table-column>
        <el-table-column prop="keywordContent" label="关键词" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              plain
              round
              @click="deleteUser(KeyWordTableData[scope.$index].keywordId)"
              >删除关键字</el-button
            >
            <el-button
              size="mini"
              type="warning"
              plain
              round
              @click="dialogFormVisible1 = true,Xiugai(KeyWordTableData[scope.$index])"
              >修改关键字</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 页码 -->
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="pageTotal" :page-size="pageSize" @current-change="changePage"></el-pagination>
    </div>
  </div>
</template>
<script>
import guanJian from "../mixins/guanJian"
export default {

  data(){

    return{
      dialogFormVisible:false,
      dialogFormVisible1:false,
      formLabelWidth:'120px',
      pageTotal:20,
      pageSize:5,
      nowPage:1,
      form:{
        name:"",
      },
       form1:{
        name:"",
      },
      KeyWordTableData:[
        {id:1,wordName:'中国',checked:false}
      ]
    }
  },
  mixins:[guanJian],
  created(){
this.getData()
  },
  methods: {
xiugaiInfo(){
  this.LoginAction6({
        name: "XIUGAI_API",
        data: {keywordContent:this.form1.name,keywordId:this.form1.id},
      }).then((data) => {
        console.log(data);
        this.getData()
        // this.KeyWordTableData=data.data
        // this.pageTotal=data.count
      });
},


Xiugai(aaa){
  console.log(aaa.keywordContent);
this.form1.name=aaa.keywordContent
this.form1.id=aaa.keywordId

},

    deleteUser(obj){
console.log(obj);
this.LoginAction5({
        name: "DELETE_API",
        data: {ids:[obj]},
      }).then((data) => {
        console.log(data);
        this.getData()
        // this.KeyWordTableData=data.data
        // this.pageTotal=data.count
      });
    },
    changePage(val){
      this.nowPage=val
      this.getData()
    },
    tianJia(){
      this.LoginAction4({
        name: "TIANJIA_API",
        data: {
          keywordContent:this.form.name
        },
      }).then((data) => {
        console.log(data);
        this.getData()
        // this.KeyWordTableData=data.data
        // this.pageTotal=data.count
      });
    },
     getData() {
      // console.log(this.form1.parentPhone);
      this.LoginAction3({
        name: "GETDATA_API",
        data: {
          limit:this.pageSize,
          page:this.nowPage
        },
      }).then((data) => {
        console.log(data);
        this.KeyWordTableData=data.data
        this.pageTotal=data.count
      });
    },
  },
}
</script>

<style lang="less" scoped>
// 大盒子
.addMemoBox {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
}
// 分割线
.el-divider--horizontal {
  margin: 0;
}
// 面包屑导航
.el-breadcrumb {
  padding-left: 1rem;
  line-height: 3;
  font-size: 1.6rem;
}
// 搜索栏：
.searchBox {
  padding-left: 1.5%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 1rem 1rem;
}
// 添加关键字
.addKeyWord {
  width: 20%;
}
// 添加关键字按钮
.addKeyWordBtn {
  background-color: #16b387;
  border: 1px solid #16b387;
  color: #fff;
}
.addKeyWordBtn:hover {
  border: 1px solid #16b387;
  color: #16b387;
  background-color: white;
}
// 表格
.KeyWordTable {
  width: 96%;
  margin: 0 auto;
  margin-top: 2rem;
}
// 页码
.el-pagination {
  text-align: center;
  margin-top: 2rem;
}
/deep/.el-dialog {
  width: 33%;
}
</style>