<template>
  <div class="super">
    <div class="big_box">
      <div class="main_game">
        <div class="login">
          <h1>登&nbsp;&nbsp;&nbsp;录</h1>
          <form>
            <div class="form-control">
              <input type="text" id="text1" autocomplete="off" @focus="login_fcs" @blur="login_blr">
              <label for="text1">
                <span style="transition-delay:0ms">账</span>
                <span style="transition-delay:50ms">号</span>
              </label>
              <span class="condition">
                <svg id="cond11" t="1662024740983" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2123" width="32" height="32">
                  <path
                    d="M549.044706 512l166.189176-166.249412a26.383059 26.383059 0 0 0 0-36.98447 26.383059 26.383059 0 0 0-37.044706 0L512 475.015529l-166.249412-166.249411a26.383059 26.383059 0 0 0-36.98447 0 26.383059 26.383059 0 0 0 0 37.044706L475.015529 512l-166.249411 166.249412a26.383059 26.383059 0 0 0 0 36.98447 26.383059 26.383059 0 0 0 37.044706 0L512 548.984471l166.249412 166.249411a26.383059 26.383059 0 0 0 36.98447 0 26.383059 26.383059 0 0 0 0-37.044706L548.984471 512zM512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z"
                    fill="#E84335" p-id="2124"></path>
                </svg>
                <svg id="cond12" t="1662024731268" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2950" width="32" height="32">
                  <path
                    d="M512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z m-71.318588-361.411765a29.334588 29.334588 0 0 0 20.48-8.252235L774.625882 349.364706a27.708235 27.708235 0 0 0 0-39.936 29.575529 29.575529 0 0 0-41.08047 0l-292.74353 284.912941L290.454588 448.150588a29.575529 29.575529 0 0 0-41.08047 0 27.708235 27.708235 0 0 0 0 39.996236l170.706823 166.128941a29.274353 29.274353 0 0 0 20.540235 8.252235z"
                    fill="#33A954" p-id="2951"></path>
                </svg>
                <span class="text1"></span>
              </span>
            </div>
            <div class="form-control">
              <input type="password" autocomplete="off" id="text2" @focus="login_fcs" @blur="login_blr">
              <label for="text2">
                <span style="transition-delay:0ms">密</span>
                <span style="transition-delay:50ms">码</span>
              </label>
              <span class="condition">
                <svg id="cond21" t="1662024740983" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2123" width="32" height="32">
                  <path
                    d="M549.044706 512l166.189176-166.249412a26.383059 26.383059 0 0 0 0-36.98447 26.383059 26.383059 0 0 0-37.044706 0L512 475.015529l-166.249412-166.249411a26.383059 26.383059 0 0 0-36.98447 0 26.383059 26.383059 0 0 0 0 37.044706L475.015529 512l-166.249411 166.249412a26.383059 26.383059 0 0 0 0 36.98447 26.383059 26.383059 0 0 0 37.044706 0L512 548.984471l166.249412 166.249411a26.383059 26.383059 0 0 0 36.98447 0 26.383059 26.383059 0 0 0 0-37.044706L548.984471 512zM512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z"
                    fill="#E84335" p-id="2124"></path>
                </svg>
                <svg id="cond22" t="1662024731268" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2950" width="32" height="32">
                  <path
                    d="M512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z m-71.318588-361.411765a29.334588 29.334588 0 0 0 20.48-8.252235L774.625882 349.364706a27.708235 27.708235 0 0 0 0-39.936 29.575529 29.575529 0 0 0-41.08047 0l-292.74353 284.912941L290.454588 448.150588a29.575529 29.575529 0 0 0-41.08047 0 27.708235 27.708235 0 0 0 0 39.996236l170.706823 166.128941a29.274353 29.274353 0 0 0 20.540235 8.252235z"
                    fill="#33A954" p-id="2951"></path>
                </svg>
                <span class="text2"></span>
              </span>
            </div>
            <button class="btn" @click="login_clk">登录</button>
            <button class="reg">
              <router-link to="register">注册</router-link>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import qs from 'qs'
