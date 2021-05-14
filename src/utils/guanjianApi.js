import http from './guanjianRequest';
// const API='http//172.16.14.8:8091'
export default {
    
    // 登录
    GETDATA_API: data=>http({
      url: '/keyword/list',
      method: 'post',
      data: data
    }),
    TIANJIA_API:data=>http({
        url: '/keyword/add',
        method: 'post',
        data: data,
        // console.log(data)
    }),
    DELETE_API:data=>http({
      url: '/keyword/delete',
      method: 'post',
      data: data
      // console.log(data);
  }),
  XIUGAI_API:data=>http({
    url: '/keyword/edit',
    method: 'post',
    data: data
    // console.log(data);
}),
    
  }