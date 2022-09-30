<template>
  <div class="extraFunc">
    <ul>
      <li style="margin-left:0;">
        <router-link to="/add">添加好友</router-link>
      </li>
      <li>
        <router-link to="/delete">删除好友</router-link>
      </li>
      <li>
        <router-link to="/alter">修改资料</router-link>
      </li>
      <li @click="exit">退出登录</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import qs from 'qs'
export default {
  computed: {
    ...mapState(['self'])
  },
  methods: {
    exit() {
      this.$http({
        method: 'POST',
        url: '/changeOnline',
        headers: { Authorization: localStorage.getItem(this.self.account) },
        data: qs.stringify({
          cond: 0
        })
      })
      localStorage.removeItem(this.self.account)
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.extraFunc {
  margin-bottom: 8px;

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
      width: 70px;
      height: 30px;
      margin: 0 3px;
      line-height: 26px;
      text-align: center;
      padding: 2px;

      &:hover {
        background-color: rgb(209, 206, 206);
      }
    }

    #send {
      float: right;
      width: 50px;
      margin: 0;
      border-left: 2px solid #ccc;
      background-color: rgb(204, 204, 255);
      font-size: 15px;

      &:hover {
        font-size: 16px;
      }
    }
  }
}
</style>
