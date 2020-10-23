<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
html {
  @media screen and (max-width: 1440px) {
    font-size: 12px;
  }
  @media screen and (min-width: 1440px) and (max-width: 1920px) {
    font-size: 16px;
  }
  // @media screen and (min-width: 2560px) {
  //   font-size: 21.33333px;
  // }
}
</style>
