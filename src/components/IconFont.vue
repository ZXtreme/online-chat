<template>
  <div class="iconFont">
    <svg class="icon" aria-hidden="true" v-for="(item, index) in icons" :key="index" :id="index" @click="pushIcon">
      <use :xlink:href="item"></use>
    </svg>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['tabEvent'],
  data: function() {
    return {
      icons: ['#icon--astonished', '#icon--angel', '#icon--astonished-', '#icon--cool', '#icon--confused', '#icon--angry', '#icon--cool-', '#icon--dizzy', '#icon--cry', '#icon--cry-', '#icon--expressionless', '#icon--devil', '#icon--flushed', '#icon--happy-', '#icon--happy-1', '#icon--happy', '#icon--injury', '#icon--joy', '#icon--in-love', '#icon--kiss', '#icon--kiss-', '#icon--kiss-1', '#icon--mask', '#icon--neutral', '#icon--mute', '#icon--sad', '#icon--sad-', '#icon--scared', '#icon--secret', '#icon--scared-', '#icon--shocked', '#icon--sick', '#icon--smile', '#icon--smile-', '#icon--sleeping', '#icon--smiling-', '#icon--smiling', '#icon--sweat', '#icon--surprised', '#icon--smirking', '#icon--thinking', '#icon--tired', '#icon--tongue', '#icon--tongue-', '#icon--tongue-1', '#icon--unamused', '#icon--wink', '#icon--vomiting', '#icon--zombie', '#icon--vomiting-']
    }
  },
  methods: {
    ...mapMutations(['pushReadySendText']),
    pushIcon(e) {
      this.tabEvent()
      this.pushReadySendText(`[${e.currentTarget.id}]`)
    }
  }
}
</script>

<style lang="less" scoped>
.iconFont {
  background-color: var(--bgc);
  width: 100%;
  height: 100%;
  max-height: 120px;
  overflow-y: auto;
}

.icon {

  &:hover {
    background-color: rgb(224, 224, 224);
  }
}
</style>
