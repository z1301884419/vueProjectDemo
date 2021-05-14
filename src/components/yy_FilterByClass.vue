<template>
  <div>
    <el-cascader
            v-model="checkedClass"
            :options="newClassList"
            placeholder="请选择班级"
            @change="selectClass"></el-cascader>
  </div>
</template>

<script>
  import { mapState,mapActions } from 'vuex'
  export default {
    name: "yy_FilterByClass",
    data(){
      return{
        checkedClass:[],
      }
    },
    props:['nowClass'],
    computed:{
      ...mapState('yy_module',['AllClass']),
      //生成新的联级班级选择
      newClassList(){
        //生成新的班级列表
        let newClassArr = [];
        this.AllClass.map(v=>{
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
        this.AllClass.forEach(v=>{
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
      this.AllClass.length>0?"":this.getAllClass();
      this.nowClass?this.checkedClass=this.nowClass:''
    },
    methods:{
      ...mapActions('yy_module',['getAllClass']),
      selectClass(value){
        console.log(value);
        console.log(value[1]);//班级id
        this.$emit('getClassId',value[1])
      },
    }
  }
</script>

<style scoped>

</style>