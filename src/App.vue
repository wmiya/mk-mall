<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view />
    <nav-footer />
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
export default {
  name: 'App',
  components: {
    NavHeader,
    NavFooter,
  }
}
</script>

<style lang="scss">
@import "./assets/css/base.css";
@import "./assets/css/login.css";
</style>
