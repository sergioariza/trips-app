<template>
  <div class="d-flex align-center ga-1">
    <template v-for="(loc, index) in locales" :key="loc.code">
      <v-btn
        size="small"
        variant="text"
        :color="locale === loc.code ? 'primary' : undefined"
        :style="{
          fontWeight: locale === loc.code ? 'bold' : 'normal',
          textDecoration: locale === loc.code ? 'underline' : 'none',
        }"
        @click="locale = loc.code"
      >
        {{ loc.label }}
      </v-btn>
      <span v-if="index < locales.length - 1" class="text-disabled">|</span>
    </template>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const locales = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];
</script>
