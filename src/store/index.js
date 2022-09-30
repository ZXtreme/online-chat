import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    friend: [],
    chatMsg: [],
    chatHistory: [],
    receiver: {
      nickname: '',
      sign: '',
      picture: '',
      account: 0
    },
    self: {
      nickname: '',
      sign: '',
      picture: '',
      account: 0
    },
    returnTab: true,
    readySendText: '',
    filterFriend: ''
  },
  mutations: {
    changeReceiver(state, newObj) {
      state.receiver.nickname = newObj.nickname
      state.receiver.sign = newObj.sign
      state.receiver.picture = newObj.picture
      state.receiver.account = newObj.account
    },
    changeSelf(state, newObj) {
      state.self.nickname = newObj.nickname
      state.self.sign = newObj.sign
      state.self.picture = newObj.picture
      if (newObj.account) state.self.account = newObj.account
    },
    changeReturnTab(state) {
      state.returnTab = !state.returnTab
    },
    changeChatMsg(state, msg) {
      state.chatMsg.push(msg)
    },
    changeChatCond(state, newCond) {
      state.chatMsg = newCond
    },
    changeReadySendText(state, newVal) {
      state.readySendText = newVal
    },
    clearReadySendText(state) {
      state.readySendText = ''
    },
    pushReadySendText(state, newVal) {
      state.readySendText += newVal
    },
    changeFilterFriend(state, newVal) {
      state.filterFriend = newVal
    },
    updateFriend(state, newVal) {
      state.friend = newVal
    },
    changeChatHistory(state, newVal) {
      state.chatHistory = newVal
    }
  },
  actions: {
    async updateAsyncFriend(context, _this) {
      const { data } = await _this.$http({
        method: 'GET',
        url: '/initfriend',
        headers: { Authorization: localStorage.getItem(_this.self.account) }
      })
      context.commit('updateFriend', data.result)
    }
  }
})
