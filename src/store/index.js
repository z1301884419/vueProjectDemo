import Vue from 'vue'
import Vuex from 'vuex'
import loginModules from './modules/loginModules'
import yy_module from './modules/yy_module'
import teacherModules from './modules/teacherModules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loginModules,
    yy_module,
    teacherModules
  }
})
