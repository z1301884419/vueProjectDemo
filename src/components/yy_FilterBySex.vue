<template>
  <div>
    <el-select v-model="value" @change="changeValue" clearable placeholder="请选择性别">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "yy_FilterBySex",
    data() {
      return {
        value: ''
      }
    },
    props:['filterData'],
    methods:{
      changeValue(){
        console.log(this.value);
        let newData
        if(this.value){
          newData = this.filterData.filter(v=>v.student_gender==this.value)
        }else{
          newData =this.filterData
        }
        this.$emit('filteredData',newData)
      }
    },
  }
</script>

<style scoped>

</style>
