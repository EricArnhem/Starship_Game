<script setup>
import { reactive, ref, computed, watch } from 'vue'

const props = defineProps({
  showModal: Boolean,
  updateForm: Boolean,
  starshipClasses: Object,
  formStarshipName: String,
  formStarshipClass: String
});

const starshipClasses = props.starshipClasses;

const starshipName = ref(props.formStarshipName);
const starshipClass = ref(props.formStarshipClass);

let formErrors = reactive([]);

const deleteButtonClick = ref(false);

// -- Methods --

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

// -- Computed properties --

// Gets the right form title depending on if we are Updating or Creating
const formTitle = computed(() => {
  if (props.updateForm === true) {
    return 'Update a Starship';
  } else if (props.updateForm === false) {
    return 'Create a new Starship';
  }
});

// Gets the submit button text depending on if we are Updating or Creating
const formSubmitButtonText = computed(() => {
  if (props.updateForm === true) {
    return 'Update';
  } else if (props.updateForm === false) {
    return 'Create';
  }
});

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

// Gets the color of the selected class
const selectedClassColor = computed(() => {
  // If the class is valid and exists
  if (starshipClasses.hasOwnProperty(starshipClass.value)) {
    return starshipClasses[starshipClass.value].Color;
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

</script>

<template>

  <Transition name="modal">

    <div class="modal-mask" v-if="showModal">
      <div class="modal-wrapper" @blur="$emit('close')">
        <div class="modal-container content-box">
          <div class="modal-header">
            <h2>{{ formTitle }}</h2>
            <img src="@/images/close-cross.svg" alt="Close cross" title="Close" @click="$emit('close')" id="modal-close-cross">
          </div>
          <div class="body-content-box modal-body">

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

              <button class="button-dark" type="submit">{{ formSubmitButtonText }}</button>
            </form>

          </div>
          <div class="modal-footer" v-if="updateForm">
            <div id="delete-starship">
              <button
                class="button-dark"
                id="delete-button"
                @click="deleteButtonClick = true">
                <img src="@/images/warning-sign-color.svg" alt="warning-sign" id="warning-sign-svg">
                Delete the Starship
              </button>
            </div>
            <div id="delete-verification" v-if="deleteButtonClick">
              <span>Are you sure?</span>
              <div id="delete-verification-buttons">
                <button
                  class="button-dark"
                  id="delete-button-yes">
                  Yes
                </button>
                <button
                  class="button-dark"
                  id="delete-button-no"
                  @click="deleteButtonClick = false">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </Transition>

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
  background-color: v-bind('selectedClassColor');
}

#selected-class-info-table td {
  background-color: var(--table-bg-color);
}

#selected-class-info-table td:first-child {
  font-weight: bold;
}

/* Changes for mobile version */
@media (max-width: 480px) {
  #selected-class-info-table {
    width: 100%;
  }
}

/* -- Modal styling -- */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  overflow-y: auto;
}

.modal-container {
  margin-top: 25px;
  padding: 20px 30px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.modal-body {
  width: 70vw;
}

.modal-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid var(--main-border-color);
  margin-top: 25px;
}

/* Starship deletion part */

#delete-starship {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

#warning-sign-svg {
  height: 17px;
  margin-right: 5px;
}

#delete-button {
  display: flex;
  justify-content: center;
  background-color: #b23229;
  width: 50%;
  margin-left: 20px;
  margin-right: 20px;
}

#delete-button:hover {
  background-color: #d53c32;
}

#delete-verification {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}

#delete-verification-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
}

#delete-verification-buttons button {
  margin: initial;
  width: 30%;
}

#delete-button-yes {
  background-color: #1e8144;
  margin-right: 10px !important;
}

#delete-button-yes:hover {
  background-color: #249650;
}

#delete-button-no {
  background-color: #b23229;
}

#delete-button-no:hover {
  background-color: #d53c32;
}

#modal-close-cross {
  cursor: pointer;
  margin-left: 15px;
}

#modal-close-cross:hover {
  opacity: 0.7;
}

/* Media query for mobile */
@media (max-width: 480px) {
  .modal-container {
    border: 1px solid var(--main-border-color);
    border-radius: 10px;
    margin: 10px;
    padding: 20px;
  }

  .modal-body {
    width: 100%;
  }

  #delete-button {
    width: 100%;
  }
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>