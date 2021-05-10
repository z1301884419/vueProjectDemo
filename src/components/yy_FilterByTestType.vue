<template>
  <div>
    <el-select v-model="value" @change="changeValue" clearable placeholder="请输入考试类型">
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
    name: "yy_FilterByTestType",
    data() {
      return {
        data:[{
          value:'yuekao',
          label:'月考'
        },{
          value:'qizhong',
          label:'期中'
        },{
          value:'qimo',
          label:'期末'
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

