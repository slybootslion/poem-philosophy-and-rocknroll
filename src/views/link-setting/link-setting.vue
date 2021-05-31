<template>
  <div class="link-setting-container">
    <span class="iconfont icon-home" @click="backHome"></span>
    <div class="lint-container">
      <div class="user-container">
        <div class="link-content"
             v-for="(item, index) in groupList"
             :key="index">
          <link-item v-for="link in item"
                     :key="link.id"
                     :link="link"
                     ref="userLinkNodes"
                     @closeItem="itemOut"
                     @MouseDown="Down"
                     @MouseUp.stop="up"
                     @MouseMove.stop="move"
                     :isUser="true" />
        </div>
      </div>
      <div class="all-link-content">
        <link-item v-for="link in allList"
                   :key="link.id"
                   :link="link"
                   @click="itemIn(link.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { showMessage, waitTime } from '@/utils'
import LinkApi from '@/api/module/link-api'
import LinkItem from '@/views/link-setting/components/link-item'
import { formatIconUrl, formatLinkGroup } from '@/views/hooks'
import { down, up, move, updateUserLinks } from './mouse-methods'

const linkApi = new LinkApi()

export default {
  name: 'link-setting',
  components: { LinkItem },
  setup () {
    const list = ref([])
    const allList = ref([])
    const store = useStore()
    const router = useRouter()
    const count = ref(0)
    const userLinkNodes = ref(null)

    const listIds = computed(() => list.value.map(l => l.id))

    const groupList = computed(() => formatLinkGroup(list.value, 15))

    const computedLinks = allLink => {
      allList.value = allLink.filter(item => {
        if (listIds.value && !listIds.value.includes(item.id)) return formatIconUrl(item)
      })
    }

    onMounted(async () => {
      const {
        count: total,
        rows: allLink,
      } = await linkApi.getAllList()
      count.value = total
      computedLinks(allLink)
      await waitTime(1200)
      await store.dispatch('sys/setIsLoadingAction', false)
    })

    const backHome = () => router.replace({ name: 'Home' })

    list.value = store.state.link.linkShowList.flat(Infinity)

    const itemIn = id => {
      if (list.value.length > 60) {
        showMessage('最多添加60个链接')
        return
      }
      const item = allList.value.find(link => link.id === id)
      allList.value = allList.value.filter(link => link.id !== id)
      list.value.push(item)
      updateUserLinks(listIds.value, list, store)
    }

    const itemOut = id => {
      if (list.value.length < 2) {
        showMessage('需至少保留一个链接')
        return
      }
      const item = list.value.find(link => link.id === id)
      list.value = list.value.filter(link => link.id !== id)
      allList.value.push(item)
      updateUserLinks(listIds.value, list, store)
    }

    const Down = (itemDom, e, link) => {
      const el = itemDom.value
      const startX = e.clientX
      const startY = e.clientY
      down(el, startX, startY, list, link, store)
    }

    return {
      list,
      allList,
      count,
      backHome,
      itemIn,
      itemOut,
      groupList,
      userLinkNodes,
      Down,
      up,
      move,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/variables";

.link-setting-container {
  width: 100%;
  height: 100%;
  background-color: $color-text-normal;
  padding: p2r(20);
  box-sizing: border-box;

  .icon-home {
    font-size: p2r(28);
    color: $color-info;
    position: absolute;
    top: p2r(20);
    right: p2r(20);
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }

  .lint-container {
    height: 100%;
    display: flex;

    .user-container {
      overflow-y: auto;
      position: relative;

      .link-content {
        width: 450px;
        margin-bottom: p2r(20);
        border-bottom: p2r(1) solid rgba(255, 255, 255, .3);
        overflow: hidden;
      }
    }

    .all-link-content {
      float: left;
      margin-left: 20px;
      flex: 1;
    }
  }
}
</style>
