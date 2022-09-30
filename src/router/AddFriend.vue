<template>
  <div class="addFriend">
    <div class="addSearch">
      <input type="text" placeholder="请输入需要添加的账号/昵称" ref="find_info" @keydown.enter="keyfind">
      <svg class="icon" aria-hidden="true" @click="find_friend">
        <use xlink:href="#icon-chazhao"></use>
      </svg>
      <span>
        <router-link to="main">返回主页</router-link>
      </span>
    </div>
    <div class="addResult">
      <div v-if="res.length===0" class="substitute">暂无满足条件的用户</div>
      <FriendsList v-else v-for="(item, index) in res" :key="index" :nickname="item.nickname+'('+item.account+')'"
        :sign="item.sign" :picture="item.picture" :is_list="0" class="addlist">
        <svg class="icon" aria-hidden="true" :id="index" @click="add_clk">
          <use xlink:href="#icon-tianjia"></use>
        </svg>
      </FriendsList>
    </div>
    <div class="tip" ref="tip">
      <h3>是否确认添加{{ selected }}为好友？</h3>
      <span @click="add_sure">确认</span>
      <span @click="add_cancel">取消</span>
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
import { mapActions, mapState } from 'vuex'
export default {
  data: function() {
    return {
      res: [],
      selected: '',
      selectedId: -1,
      err_msg: ''
    }
  },
  components: {
    FriendsList
  },
  computed: {
    ...mapState(['self'])
  },
  methods: {
    ...mapActions(['updateAsyncFriend']),
    err_sure() {
      this.$refs.tip2.style.display = 'none'
    },
    add_clk(e) {
      this.selectedId = e.currentTarget.id * 1
      this.selected = this.res[this.selectedId].nickname
      this.$refs.tip.style.display = 'block'
    },
    add_cancel() {
      this.$refs.tip.style.display = 'none'
    },
    async add_sure() {
      const { data } = await this.$http({
        method: 'POST',
        url: '/addfriend',
        data: qs.stringify({
          account: this.res[this.selectedId].account
        }),
        headers: { Authorization: localStorage.getItem(this.self.account) }
      })
      const { status, msg } = data
      this.$refs.tip.style.display = 'none'
      this.err_msg = msg
      if (status === 200) {
        this.updateAsyncFriend(this)
      }
      this.$refs.tip2.style.display = 'block'
    },
    async find_friend() {
      const input = this.$refs.find_info.value
      if (input === '') return
      const { data } = await this.$http({
        method: 'GET',
        url: '/findfriend',
        params: {
          input
        },
        headers: { Authorization: localStorage.getItem(this.self.account) }
      })
      this.res = data.result
    },
    keyfind(e) {
      e.preventDefault()
      this.find_friend()
    }
  }
}
</script>

<style lang="less" scoped>
.addFriend {
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

  .addSearch {
    text-align: center;
    padding: 50px 25px;
    min-width: 300px;
    background-color: var(--bgc);
    // background-color: rgb(235, 242, 249);

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

  .addResult {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    height: calc(100% - 132px);
    background-color: var(--bgc);
    border-top: 2px solid rgb(204, 204, 204);
    // background-color: rgb(251, 253, 254);
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

    .addlist {
      width: 50%;
      min-width: max(50%, 330px);
      display: flex;
      justify-content: center;

      &:hover {
        background-color: transparent;
      }
    }
  }
}
</style>
