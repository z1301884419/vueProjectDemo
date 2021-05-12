import api from '../utils/loginapi'



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

      LoginAction1(obj){
        console.log(obj);
        return api[obj.name](obj.data).then(data=>{
          console.log(data);
  
        })
      },
      LoginAction2(obj){
        console.log(obj);
        return api[obj.name](obj.data).then(data=>{
          console.log(data);
  
        })
      }
    },
    computed: {
  
    }
  };