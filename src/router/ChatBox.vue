<template>
  <div class="chatBox">
    <header>
      <FriendsList :nickname="receiver.nickname" :sign="receiver.sign" :is_list="0" :picture="receiver.picture">
      </FriendsList>
    </header>
    <article ref="article">
      <ChatMsg v-for="(item, idx) in chatMsgIdx?chatMsg:chatHistory" :key="idx" :chat="item"></ChatMsg>
    </article>
    <nav>
      <ul>
        <li :style="{ 'margin-left': 0, 'background-color': selectTab===0 ? 'rgb(209, 206, 206)' : '' }"
          @click="selectTab=(selectTab===0?-1:0)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fabiaoqing"></use>
          </svg>
        </li>
        <li @click="clkHistory" :style="{'background-color': selectTab===1 ? 'rgb(209, 206, 206)' : ''}">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chazhao"></use>
          </svg>
        </li>
        <li @click="toDark">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tianqi_icon" ref="moon"></use>
          </svg>
        </li>
        <li @click="selectFont" :style="{'background-color': selectTab===2 ? 'rgb(209, 206, 206)' : ''}">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zitiyangshi"></use>
          </svg>
        </li>
        <li id="send" @click="send" ref="sendBtn">发送</li>
        <li id="send" style="width:75px;background-color: rgb(249,66,58);">
          <router-link to="main">返回主页</router-link>
        </li>
      </ul>
    </nav>
    <div class="bottom">
      <span class="innerSpan" v-if="selectTab===1||selectTab===2">
        <span v-if="selectTab===1">
          <label for="date">选择日期：</label><input type="date" id="date" ref="date" /><button
            @click="innerDate">确定</button><button @click="clkHistory">返回聊天</button>
        </span>
        <span v-if="selectTab===2">
          <label for="bgcolor">选择背景颜色：</label><input type="color" id="bgcolor" ref="bgcolor" />
          <label for="fontcolor">选择字体颜色：</label><input type="color" id="fontcolor" ref="fontcolor" />
          <br>
          <label for="fontstrong">字体是否加粗：</label><input type="checkbox" id="fontstrong" ref="fontstrong" />
          <br>
          <label for="fontunderline">字体有下划线：</label><input type="checkbox" id="fontunderline" ref="fontunderline" />
          <br>
          <label for="fontitalics">字体是否斜体：</label><input type="checkbox" id="fontitalics" ref="fontitalics" />
          <button @click="innerColor">确定</button>
        </span>
      </span>
      <IconFont :tabEvent="tabEvent" v-if="selectTab===0"></IconFont>
      <textarea ref="textarea" @keydown.enter="keysend" v-if="selectTab===-1" :value="readySendText"
        @input="updateReadyText"></textarea>
    </div>
  </div>
</template>

