<script setup>
import { reactive, ref, computed } from 'vue'

const starshipClasses = reactive({
  Fighter: {
    Speed: 70000,
    'Fuel capacity': 1500
  },
  Explorer: {
    Speed: 50000,
    'Fuel capacity': 3000
  },
  Hauler: {
    Speed: 30000,
    'Fuel capacity': 5000
  }
});

const starshipName = ref('');
const starshipClass = ref('');

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

  // CLASS CHECK
  // If the class doesn't exist in the classes list
  if (!starshipClasses.hasOwnProperty(starshipClass.value)) {
    // We add an error
    formErrors.push('classError');
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

function checkClassValidity() {
  // If the class is valid and exists
  if (starshipClasses.hasOwnProperty(starshipClass.value)) {

    // We get the index of the classError and we remove it
    let IdClassError = formErrors.indexOf('classError');
    formErrors.splice(IdClassError, 1);

  } else { // If the class is invalid and doesn't exists
    // If we don't already have a class error
    if (!formErrors.includes('classError')) {
      // We add an error to the errors array
      formErrors.push('classError');
    }

  }
}

// Checks if the class is valid
const isClassValid = computed(() => {
  if (starshipClasses.hasOwnProperty(starshipClass.value)) {
    return true;
  } else {
    return false;
  }
});

// Gets the Speed of the selected class
const selectedClassSpeed = computed(() => {
  // If the class is valid and exists
  if (starshipClasses.hasOwnProperty(starshipClass.value)) {
    return starshipClasses[starshipClass.value].Speed;
  }
});

// Gets the Speed of the selected class
const selectedClassFuelCapacity = computed(() => {
  // If the class is valid and exists
  if (starshipClasses.hasOwnProperty(starshipClass.value)) {
    return starshipClasses[starshipClass.value]['Fuel capacity'];
  }
});

</script>

<template>

  <form @submit.prevent="handleSubmit" autocomplete="off">
    <div class="form-label-group">
      <label for="starship-name">Name:</label>
      <span class="form-help-text">Accepts any letters, numbers, spaces and dashes. (20 characters max)</span>
    </div>
    <input
      type="text"
      maxlength="20"
      name="starship-name"
      id="starship-name"
      v-model="starshipName"
      v-on:blur="trimStarshipName(); checkNameValidity();"
      required>
    <span class="form-error" v-if="formErrors.includes('nameError')">Invalid name.</span>

    <div class="form-label-group">
      <label for="starship-class">Class:</label>
      <span class="form-help-text">Each class has different stats.</span>
    </div>
    <select
      id="starship-class"
      v-model="starshipClass"
      @change="checkClassValidity();"
      required>

      <option disabled value="">Select a class</option>
      <option v-for="(shipClass, index) in starshipClasses">{{ index }}</option>

    </select>

    <table v-if="isClassValid" id="selected-class-info-table">
      <thead>
        <tr>
          <th colspan="2">{{ starshipClass }} class</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Speed</td>
          <td>{{ selectedClassSpeed }} km/h</td>
        </tr>
        <tr>
          <td>Fuel capacity</td>
          <td>{{ selectedClassFuelCapacity }} kg</td>
        </tr>
      </tbody>
    </table>

    <span class="form-error" v-if="formErrors.includes('classError')">Invalid class.</span>

    <button class="button-dark" type="submit">Create</button>
  </form>

</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  letter-spacing: 1px;
  color: rgb(210, 210, 210);
  font-weight: bold;
}

.form-label-group {
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

select {
  padding: 9px;
  font-size: 1em;
  border-radius: 3px;
}

@media (max-width: 480px) {
  button[type="submit"] {
    width: 100%;
  }
}

.form-help-text {
  color: rgb(165, 165, 165);
  font-size: 14px;
  font-style: italic;
  display: block;
  margin-top: 2px;
}

.form-error {
  color: #ED4337;
  font-size: 14px;
  margin-top: 10px;
}

/* -- Class info table -- */
#selected-class-info-table {
  margin: auto;
  margin-top: 15px;
  width: 80%;
  max-width: 300px;
  border-collapse: collapse;
}

#selected-class-info-table th,
#selected-class-info-table td {
  border: 1px solid var(--main-border-color);
  padding: 10px 5px;
}

#selected-class-info-table th {
  background-color: #2f308f;
}

#selected-class-info-table td {
  background-color: var(--table-bg-color);
}

/* Changes for mobile version */
@media (max-width: 480px) {
  #selected-class-info-table {
    width: 100%;
  }
}
</style>