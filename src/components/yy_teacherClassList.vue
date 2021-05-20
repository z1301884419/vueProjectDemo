<template>
  <div>
    <el-cascader
            v-model="checkedClass"
            :options="newClassList"
            placeholder="请选择班级"
            clearable
            @change="selectClass"></el-cascader>
  </div>
</template>

<script>
  import yy_request from '@/utils/yy_request'
  export default {
    name: "yy_teacherClassList",
    data(){
      return{
        checkedClass:[],
        teacherClassList:[],
      }
    },
    props:['nowClass'],
    watch:{
      nowClass(data){
        this.checkedClass = [...data]
      }
    },
    computed:{
      //生成新的联级班级选择
      newClassList(){
        //生成新的班级列表
        let newClassArr = [];
        this.teacherClassList.map(v=>{
          newClassArr.push({value:v.classGradeId,label:v.gradeName,children:[]})
          return
        })
        newClassArr = newClassArr.map((v)=>{
          return JSON.stringify(v)
        })
        newClassArr =[...new Set(newClassArr)]
        newClassArr = newClassArr.map(v=>{
          return JSON.parse(v)
        })
        //生成新的年级列表结束
        //根据年级取该年纪的班级列表
        this.teacherClassList.forEach(v=>{
          newClassArr.forEach((vG,vI)=>{
            if(v.classGradeId==vG.value){
              newClassArr[vI].children.push({value:v.classId,label:v.className})
            }
          })
        })
        //根据年级取该年纪的班级列表结束
        return newClassArr
      }
    },
    created(){
      yy_request.SelectClassByTeacherFn().then(res=>{
        this.teacherClassList = res.data
        console.log(res.data);
      })
    },
    methods:{
      selectClass(value){
        this.$emit('getClassId',value)
      },
    }
  }
</script>

<style scoped>

</style>