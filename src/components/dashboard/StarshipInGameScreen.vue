<script setup>
import { ref, computed, watch } from 'vue';
import { showNavbar } from '@/components/navbar/state';

// API methods
import { updateStarshipFuelLeft } from "@/api/methods/starship.js";

import AlertScreen from '@/components/AlertScreen.vue';
import StatsTable from '@/components/StatsTable.vue';

const props = defineProps({
  starshipInfo: Object,
  starshipClassesList: Array
});

const emit = defineEmits(['gameStop']);

const enginesOn = ref(false);
const enginesStatus = ref('OFF');
const enginesOccupied = ref(false);

const fuelConsumption = 100;
let timerId;
let enginesTimeoutId;

const maxRefuelDuration = 5000; // Longest time a refuel can take from 0 to max (in milliseconds)
let refuelAnimationData = ref({});

// Hold the reference to the AlertScreen component
// Used to import the displayAlert() function
const myAlertScreen = ref(null);

function displayAlert(textString) {
  myAlertScreen.value.displayAlert(textString);
}

// -- Methods --

function startEngines() {

  // Disables the Engines buttons
  enginesOccupied.value = true;

  // If the engines are OFF
  if (enginesOn.value === false) {

    displayAlert('Engines starting...');

    enginesTimeoutId = setTimeout(() => {

      // We start them and update the Engines status
      enginesOn.value = true;
      enginesStatus.value = 'ON';
      displayAlert('Engines started.');

      // Re-enables the Engines buttons
      enginesOccupied.value = false;

    }, 2500);

  }

}

function stopEngines() {

  // Disables the Engines buttons
  enginesOccupied.value = true;

  // If the engines are ON
  if (enginesOn.value === true) {

    displayAlert('Engines shutting down...');

    enginesTimeoutId = setTimeout(() => {

      enginesOn.value = false;
      enginesStatus.value = 'OFF';
      displayAlert('Engines stopped.');

      // Re-enables the Engines buttons
      enginesOccupied.value = false;

    }, 2500);

    // Save the "Fuel left" value to the database
    updateFuelLeft();

  }

}

function refuelStarship() {

  const fuelLeft = props.starshipInfo.fuelLeft;

  // Getting the class fuel capacity
  const starshipClassId = props.starshipInfo.starshipClassId;
  const fuelCapacity = props.starshipClassesList.find(element => element.id === starshipClassId).fuelCapacity;

  // If engines are ON, we turn them OFF
  if (enginesOn.value === true) {
    enginesOn.value = false;
    enginesStatus.value = 'OFF';
  }

  // If the Starship is not already at max fuel capacity
  if (fuelLeft !== fuelCapacity) {

    // Disables the Engines buttons
    enginesOccupied.value = true;

    enginesStatus.value = 'REFUELING';
    displayAlert('Refueling the starship...');

    // Calculating the time it takes to refuel
    const fuelNeeded = fuelCapacity - fuelLeft;

    const refuelDuration = (fuelNeeded * maxRefuelDuration) / fuelCapacity;

    // Puts refuel data into an object to pass it as a prop to the StatsTable
    refuelAnimationData.value = {
      fuelLeft: fuelLeft,
      fuelCapacity: fuelCapacity,
      refuelDuration: refuelDuration
    }

    // Simulating refueling time
    enginesTimeoutId = setTimeout(() => {

      // Changing the Starship "Fuel left" value the to max fuel capacity
      props.starshipInfo.fuelLeft = fuelCapacity;

      // Updating the value in the database
      updateFuelLeft();

      enginesStatus.value = 'OFF';
      displayAlert('Starship refueled.');

      // Re-enables the Engines buttons
      enginesOccupied.value = false;

    }, refuelDuration);

  } else {

    displayAlert("Fuel tank already at maximum capacity.");

  }

}

// Decreases the "Fuel left" every second
function startFuelTimer() {

  // Starts a timer that will reduce the amount of fuel by the amount set every second if there's enough fuel left
  timerId = setInterval(() => {

    // If there's enough fuel to travel
    if ((props.starshipInfo.fuelLeft - fuelConsumption) >= 0) {

      // Reduces fuel by 100
      props.starshipInfo.fuelLeft -= fuelConsumption;

    } else {

      // Stops the timer
      clearInterval(timerId);

    }

  }, 1000);

}

