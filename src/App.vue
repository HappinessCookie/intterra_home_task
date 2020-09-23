<template>
  <div id="app">
    <Header/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue"

export default Vue.extend({
  name: "App",
  components: {
    Header,
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500&display=swap');

html, body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Ubuntu, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  font-size: 11px;
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr;
}

h1 {
  font-weight: 500;
  font-size: 25px;
  line-height: 31px;
  margin: 0;
  padding: 22px 0 6px;
}

.content {
  display: flex;
  justify-content: center;
  background-color: #F9F9F9;
}
</style>
