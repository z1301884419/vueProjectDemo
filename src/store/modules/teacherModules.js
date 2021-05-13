// import { getStorage, setStorage, removeStorage } from '../../utils/storage'//
import api from '../../utils/api/teacherApi'

export default {
  namespaced: true,
  state: {
    subject: []
  },
  actions: {
    // 获取所有数据
    SearchAllDataAction(context, obj) {
      // 发起请求，接收响应结果
      return api[obj.name](obj.data).then(data => {
        if (data.data.code == 200) {
          console.log(data.data.data);
          context.commit('subjectMutations', data.data.data)
        }
        // 登录失败: 返回登录失败的结果
        return data.data.code
      })
    }
  },
  mutations: {
    subjectMutations(state, payload){
      state.subject = payload;
    }
  }
}