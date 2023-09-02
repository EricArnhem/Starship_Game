<script setup>
import { reactive, ref, computed, watch } from 'vue';

// API methods
import { checkStarshipName, createStarship, updateStarship, deleteStarship } from "@/api/methods/starship.js";

// Vue components
import StarshipDeleteButton from '@/components/StarshipDeleteButton.vue';

const props = defineProps({
  updateForm: Boolean,
  starshipClassesList: Array,
  formStarshipPublicId: String,
  formStarshipName: String,
  formStarshipClass: String
});

const emit = defineEmits([
  'starshipCreated',
  'starshipUpdated',
  'starshipDeleted',
  'clearSubmitResult'
]);

const starshipClassesList = reactive(props.starshipClassesList);

const starshipPublicId = ref(props.formStarshipPublicId);
const starshipName = ref(props.formStarshipName);
const starshipClass = ref(props.formStarshipClass);

// Saving the original name and class of the starship (won't be changed when inputs are modified)
const originalStarshipName = ref(props.formStarshipName);
const originalStarshipClass = ref(props.formStarshipClass);

// Turns to TRUE if name is available, FALSE if not. NULL by default to not display any form success/error messages
const isNameAvailable = ref(null);

let formErrors = reactive([]);

// -- Methods --

// Trim the name when the input loses focus
function trimStarshipName() {
  starshipName.value = starshipName.value.trim();
}

// Uses API to check if a Starship with the provided name exists or not
async function checkNameAvailability() {

  // Only checks if the name is valid
  if (!formErrors.includes('nameError')) {

    let desiredStarshipName = starshipName.value;

    try {

      let result = await checkStarshipName(desiredStarshipName);

      // If a Starship with the provided name already exists
      if (result.data.available === false) {

        isNameAvailable.value = false;

      } else if (result.data.available === true) {

        isNameAvailable.value = true;

      }

    } catch (error) {
      console.log(error);
    }

  }

}

function checkNameValidity() {

  // Trims name before checking the value
  trimStarshipName();

  const regexName = new RegExp(/^[^-\s][\p{L}0-9- ]{1,20}$/gu);

  // If the name input matches the regex
  if (regexName.test(starshipName.value)) {

    // Gets the nameError index then removes it
    let IdNameError = formErrors.indexOf('nameError');
    formErrors.splice(IdNameError, 1);

  } else {
    // If the name is invalid
    // Add nameError if not already added
    if (!formErrors.includes('nameError')) {
      formErrors.push('nameError');
    }

    // Remove the success/error message about the name availability if name is invalid
    isNameAvailable.value = null;

  }
}

function checkClassValidity() {
  // If the class is valid and exists
  if (starshipClassesList.find(element => element.name === starshipClass.value)) {
    // If we have a class error displayed
    if (formErrors.includes('classError')) {
      // We get the index of the classError and we remove it
      let IdClassError = formErrors.indexOf('classError');
      formErrors.splice(IdClassError, 1);
    }
  } else { // If the class is invalid and doesn't exists
    // If we don't already have a class error
    if (!formErrors.includes('classError')) {
      // We add an error to the errors array
      formErrors.push('classError');
    }

  }
}

async function handleSubmit() {

  // Checking the values
  checkNameValidity();
  checkClassValidity();

  if (formErrors.length !== 0) {
    // If there is one or multiple errors
    console.log('There are errors in the form.');
    console.log(formErrors);

  } else {
    // If data is valid

    if (props.updateForm === true) {
      // -- IF UPDATING --
      handleUpdate()

    } else if (props.updateForm === false) {
      // -- IF CREATING ---
      handleCreate();

    }
  }

}

async function handleUpdate() {

  let requestType = 'update';

  const starshipData = {
    name: starshipName.value,
    starshipClassId: selectedClassId.value
  }

  // Getting starship public id passed as a prop
  let starshipPublicId = props.formStarshipPublicId;

  // Updating the starship
  try {

    let result = await updateStarship(starshipPublicId, starshipData);

    if (result.status === 200) {
      // If starship has been updated

      const submitResultData = {
        message: result.data.message,
        status: result.status
      }

      // Refresh starships list and sending result message + status + request type to the parent component
      emit('starshipUpdated', submitResultData, requestType);

      // Change the original starship name/class variables to the updated values
      originalStarshipName.value = starshipName.value;
      originalStarshipClass.value = starshipClass.value;

    } else {
      const submitResultData = {
        message: "Error while updating the Starship.",
        status: result.response.status // Using .response because Error message has a different structure
      }

      // Refresh starships list and sending result message + status + request type to the parent component
      emit('starshipUpdated', submitResultData, requestType);
    }

  } catch (error) {
    console.log(error);
  }

}

