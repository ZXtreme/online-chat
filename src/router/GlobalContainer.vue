<template>
  <div class="container">
    <div class="left">
      <SelfInfo></SelfInfo>
      <div class="friendslist">
        <FriendsList v-for="(item, index) in friend" :key="index" :nickname="item.nickname" :online="item.online"
          :sign="item.sign" :picture="item.picture" :is_list="1" :account="item.account" :id="index"
          v-show="item.nickname.includes(filterFriend) || item.account.toString().includes(filterFriend)"
          @click.native="toRead">
          <div class="friendslist_right">
            <div class="unread" v-if="item.unread!==0">{{item.unread}}</div>
            <div class="time" v-html="factory(item.nearest)"></div>
          </div>
        </FriendsList>
      </div>
      <ExtraFunc></ExtraFunc>
    </div>
    <div class="right">
      <router-view name="default"></router-view>
    </div>
  </div>
</template>

<script>
import FriendsList from '@/components/FriendsList.vue'
import SelfInfo from '@/components/SelfInfo.vue'
import ExtraFunc from '@/components/ExtraFunc.vue'
import qs from 'qs'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  async created() {
    this.updateAsyncFriend(this)

    window.addEventListener('beforeunload', () => {
      this.$http({
        method: 'POST',
        url: '/changeOnline',
        headers: { Authorization: localStorage.getItem(this.self.account) },
        data: qs.stringify({
          cond: 0
        })
      })
    })
    // window.addEventListener('visibilitychange', () => {
    //   console.log(document.visibilityState, document.visibilityState === 'hidden' ? 0 : 1)
    //   this.$http({
    //     method: 'POST',
    //     url: '/changeOnline',
    //     headers: { Authorization: localStorage.getItem(this.self.account) },
    //     data: qs.stringify({
    //       cond: document.visibilityState === 'hidden' ? 0 : 1
    //     })
    //   })
    // })
    this.$http({
      method: 'POST',
      url: '/changeOnline',
      headers: { Authorization: localStorage.getItem(this.self.account) },
      data: qs.stringify({
        cond: 1
      })
    })
  },
  sockets: {
    changeOnline(obj) {
      const newFriend = this.friend
      for (let i = 0; i < newFriend.length; i++) {
        if (newFriend[i].account === obj[0]) {
          newFriend[i].online = obj[1]
          break
        }
      }
      this.updateFriend(newFriend)
    },
    message(obj) {
      let other, isSelf
      if (obj.sender === this.self.account) {
        other = obj.receiver
        isSelf = true
      } else if (obj.receiver === this.self.account) {
        other = obj.sender
        isSelf = false
        if (obj.status) return
      } else return
      for (let i = 0; i < this.friend.length; i++) {
        if (other === this.friend[i].account) {
          if (!isSelf && this.receiver.account !== other) { // 他人发消息给自己，且这个人不是当前正在聊天的人
            const newFriend = this.friend
            newFriend[i].unread++
            newFriend[i].nearest = obj.date
            this.updateFriend(newFriend)
          }
          break
        }
      }
    }
  },
  mounted() {
    document.documentElement.style.setProperty('--bodybgc', '#FFEDDE')
    if (localStorage.getItem(`${this.self.account}-bgc`)) {
      document.documentElement.style.setProperty('--bgc', localStorage.getItem(`${this.self.account}-bgc`))
      document.documentElement.style.setProperty('--text', localStorage.getItem(`${this.self.account}-text`))
    }
    if (localStorage.getItem(`${this.self.account}-text`) === '#FFFFFF') {
      document.documentElement.style.setProperty('--input', '#383838')
    }
    const choice = localStorage.getItem(`${this.self.account}-font`) * 1
    if (choice & 1) document.documentElement.style.setProperty('--em', 'bold')
    if (choice & 2) document.documentElement.style.setProperty('--underline', 'underline')
    if (choice & 4) document.documentElement.style.setProperty('--italic', 'italic')
  },
  components: {
    FriendsList,
    SelfInfo,
    ExtraFunc
  },
  computed: {
    ...mapState(['receiver', 'friend', 'self', 'returnTab', 'filterFriend'])
  },
  methods: {
    ...mapMutations(['updateFriend', 'changeChatCond']),
    ...mapActions(['updateAsyncFriend']),
    factory(str) {
      if (str === null) return ''
      return str.substr(5, 5) + '<br/>' + str.substr(11, 5)
    },
    async toRead(e) {
      const idx = e.currentTarget.id
      const unreadNumber = this.friend[idx].unread
      if (unreadNumber !== 0) {
        const newFriend = this.friend
        newFriend[idx].unread = 0
        newFriend[idx].nearest = null
        this.updateFriend(newFriend)
        this.$socket.emit('turnToRead', {
          reader: this.self.account,
          writer: newFriend[idx].account
        })
      }
      const { data } = await this.$http({
        method: 'GET',
        url: '/getHistory',
        headers: { Authorization: localStorage.getItem(this.self.account) },
        params: {
          facc: this.friend[idx].account,
          number: unreadNumber
        }
      })
      this.changeChatCond(data.result)
      const chatbox = document.querySelector('.chatBox article')
      this.$nextTick(() => { chatbox.scrollTop = chatbox.scrollHeight })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 5px;
  background-color: var(--bgc);

  .left {
    display: flex;
    flex-direction: column;
    flex: 2;

    .friendslist {
      flex: 1;
      // height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      margin-bottom: 8px;

      .friendslist_right {
        margin-right: 12px;

        div {
          text-align: right;
        }

        .unread {
          display: inline-block;
          position: relative;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 10px;
          margin-bottom: 3px;
          padding: 0px 3.5px;
          max-width: 36px;
          height: 14px;
          border-radius: 14px;
          color: #fff;
          background-color: red;
          text-align: center;
          font-size: 12px;
          line-height: 14px;
        }

        .time {
          font-size: 14px;
          text-align: center;
        }
      }
    }

  }

  .right {
    flex: 5;
    margin: 8px;
    border: 2px solid #ccc;
    min-width: 600px;
  }
}
</style>
