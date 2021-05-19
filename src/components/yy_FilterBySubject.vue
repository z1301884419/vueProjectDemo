<template>
  <div>
    <el-select v-model="value" @change="changeValue" clearable placeholder="请选择学科">
      <el-option
              v-for="item in AllSubject"
              :key="item.subjectId"
              :label="item.subjectName"
              :value="item.subjectId">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import { mapState,mapActions } from 'vuex'
  export default {
    name: "yy_FilterBySubject",
    data() {
      return {
        value: ''
      }
    },
    computed:{
      ...mapState('yy_module',['AllSubject'])
    },
    created(){
      this.AllSubject.length>0?'':this.getALLSubject()
    },
    methods:{
      ...mapActions('yy_module',['getALLSubject']),
      changeValue(){
        console.log(this.value);
      }
    },
  }
</script>

<style scoped>

</style>