async function handleCreate() {

  let requestType = 'create';

  const starshipData = {
    name: starshipName.value,
    starshipClassId: selectedClassId.value
  }

  // Creating the starship
  try {

    let result = await createStarship(starshipData);

    if (result.status === 200) {
      // If starship has been created

      const submitResultData = {
        message: result.data.message,
        status: result.status
      }

      // Refresh starships list and sending result message + status + request type to the parent component
      emit('starshipCreated', submitResultData, requestType);

    } else {
      // If error during creation
      const submitResultData = {
        message: "Error while creating the Starship.",
        status: result.response.status // Using .response because Error message has a different structure
      }

      // Refresh starships list and sending result message + status + request type to the parent component
      emit('starshipCreated', submitResultData, requestType);
    }

  } catch (error) {
    console.log(error);
  }

}

async function handleDelete() {

  let requestType = 'delete';

  // Deleting the starship
  try {

    // Awaiting the starship deletion
    let result = await deleteStarship(starshipPublicId.value);

    if (result.status === 200) {
      // If starship has been deleted

      const submitResultData = {
        message: `The Starship '${starshipName.value}' has been successfully deleted.`,
        status: result.status
      }

      // Refresh starships list and sending result message + status + request type to the parent component
      emit('starshipDeleted', submitResultData, requestType);

    } else {
      // If error during deletion

      const submitResultData = {
        message: result.response.data.message,
        status: result.response.status // Using .response because Error message has a different structure
      }

      // Refresh starships list and sending result message + status + request type to the parent component
      emit('starshipDeleted', submitResultData, requestType);
    }

  } catch (error) {
    console.log(error);
  }

}


// -- Computed properties --

// Checks if the class is valid
const isClassValid = computed(() => {
  if (starshipClassesList.find(element => element.name === starshipClass.value)) {
    return true;
  } else {
    return false;
  }
});

// Checks if one or multiple of the inputs has been modified (Only in UPDATE form)
const isInputModified = computed(() => {

  // If we are on an UPDATE form
  if (props.updateForm === true) {

    // Compares the inputs values with the original values
    if (starshipName.value !== originalStarshipName.value || starshipClass.value !== originalStarshipClass.value) {
      // If at least one of the values is different
      return true;
    } else {
      // If both values are the same as the originals
      return false;
    }

  } else {
    // Returning true to always enable the 'Create' button on the CREATE form
    return true;
  }

});

// Gets the Speed of the selected class
const selectedClassSpeed = computed(() => {
  // If the class is valid and exists
  if (starshipClassesList.find(element => element.name === starshipClass.value)) {
    return starshipClassesList.find(element => element.name === starshipClass.value).speed;
  } else {
    return '';
  }
});

// Gets the Speed of the selected class
const selectedClassFuelCapacity = computed(() => {
  // If the class is valid and exists
  if (starshipClassesList.find(element => element.name === starshipClass.value)) {
    return starshipClassesList.find(element => element.name === starshipClass.value).fuelCapacity;
  } else {
    return '';
  }
});

// Gets the color of the selected class
const selectedClassColor = computed(() => {
  // If the class is valid and exists
  if (starshipClassesList.find(element => element.name === starshipClass.value)) {
    return starshipClassesList.find(element => element.name === starshipClass.value).color;
  } else {
    return '';
  }
});

// Gets id of the selected class
const selectedClassId = computed(() => {
  // If the class is valid and exists
  if (starshipClassesList.find(element => element.name === starshipClass.value)) {
    return starshipClassesList.find(element => element.name === starshipClass.value).id;
  } else {
    return '';
  }
});


// -- Watchers --

// Updates the starship name when the prop value changes
watch(() => props.formStarshipName, () => {
  starshipName.value = props.formStarshipName;
})