// Updates the Starship's "Fuel left" value in the database
async function updateFuelLeft() {

  const starshipData = {
    fuelLeft: props.starshipInfo.fuelLeft
  }

  // Getting starship public id
  let starshipPublicId = props.starshipInfo.publicId;

  // Updating the starship "Fuel left"
  try {

    let result = await updateStarshipFuelLeft(starshipPublicId, starshipData);

    if (result.status === 200) {
      // If starship "Fuel left" has been updated

      const submitResultData = {
        message: result.data.message,
        status: result.status
      }

      // console.log(submitResultData);

    } else {

      const submitResultData = {
        message: result.response.data.message,
        status: result.response.status // Using .response because Error message has a different structure
      }

      // console.log(submitResultData);

    }

  } catch (error) {
    console.log(error);
  }
}

// Stops the game
function stopGame() {

  emit('gameStop');
  showNavbar();
  enginesOn.value = false;
  clearTimeout(enginesTimeoutId);

}

// -- Computed properties --

// Gets the right method to use when clicking on the Start/Stop button
const enginesStartStop = computed(() => {
  return enginesOn.value === false ? startEngines() : stopEngines();
});

// Gets the right text to update the engines button depending on the engines status
const enginesButtonText = computed(() => {
  return enginesOn.value === false ? 'Start' : 'Stop';
});

// Calculates the correct text color when the status changes
const enginesStatusTheme = computed(() => {

  switch (enginesStatus.value) {
    case 'ON':
      return 'green';

    case 'OFF':
      return 'red';

    case 'PAUSED':
      return 'orange';

    case 'REFUELING':
      return 'cornflowerblue';

    default:
      return 'initial';
  }

});

// -- Watchers --

// Decrease the "Fuel left" when the engines are ON
watch(enginesOn, (enginesOn) => {
  if (enginesOn === true) {
    startFuelTimer();
  } else {
    // Stops when engines are turned OFF
    clearInterval(timerId)
  }
});

</script>

<template>

  <AlertScreen ref="myAlertScreen"/>

  <div id="starship-data" class="content-box">
    <a id="go-back-button"
     @click="stopGame()" 
     title="Go back to the starship selection">
     <img src="@/images/chevron-back.svg">
    </a>
    <div id="starship-info">

      <h3>{{ starshipInfo.name }}</h3>
      <StatsTable
        :starship-info="starshipInfo"
        :starship-classes-list="starshipClassesList" 
        :refuel-animation-data="refuelAnimationData"/>

      <p class="text-center">Engines: <span id="starship-engines-status">{{ enginesStatus }}</span></p>

      <div class="text-center" id="starship-command-buttons">
        <button class="button" :disabled="enginesOccupied" @click="enginesStartStop">{{ enginesButtonText }}</button>
        <button class="button" :disabled="enginesOccupied" @click="refuelStarship()">Refuel</button>
      </div>

    </div>

    <div id="starship-encounters">
      <h3>Encounters log</h3>
      <div id="starship-encounters-choices">
        <p id="starship-encounters-message">You have encountered a foreign ship.</p>
        <ul id="starship-encounters-choices-list">
          <li><button class="button">Option A</button></li>
          <li><button class="button">Option B</button></li>
          <li><button class="button">Option C</button></li>
        </ul>
      </div>
    </div>

  </div>

</template>

<style>
#starship-data {
  display: flex;
  justify-content: space-evenly;

  position: relative;
  padding: 0;
}

#go-back-button {
  position: absolute;
  left: 5px;
  top: 5px;
  height: 45px;

  cursor: pointer;
}

#go-back-button:hover {
  filter: drop-shadow(3px 3px 2px #dddddd);
  transition: 0.1s;
}

#go-back-button img {
  display: block;
  height: 45px;
}

#starship-info {
  display: flex;
  flex-direction: column;

  width: 100%;

  padding-bottom: 22.4px;
  border-right: 1px solid var(--main-border-color);
}

/* Small screens style */
@media (max-width: 1024px) {
  #starship-data {
    flex-wrap: wrap;
  }

  #starship-info {
    border-right: 0 !important;
    border-bottom: 1px solid var(--main-border-color);
  }
}

#starship-engines-status {
  /* Set the correct color depending on the status */
  color: v-bind('enginesStatusTheme');
}

#starship-command-buttons {
  display: flex;
  justify-content: center;
}

#starship-command-buttons button {
  margin: 0 5px;
  width: 20%;
}

/* Larger buttons on tablets and mobile devices */
@media (max-width: 768px) {
  #starship-command-buttons button {
    width: 40% !important;
  }
}

/* Encounters part */
#starship-encounters {
  width: 100%;
}

#starship-encounters-message {
  font-size: 1.1em;
  text-align: center;
}

#starship-encounters-choices {
  width: fit-content;
  margin: auto;
}

#starship-encounters-choices-list {
  list-style: none;
  padding: 0;
}

#starship-encounters-choices-list button {
  width: 100%;

  margin: 0;
  margin-bottom: 10px;
}
</style>