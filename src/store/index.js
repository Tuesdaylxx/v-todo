import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  // 所有待办内容
  todoList: [],

  // 选中日历的时间
  selectTime: new Date(),
  // 当前选中日期的日程
  currentDateTodo: [],

  // 昨日完成待办
  yesterdayList: [],

  // 一周完成待办
  weekDoneLength: [],

  // 倒计时
  countDown: 0,

  // 主题
  theme: {
    color: "#4d90b2",
    label: "蓝色",
    bg: "url(" + require("@/assets/img/profile/blue.jpg") + ")",
    bgSmall: require("@/assets/img/profile/blue-small.jpg"),
    emptyImg: require("@/assets/img/home/empty-blue.svg"),
    selectTheme: 210,
  }

}
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
  }
})
