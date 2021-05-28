<template>
  <div class="link-setting-container">
    <span class="iconfont icon-home" @click="backHome"></span>
    <div class="lint-container">
      <div class="link-content">
        <link-item v-for="link in list"
                   :key="link.id"
                   :link="link"
                   @click="itemOut(link.id)" />
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
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { waitTime } from '@/utils'
import LinkApi from '@/api/module/link-api'
import LinkItem from '@/views/link-setting/components/link-item'
import { formatIconUrl } from '@/views/hooks'

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

    const listIds = computed(() => list.value.map(l => l.id))

    const computedLinks = allLink => {
      allList.value = allLink.filter(item => {
        if (listIds.value && !listIds.value.includes(item.id)) return formatIconUrl(item)
      })
    }

    onMounted(async () => {
      const { count: total, rows: allLink } = await linkApi.getAllList()
      count.value = total
      computedLinks(allLink)
      await waitTime(1200)
      await store.dispatch('sys/setIsLoadingAction', false)
    })

    const backHome = () => router.replace({ name: 'Home' })

    list.value = store.state.link.linkShowList.flat(Infinity)

    const itemIn = id => {
      const item = allList.value.find(link => link.id === id)
      allList.value = allList.value.filter(link => link.id !== id)
      list.value.push(item)
    }

    const itemOut = id => {
      const item = list.value.find(link => link.id === id)
      list.value = list.value.filter(link => link.id !== id)
      allList.value.push(item)
    }

    return {
      list,
      allList,
      count,
      backHome,
      itemIn,
      itemOut,
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
    display: flex;

    .link-content {
      width: 450px;
    }

    .all-link-content {
      float: left;
      margin-left: 20px;
      flex: 1;
    }
  }
}
</style>
