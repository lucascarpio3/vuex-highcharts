<template>
  <div id="app">
    <topbar></topbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Topbar from 'components/Topbar'
  export default {
    name: 'app',
    components: {
      Topbar
    }
  }
</script>
<style lang="sass">
  @import "~assets/scss/app";
</style>
