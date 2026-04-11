<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
// No need for any logic here for now, as this is just the main app component that renders the router view.
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
