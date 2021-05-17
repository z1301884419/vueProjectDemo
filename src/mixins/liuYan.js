import api from '../utils/liuyanApi'



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

      LoginAction7(obj){
        console.log(obj);
        return api[obj.name](obj.data).then(data=>{
          console.log(data);
          return data.data
  
        })
      },
      LoginAction8(obj){
        console.log(obj);
        return api[obj.name](obj.data).then(data=>{
          console.log(data);
          return data.data

  
        })
      },
      LoginAction9(obj){
        console.log(obj);
        return api[obj.name](obj.data).then(data=>{
          console.log(data);
  
        })
      },
      LoginAction10(obj){
        console.log(obj);
        return api[obj.name](obj.data).then(data=>{
          console.log(data);
          return data.data

  
        })
      },
      LoginAction11(obj){
        console.log(obj);
        return api[obj.name](obj.data).then(data=>{
          console.log(data);
          return data.data

  
        })
      }
    },
    computed: {
  
    }
  };