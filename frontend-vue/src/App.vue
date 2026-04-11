<template>
  <v-app>
    <v-main>
      <div style="position: fixed; top: 16px; right: 16px; z-index: 1300;">
        <LocaleSwitcher />
      </div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import LocaleSwitcher from "./components/LocaleSwitcher.vue";
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
