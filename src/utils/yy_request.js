//从yy_api导入接口
import *as yy_api from '../utils/yy_api'
//读取token
import {getStorage} from "./storage";


//查寻学科
import axios from 'axios'
const yy_axios=axios.create({
  baseURL:'http://172.16.14.38:8097', // api的base_url
  timeout: 10000 // 请求超时时间
})
yy_axios.interceptors.request.use(req=>{
  let token=getStorage("token")
  if(token) req.headers['Authorization'] = token
  return req
})
//学生的端口号
const yy_axiosStu=axios.create({
  baseURL:'http://172.16.14.46:8191', // api的base_url
  timeout: 10000 // 请求超时时间
})

//家长的端口号
const yy_axiosParent=axios.create({
  baseURL:'http://172.16.14.46:7094', // api的base_url
  timeout: 10000 // 请求超时时间
})

//成绩的端口号
const yy_axiosScore=axios.create({
  baseURL:'http://172.16.14.46:8092', // api的base_url
  timeout: 10000 // 请求超时时间
})
yy_axiosScore.interceptors.request.use(req=>{
  let token=getStorage("token")
  if(token) req.headers['Authorization'] = token
  return req
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
    return yy_axiosStu({
      url:yy_api.AddStudent,
      method:'post',
      data:stuData
    }).then(res=>{
      return res.data
    })
  },
  DelStudentFn(id){
    console.log(id);
    return yy_axiosStu({
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
    return yy_axiosParent({
      url:yy_api.AllStudentParent,
      method:'post',
      params:data,
      data
    }).then(data=>{
      return data.data
    })
  },
  //查询学生成绩
  SelsectAllStuScoresFn(data){
    console.log(data);
    return yy_axiosScore({
      url:yy_api.SelsectAllStuScores,
      method:'post',
      data
    }).then(data=>{
      return data.data
    }).catch(()=>{
      return {
        code:500,
        message:'错误'
      }
    })
  },
  //通过老师查询所教班级
  SelectClassByTeacherFn(){
    return yy_axios({
      url:yy_api.SelectClassByTeacher,
      method:'post',
    }).then(data=>{
      return data.data
    })
  },
  //通过班级查成绩
  SelectClassByClassFn(id){
    return yy_axiosScore({
      url:yy_api.SelectScoreByClass,
      method:'post',
      data:{
        classId:id
      }
    }).then(data=>{
      return data.data
    })
  },
  //上传excel成绩表
  UploadScoreExcelFn(formData){
    return yy_axiosScore.post(yy_api.UploadScoreExcel, formData).then(data=>{
      console.log(data);
    })
  }


}
