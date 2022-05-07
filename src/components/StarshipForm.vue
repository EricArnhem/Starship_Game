<script setup>
import { ref } from 'vue'

const starshipName = ref('');
const starshipSpeed = ref(100);
const starshipFuel = ref(1000);

function handleSubmit() {
  let formErrors = [];

  const regexName = new RegExp(/^[^-\s][\p{L}0-9- ]{1,20}$/gu);

  // Trims the name provided
  let TrimmedStarshipName = starshipName.value.trim();

  // NAME CHECK
  // If the name does not match the regex or if the name is too long
  if (!regexName.test(TrimmedStarshipName) || TrimmedStarshipName.length > 20) {
    // We add an error to the errors array
    formErrors.push('nameError');
  }

  // SPEED CHECK
  // If the speed is not between 100 and 1000. We add an error.
  if (starshipSpeed.value < 100 || starshipSpeed.value > 1000) {
    formErrors.push('speedError');
  }

  // FUEL CHECK
  // If the fuel is not between 1000 and 5000. We add an error.
  if (starshipFuel.value < 1000 || starshipFuel.value > 5000) {
    formErrors.push('fuelError');
  }

  // ERRORS CHECK
  // If there is one or multiple errors
  if (formErrors.length !== 0) {
    console.log('There are errors in the form.');
    console.log(formErrors);

  } else {
    console.log('Data ready to be sent to the database.');
  }

}

</script>

<template>

  <form @submit.prevent="handleSubmit" autocomplete="off">
    <label for="starship-name">Name:</label>
    <input type="text" maxlength="20" name="starship-name" id="starship-name" v-model="starshipName" required>
    <label for="starship-speed">Speed:</label>
    <input
      type="number"
      min="100"
      max="1000"
      name="starship-speed"
      id="starship-speed"
      v-model="starshipSpeed"
      required>

    <label for="starship-fuel">Fuel tank capacity:</label>
    <input
      type="number"
      min="1000"
      max="5000"
      name="starship-fuel"
      id="starship-fuel"
      v-model="starshipFuel"
      required>

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