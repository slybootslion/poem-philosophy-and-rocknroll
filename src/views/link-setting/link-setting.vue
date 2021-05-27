<template>
  <div class="link-setting-container">
    <span v-for="(item, index) in list" :key="index">

    </span>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { waitTime } from '@/utils'
import LinkApi from '@/api/module/link-api'

const linkApi = new LinkApi()

export default {
  name: 'link-setting',
  setup () {
    const list = ref([])
    const allList = ref([])
    const store = useStore()
    const count = ref(0)

    const computedLinks = allLink => {
      console.log(allLink)
    }

    onMounted(async () => {
      const { count: total, rows: allLink } = await linkApi.getAllList()
      count.value = total
      computedLinks(allLink)
      await waitTime(1200)
      await store.dispatch('sys/setIsLoadingAction', false)
    })

    list.value = store.state.link.linkShowList

    return {
      list,
      allList,
      count,
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
}
</style>
