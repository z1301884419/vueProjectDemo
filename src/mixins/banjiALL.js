import api from '../utils/coursemgtApi'


export default {
  data() {

  },
  methods: {
    //    添加
       classaddList(obj) {
        return api[obj.name](obj.data).then(data => {
            console.log(data)
        //   if (data.data.code == 200) {
        //     console.log(data.data.data);
        //     return {data:data.data.data, count: data.data.count};
        //   }

        //   return data.data.msg
        })
      },
    //渲染班级列表
    // getnianjiList(obj) {
    //     return api[obj.classGradeId](obj.data).then(data => {
    //       if (data.data.code == 200) {
    //         console.log(data.data);
    //         return {data:data.data.data, count: data.data.count};
    //       }
    //       return data.data.msg
    //     })
    //   },
    
  }
}