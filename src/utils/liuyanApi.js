import http from './liuyanRequest';
// const API='http//172.16.14.8:8091'
export default {
    
    // 登录
    LIUYAN_API: data=>http({
      url: 'message/message/getReceiveList',
      method: 'post',
      data: data
    }),
    MYFABIAO_API:data=>http({
        url: 'message/message/list',
        method: 'post',
        data: data,
        // console.log(data)
    }),
    SENDMESSAGE_API:data=>http({
      url: 'message/message/add',
      method: 'post',
      data: data
    //   console.log(data);
  }),
  MYJIESHOU_API:data=>http({
    url: 'message/message/list',
    method: 'post',
    data: data
    // console.log(data);
}),
DELETE_API:data=>http({
    url: 'message/message/delete',
    method: 'post',
    data: data
    // console.log(data);
}),
LIUYANHUIFU_API:data=>http({
  url: 'message/replay/replayMessage',
  method: 'post',
  data: data
  // console.log(data);
}),
LIUYANPINGLUN_API:data=>http({
  url: 'message/replay/replayReplay',
  method: 'post',
  data: data
  // console.log(data);
}),
    
  }