<script setup>
import LoadingComponent from "./components/loading-component/loading-component.vue";
import { usePageLoading } from './store/home-theme'

const { loadingState } = usePageLoading()
</script>

<template>
  <router-view />
  <loading-component v-if="loadingState()" />
</template>

<style>
.var-popup__overlay {
  width: 100%;
  height: 100%;
  box-sizing: border-box !important;
  background-color: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(3px);
}
</style>