// Updates the starship name when the prop value changes
watch(() => props.formStarshipClass, () => {
  starshipClass.value = props.formStarshipClass;
})

// Resets the errors array when the form mode changes
// Prevents errors from the Create form to appear on the Update form
watch(() => props.updateForm, () => {
  formErrors.length = 0;
})

// Clears the update success message (if there's one) when the inputs are modified
watch(() => starshipName.value, () => {
  emit('clearSubmitResult');

  // Remove the success/error message about the name availability when input is cleared
  if (starshipName.value === '') {
    isNameAvailable.value = null;
  }
})

watch(() => starshipClass.value, () => {
  emit('clearSubmitResult');
})

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
      v-on:blur="checkNameValidity(), checkNameAvailability();"
      required
    >
    <span class="form-error" v-if="formErrors.includes('nameError')">Invalid name.</span>
    <span 
      :class="isNameAvailable === true ? 'form-success' : 'form-error'" 
      v-if="isNameAvailable !== null">
      {{ isNameAvailable === true ? 'Name available' : 'Name not available' }}
    </span>

    <div class="form-label-group">
      <label for="starship-class">Class:</label>
      <span class="form-help-text">Each class has different stats.</span>
    </div>
    <select
      id="starship-class"
      v-model="starshipClass"
      @change="checkClassValidity();"
      required
    >

      <option disabled value="">Select a class</option>
      <option 
        v-for="(starshipClass) in starshipClassesList" 
        :key="starshipClass.id"
      >
        {{ starshipClass.name }}
      </option>

    </select>

    <table v-if="isClassValid" id="class-info-table">
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

    <div id="submit-buttons-group" :class="{ 'added-padding-left': props.updateForm }">

      <button 
        id="create-update-button" 
        class="button" 
        type="submit" 
        :disabled="!isInputModified" 
        :title="!isInputModified ? 'Starship details need to modified first.' : ''"
      >
        {{ props.updateForm === true ? 'Update' : 'Create' }}
      </button>
  
      <StarshipDeleteButton
        @delete-starship="handleDelete()" 
        v-if="props.updateForm" 
      />

    </div>

  </form>

</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: inherit;
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
  font-family: inherit;
}

select {
  padding: 9px;
  font-size: 1em;
  border-radius: 3px;
  font-family: inherit;
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

.form-success {
  color: #37ed5e;
  font-size: 14px;
  margin-top: 10px;
}

#submit-buttons-group {
  display: flex;
}

/* Centers the 'Update' button. padding value = width of delete button */
.added-padding-left {
  padding-left: 35px;
}

#submit-buttons-group>#create-update-button {
  margin-bottom: 0;
}

#submit-result {
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
}

/* -- Class info table -- */
#class-info-table {
  margin: auto;
  margin-top: 15px;
  width: 80%;
  max-width: 300px;
  border: 0;
  border-spacing: 0;
}

#class-info-table tbody {
  background-color: var(--table-bg-color);
}

#class-info-table th,
#class-info-table td {
  border: 1px solid var(--main-border-color);
  /* Prevents double borders in table cells */
  border-bottom: 0;
  padding: 10px;
}

#class-info-table th {
  background-color: v-bind('selectedClassColor');
}

#class-info-table td:first-child {
  font-weight: bold;
  /* Prevents double borders in table cells */
  border-right: 0;
}

/* -- Rounds table corners -- */

/* Top left corner */
#class-info-table tr:first-of-type th:first-child {
  border-top-left-radius: var(--stats-table-border-radius);
}

/* Top right corner */
#class-info-table tr:first-of-type th:last-child {
  border-top-right-radius: var(--stats-table-border-radius);
}

/* Bottom left corner */
#class-info-table tr:last-of-type td:first-child {
  border-bottom: 1px solid var(--main-border-color);
  border-bottom-left-radius: var(--stats-table-border-radius);
}

/* Bottom right corner */
#class-info-table tr:last-of-type td:last-child {
  border-bottom: 1px solid var(--main-border-color);
  border-bottom-right-radius: var(--stats-table-border-radius);
}

/* Changes for mobile version */
@media screen and (max-width: 480px) {
  #submit-buttons-group>#create-update-button {
    margin-right: 25px;
    width: 100%;
  }

  #class-info-table {
    width: 100%;
  }
}
</style>