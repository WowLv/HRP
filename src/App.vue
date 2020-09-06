<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html {
  @media screen and (max-width: 1600px) {
    font-size: 12px;
  }
  @media screen and (min-width: 1920px) {
    font-size: 16px;
  }
  @media screen and (min-width: 2560px) {
    font-size: 21.33333px;
  }
}
</style>
