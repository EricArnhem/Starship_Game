<script setup>
import { ref, reactive, computed } from 'vue';
import { showNavbar } from '@/components/navbar/state';

import AlertScreen from '@/components/AlertScreen.vue';
import StatsTable from '@/components/StatsTable.vue';

defineProps({
  starshipName: String,
  starshipInfo: Object,
  starshipClasses: Object
});

defineEmits(['gameStop']);

const enginesOn = ref(false);
const enginesStatus = ref('OFF');
const enginesStatusTheme = reactive({ color: 'red' });

// -- Methods --

// Updates the Engines status display with the correct text and color
function updateEnginesStatus(status) {

  switch (status) {
    case 'ON':
      enginesStatus.value = 'ON';
      enginesStatusTheme.color = 'green';
      break;

    case 'OFF':
      enginesStatus.value = 'OFF';
      enginesStatusTheme.color = 'red';
      break;

    case 'PAUSED':
      enginesStatus.value = 'PAUSED';
      enginesStatusTheme.color = 'orange';
      break;

    case 'REFUELING':
      enginesStatus.value = 'REFUELING';
      enginesStatusTheme.color = 'cornflowerblue';
      break;

    default:
      break;
  }
}

// Starts or stop the engines
function startStopEngines() {

  // If the engines are OFF
  if (enginesOn.value === false) {
    // We start them and update the Engines status
    enginesOn.value = true;
    updateEnginesStatus('ON');
  } else {
    // Otherwise we stop them and update the Engines status
    enginesOn.value = false;
    updateEnginesStatus('OFF');
  }

}

// Refuels the Starship
function refuelStarship() {
  updateEnginesStatus('REFUELING');
}

// -- Computed properties --

// Gets the right text to update the engines button depending on the engines status
const enginesButtonText = computed(() => {
  return enginesOn.value === false ? 'Start' : 'Stop';
});

</script>

<template>

  <AlertScreen />

  <div id="starship-data" class="content-box">
    <a id="go-back-button" @click="$emit('gameStop'); showNavbar()" title="Go back to the starship selection"><img src="@/images/chevron-back.svg"></a>
    <div id="starship-info">

      <h3>{{ starshipName }}</h3>
      <StatsTable
        :select-starship-name="starshipName"
        :selected-starship-info="starshipInfo"
        :starship-classes="starshipClasses" />

      <p class="text-center">Engines: <span id="starship-engines-status">{{ enginesStatus }}</span></p>

      <div class="text-center" id="starship-command-buttons">
        <button class="button" @click="startStopEngines()">{{ enginesButtonText }}</button>
        <button class="button" @click="refuelStarship()">Refuel</button>
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
  color: v-bind('enginesStatusTheme.color');
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