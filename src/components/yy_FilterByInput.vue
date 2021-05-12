<template>
  <div class="stu-filterbyinput">
    <el-input
            :placeholder="filterData.text"
            v-model="value"
            @change="changValue"
            clearable>
    </el-input>
  </div>
</template>

<script>
  export default {
    name: "yy_FilterByInput",
    data(){
      return{
        value:'',
      }
    },
    props:['filterData'],
    methods:{
      changValue(){
        console.log(this.value);
        console.log(this.filterData.filterProperty);
        let newData
        if(this.value){
          newData = this.filterData.data.filter(v => v[this.filterData.filterProperty] == this.value);
        }else {
          newData = this.filterData.data
        }
        this.$emit('filteredData',newData)
      }
    }
  }
</script>

<style scoped>

</style>