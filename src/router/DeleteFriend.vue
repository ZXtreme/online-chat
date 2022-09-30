<template>
  <div class="deleteFriend">
    <div class="delSearch">
      <input type="text" placeholder="请输入需要删除的账号/昵称" ref="find_info" @keydown.enter="keyfind">
      <svg class="icon" aria-hidden="true" @click="keyfind">
        <use xlink:href="#icon-chazhao"></use>
      </svg>
      <span>
        <router-link to="main">返回主页</router-link>
      </span>
    </div>
    <div class="delResult">
      <div v-if="res.length===0" class="substitute">暂无满足条件的用户</div>
      <FriendsList v-else v-for="(item, index) in res" :key="index" :nickname="item.nickname+'('+item.account+')'"
        :sign="item.sign" :picture="item.picture" :is_list="0" class="dellist">
        <svg class="icon" aria-hidden="true" :id="index" @click="del_clk">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
        <svg class="icon" aria-hidden="true" :id="index" @click="screen_clk($event,item.account,index)"
          :style="{'filter':item.screen?'grayscale(1)':''}">
          <use xlink:href="#icon-pingbi"></use>
        </svg>
      </FriendsList>
    </div>
    <div class="tip" ref="tip">
      <h3>是否确认删除好友{{ selected }}?</h3>
      <span @click="del_sure">确认</span>
      <span @click="del_cancel">取消</span>
    </div>
    <div class="tip2" ref="tip2">
      <h3>{{err_msg}}</h3>
      <span @click="err_sure">确认</span>
    </div>
  </div>
</template>

<script>
import FriendsList from '@/components/FriendsList.vue'
import qs from 'qs'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  created() {
    this.find_friend('')
  },
  data: function() {
    return {
      res: [],
      selected: '',
      selectedId: -1,
      err_msg: ''
    }
  },
  computed: {
    ...mapState(['self', 'friend'])
  },
  components: {
    FriendsList
  },
  methods: {
    ...mapActions(['updateAsyncFriend']),
    ...mapMutations(['updateFriend']),
    err_sure() {
      this.$refs.tip2.style.display = 'none'
    },
    del_clk(e) {
      this.selectedId = e.currentTarget.id * 1
      this.selected = this.res[this.selectedId].nickname
      this.$refs.tip.style.display = 'block'
    },
    del_cancel() {
      this.$refs.tip.style.display = 'none'
    },
    async del_sure() {
      const { data } = await this.$http({
        method: 'POST',
        url: '/delfriend',
        data: qs.stringify({
          account: this.res[this.selectedId].account
        }),
        headers: { Authorization: localStorage.getItem(this.self.account) }
      })
      const { status, msg } = data
      if (status === 200) {
        this.updateAsyncFriend(this)
        this.res = this.res.filter((value, index) => index !== this.selectedId)
      }
      this.$refs.tip.style.display = 'none'
      this.err_msg = msg
      this.$refs.tip2.style.display = 'block'
    },
    find_friend(input) {
      // eslint-disable-next-line no-useless-escape
      const reg = new RegExp(`[\d\D]*${input}[\d\D]*`)
      this.res = this.friend.filter((val) => {
        return reg.test(val.nickname) || reg.test(val.account)
      })
    },
    keyfind(e) {
      e.preventDefault()
      this.find_friend(this.$refs.find_info.value)
    },
    screen_clk(e, other, idx) {
      const newFriend = this.friend
      newFriend[idx].screen = (newFriend[idx].screen === 0 ? 1 : 0)
      this.updateFriend(newFriend)
      this.$http({
        url: 'screen',
        method: 'POST',
        data: qs.stringify({
          other,
          type: newFriend[idx].screen
        }),
        headers: { Authorization: localStorage.getItem(this.self.account) }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.deleteFriend {
  height: 100%;
  position: relative;

  .tip,
  .tip2 {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 250px;
    border-radius: 30px;
    background-color: #eed5cc;
    text-align: center;

    h3 {
      margin: 60px;
    }

    span {
      border: 1px solid #000;
      padding: 3px 10px;
      border-radius: 3px;
      margin: 0 25px;
      background-color: #c5b6da;

      &:hover {
        background-color: rgb(190, 231, 253);
      }
    }

  }

  .tip2 {
    text-align: center;
    padding: 0px 40px;
  }

  .delSearch {
    text-align: center;
    padding: 50px 25px;
    min-width: 300px;
    // background-color: rgb(235, 242, 249);
    background-color: var(--bgc);

    span {
      display: inline-block;
      background-color: rgb(249, 66, 58);
      padding: 0 10px;
      height: 32px;
      line-height: 32px;
      vertical-align: middle;

      &:hover {
        background-color: rgb(228, 68, 61);
      }
    }

    .icon {
      width: 52px;
      height: 32px;
      padding: 5px 10px;
      vertical-align: middle;
      background-color: rgb(0, 155, 219);

      &:hover {
        background-color: rgb(0, 139, 197);
      }
    }

    input {
      width: calc(80% - 72px);
      height: 32px;
      border: 1.5px solid rgb(0, 155, 219);
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      outline: 0;
      vertical-align: middle;
      padding: 5px;

      &:focus {
        box-shadow: 0 0 3px 1px #badcea;
      }
    }
  }

  .delResult {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    height: calc(100% - 132px);
    // background-color: rgb(251, 253, 254);
    background-color: var(--bgc);
    border-top: 2px solid rgb(204, 204, 204);
    overflow-y: auto;

    .substitute {
      width: 100%;
      margin-top: 50px;
      text-align: center;
    }

    .icon {
      width: 32px;
      height: 32px;
      margin-top: 19px;

      &:hover {
        transform: scale(1.1);
      }
    }

    .dellist {
      width: 50%;
      min-width: max(50%, 360px);
      display: flex;
      justify-content: center;

      &:hover {
        background-color: transparent;
      }
    }
  }
}
</style>
