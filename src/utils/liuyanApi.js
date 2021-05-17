import http from './liuyanRequest';
// const API='http//172.16.14.8:8091'
export default {
    
    // 登录
    LIUYAN_API: data=>http({
      url: '/message/getReceiveList',
      method: 'post',
      data: data
    }),
    MYFABIAO_API:data=>http({
        url: '/message/list',
        method: 'post',
        data: data,
        // console.log(data)
    }),
    SENDMESSAGE_API:data=>http({
      url: '/message/add',
      method: 'post',
      data: data
    //   console.log(data);
  }),
  MYJIESHOU_API:data=>http({
    url: '/message/list',
    method: 'post',
    data: data
    // console.log(data);
}),
DELETE_API:data=>http({
    url: '/message/delete',
    method: 'post',
    data: data
    // console.log(data);
}),
    
  }