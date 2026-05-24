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
import { watch } from "vue";
import { useI18n } from "vue-i18n";
import { useLocale } from "vuetify";
import LocaleSwitcher from "./components/LocaleSwitcher.vue";

const { locale: i18nLocale } = useI18n();
const { current: vuetifyLocale } = useLocale();

watch(i18nLocale, (lang) => { vuetifyLocale.value = lang; }, { immediate: true });
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
