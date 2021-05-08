import axios from 'axios'
const http=axios.create({
  baseURL:'/api', // api的base_url
  timeout: 10000 // 请求超时时间
})

export default http