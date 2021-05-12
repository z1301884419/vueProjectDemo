// import { getStorage, setStorage, removeStorage } from '../../utils/storage'//
import {setStorage} from '../../utils/storage'//

import api from '../../utils/loginapi'

export default {
  namespaced: true,
  state: {
    
  },
  actions: {
    LoginAction(context,obj){
      console.log(obj);
      return api[obj.name](obj.data).then(data=>{
        console.log(data);
        if(data.data.code==200){
          setStorage('user',{name:'大大'})
        }
        return data.data.code
      })
    }

  },
  mutations: {
  }
}