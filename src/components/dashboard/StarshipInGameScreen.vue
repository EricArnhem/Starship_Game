<script setup>
import { ref, computed, watch, inject, onBeforeUnmount } from 'vue';

// API methods
import { updateStarshipFuelLeft, deleteStarship } from "@/api/methods/starship.js";

// Vue components
import StatsTable from '@/components/dashboard/ingame/StatsTable.vue';
import PathTimeline from '@/components/dashboard/ingame/PathTimeline.vue';
import EncountersLog from '@/components/dashboard/ingame/EncountersLog.vue';

import GameOverModal from '@/components/dashboard/ingame/GameOverModal.vue';
import { openModal } from '@/components/modal/state';

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

const disableEnginesButtons = ref(false);
const disableStartStopButton = ref(false);
const disableRefuelButton = ref(false);

const inEncounter = ref(false);

const fuelConsumption = 100;
let timerId;
let enginesTimeoutId;
let alertTimeout;

const maxRefuelDuration = 5000; // Longest time a refuel can take from 0 to max (in milliseconds)
let refuelAnimationData = ref({});

// Hold the reference to the PathTimeline component
// Used to import the nextSegment() function
const myPathTimeline = ref(null);

// Hold the reference to the EncountersLog component
// Used to import the newEncounter() and clearEncounter() functions
const myEncountersLog = ref(null);

// -- Lifecycle Hooks --

onBeforeUnmount(() => {

  // Clears timeout when exiting the game
  clearTimeout(enginesTimeoutId);
  clearTimeout(alertTimeout);

});

// -- Methods --

// Imported functions from child components

function nextSegment() {
  myPathTimeline.value.nextSegment();
}

function newEncounter() {
  myEncountersLog.value.newEncounter();
}

function clearEncounter() {
  myEncountersLog.value.clearEncounter();
}

// ----------------------------------------

function startEngines() {

  // If the starship has enough fuel and is not destroyed
  if (rawStarshipInfo.value.fuelLeft > 0 && rawStarshipInfo.value.hullPoints > 0) {

    // Disables the Engines buttons
    disableEnginesButtons.value = true;

    // If the engines are OFF
    if (enginesOn.value === false) {

      enginesTimeoutId = setTimeout(() => {

        // We start them and update the Engines status
        enginesOn.value = true;
        enginesStatus.value = 'ON';

        // Re-enables the Engines buttons
        disableEnginesButtons.value = false;

      }, 1000);

    }

  }

}

function stopEngines() {

  // Disables the Engines buttons
  disableEnginesButtons.value = true;

  // Turning off the engines before the timeout to stop the fuel consumption immediatly
  enginesOn.value = false;

  enginesTimeoutId = setTimeout(() => {

    enginesStatus.value = 'OFF';

    // Re-enables the Engines buttons
    disableEnginesButtons.value = false;

  }, 1000);

  // Save the "Fuel left" value to the database
  updateFuelLeft();

}

function pauseEngines() {

  enginesOn.value = false;
  enginesStatus.value = 'PAUSED';

  // Short timeout to make sure the latest fuel left value is saved to the database
  setTimeout(() => {
    // Save the "Fuel left" value to the database
    updateFuelLeft();
  }, 100);

}

function resumeEngines() {

  clearEncounter();

  enginesOn.value = true;
  enginesStatus.value = 'ON';

}

async function refuelStarship() {

  const fuelLeft = rawStarshipInfo.value.fuelLeft;

  // Getting the class fuel capacity
  const fuelCapacity = starshipClassData.value.fuelCapacity;

  let enginesCurrentStatus = enginesStatus.value;

  // If engines are ON, we PAUSE them
  if (enginesOn.value === true) {
    pauseEngines();
  }

  // Start Refueling if the Starship is not already at max fuel capacity
  if (fuelLeft !== fuelCapacity) {

    // Disables the Engines buttons
    disableEnginesButtons.value = true;

    enginesStatus.value = 'REFUELING';

    // Calculating the time it takes to refuel
    const fuelNeeded = fuelCapacity - fuelLeft;

    const refuelDuration = (fuelNeeded * maxRefuelDuration) / fuelCapacity;

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

      // Put the engines back to PAUSE status if they were ON or PAUSED
      if (enginesCurrentStatus === 'ON' || enginesCurrentStatus === 'PAUSED') {
        enginesStatus.value = 'PAUSED';
      }
      // Or put the engines back to OFF status if they were OFF
      if (enginesCurrentStatus === 'OFF') {
        enginesStatus.value = 'OFF';
      }

      // Re-enables the Engines buttons
      disableEnginesButtons.value = false;

      // Re-enables the Start/Stop button
      disableStartStopButton.value = false;

    }, refuelDuration);

  }

}

