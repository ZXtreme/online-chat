<template>
  <div class="self">
    <FriendsList :nickname="self.nickname" :sign="self.sign" :is_list="0" :picture="self.picture"></FriendsList>
    <div class="search">
      <input type="text" placeholder="输入需要查找的好友账号或昵称" @input="e=>changeFilterFriend(e.currentTarget.value)"
        :value="filterFriend">
      <span>搜索</span>
    </div>
  </div>
</template>

<script>
import FriendsList from '@/components/FriendsList.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    FriendsList
  },
  computed: {
    ...mapState(['self', 'filterFriend'])
  },
  methods: {
    ...mapMutations(['changeFilterFriend'])
  }
}
</script>

<style lang="less" scoped>
.self {
  :deep(.friends) {
    &:hover {
      background-color: var(--bgc);
    }
  }

  .search {
    border: 1.5px solid var(--text);
    margin: 2px 8px 5px;
    height: 25px;
    vertical-align: middle;
    display: flex;

    input {
      display: inline-block;
      flex: 1;
      outline: none;
      height: 100%;
      // width: calc(100% -50px);
      border: 0px;
      vertical-align: bottom;
      padding-left: 7px;
      padding-right: 7px;
    }

    span {
      display: inline-block;
      height: 100%;
      width: 50px;
      line-height: 22px;
      text-align: center;
      border-left: 1.5px solid var(--text);
      font-size: 14px;
      cursor: default;
      user-select: none;
      // vertical-align: bottom;
    }
  }
}
</style>
