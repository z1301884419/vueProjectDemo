import api from '../utils/coursemgtApi'


export default {
  data() {

  },
  methods: {
    //    添加
       classallList(obj) {
        return api[obj.name](obj.data).then(data => {
          if (data.data.code == 200) {
            console.log(data.data.data);
            return {data:data.data.data};
          }
        })
      },
    
  }
}