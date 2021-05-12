import axios from 'axios'

const http=axios.create({
  baseURL:'http://172.16.14.8:8091/', // api的base_url
  timeout: 10000 // 请求超时时间
})

export default http