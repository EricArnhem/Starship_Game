<script setup>
import { RouterView } from 'vue-router'
import TheNavigation from './components/navigation/TheNavigation.vue';
</script>

<template>
  <header>
    <TheNavigation />
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>
@import url(@/css/main.css);
@import url(@/css/cards.css);
</style>
