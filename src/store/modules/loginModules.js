import { getStorage, setStorage, removeStorage } from '../../utils/storage'//
// import {getStorage, setStorage} from '../../utils/storage'//

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
          console.log(data.data.data.token);
          setStorage('user',data.data.data.o)
          setStorage('token',data.data.data.token)
          setStorage('shenfen',data.data.data.role.roleName)
          context.commit('mutationsLogin',data.data.data.o)
          context.commit('mutationsSetToKen',data.data.data.token)
          context.commit('mutationsSetShenFen',data.data.data.role.roleName) 
        }
        return data.data.code
      })
    }

  },
  mutations: {
    mutationsLogin(state,payload){
      state.user=payload
    },
    mutationsSetShenFen(state,payload){
      state.userShenfen=payload;
    },
    mutationsSetToKen(state,payload){
      state.token=payload;
    },
    mutationsLoginOut(state){
      removeStorage('user');
      removeStorage('shenfen');
      removeStorage('token');
      state.user={};
      state.userShenfen="";
      state.token="";
    }
  }
}