<template>
  <div class="super">
    <div class="big_box">
      <div class="main_game">
        <div class="register">
          <h1>注&nbsp;&nbsp;&nbsp;册</h1>
          <form>
            <div class="form-control">
              <input type="text" id="text1" autocomplete="off" @focus="register_fcs" @blur="register_blr">
              <label for="text1">
                <span style="transition-delay:0ms">昵</span>
                <span style="transition-delay:50ms">称</span>
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
                <span class="text1">3-20位</span>
              </span>
            </div>
            <div class="form-control">
              <input type="password" autocomplete="off" id="text2" @focus="register_fcs" @blur="register_blr">
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
                <span class="text2">6-16位</span>
              </span>
            </div>
            <div class="form-control">
              <input type="password" autocomplete="off" id="text3" @focus="register_fcs" @blur="register_blr">
              <label for="text3">
                <span style="transition-delay:0ms">再</span>
                <span style="transition-delay:50ms">次</span>
                <span style="transition-delay:100ms">输</span>
                <span style="transition-delay:150ms">入</span>
                <span style="transition-delay:200ms">密</span>
                <span style="transition-delay:250ms">码</span>
              </label>
              <span class="condition">
                <svg id="cond31" t="1662024740983" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2123" width="32" height="32">
                  <path
                    d="M549.044706 512l166.189176-166.249412a26.383059 26.383059 0 0 0 0-36.98447 26.383059 26.383059 0 0 0-37.044706 0L512 475.015529l-166.249412-166.249411a26.383059 26.383059 0 0 0-36.98447 0 26.383059 26.383059 0 0 0 0 37.044706L475.015529 512l-166.249411 166.249412a26.383059 26.383059 0 0 0 0 36.98447 26.383059 26.383059 0 0 0 37.044706 0L512 548.984471l166.249412 166.249411a26.383059 26.383059 0 0 0 36.98447 0 26.383059 26.383059 0 0 0 0-37.044706L548.984471 512zM512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z"
                    fill="#E84335" p-id="2124"></path>
                </svg>
                <svg id="cond32" t="1662024731268" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2950" width="32" height="32">
                  <path
                    d="M512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z m-71.318588-361.411765a29.334588 29.334588 0 0 0 20.48-8.252235L774.625882 349.364706a27.708235 27.708235 0 0 0 0-39.936 29.575529 29.575529 0 0 0-41.08047 0l-292.74353 284.912941L290.454588 448.150588a29.575529 29.575529 0 0 0-41.08047 0 27.708235 27.708235 0 0 0 0 39.996236l170.706823 166.128941a29.274353 29.274353 0 0 0 20.540235 8.252235z"
                    fill="#33A954" p-id="2951"></path>
                </svg>
                <span class="text3"></span>
              </span>
            </div>
            <button class="btn" @click="register_clk">注册</button>
            <button class="reg">
              <router-link to="login">返回</router-link>
            </button>
          </form>
        </div>
        <div class="regSuccess">
          <h3>注册成功！您的账号为：{{account}}</h3>
          <h3>请记录好您的账号，避免丢失、遗忘</h3>
          <button>
            <router-link to="/login">返回</router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import qs from 'qs'
export default {
  mounted() {
    document.documentElement.style.setProperty('--bodybgc', 'rgba(21, 23, 38, 1)')
  },
  methods: {
    register_fcs(e) {
      e.currentTarget.style.borderBottomColor = 'lightblue'
      const spans = e.currentTarget.nextSibling.children
      for (let i = 0; i < spans.length; i++) {
        spans[i].style.color = 'lightblue'
        spans[i].style.transform = 'translateY(-30px)'
      }
    },
    register_blr(e) {
      if (e.currentTarget.value === '') {
        e.currentTarget.style.borderBottomColor = 'white'
        const spans = e.currentTarget.nextSibling.children
        for (let i = 0; i < spans.length; i++) {
          spans[i].style.color = 'white'
          spans[i].style.transform = 'translateY(0px)'
        }
      }
    },
    async register_clk(e) {
      e.preventDefault()
      const inputs = document.querySelectorAll('.form-control input')
      const val0 = $(inputs[0]).val()
      const val1 = $(inputs[1]).val()
      const val2 = $(inputs[2]).val()

      if (val1 !== val2) {
        $('#cond11').css('display', 'none')
        $('#cond12').css('display', 'none')
        $('.text1').css('color', 'red').text('')
        $('#cond21').css('display', 'none')
        $('#cond22').css('display', 'none')
        $('.text2').css('color', 'red').text('')
        $('#cond31').css('display', 'inline-block')
        $('#cond32').css('display', 'none')
        $('.text3').css('color', 'red').text('两次输入的密码不一致！')
        return
      }
      $('#cond31').css('display', 'none')
      $('#cond32').css('display', 'none')
      $('.text3').css('color', 'red').text('')
      if (!(val0.length >= 3 && val0.length <= 20 && val1.length >= 6 && val1.length <= 16)) {
        if (!(val0.length >= 3 && val0.length <= 20)) {
          $('#cond11').css('display', 'inline-block')
          $('#cond12').css('display', 'none')
          $('.text1').css('color', 'red').text('长度必须为3-20位')
        } else {
          $('#cond12').css('display', 'inline-block')
          $('#cond11').css('display', 'none')
          $('.text1').css('color', 'green').text('正确')
        }

        if (!(val1.length >= 6 && val1.length <= 16)) {
          $('#cond21').css('display', 'inline-block')
          $('#cond22').css('display', 'none')
          $('.text2').css('color', 'red').text('长度必须为6-16位')
        } else {
          $('#cond22').css('display', 'inline-block')
          $('#cond21').css('display', 'none')
          $('.text2').css('color', 'green').text('正确')
        }
        return
      }
      const { data } = await this.$http({
        method: 'POST',
        url: '/register',
        data: qs.stringify({
          username: val0,
          password: val1
        })
      })
      const { account, status } = data
      if (status === 500) {
        $('#cond11').css('display', 'inline-block')
        $('#cond12').css('display', 'none')
        $('.text1').css('color', 'red').text('未知错误')
        $('#cond21').css('display', 'inline-block')
        $('#cond22').css('display', 'none')
        $('.text2').css('color', 'red').text('未知错误')
      } else {
        this.account = account
        $('.register').css('display', 'none')
        $('.regSuccess').css('display', 'block')
      }
    }
  },
  data: function() {
    return {
      account: ''
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

  .regSuccess {
    display: none;
    width: 35%;
    margin: 10% auto;
    text-align: center;
    letter-spacing: 1px;

    h3 {
      color: #fff;
      line-height: 30px;
    }

    button {
      cursor: pointer;
      width: 100%;
      background-color: lightblue;
      border: 0;
      font-size: 16px;
      font-family: inherit;
      margin-top: 100px;

      a {
        display: block;
        padding: 15px;
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }

  .register {
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
      padding: 12px 0 5px;
      font-size: 18px;
      color: white;
      outline: 0;
    }

    .form-control label {
      position: absolute;
      left: 0;
      top: 10px;
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