// Decreases the "Fuel left" every second
function startFuelTimer() {

  // Starts a timer that will reduce the amount of fuel by the amount set every second if there's enough fuel left
  timerId = setInterval(() => {

    // If there's enough fuel to travel
    if ((rawStarshipInfo.value.fuelLeft - fuelConsumption) >= 0) {

      // Calls the method used to animate the starship to the next segment
      nextSegment();

      // Reduces fuel by 100
      rawStarshipInfo.value.fuelLeft -= fuelConsumption;

    } else {
      // If we run out of fuel
      // Disables the Start/Stop button
      disableStartStopButton.value = true;

      // Stops the timer
      clearInterval(timerId);

      // Stops the engines
      stopEngines();

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

}

// Disables the engines buttons, Turn off the starship, deletes it from the database then displays a game over modal
async function gameOver() {

  // Disables the Engines buttons
  disableEnginesButtons.value = true;

  // Turning off the engines
  enginesOn.value = false;
  enginesStatus.value = 'OFF';

  // Getting starship public id
  let starshipPublicId = rawStarshipInfo.value.publicId;

  // Deleting the starship from the database
  try {

    await deleteStarship(starshipPublicId)

  } catch (error) {
    console.log(error);
  }

  // Opens the game over modal
  openModal();

}

// -- Computed properties --

// Gets the right text to update the engines button depending on the engines status
const enginesButtonText = computed(() => {

  if (enginesOn.value === false && enginesStatus.value === "PAUSED") {
    return 'Resume';
  }

  if (enginesOn.value === false && enginesStatus.value === "OFF") {
    return 'Start';
  }

  return 'Stop';

});

// Gets the right function to use when clicking on the Start/Stop button
const enginesButtonFunction = computed(() => {

  if (enginesOn.value === false && enginesStatus.value === "PAUSED") {
    return resumeEngines;
  }

  if (enginesOn.value === false && enginesStatus.value === "OFF") {
    return startEngines;
  }

  return stopEngines;

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

// Gets the starship's class data
const starshipClassData = computed(() => {

  const starshipClassId = rawStarshipInfo.value.starshipClassId;

  return starshipClassesList.value.find(element => element.id === starshipClassId);

});

// -- Watchers --

// Decrease the "Fuel left" when the engines are ON
watch(enginesOn, (enginesOn) => {
  if (enginesOn === true) {
    startFuelTimer();
  } else {
    // Stops when engines are turned OFF
    clearInterval(timerId);
  }
});

// Enables/Disables the Start and/or Refuel button depending on the fuel left
watch(() => rawStarshipInfo.value.fuelLeft, (fuelLeft) => {

  // Disables/Enables the Start button if the fuel tank is empty or not
  if (fuelLeft === 0) {
    disableStartStopButton.value = true;
  } else {
    disableStartStopButton.value = false;
  }

  // Getting the class fuel capacity
  const fuelCapacity = starshipClassData.value.fuelCapacity;

  // Disable Refuel button if the fuel tank is full
  if (fuelLeft === fuelCapacity) {
    disableRefuelButton.value = true;
  } else {
    // Re-enables the Refuel button if the fuel tank is not full
    disableRefuelButton.value = false;
  }

}, { immediate: true });

// Disables/Enables the engines buttons and turn off the starship if hull points to 0 or not
watch(() => rawStarshipInfo.value.hullPoints, (hullPoints) => {

  if (hullPoints === 0) {
    gameOver();
  }

}, { immediate: true });

</script>

<template>

  <div id="starship-data" class="content-box">

    <a 
      id="go-back-button"
      @click="stopGame()" 
      title="Go back to the starship selection" 
    >
      <img src="@/images/chevron-back.svg">
    </a>

    <div id="starship-info">

      <h3>Starship stats</h3>
      <StatsTable
        :starship-info="starshipInfo"
        :refuel-animation-data="refuelAnimationData" 
      />

      <p class="text-center">Engines: <span id="starship-engines-status">{{ enginesStatus }}</span></p>

      <div class="text-center" id="starship-command-buttons">

        <button 
          class="button" 
          :disabled="disableEnginesButtons || disableStartStopButton || inEncounter" 
          @click="enginesButtonFunction"
        >
          {{ enginesButtonText }}
        </button>

        <button 
          class="button" 
          :disabled="disableEnginesButtons || disableRefuelButton" 
          @click="refuelStarship()"
        >
          Refuel
        </button>
        
      </div>
      
      <PathTimeline
        ref="myPathTimeline"
        :starship-info="starshipInfo"
        @pause-engines="pauseEngines()"
        @new-location="newEncounter(); inEncounter = true"
      />
      
    </div>

    <EncountersLog 
      ref="myEncountersLog"
      :starship-info="starshipInfo"
      @choice-picked="inEncounter = false"
    />

  </div>

  <Teleport to="body">

    <GameOverModal />

  </Teleport>

</template>

<style>
#starship-data {
  display: flex;
  justify-content: space-evenly;

  position: relative;
  padding: 0;
  margin-top: 10px;
}

/* Removes top margin on mobile screens */
@media screen and (max-width: 480px) {
  #starship-data {
    margin-top: 0;
  }
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
  max-width: 150px;
}

/* Larger buttons on tablets and mobile devices */
@media screen and (max-width: 768px) {
  #starship-command-buttons button {
    width: 40% !important;
  }
}
</style>