<template>
  <div>
    <el-select
            v-model="value"
            @change="changeValue"
            clearable
            :placeholder="filterData.text">
      <el-option v-for="item in filterData.optionData.data" :key="item[filterData.optionData.value]"
                 :label="item[filterData.optionData.label]"
                 :value="item[filterData.optionData.value]"></el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "yy_FilterBySelect",
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
          newData = this.filterData.data.filter(v=>v[this.filterData.filterProperty]==this.value)
        }else{
          newData =this.filterData.data
        }
        this.$emit('filteredData',newData)
      }
    },
  }
</script>

<style scoped>

</style>
