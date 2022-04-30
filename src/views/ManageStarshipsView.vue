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
  border-left: 2px solid rgba(146, 146, 146, 0.75);
  padding-left: 0.6rem;
  margin-top: 0;
}

.wrapper {
  display: flex;
  justify-content: center;
}

#new-starship {
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 30px;
  margin: 0 10px;
  box-sizing: border-box;
}
</style>