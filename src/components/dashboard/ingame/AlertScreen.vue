<script setup>
import { ref } from 'vue';

// Variable that will contain the alert message
// Made reactive with ref(). Modifiable by updating alertMessage.value
let alertMessage = ref('');

// Array that stores the setTimeouts for each letter
let lettersTimeoutsArray = [];

// -- Methods --

// Function used to clear the timeouts and the alert message
function clearAlert() {

  // Clears every timeout in the array
  lettersTimeoutsArray.forEach(function (timeout) {
    clearTimeout(timeout);
  });

  // Resets the alert message
  alertMessage.value = '';

}

// Function displaying the text like a typewriter
function displayAlert(textString) {

  // We put each letter of the string into an array
  const textStringLetters = textString.split('');

  // We clear the alert and the previous timeouts 
  clearAlert();

  // For each letter we create a setTimeout to display each letter one after the other
  textStringLetters.forEach((letter, i) => {

    lettersTimeoutsArray.push(

      setTimeout(() => {

        alertMessage.value += letter;

      }, i * 50)

    );
  });
}

defineExpose({
  displayAlert
});

</script>

<template>

  <div id="alert-container">
    <p id="alert-display">{{ alertMessage }}</p>
  </div>

</template>

<style>
#alert-container {
  margin-top: 15px;
  margin-bottom: 25px;
}

#alert-display {
  width: 50%;
  min-height: 18px;
  margin: auto;
  padding: 12px;
  border-radius: 4px;
  background-color: aliceblue;
  color: rgb(15, 15, 15);
  text-align: center;
}

@media screen and (max-width: 1200px) {
  #alert-display {
    width: 70%;
  }
}
</style>