<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeMount: function () {
    var browserLanguage = navigator.language
    if (!browserLanguage) {
      browserLanguage = navigator.browserLanguage
    }
    console.log(browserLanguage)
    browserLanguage = browserLanguage.toLowerCase()
    if (browserLanguage.indexOf('zh') > -1) {
      this.$i18n.locale = 'zh'
    } else if (browserLanguage.indexOf('en') > -1) {
      this.$i18n.locale = 'en'
    }
  }
}
</script>

<style>
  #app {
    height: 100%;
  }
</style>
