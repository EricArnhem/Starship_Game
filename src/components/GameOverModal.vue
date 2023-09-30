<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

// Vue components
import MyModal from '@/components/modal/MyModal.vue';

</script>

<template>

  <MyModal @close-modal="router.go(0)">

    <template #body>

      <h1 id="game-over-title">Game Over!</h1>

      <p id="game-over-text">Your starship has been destroyed, you will be redirected to the starship selection page.</p>

    </template>

    <template #footer>
      <button class="button" @click="router.go(0)">OK</button>
    </template>

  </MyModal>

</template>

<style>
#game-over-title {
  margin-top: 0;
}

#game-over-text {
  text-align: center;
}
</style>