import { mapMutations } from 'vuex'
export default {
  mounted() {
    document.documentElement.style.setProperty('--bodybgc', 'rgba(21, 23, 38, 1)')
  },
  methods: {
    ...mapMutations(['changeSelf']),
    login_fcs(e) {
      e.currentTarget.style.borderBottomColor = 'lightblue'
      const spans = e.currentTarget.nextSibling.children
      for (let i = 0; i < spans.length; i++) {
        spans[i].style.color = 'lightblue'
        spans[i].style.transform = 'translateY(-30px)'
      }
    },
    login_blr(e) {
      if (e.currentTarget.value === '') {
        e.currentTarget.style.borderBottomColor = 'white'
        const spans = e.currentTarget.nextSibling.children
        for (let i = 0; i < spans.length; i++) {
          spans[i].style.color = 'white'
          spans[i].style.transform = 'translateY(0px)'
        }
      }
    },
    async login_clk(e) {
      e.preventDefault()
      const inputs = document.querySelectorAll('.form-control input')
      const val0 = $(inputs[0]).val()
      const val1 = $(inputs[1]).val()
      const { data } = await this.$http({
        method: 'POST',
        url: '/login',
        data: qs.stringify({
          username: val0,
          password: val1
        })
      })

      const { status, msg, token, type, result } = data
      if (status === 200) {
        localStorage.setItem(val0, token)
        this.changeSelf({
          account: result.account,
          nickname: result.nickname,
          sign: result.sign,
          picture: result.picture
        })
        this.$router.push('/')
      } else if (status === 201) {
        if (type === 1) {
          $('#cond12').css('display', 'none')
          $('#cond11').css('display', 'inline-block')
          $('.text1').css('color', 'red').text(msg)
          $('#cond21').css('display', 'none')
          $('#cond22').css('display', 'none')
          $('.text2').css('color', 'green').text('')
        } else if (type === 2) {
          $('#cond22').css('display', 'none')
          $('#cond21').css('display', 'inline-block')
          $('.text2').css('color', 'red').text(msg)
          $('#cond11').css('display', 'none')
          $('#cond12').css('display', 'inline-block')
          $('.text1').css('color', 'green').text('正确')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.super {
  position: absolute;
  width: 100%;
  height: 100%;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-25%, -25%);
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: linear-gradient(#ee9ca7, #ffdde1);
  }
}

.big_box {
  width: 90vw;
  height: 80vh;
  min-width: 1200px;
  min-height: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10vh;
  padding: 0 50px 50px 50px;
}

.main_game {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 20px 20px 50px rgba(0, 0, 0, .5);
  backdrop-filter: blur(5px);
  border-top: 1px solid rgba(255, 255, 255, .5);
  border-left: 1px solid rgba(255, 255, 255, .5);
  border-radius: 30px;
  overflow: hidden;

  .login {
    width: 30%;
    margin: 3.5% auto;

    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: white;
    }

    .check {
      margin-top: -20px;
      margin-bottom: 10px;

      label {
        color: white;
      }
    }

    .btn,
    .reg {
      cursor: pointer;
      width: 47%;
      background-color: lightblue;
      padding: 15px;
      border: 0;
      font-size: 16px;
      font-family: inherit;

      &:active {
        transform: scale(0.98);
      }
    }

    .reg {
      float: right;
      padding: 0;

      a {
        padding: 15px;
        display: block;
      }
    }

    .form-control {
      width: 100%;
      margin: 20px 0 40px;
      position: relative;

      .condition {
        position: absolute;
        top: 50%;
        right: -10px;
        transform: translate(100%, -50%);
        color: #fff;

        .text1,
        .text2 {
          color: white;
        }

        svg {
          vertical-align: middle;
          display: none;
        }
      }
    }

    .form-control input {
      background-color: transparent;
      border: 0;
      border-bottom: 2px solid white;
      display: block;
      width: 100%;
      padding: 15px 0;
      font-size: 18px;
      color: white;
      outline: 0;
    }

    .form-control label {
      position: absolute;
      left: 0;
      top: 15px;
      color: white;
    }

    .form-control label span {
      display: inline-block;
      font-size: 18px;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      color: white;
    }
  }
}
</style>
