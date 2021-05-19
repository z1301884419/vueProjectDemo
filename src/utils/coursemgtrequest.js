import axios from 'axios'
import {getStorage}from './storage'


const http=axios.create({
  baseURL:'http://172.16.14.38:8097/', // api的base_url
  timeout: 10000 // 请求超时时间
})
http.interceptors.request.use(req=>{
  let token=getStorage("token")
  if(token) req.headers['Authorization'] =token
  return req
})
http.interceptors.response.use(resp=>{
  return resp
}),error=>{
  console.log(error);
}
export default http