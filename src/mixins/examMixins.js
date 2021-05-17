import api from '../utils/examApi'
export default {
  data() {

  },
  methods: {
    //查询数据的方法
    seletcExamInfo(obj){
      console.log(obj);
      return api[obj.name](obj.data).then(data => {
        console.log(data);
        if(data.data.code==200){
          return data.data
        }
        return data.data.msg
      })
    },

  }
}