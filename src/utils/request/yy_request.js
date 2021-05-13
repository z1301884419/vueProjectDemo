//从yy_api导入接口
import *as yy_api from '../api/yy_api'
/*//从request导入二次封装的axios请求
import yy_axios from '../request'*/
import axios from 'axios'
const yy_axios=axios.create({
  baseURL:'http://172.16.14.38:8097', // api的base_url
  timeout: 10000 // 请求超时时间
})

//学生的端口号
const yy_axiosStu=axios.create({
  baseURL:'http://172.16.14.46:8081', // api的base_url
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
  SelectAllStuXiangFn(){
    return yy_axiosStu({
      url:yy_api.SelectAllStuXiang,
      method:'post',
    }).then(data=>{
      return data.data
    })
  },

}
