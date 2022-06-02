<script setup>
import { ref, reactive, computed } from 'vue';
import AlertScreen from '../components/AlertScreen.vue';
import StatsTable from '../components/StatsTable.vue';
import ClassesLegend from '../components/ClassesLegend.vue';
import starshipClassesData from '@/data/starshipClassesData.json';
import starshipsData from '@/data/starshipsData.json';

// Starship classes list
const starshipClasses = reactive(starshipClassesData);

// List of existing Starships
const starshipList = reactive(starshipsData);

const inGame = ref(false);
const selectedStarshipName = ref('');
const selectedStarshipInfo = ref({});

const enginesOn = ref(false);
const enginesStatus = ref('OFF');
const enginesStatusTheme = reactive({ color: 'red' });

// Method to start the game with the selected starship infos
function startGame(starshipName) {
  // Gets the name
  selectedStarshipName.value = starshipName;
  // Gets the class and fuel left
  selectedStarshipInfo.value = starshipList[starshipName];
  // Starts the game
  inGame.value = true;
}

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
  <div v-if="inGame === false" id="starship-select-screen">
    <h1>Starship Game</h1>

    <h2>Select a Starship to start the game</h2>
    <ClassesLegend :starship-classes="starshipClasses" />

    <div class="starship-cards-container">
      <div
        class="starship-card"
        v-for="(starship, index) in starshipList"
        :key="index"
        :style="{ '--card-corner-color': starshipClasses[starship.Class].Color }">

        <span class="starship-card-title">{{ index }}</span>

        <table class="starship-card-stats">
          <tbody>
            <tr>
              <td>Class</td>
              <td>{{ starship.Class }}</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{{ starshipClasses[starship.Class].Speed }} km/h</td>
            </tr>
            <tr>
              <td>Fuel capacity</td>
              <td>{{ starshipClasses[starship.Class]['Fuel capacity'] }} kg</td>
            </tr>
            <tr>
              <td>Fuel left</td>
              <td>{{ starship['Fuel left'] }} kg</td>
            </tr>
          </tbody>
        </table>
        <button class="button play-button" @click="startGame(index)">Play</button>
      </div>
    </div>

  </div>

  <!-- Starship dashboard - In game -->
  <div v-if="inGame === true">
    <AlertScreen />
    <div id="starship-data" class="content-box">
      <a id="go-back-button" @click="inGame = false" title="Go back to the starship selection"><img src="@/images/chevron-back.svg"></a>
      <div id="starship-info">

        <h3>{{ selectedStarshipName }}</h3>
        <StatsTable
          :select-starship-name="selectedStarshipName"
          :selected-starship-info="selectedStarshipInfo" 
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
  </div>

</template>

<style scoped>
/* -- Starship select screen - Not in game -- */
#starship-select-screen {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

h2 {
  margin: auto;
  margin-bottom: 15px;
}

.starship-card {
  cursor: initial;
}

.play-button {
  margin-top: 20px;
  cursor: pointer;
}

@media (max-width: 480px) {
  h2 {
    margin-left: 15px;
    margin-right: 15px;
  }
}

/* Colored corners depending on the starship class */
.starship-card:after {
  content: "";
  position: absolute;
  margin: -50px;
  width: 60px;
  height: 60px;
  transform: rotate(45deg);
  background-color: var(--card-corner-color);
}

/* -- Starship dashboard - In game -- */
#starship-data {
  display: flex;
  justify-content: space-evenly;
  padding: 0;
}

#go-back-button {
  cursor: pointer;
  height: 45px;
  position: absolute;
  left: 74px;
  top: 88px;
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
  border-right: 1px solid var(--main-border-color);
  padding-bottom: 22.4px;
  width: 100%;
  display: flex;
  flex-direction: column;
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