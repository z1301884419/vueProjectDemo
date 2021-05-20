import api from '../utils/gerenCenterApi'



export default {
    data() {
        return {

        }
    },
    methods: {
        // 获取数据的方法
        // getAllData(obj) {
        //   console.log(obj);
        //   return api[obj.name](obj.data).then(data => {
        //     console.log(data);
        //     if (data.data.code == 200) {
        //       return data.data.data
        //     }
        //   })
        // }
        // 渲染信息
        LoginAction1(obj) {
            console.log(obj);
            return api[obj.name](obj.data).then(data => {
                console.log(data);
                return data.data
            })
        },
        // 改密码
        LoginAction2(obj) {
            console.log(obj);
            return api[obj.name](obj.data).then(data => {
                console.log(data);
                return data.data
            })
        },
        // 改头像
        LoginAction3(obj) {
            console.log(obj);
            return api[obj.name](obj.data).then(data => {
                console.log(data);
                return data.data
            })
        },
        // 改手机号
        LoginAction4(obj) {
            console.log(obj);
            return api[obj.name](obj.data).then(data => {
                console.log(data);
                return data.data
            })
        },
        // 验证手机号
        LoginAction5(obj) {
            console.log(obj);
            return api[obj.name](obj.data).then(data => {
                console.log(data);
                return data.data
            })
        },
        // 更新手机号
        LoginAction6(obj) {
            console.log(obj);
            return api[obj.name](obj.data).then(data => {
                console.log(data);
                return data.data
            })
        },
    },
    computed: {

    }
};