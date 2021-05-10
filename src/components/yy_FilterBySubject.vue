<template>
  <div>
    <el-select v-model="value" @change="changeValue" clearable placeholder="请输入学科">
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
    name: "yy_FilterBySubject",
    data() {
      return {
        data:[{
          value:'wuwen',
          label:'语文'
        },{
          value:'yingwu',
          label:'英语'
        },{
          value:'shuxue',
          label:'数学'
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
