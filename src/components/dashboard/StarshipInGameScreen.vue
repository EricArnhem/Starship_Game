<script setup>
import { ref, computed, watch, inject } from 'vue';

// API methods
import { updateStarshipFuelLeft } from "@/api/methods/starship.js";

// Vue components
import AlertScreen from '@/components/AlertScreen.vue';
import StatsTable from '@/components/StatsTable.vue';

const props = defineProps({
  starshipInfo: Object
});

const emit = defineEmits([
  'gameStop'
]);

const starshipClassesList = inject('starshipClassesList');

const rawStarshipInfo = ref(props.starshipInfo);

const enginesOn = ref(false);
const enginesStatus = ref('OFF');
const enginesOccupied = ref(false);

const fuelConsumption = 100;
let timerId;
let enginesTimeoutId;
let alertTimeout;

const maxRefuelDuration = 5000; // Longest time a refuel can take from 0 to max (in milliseconds)
let refuelAnimationData = ref({});

// Hold the reference to the AlertScreen component
// Used to import the displayAlert() function
const myAlertScreen = ref(null);

// -- Methods --

function displayAlert(textString) {
  myAlertScreen.value.displayAlert(textString);
}

function startEngines() {

  // If the starship has enough fuel
  if (rawStarshipInfo.value.fuelLeft > 0) {

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

  } else {

    displayAlert('Not enough fuel to start the engines.');

  }

}

async function stopEngines() {

  return new Promise((resolve) => {

    // Disables the Engines buttons
    enginesOccupied.value = true;

    // If the engines are ON
    if (enginesOn.value === true) {

      displayAlert('Engines shutting down...');
      enginesOn.value = false;

      enginesTimeoutId = setTimeout(() => {

        enginesStatus.value = 'OFF';
        displayAlert('Engines stopped.');

        // Re-enables the Engines buttons
        enginesOccupied.value = false;

        // Timeout to let the 'Engines stopped' alert display before refueling
        alertTimeout = setTimeout(() => {

          resolve(); // Resolve the promise to signal completion

        }, 2500);

      }, 2500);

      // Save the "Fuel left" value to the database
      updateFuelLeft();

    } else {
      resolve(); // Resolve the promise if engines were already off
    }

  });

}

async function refuelStarship() {

  const fuelLeft = rawStarshipInfo.value.fuelLeft;

  // Getting the class fuel capacity
  const starshipClassId = rawStarshipInfo.value.starshipClassId;
  const fuelCapacity = starshipClassesList.value.find(element => element.id === starshipClassId).fuelCapacity;

  // If engines are ON, we turn them OFF
  if (enginesOn.value === true) {
    await stopEngines();
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

    // Wait a bit before starting the refueling process (time for the 'Refueling...' alert to display)
    enginesTimeoutId = setTimeout(() => {

      // Puts refuel data into an object to pass it as a prop to the StatsTable
      // When the 'refuelAnimationData' prop value changes the animation in automatically started
      refuelAnimationData.value = {
        fuelLeft: fuelLeft,
        fuelCapacity: fuelCapacity,
        refuelDuration: refuelDuration
      }

      // After the refueling is done (animation ended)
      enginesTimeoutId = setTimeout(() => {

        // Changing the Starship "Fuel left" value to the max fuel capacity
        rawStarshipInfo.value.fuelLeft = fuelCapacity;

        // Updating the value in the database
        updateFuelLeft();

        enginesStatus.value = 'OFF';
        displayAlert('Starship refueled.');

        // Re-enables the Engines buttons
        enginesOccupied.value = false;

      }, refuelDuration);

    }, 2500);

  } else {

    displayAlert("Fuel tank already at maximum capacity.");

  }

}

// Decreases the "Fuel left" every second
function startFuelTimer() {

  // Starts a timer that will reduce the amount of fuel by the amount set every second if there's enough fuel left
  timerId = setInterval(() => {

    // If there's enough fuel to travel
    if ((rawStarshipInfo.value.fuelLeft - fuelConsumption) >= 0) {

      // Reduces fuel by 100
      rawStarshipInfo.value.fuelLeft -= fuelConsumption;

    } else {
      // If we run out of fuel
      // Disables the Engines buttons
      enginesOccupied.value = true;

      displayAlert("The starship ran of out fuel.");

      // Stops the timer
      clearInterval(timerId);

      // Stopping the engines
      enginesTimeoutId = setTimeout(() => {

        stopEngines();

      }, 2500);

    }

  }, 1000);

}

// Updates the Starship's "Fuel left" value in the database
async function updateFuelLeft() {

  const starshipData = {
    fuelLeft: rawStarshipInfo.value.fuelLeft
  }

  // Getting starship public id
  let starshipPublicId = rawStarshipInfo.value.publicId;

  // Updating the starship "Fuel left"
  try {

    await updateStarshipFuelLeft(starshipPublicId, starshipData);

  } catch (error) {
    console.log(error);
  }
}

// Stops the game
function stopGame() {

  emit('gameStop');
  enginesOn.value = false;
  clearTimeout(enginesTimeoutId);
  clearTimeout(alertTimeout);

}

// -- Computed properties --

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

    <a 
      id="go-back-button"
      @click="stopGame()" 
      title="Go back to the starship selection" 
    >
      <img src="@/images/chevron-back.svg">
    </a>

    <div id="starship-info">

      <h3>{{ starshipInfo.name }}</h3>
      <StatsTable
        :starship-info="starshipInfo"
        :refuel-animation-data="refuelAnimationData" 
      />

      <p class="text-center">Engines: <span id="starship-engines-status">{{ enginesStatus }}</span></p>

      <div class="text-center" id="starship-command-buttons">

        <button 
          class="button" 
          :disabled="enginesOccupied" 
          @click="enginesOn === false ? startEngines() : stopEngines()"
        >
          {{ enginesButtonText }}
        </button>

        <button 
          class="button" 
          :disabled="enginesOccupied" 
          @click="refuelStarship()"
        >
          Refuel
        </button>
        
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
@media screen and (max-width: 1024px) {
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
@media screen and (max-width: 768px) {
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