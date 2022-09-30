<template>
  <div class="chatMsg">
    <div class="msgBox1" v-if="!chat.is_self">
      <svg v-if="receiver.picture[0]==='#'" class="icon" aria-hidden="true">
        <use :xlink:href="receiver.picture"></use>
      </svg>
      <img v-else :src="'http://127.0.0.1:24000/head/'+receiver.picture" alt="" id="innerImg">
      <div class="content" v-html="showIcon(chat.msg)"></div>
    </div>
    <div class="msgBox2" v-else>
      <div class="content" v-html="showIcon(chat.msg)"></div>
      <svg v-if="self.picture[0]==='#'" class="icon" aria-hidden="true">
        <use :xlink:href="self.picture"></use>
      </svg>
      <img v-else :src="'http://127.0.0.1:24000/head/'+self.picture" alt="" id="innerImg">
    </div>
    <span :class="!chat.is_self?'footTime1':'footTime2'">{{ chat.date }} {{chat.is_read?'已读':'未读'}}</span>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['chat'],
  data: function() {
    return {
      icons: ['#icon--astonished', '#icon--angel', '#icon--astonished-', '#icon--cool', '#icon--confused', '#icon--angry', '#icon--cool-', '#icon--dizzy', '#icon--cry', '#icon--cry-', '#icon--expressionless', '#icon--devil', '#icon--flushed', '#icon--happy-', '#icon--happy-1', '#icon--happy', '#icon--injury', '#icon--joy', '#icon--in-love', '#icon--kiss', '#icon--kiss-', '#icon--kiss-1', '#icon--mask', '#icon--neutral', '#icon--mute', '#icon--sad', '#icon--sad-', '#icon--scared', '#icon--secret', '#icon--scared-', '#icon--shocked', '#icon--sick', '#icon--smile', '#icon--smile-', '#icon--sleeping', '#icon--smiling-', '#icon--smiling', '#icon--sweat', '#icon--surprised', '#icon--smirking', '#icon--thinking', '#icon--tired', '#icon--tongue', '#icon--tongue-', '#icon--tongue-1', '#icon--unamused', '#icon--wink', '#icon--vomiting', '#icon--zombie', '#icon--vomiting-']
    }
  },
  computed: {
    ...mapState(['receiver', 'self'])
  },
  methods: {
    showIcon(str) {
      return str.replace(/\[(\d+)\]/g, (_, b) => {
        if (b.length > 2 || b * 1 < 0 || b * 1 > 49) return `[${b}]`
        return `<svg class="icon" aria-hidden="true"><use xlink:href="${this.icons[b]}"></use></svg>`
      })
    }
  }
}
</script>

<style lang="less" scoped>
#innerImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
  margin: 0;
}

.msgBox1 {
  display: flex;
  padding: 3px;

  img {
    margin: 5px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .content {
    position: relative;
    word-wrap: break-word;
    word-break: break-all;
    display: inline-block;
    margin: 4px 3px 0 10px;
    padding: 9px;
    border: 1.5px solid var(--text);
    border-radius: 5px;

    :deep(.icon) {
      width: 26px;
      height: 26px;
      vertical-align: middle;
    }

    &:before {
      position: absolute;
      content: "";
      display: block;
      width: 9px;
      height: 9px;
      border-left: 1.5px solid var(--text);
      border-bottom: 1.5px solid var(--text);
      background-color: var(--bgc);
      transform: translateX(-6.5px) rotate(45deg);
      top: 13px;
      left: 0;
    }
  }

}

.chatMsg {
  &::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}

.footTime2 {
  float: right;
  padding-right: 65px;
}

.footTime1 {
  float: left;
  padding-left: 65px;
}

.msgBox2 {
  display: flex;
  padding: 3px;
  justify-content: flex-end;

  img {
    margin: 5px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .content {
    position: relative;
    word-wrap: break-word;
    word-break: break-all;
    display: inline-block;
    margin: 4px 10px 0 3px;
    padding: 9px;
    border: 1.5px solid var(--text);
    border-radius: 5px;

    :deep(.icon) {
      width: 26px;
      height: 26px;
      vertical-align: middle;
    }

    &:before {
      position: absolute;
      content: "";
      display: block;
      width: 9px;
      height: 9px;
      border-right: 1.5px solid var(--text);
      border-top: 1.5px solid var(--text);
      background-color: var(--bgc);
      transform: translateX(6.5px) rotate(45deg);
      top: 13px;
      right: 0;
    }
  }
}
</style >
