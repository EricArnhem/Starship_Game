<script setup>
import { ref } from 'vue'

const starshipName = ref('');
const starshipSpeed = ref(1000);
const starshipFuel = ref(1000);
</script>

<template>

  <form>
    <label for="starship-name">Name:</label>
    <input type="text" name="starship-name" id="starship-name" v-model="starshipName" required>
    <label for="starship-speed">Speed:</label>
    <input
      type="number"
      min="1000"
      max="5000"
      name="starship-speed"
      id="starship-speed"
      v-model="starshipSpeed"
      required
      autocomplete="off">

    <label for="starship-fuel">Fuel tank capacity:</label>
    <input
      type="number"
      min="1000"
      max="5000"
      name="starship-fuel"
      id="starship-fuel"
      v-model="starshipFuel"
      required
      autocomplete="off">

    <input type="submit" value="Create">
  </form>

</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 40vw;
  min-width: 100%;
  max-width: 650px;
}

label {
  margin-bottom: 5px;
  margin: 25px 0 15px;
  letter-spacing: 1px;
  color: rgb(175, 175, 175);
  font-weight: bold;
}

input {
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid rgba(146, 146, 146, 0.75);
  background-color: #2a2a2a;
  color: inherit;
  font-size: 1rem;
}

input[type="submit"] {
  padding: 10px 6px;
  width: 30%;
  margin: auto;
  margin-top: 25px;
  border: 1px solid rgba(146, 146, 146, 0.75);
  border-radius: 3px;
}

input[type="submit"]:hover {
  background-color: #3a3a3a;
  cursor: pointer;
  transition: 0.1s;
}
</style>