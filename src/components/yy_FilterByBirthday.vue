<template>
  <div class="stu-filterbybianhao">
    <el-date-picker
            v-model="value"
            type="date"
            placeholder="请选择日期"
            format="yyyy 年 MM 月 dd 日"
            @change="changValue"
            value-format="yyyy-MM-dd">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    name: "yy_FilterByBirthday",
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

