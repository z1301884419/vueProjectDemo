import api from '../utils/guanjianApi'



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

      LoginAction3(obj){
        console.log(obj);
        return api[obj.name](obj.data).then(data=>{
        //   console.log(data);
          return data.data
  
        })
      },
      LoginAction4(obj){
        console.log(obj);
        return api[obj.name](obj.data).then(data=>{
          console.log(data);
  
        })
      },
      LoginAction5(obj){
        console.log(obj);
        return api[obj.name](obj.data).then(data=>{
          console.log(data);
  
        })
      },
      LoginAction6(obj){
        console.log(obj);
        return api[obj.name](obj.data).then(data=>{
          console.log(data);
  
        })
      }
    },
    computed: {
  
    }
  };