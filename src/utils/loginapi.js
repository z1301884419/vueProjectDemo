import http from './request';
// const API='http//172.16.14.8:8091'
export default {
    
    // 登录
    LOGIN_API: data=>http({
      url: '/login',
      method: 'post',
      data: data
    }),
    HUOQU_API:data=>http({
        url: '/register/send/message',
        method: 'post',
        data: data
        // console.log(data);
    }),
    
  }
  