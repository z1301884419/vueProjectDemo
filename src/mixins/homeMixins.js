import api from '../utils/homeApi'
export default {
  data() {

  },
  methods: {
    //查询打卡状态
    seletcSignInStatus(obj){
      return api[obj.name](obj.data).then(data => {
        if(data.data.code==200){
          return data.data
        }
        return data.data
      })
    },
    //新增打卡状态
    addSignInStatus(obj){
      console.log(obj);
      return api[obj.name](obj.data).then(data => {
        console.log(data);
        if(data.data.code==200){
          return data.data.msg
        }
        return data.data.msg
      })
    }
  }
}