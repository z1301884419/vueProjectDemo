import axios from 'axios'
const http=axios.create({
  baseURL:'http://172.16.14.28:8092', // api的base_url
  timeout: 10000 // 请求超时时间
})

export default http