<template>
  <router-view/>
  <loading-page-comp />
</template>

<script>
import LoadingPageComp from '@/components/loading-page/loading-page-comp'
export default {
  name: 'App',
  components: { LoadingPageComp },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
