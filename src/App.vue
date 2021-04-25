<template>
  <router-view />
  <loading-page-comp v-if="store.getters.isPageLoading" />
</template>

<script>
import { useStore } from 'vuex'
import LoadingPageComp from '@/components/loading-page/loading-page-comp'

export default {
  name: 'App',
  components: { LoadingPageComp },
  setup () {
    const store = useStore()
    store.dispatch('sys/setIsLoadingActions', true)
    return {
      store,
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
