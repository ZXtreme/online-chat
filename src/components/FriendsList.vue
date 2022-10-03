<template>
  <div class="friends" @click="is_list ? changeChatRouter() : ''">
    <div class="left">
      <svg v-if="picture[0]==='#'" class="icon" aria-hidden="true"
        :style="is_list && !online ?'filter: grayscale(.8)' : ''">
        <use :xlink:href="picture"></use>
      </svg>
      <img v-else :src="'http://127.0.0.1:24000/head/'+picture" alt=""
        :style="is_list && !online ?'filter: grayscale(.8)' : ''">
    </div>
    <div class="middle">
      <h4 class="username">{{ nickname }}</h4>
      <h5 class="signal">{{ sign }}</h5>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['nickname', 'sign', 'is_list', 'online', 'picture', 'account'],
  methods: {
    ...mapMutations(['changeReceiver', 'changeFilterFriend']),
    changeChatRouter() {
      this.changeFilterFriend('')
      this.changeReceiver({ nickname: this.nickname, sign: this.sign, picture: this.picture, account: this.account })
      this.$router.push('/chat')
    }
  }
}
</script>

<style lang="less" scoped>
.friends {
  display: flex;
  width: 100%;
  height: 70px;

  &:hover {
    background-color: rgb(209, 206, 206);
  }

  .left {
    margin: 10px 8px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }

  .middle {
    flex: 1;
    max-width: 230px;

    h4 {
      margin-top: 15px;
    }

    h5 {
      font-weight: normal;
    }

    h4,
    h5 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
