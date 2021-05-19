import { getStorage, setStorage, removeStorage } from '../../utils/storage'//
// import {getStorage, setStorage} from '../../utils/storage'//

import api from '../../utils/loginapi'

export default {
  namespaced: true,
  state: {
    user:getStorage("user")||{},
    token:getStorage("token")||"",
    userShenfen:getStorage('shenfen')||"",
    liuyanNum:0,
    userMenulist:getStorage('userMenulist')||[],
  },
  actions: {
    LoginAction(context,obj){
      console.log(obj);
      return api[obj.name](obj.data).then(data=>{
        console.log(data);
        if(data.data.code==200){
          setStorage('user',data.data.data.o)
          setStorage('token',data.data.data.token)
          setStorage('shenfen',data.data.data.role.roleName)
          setStorage('userMenulist',data.data.data.menuList)
          context.commit('mutationsLogin',data.data.data.o)
          context.commit('mutationsSetToKen',data.data.data.token)
          context.commit('mutationsSetShenFen',data.data.data.role.roleName)
          context.commit('mutationsSetMenulist',data.data.data.menuList)
        }
        return data.data.code
      })
    },
    LoginAction1(context,obj){
      console.log(obj);
      console.log(context);
      return api[obj.name](obj.data).then(data=>{
        console.log(data);
        if(data.data.code==200){
          context.commit('mutationsSetLiuYanNum',data.data.data)
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
    mutationsSetMenulist(state,payload){
      state.userMenulist=payload;
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
    },
    mutationsSetLiuYanNum(state,payload){
      state.liuyanNum=payload;
    },
  }
}