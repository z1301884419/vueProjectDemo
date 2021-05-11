<template>
  <div class="memoBox">
    <el-card shadow="never">
      <el-input type="textarea" v-model="input"></el-input>
      <el-button size="mini" class="successBtn">选择老师</el-button>
      <el-button size="mini" class="successBtn">发表</el-button>
    </el-card>
    <el-card shadow="hover" v-for="item in tableData" :key="item.id">
      <div class="contentCard" >
        <p class="content">
          <span class="contentTitle">{{ item.teacher }}({{ item.subject }}老师):</span>
          <span>{{ item.content }}</span>
        </p>
        <div>
          <el-button size="mini" round>删除</el-button>
          <el-button size="mini" round>回复</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return {
      input: "",
      tableData: [
        {id:1, teacher:"李四", subject:"语文", content:"学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!"},
        {id:2, teacher:"张三", subject:"数学", content:"学习认真, 作业完成程度好, 继续发扬!!"},
        {id:3, teacher:"王五", subject:"英语", content:"学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!"},
        {id:4, teacher:"吴六", subject:"历史", content:"学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!学习认真, 作业完成程度好, 继续发扬!!"}
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.successBtn {
  background-color: #16B387;
  border: 1px solid #16B387;
  color: #fff;
}
.successBtn:hover {
  border: 1px solid #16B387;
  color: #16B387;
  background-color: white;
}
.el-button{
  margin-top: 1rem;
}
// 回复框
.contentCard{
  font-size: 1.6rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  .content{
    width: 90%;
    line-height: 2rem;
    padding: 1rem;
    .contentTitle{
      color: #16B387;
    }
  }
}
</style>