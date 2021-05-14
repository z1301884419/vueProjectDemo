// import { getStorage, setStorage, removeStorage } from '../../utils/storage'//
import api from '../../utils/eduAdmApi'

export default {
  namespaced: true,
  state: {
    subject: [],
    grade: [],
    classroom: [],
    headerTeacher: [],
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
        return data.data.code
      })
    },
    SearchAllGradeAction(context, obj) {
      // 发起请求，接收响应结果
      return api[obj.name](obj.data).then(data => {
        if (data.data.code == 200) {
          console.log(data.data.data);
          context.commit('gradeMutations', data.data.data)
        }
        return data.data.code
      })
    },
    SearchAllClassRoomAction(context, obj) {
      // 发起请求，接收响应结果
      return api[obj.name](obj.data).then(data => {
        console.log(22222,data);
        if (data.data.code == 200) {
          console.log(data.data.data);
          context.commit('classRoomMutations', data.data.data)
        }
        return data.data.code
      })
    },
    SearchAllHearchTeacherAction(context, obj) {
      return api[obj.name](obj.data).then(data => {
        if (data.data.code == 200) {
          console.log(111111,data.data.data);
          context.commit('headerTeacherMutations', data.data.data)
        }
        return data.data.code
      })
    }
  },
  mutations: {
    subjectMutations(state, payload){
      state.subject = payload;
    },
    gradeMutations(state, payload) {
      state.grade = payload;
    },
    classRoomMutations(state, payload) {
      state.classroom = payload;
    },
    headerTeacherMutations(state, payload) {
      state.headerTeacher = payload;
    }
  }
}