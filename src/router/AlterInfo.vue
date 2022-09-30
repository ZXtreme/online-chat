<template>
  <div class="alterInfo">
    <ul>
      <li><span>账号</span>
        <p>{{self.account}}</p>
      </li>
      <li><span>昵称</span><input type="text" v-model="newUser" /></li>
      <li><span>个性签名</span><textarea v-model="newMsg"></textarea></li>
      <li>
        <span>头像</span>
        <img v-if="srcImg!==''" :src="srcImg" alt="">
        <svg v-else class="icon iconking" aria-hidden="true">
          <use :xlink:href="newPic"></use>
        </svg>
      </li>
      <li>
        <span>可选头像</span>
        <div class="selectPic">
          <svg class="icon" aria-hidden="true" v-for="(item, index) in pics" :key="index">
            <use :xlink:href="item" @click="useClk"></use>
          </svg>
          <span id="addImg">
            <svg class="icon" aria-hidden="true" @click="uploadImg">
              <use xlink:href="#icon-zengjia"></use>
            </svg>
            <span id="tip">请上传不超过100KB的.png/.jpg/.jpeg格式的图片<br />建议宽高比1:1</span>
          </span>
          <input type="file" accept=".png, .jpeg, .jpg" style="display:none;" ref="file" @change="acceptImg" />
        </div>
      </li>
      <li class="submit">
        <span @click="submitChange">确认修改</span>
        <span>
          <router-link to="/main">返回主页</router-link>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['self'])
  },
  data: function() {
    return {
      pics: ['#icon-icon-test1', '#icon-icon-test2', '#icon-icon-test3', '#icon-icon-test4', '#icon-icon-test6', '#icon-icon-test7', '#icon-icon-test8', '#icon-icon-test9', '#icon-icon-test10', '#icon-icon-test11', '#icon-icon-test12', '#icon-icon-test13', '#icon-icon-test14', '#icon-icon-test15', '#icon-icon-test16', '#icon-icon-test17', '#icon-icon-test18', '#icon-icon-test19', '#icon-icon-test-copy', '#icon-touxiangnvhai', '#icon-icon-test'],
      newPic: this.$store.state.self.picture,
      newUser: this.$store.state.self.nickname,
      newMsg: this.$store.state.self.sign,
      srcImg: this.$store.state.self.picture[0] === '#' ? '' : 'http://127.0.0.1:24000/head/' + this.$store.state.self.picture
    }
  },
  methods: {
    ...mapMutations(['changeSelf']),
    async submitChange() {
      const fd = new FormData()
      fd.append('nickname', this.newUser)
      fd.append('sign', this.newMsg)
      fd.append('picture', this.newPic)
      fd.append('head', this.$refs.file.files[0])
      const { data } = await this.$http({
        method: 'POST',
        url: '/alterself',
        data: fd,
        headers: { Authorization: localStorage.getItem(this.self.account) },
        processData: false,
        contentType: false
      })
      localStorage.setItem(this.self.account, data.token)
      this.changeSelf({
        nickname: this.newUser,
        sign: this.newMsg,
        picture: data.pic
      })
      this.$router.push('/')
    },
    useClk(e) {
      this.newPic = e.currentTarget.href.baseVal
      this.srcImg = ''
      this.$refs.file.value = ''
    },
    uploadImg() {
      this.$refs.file.click()
    },
    acceptImg(e) {
      const file = e.target.files[0]
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        alert('请上传.png/.jpg/.jpeg格式的图片')
        return false
      } else if (file.size / 1024 > 100) {
        alert('请上传不超过100KB的图片')
        return false
      }
      const reads = new FileReader()
      reads.readAsDataURL(file)

      reads.onload = () => {
        this.srcImg = reads.result
      }
    }
  }

}
</script>

<style lang="less" scoped>
.alterInfo {
  min-width: 630px;
  height: 100%;
  overflow-y: auto;

  ul {
    padding-top: 50px;
    height: 100%;
    flex-direction: column;
    overflow-x: hidden;

    li.submit {
      span {
        width: 70px;
        margin: 58px 0 30px 90px;
        cursor: pointer;
      }
    }

    li {
      transform: translateX(20%);

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        vertical-align: middle;
        margin: 3px 10px;
      }

      p {
        display: inline-block;
        margin: 3px 10px;
        vertical-align: middle;
      }

      .selectPic {
        display: inline-block;
        width: calc(70% - 90px);
        margin: 3px 10px;
        vertical-align: middle;
        position: relative;

        #addImg {
          position: relative;
          width: 50px;
          vertical-align: -2px;

          #tip {
            position: absolute;
            display: none;
            width: 362px;
            text-align-last: center;
            border: 1.5px solid var(--text);
            padding: 2px;
            background-color: var(--bgc);
            top: 100%;
            left: 50%;
            transform: translate(-50%, 8px);

            &::after {
              content: '';
              position: absolute;
              top: -1px;
              left: 50%;
              width: 9px;
              height: 9px;
              background-color: var(--bgc);
              border-right: 1.5px solid var(--text);
              border-top: 1.5px solid var(--text);
              transform: translate(-50%, -50%) rotate(-45deg);
            }
          }

          &:hover #tip {
            display: inline-block;
          }
        }

        .icon {
          border-radius: 50%;

          &:hover {
            border: 1px solid var(--text);
          }
        }
      }

      .iconking {
        vertical-align: middle;
        margin: 3px 10px;
      }

      span {
        display: inline-block;
        width: 80px;
        text-align-last: justify;
        vertical-align: middle;
      }

      input,
      textarea {
        outline: 0;
        border: 0;
        width: 220px !important;
        height: 40px !important;
        margin: 3px 10px;
        vertical-align: middle;
        border-radius: 10px;
        padding: 0px 10px;
        font-size: 16px;
      }

      textarea {
        resize: none;
        padding: 10px;
        height: 80px !important;
        width: 320px !important;
        font-family: "微软雅黑";
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
}
</style>
