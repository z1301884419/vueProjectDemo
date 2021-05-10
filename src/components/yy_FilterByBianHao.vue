<template>
  <div>
    <el-input
            placeholder="请输入考试编号"
            v-model="value"
            @change="changValue"
            clearable>
    </el-input>
  </div>
</template>

<script>
  export default {
    name: "yy_FilterByBianHao",
    data(){
      return{
        value:'',
      }
    },
    methods:{
      changValue(){
        console.log(this.value);
      }
    }
  }
</script>

<style scoped>

</style>