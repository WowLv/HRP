<template>
  <div id="app">
    <router-view />
    <div style="width:300px;margin:0 auto; padding:20px 0;">
      <a
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44060502002277"
        style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
        ><img src="./assets/beian.png" style="float:left;" />
        <p
          style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;"
        >
          粤公网安备 44060502002277号
        </p></a
      >
    </div>
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
