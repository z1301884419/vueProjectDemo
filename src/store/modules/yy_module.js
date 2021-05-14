import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import yy_request from '@/utils/yy_request'
export default{
  namespaced:true,
  state: {
    //所有学生数据
    AllStuXiangData:[],

    //学生成绩表数据
    classGreadData:[{
      class_name:'高一三班',
      class_id:3,
      bianhao:'10001',
      name:'李四',
      yuwen:'',
      shuxue:'98',
      yingyu:'80',
      wuli:'88',
      huaxue:'89',
      shengwu:'90',
      total:'',
      testType:'年级考'
    },{
      class_name:'高一三班',
      class_id:3,
      bianhao:'10002',
      name:'李四',
      yuwen:'80',
      shuxue:'85',
      yingyu:'95',
      wuli:'80',
      huaxue:'85',
      shengwu:'86',
      total:'',
      testType:'班级考'
    },{
      class_name:'高一二班',
      class_id:2,
      name:'李四',
      bianhao:'10003',
      yuwen:'95',
      shuxue:'96',
      yingyu:'80',
      wuli:'84',
      huaxue:'78',
      shengwu:'91',
      total:'',
      testType:'班级考'
    },{
      class_name:'高一一班',
      class_id:1,
      name:'李四',
      bianhao:'10003',
      yuwen:'87',
      shuxue:'90',
      yingyu:'88',
      wuli:'95',
      huaxue:'92',
      shengwu:'86',
      total:'',
      testType:'校级考'
    }],
    //所有学科信息
    AllSubject:[],
    //所有班级信息
    AllClass:[],
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

  },
  actions: {
    getALLSubject(context){
      yy_request.SelectAllSubjectFn().then(res=>{
        console.log(res);
        context.commit('setAllSubject',res.data)
      })
    },
    getAllClass(context){
      yy_request.SelectAllClassFn().then(res=>{
        console.log(res);
        context.commit('setAllClass',res.data)
      })
    },
    getAllStuXiangData(context){
      return yy_request.SelectAllStuXiangFn().then(res=>{
        console.log(res);
        context.commit('setAllStuXiangData',res.data)
        return
      })
    },
  },
}
