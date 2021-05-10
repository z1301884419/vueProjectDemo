<template>
  <div>
    <el-select v-model="value" @change="changeValue" clearable placeholder="请选择班级">
      <el-option
              v-for="item in data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "yy_FilterByClass",
    data() {
      return {
        data:[{
          value:'g1',
          label:'高一'
        },{
          value:'g2',
          label:'高二'
        },{
          value:'g3',
          label:'高三'
        }],
        value: ''
      }
    },
    methods:{
      changeValue(){
        console.log(this.value);
      }
    },
  }
</script>

<style scoped>

</style>