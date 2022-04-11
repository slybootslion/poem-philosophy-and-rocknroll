<script setup>
import LoadingComponent from "./components/loading-component/loading-component.vue";
import { usePageLoading } from './store/home-theme'

const { loadingState } = usePageLoading()
</script>

<template>
  <router-view />
  <loading-component v-if="loadingState()" />
</template>
