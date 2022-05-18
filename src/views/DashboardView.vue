<script setup>
import { ref, reactive, computed } from 'vue';
import AlertScreen from '../components/AlertScreen.vue';
import StatsTable from '../components/StatsTable.vue';

const inGame = ref(true);
const starshipSelect = ref('Falcon');

const enginesOn = ref(false);
const enginesStatus = ref('OFF');
const enginesStatusTheme = reactive({ color: 'red' });

// Method to update the Engines status display with the correct text and color
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

// Method to start or stop the engines
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

// Method to refuel the Starship
function refuelStarship() {
  updateEnginesStatus('REFUELING');
}

// Gets the right text to update the engines button depending on the engines status
const enginesButtonText = computed(() => {
  return enginesOn.value === false ? 'Start' : 'Stop';
});

</script>

<template>

  <!-- Starship select screen - Not in game -->
  <div v-if="inGame === false">
    <h1>Starship Game</h1>

    <div class="wrapper-content-box">
      <div class="content-box">
        <h2>Select a Starship to start the game</h2>

        <div class="body-content-box">

          <select id="starship-select" v-model="starshipSelect">
            <option disabled value="">Select a Starship</option>
            <option>Falcon</option>
            <option>Slug</option>
          </select>

          <div v-if="starshipSelect">
            <h3>{{ starshipSelect }}</h3>
            <StatsTable />
          </div>
          <button class="button-dark" v-if="starshipSelect" @click="inGame = true">Play</button>

        </div>

      </div>
    </div>

  </div>

  <!-- Starship dashboard - In game -->
  <div v-if="inGame === true">
    <AlertScreen />
    <div id="starship-data" class="content-box">
      <div id="starship-info">

        <h3>{{ starshipSelect }}</h3>
        <StatsTable />

        <p class="text-center">Engines: <span id="starship-engines-status">{{ enginesStatus }}</span></p>

        <div class="text-center" id="starship-command-buttons">
          <button class="button-dark" @click="startStopEngines()">{{ enginesButtonText }}</button>
          <button class="button-dark" @click="refuelStarship()">Refuel</button>
        </div>

      </div>

      <div id="starship-encounters">
        <h3>Encounters log</h3>
        <div id="starship-encounters-choices">
          <p>You have encountered a foreign ship.</p>
          <ul>
            <li>Option A</li>
            <li>Option B</li>
            <li>Option C</li>
          </ul>
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>
/* Starship select screen - Not in game */
#starship-select {
  padding: 10px;
  font-size: 1em;
  width: 50%;
  border-radius: 3px;
}

@media (max-width: 480px) {
  #starship-select {
    width: 100%;
  }
}

/* Starship dashboard - In game */
#starship-data {
  display: flex;
  justify-content: space-evenly;
  padding: 0;
}

#starship-info {
  border-right: 1px solid var(--main-border-color);
  padding-bottom: 22.4px;
  width: 100%;
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

#starship-encounters {
  width: 100%;
}

#starship-encounters-choices {
  width: fit-content;
  margin: auto;
}
</style>