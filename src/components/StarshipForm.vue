<script setup>
import { reactive, ref } from 'vue'

const starshipName = ref('');
const starshipSpeed = ref(100);
const starshipFuel = ref(1000);

let formErrors = reactive([]);

function handleSubmit() {

  // Resets the errors array
  formErrors.length = 0;
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

// Used to trim the name when the input loses focus
function trimStarshipName() {
  starshipName.value = starshipName.value.trim();
}

// Checks the name validity
function checkNameValidity() {

  const regexName = new RegExp(/^[^-\s][\p{L}0-9- ]{1,20}$/gu);

  // If the input in empty or if the name is valid
  if (starshipName.value === '' || regexName.test(starshipName.value)) {

    // We get the index of the nameError and we remove it
    let IdNameError = formErrors.indexOf('nameError');
    formErrors.splice(IdNameError, 1);

  } else { // If the name is invalid

    // If we don't already have a name error
    if (!formErrors.includes('nameError')) {
      // We add an error to the errors array
      formErrors.push('nameError');
    }

  }
}

</script>

<template>

  <form @submit.prevent="handleSubmit" autocomplete="off">
    <div class="formLabelGroup">
      <label for="starship-name">Name:</label>
      <span class="formHelpText">Accepts any letters, numbers, spaces and dashes. (20 characters max)</span>
    </div>
    <input
      type="text"
      maxlength="20"
      name="starship-name"
      id="starship-name"
      v-model="starshipName"
      v-on:blur="trimStarshipName(); checkNameValidity();"
      required>
    <span class="formError" v-if="formErrors.includes('nameError')">Invalid name.</span>
    <div class="formLabelGroup">
      <label for="starship-speed">Speed:</label>
      <span class="formHelpText">Accepts a number from 100 to 1000.</span>
    </div>
    <input
      type="number"
      min="100"
      max="1000"
      name="starship-speed"
      id="starship-speed"
      v-model="starshipSpeed"
      required>
    <span class="formError" v-if="formErrors.includes('speedError')">Invalid speed. Not in the available range.</span>

    <div class="formLabelGroup">
      <label for="starship-fuel">Fuel tank capacity:</label>
      <span class="formHelpText">Accepts a number from 1000 to 5000.</span>
    </div>
    <input
      type="number"
      min="1000"
      max="5000"
      name="starship-fuel"
      id="starship-fuel"
      v-model="starshipFuel"
      required>
    <span class="formError" v-if="formErrors.includes('fuelError')">Invalid fuel. Not in the available range.</span>

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
  letter-spacing: 1px;
  color: rgb(210, 210, 210);
  font-weight: bold;
}

.formLabelGroup {
  margin: 25px 0 15px;
}

input {
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid var(--main-border-color);
  background-color: var(--content-box-bg-color);
  color: inherit;
  font-size: 1rem;
}

input[type="submit"] {
  padding: 10px 6px;
  width: 30%;
  margin: auto;
  margin-top: 25px;
  border: 1px solid var(--main-border-color);
  border-radius: 3px;
}

input[type="submit"]:hover {
  background-color: #3a3a3a;
  cursor: pointer;
  transition: 0.1s;
}

.formHelpText {
  color: rgb(165, 165, 165);
  font-size: 14px;
  font-style: italic;
  display: block;
  margin-top: 2px;
}

.formError {
  color: #ED4337;
  font-size: 14px;
  margin-top: 10px;
}
</style>