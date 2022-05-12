<script setup>
import StarshipForm from '../components/StarshipForm.vue';
</script>

<template>
  <h1>Manage your Starships</h1>

  <div class="wrapper">
    <div id="new-starship">
      <h2>Create a new Starship</h2>
      <StarshipForm />
    </div>
  </div>

</template>

<style scoped>
h1 {
  text-align: center;
  text-decoration: underline double 1px;
  text-underline-offset: 9px;
}

h2 {
  border-left: 2px solid var(--main-border-color);
  padding-left: 10px;
  margin-top: 0;
}

.wrapper {
  display: flex;
  justify-content: center;
}

#new-starship {
  background-color: var(--content-box-bg-color);
  border: 1px solid var(--main-border-color);
  border-radius: 10px;
  padding: 30px;
  margin: 0 10px;
  box-sizing: border-box;
}
</style>