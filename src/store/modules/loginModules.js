// import { getStorage, setStorage, removeStorage } from '../../utils/storage'//
import {getStorage, setStorage} from '../../utils/storage'//

import api from '../../utils/loginapi'

export default {
  namespaced: true,
  state: {
    user:getStorage("user")||{},
    token:getStorage("token")||"",
    userShenfen:getStorage('shenfen')||"",
  },
  actions: {
    LoginAction(context,obj){
      console.log(obj);
      return api[obj.name](obj.data).then(data=>{
        console.log(data);
        if(data.data.code==200){
          console.log(data);
          setStorage('user',data.data.data.o)
          setStorage('token',data.data.data.token)
          setStorage('shenfen',"学生")

          
        }
        return data.data.code
      })
    }

  },
  mutations: {
  }
}