<script>
import FriendsList from '@/components/FriendsList.vue'
import ChatMsg from '@/components/ChatMsg.vue'
import IconFont from '@/components/IconFont.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  mounted() {
    if (localStorage.getItem(`${this.self.account}-text`) === '#FFFFFF') {
      this.$refs.moon.href.baseVal = '#icon-shouye_taiyang_shijiantixing'
    }
  },
  computed: {
    ...mapState(['receiver', 'self', 'chatMsg', 'readySendText', 'friend', 'chatHistory'])
  },
  sockets: {
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
          if (!(!isSelf && this.receiver.account !== other)) { // 无论是不是自己，是正在聊天的人
            this.changeChatMsg({ ...obj, is_self: isSelf, is_read: !isSelf })
            if (!isSelf) {
              this.$socket.emit('turnToRead', {
                reader: this.self.account,
                writer: this.friend[i].account
              })
            }
            this.$nextTick(function() {
              this.$refs.article.scrollTop = this.$refs.article.scrollHeight
            })
          }
          break
        }
      }
    },
    turnToRead(obj) {
      const { writer, reader } = obj
      if (this.receiver.account === reader && this.self.account === writer) {
        const newMsg = this.chatMsg
        for (let i = 0; i < newMsg.length; i++) {
          if (newMsg[i].is_self) {
            newMsg[i].is_read = true
          }
        }
        this.changeChatCond(newMsg)
      } else if (this.receiver.account === writer && this.self.account === reader) {
        const newMsg = this.chatMsg
        for (let i = 0; i < newMsg.length; i++) {
          if (!newMsg[i].is_self) {
            newMsg[i].is_read = true
          }
        }
        this.changeChatCond(newMsg)
      }
    }
  },
  components: {
    FriendsList,
    ChatMsg,
    IconFont
  },
  data: function() {
    return {
      selectTab: -1,
      chatMsgIdx: true
    }
  },
  methods: {
    ...mapMutations(['changeChatMsg', 'changeReadySendText', 'clearReadySendText', 'changeChatCond', 'changeChatHistory']),
    standardDate(date) {
      const Y = date.getFullYear()
      const M0 = date.getMonth() + 1
      const M = M0 < 10 ? '0' + M0 : M0
      const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return `${Y}-${M}-${D} ${h}:${m}:${s}`
    },
    send() {
      if (this.readySendText === '' || this.selectTab === 1 || this.selectTab === 2) return
      const obj = {
        sender: this.self.account,
        receiver: this.receiver.account,
        msg: this.readySendText,
        date: this.standardDate(new Date()),
        is_read: false
      }
      this.clearReadySendText()
      this.$socket.emit('message', obj)
    },
    keysend(e) {
      e.preventDefault()
      this.$refs.sendBtn.click()
    },
    updateReadyText() {
      this.changeReadySendText(this.$refs.textarea.value)
    },
    tabEvent() {
      this.selectTab = -1
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    },
    toDark() {
      if (this.$refs.moon.href.baseVal === '#icon-tianqi_icon') {
        document.documentElement.style.setProperty('--bgc', '#1E1E1E')
        document.documentElement.style.setProperty('--text', '#FFFFFF')
        localStorage.setItem(`${this.self.account}-bgc`, '#1E1E1E')
        localStorage.setItem(`${this.self.account}-text`, '#FFFFFF')
        document.documentElement.style.setProperty('--input', '#383838')
        this.$refs.moon.href.baseVal = '#icon-shouye_taiyang_shijiantixing'
      } else {
        document.documentElement.style.setProperty('--bgc', '#FFEDDE')
        document.documentElement.style.setProperty('--text', '#000000')
        document.documentElement.style.setProperty('--input', '#FFFFFF')
        localStorage.setItem(`${this.self.account}-bgc`, '#FFEDDE')
        localStorage.setItem(`${this.self.account}-text`, '#000000')
        this.$refs.moon.href.baseVal = '#icon-tianqi_icon'
      }
    },
    async innerDate() {
      const date = this.$refs.date.value
      if (date === '') return
      const { data } = await this.$http({
        url: '/getHistory',
        method: 'GET',
        params: {
          facc: this.receiver.account,
          date: date
        },
        headers: { Authorization: localStorage.getItem(this.self.account) }
      })
      this.changeChatHistory(data.result)
      this.chatMsgIdx = false
      this.$nextTick(function() {
        this.$refs.article.scrollTop = 0
      })
    },
    innerColor() {
      this.selectTab = -1
      localStorage.setItem(`${this.self.account}-bgc`, this.$refs.bgcolor.value)
      localStorage.setItem(`${this.self.account}-text`, this.$refs.fontcolor.value)
      document.documentElement.style.setProperty('--bgc', this.$refs.bgcolor.value)
      document.documentElement.style.setProperty('--text', this.$refs.fontcolor.value)
      let choice = 0
      if (this.$refs.fontstrong.checked) {
        choice ^= 1
        document.documentElement.style.setProperty('--em', 'bold')
      } else document.documentElement.style.setProperty('--em', 'normal')
      if (this.$refs.fontunderline.checked) {
        choice ^= 2
        document.documentElement.style.setProperty('--underline', 'underline')
      } else document.documentElement.style.setProperty('--underline', 'none')
      if (this.$refs.fontitalics.checked) {
        choice ^= 4
        document.documentElement.style.setProperty('--italic', 'italic')
      } else document.documentElement.style.setProperty('--italic', 'normal')
      localStorage.setItem(`${this.self.account}-font`, choice)
    },
    clkHistory() {
      if (this.selectTab === 1) {
        this.selectTab = -1
        this.chatMsgIdx = true
        this.$nextTick(function() {
          this.$refs.article.scrollTop = this.$refs.article.scrollHeight
        })
      } else {
        this.selectTab = 1
      }
    },
    selectFont() {
      if (this.selectTab === 2) {
        this.selectTab = -1
      } else {
        this.selectTab = 2
        this.$nextTick(() => {
          const bgcolor = localStorage.getItem(`${this.self.account}-bgc`)
          const fontcolor = localStorage.getItem(`${this.self.account}-text`)
          const choice = localStorage.getItem(`${this.self.account}-font`) * 1
          if (bgcolor) this.$refs.bgcolor.value = bgcolor
          if (fontcolor) this.$refs.fontcolor.value = fontcolor
          if (choice) {
            if (choice & 1) this.$refs.fontstrong.checked = true
            if (choice & 2) this.$refs.fontunderline.checked = true
            if (choice & 3) this.$refs.fontitalics.checked = true
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped >
.icon {
  width: 32px;
  height: 32px;
}

.chatBox {
  display: flex;
  flex-direction: column;
  height: 100%;

  header {
    :deep(.friends) {
      .middle {
        max-width: 1000px;
      }

      &:hover {
        background-color: var(--bgc);
      }
    }

    border-bottom: 2px solid #ccc;
  }

  article {
    position: relative;
    flex: 8;
    width: 100%;
    overflow-y: auto;
  }

  nav {

    ul {
      border-top: 2px solid #ccc;
      border-bottom: 2px solid #ccc;

      &::after {
        content: "";
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
      }

      li {
        float: left;
        width: 32px;
        height: 32px;
        margin: 0 3px;
        line-height: 32px;
        text-align: center;

        &:hover {
          background-color: rgb(209, 206, 206);
        }
      }

      #send {
        float: right;
        width: 50px;
        margin: 0;
        border-left: 2px solid #ccc;
        background-color: rgb(219, 62, 177);
        font-size: 15px;
        user-select: none;

        &:hover {
          font-size: 16px;
        }
      }
    }
  }

  .bottom {
    flex: 3;

    .innerSpan {
      width: 100%;
      height: 100%;
      display: inline-block;
      margin: 5px 0 0 5px;

      label {
        padding-left: 5px;
      }

      button {
        vertical-align: middle;
        padding: 2px;
        margin-left: 10px;
        background-color: #c5b6da;
        border: 0;

        &:hover {
          background-color: rgb(190, 231, 253);
        }
      }
    }

    textarea {
      outline: 0;
      border: 0px;
      width: 100%;
      height: 100%;
      resize: none;
      padding: 3px;
      font-size: 20px;
    }

  }
}
</style>
