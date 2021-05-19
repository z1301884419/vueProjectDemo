import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import yy_request from '@/utils/yy_request'
export default{
  namespaced:true,
  state: {
    //所有学生数据
    AllStuXiangData:[],
    //学生信息总长度
    AllStuXiangDataLength:'',
    //学生成绩表数据
    classGreadData:[],
    //所有学科信息
    AllSubject:[],
    //所有班级信息
    AllClass:[],
    //家长信息
    StuParentData:[],
    //家长信息长度
    StuParentDataLength:'',
  },
  mutations: {
    setAllSubject(state,data){
      state.AllSubject = data
    },
    setAllClass(state,data){
      state.AllClass = data
    },
    setAllStuXiangData(state,data){
      state.AllStuXiangData = data
    },
    setAllStuXiangDataLength(state,value){
      state.AllStuXiangDataLength = value
    },
    //保存家长信息
    setStuParentData(state,value){
      state.StuParentData = value
    },
    //保存家长信息的总长度
    setStuParentDataLength(state,value){
      state.StuParentDataLength = value
    },


  },
  actions: {
    getALLSubject(context){
      yy_request.SelectAllSubjectFn().then(res=>{
        context.commit('setAllSubject',res.data)
      })
    },
    getAllClass(context){
      yy_request.SelectAllClassFn().then(res=>{
        context.commit('setAllClass',res.data)
      })
    },
    getAllStuXiangData(context,pageData){
      return yy_request.SelectAllStuXiangFn(pageData).then(res=>{
        context.commit('setAllStuXiangData',res.data)
        context.commit('setAllStuXiangDataLength',res.count)
        return res
      })
    },
    //获取家长信息
    getStuParentData(context,pageData){
      return yy_request.SelectStuParentFn(pageData).then(res=>{
        context.commit('setStuParentData',res.data)
        context.commit('setStuParentDataLength',res.count)
        return res
      })
    },
  },
}
