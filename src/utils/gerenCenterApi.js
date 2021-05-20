import http from './gerenCenterRequest';
// const API='http//172.16.14.8:8091'
export default {

    // 登录
    GETDATA_API: data => http({
        url: 'admin/person/getdetail',
        method: 'get',
        data: data
    }),
    XIUGAI_API: data => http({
        url: 'admin/person/center/modifyPwd',
        method: 'post',
        data: data
            // console.log(data);
    }),
    TOUXIANG_API: data => http({
        url: 'admin/person/upload/img',
        method: 'post',
        data: data
            // console.log(data);
    }),
    SENDPHONE_API: data => http({
        url: 'admin/sendto/oringinPhone',
        method: 'post',
        data: data
            // console.log(data);
    }),
    CHECK_API: data => http({
        url: 'admin/send/newPhone',
        method: 'post',
        data: data
            // console.log(data);
    }),
    GENGXIN_API: data => http({
        url: 'admin/verify/newPhone',
        method: 'post',
        data: data
            // console.log(data);
    }),

}