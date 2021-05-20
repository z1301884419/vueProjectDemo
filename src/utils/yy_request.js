//从yy_api导入接口
import *as yy_api from '../utils/yy_api'
//读取token
import {getStorage} from "./storage";


//查寻学科
import axios from 'axios'
const yy_axios=axios.create({
  baseURL:'http://172.16.14.46:8410', // api的base_url
  timeout: 10000 // 请求超时时间
})
yy_axios.interceptors.request.use(req=>{
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
    return yy_axios({
      url:yy_api.SelectAllStuXiang,
      method:'post',
      params:data,
      data
    }).then(data=>{
      return data.data
    })
  },
  AddStudentFn(stuData){
    return yy_axios({
      url:yy_api.AddStudent,
      method:'post',
      data:stuData
    }).then(res=>{
      return res.data
    })
  },
  DelStudentFn(id){
    console.log(id);
    return yy_axios({
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
    return yy_axios({
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
    return yy_axios({
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
    return yy_axios({
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
  //通过班级查所有未录成绩的考试
  SelectClassByClassFn(id){
    return yy_axios({
      url:yy_api.SelectScoreByClass,
      method:'post',
      data:{
        classId:id
      }
    }).then(data=>{
      return data.data
    })
  },
  //通过班级查所有考试
  SelectClassByClassFn2(id){
    return yy_axios({
      url:yy_api.SelectScoreByClass2,
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
    return yy_axios.post(yy_api.UploadScoreExcel, formData).then(data=>{
      console.log(data);
      return data
    })
  },
  //查询老师
  SelectTeacherFn(num){
    return yy_axios({
      url:yy_api.SelectTeacher,
      method:'post',
      data:{
        staffNumber:num
      }
    }).then(data=>{
      return data.data
    })
  },
  //录入单个学生成绩
  AddStuScoreOneFn(data){
    console.log(data);
    return yy_axios({
      url:yy_api.AddStuScoreOne,
      method:'post',
      data
    }).then(data=>{
      console.log(data);
      return data.data
    })
  },
  //录入单个学生成绩
  UpdateStuScoreOneFn(data){
    return yy_axios({
      url:yy_api.UpdateStuScoreOne,
      method:'post',
      data
    }).then(data=>{
      return data.data
    })
  },
  //删除单个学生成绩
  DelStuScoreOneFn(ids){
    return yy_axios({
      url:yy_api.DelStuScoreOne,
      method:'post',
      data:{
        scoreIds:ids
      }
    }).then(data=>{
      console.log(data);
      return data.data
    })
  },
  //下载excel成绩表
  DownScoreExcelFn(data){
    return yy_axios({
      url:yy_api.DownScoreExcel,
      method:'post',
      data
    }).then(data=>{
      return data.data
    })
  },
  //下载excel添加学生
  DownStuExcelFn(){
    return yy_axios({
      url:yy_api.DownStuExcel,
      method:'post',
    }).then(data=>{
      return data.data
    })
  },
  //通过excel添加学生
  AddStuByExcelFn(formData){
    return yy_axios.post(yy_api.AddStuByExcel, formData).then(data=>{
      console.log(data);
      return data
    })
  },







}
