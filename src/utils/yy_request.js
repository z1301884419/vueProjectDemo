//从yy_api导入接口
import *as yy_api from '../utils/yy_api'
/*//从request导入二次封装的axios请求
import yy_axios from '../request'*/
import axios from 'axios'
const yy_axios=axios.create({
  baseURL:'http://172.16.14.38:8097', // api的base_url
  timeout: 10000 // 请求超时时间
})

//查询学生的端口号
const yy_axiosStu=axios.create({
  baseURL:'http://172.16.14.46:8191', // api的base_url
  timeout: 10000 // 请求超时时间
})

//添加学生的端口号
const yy_axiosAddStu=axios.create({
  baseURL:'http://172.16.14.46:8191', // api的base_url
  timeout: 10000 // 请求超时时间
})

//删除学生的端口号
const yy_axiosDelStu=axios.create({
  baseURL:'http://172.16.14.46:8191', // api的base_url
  timeout: 10000 // 请求超时时间
})

//ajax请求
export default {
  SelectAllSubjectFn(){
    return yy_axios({
      url:yy_api.SelectAllSubject,
      method:'post',
    }).then(data=>{
      return data.data
    })
  },
  SelectAllClassFn(){
    return yy_axios({
      url:yy_api.SelectAllClass,
      method:'post',
    }).then(data=>{
      return data.data
    })
  },
  SelectAllStuXiangFn(data){
    return yy_axiosStu({
      url:yy_api.SelectAllStuXiang,
      method:'post',
      params:data,
      data
    }).then(data=>{
      return data.data
    })
  },
  AddStudentFn(stuData){
    return yy_axiosAddStu({
      url:yy_api.AddStudent,
      method:'post',
      data:stuData
    }).then(res=>{
      return res.data
    })
  },
  DelStudentFn(id){
    console.log(id);
    return yy_axiosDelStu({
      url:yy_api.DelStudent,
      method:'post',
      data:{
        ids:id,
      }
    }).then(data=>{
      console.log(data);
      return data.data
    })
  },
  SetStudentFn(data){
    console.log(data);
    return yy_axiosStu({
      url:yy_api.SetStudent,
      method:'post',
      data
    }).then(data=>{
      console.log(data);
      return data.data
    })
  },
  //查询家长
  SelectStuParentFn(data){
    console.log(data);
    return yy_axiosStu({
      url:yy_api.AllStudentParent,
      method:'post',
      params:data,
      data
    }).then(data=>{
      return data.data
    })
  },

}
