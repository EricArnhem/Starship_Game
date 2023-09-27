<script setup>
import { ref, computed, inject } from 'vue';

// API methods
import { updateStarshipHullPoints, updateStarshipCredits } from "@/api/methods/starship.js";

// Encounters data
import encountersList from '@/data/encountersList.json';

const props = defineProps({
  starshipInfo: Object
});

const emit = defineEmits([
  'choicePicked'
]);

defineExpose({
  newEncounter,
  clearEncounter
});

const starshipClassesList = inject('starshipClassesList');

const rawStarshipInfo = ref(props.starshipInfo);

const encounterPrompt = ref('');
const encounterChoices = ref([]);
const encounterChoiceResults = ref({});

// -- Methods ---

// Returns a random encounter of any type
function selectEncounter() {

  let encounterType = '';

  const randomNumber = Math.random();

  // Determine the type of the encounter with a 50/50 chance
  if (randomNumber < 0.5) {
    encounterType = 'friendly';
  } else {
    encounterType = 'enemy';
  }

  // Get the encounters list of the determined type
  const encounterTypeList = encountersList[encounterType];

  // Select a random encounter from the list
  const randomIndex = Math.floor(Math.random() * encounterTypeList.length);

  const randomEncounter = encounterTypeList[randomIndex];

  // Returns the encounter
  return randomEncounter;

}

// Selects and displays a random encounter
function newEncounter() {

  // Select a random encounter
  const encounterData = selectEncounter();

  encounterPrompt.value = encounterData.prompt;
  encounterChoices.value = encounterData.choices;

}

// Resets the encounter prompt and choice results
function clearEncounter() {
  encounterPrompt.value = '';
  encounterChoiceResults.value = {};
}

// Updates the stats and the prompt depending on the choice button clicked
function handleChoice(choice) {

  // If the choice changes the hullPoints
  if (choice.outcome.hullPoints) {
    updateHullPoints(choice.outcome.hullPoints);
    // Saves value to display it with the result
    encounterChoiceResults.value.Hull = choice.outcome.hullPoints;
  }

  // If the choice changes the credits
  if (choice.outcome.credits) {
    updateCredits(choice.outcome.credits);
    // Saves value to display it with the result
    encounterChoiceResults.value.Credits = choice.outcome.credits;
  }

  // Displays the choice result prompt and stats results
  encounterPrompt.value = choice.outcome.prompt

  // Saves the updated starship info to the database 
  saveStarshipInfo();

  // Clears/Removes the choices buttons
  encounterChoices.value = [];

  emit('choicePicked');

}

// Updates the starship hull points
function updateHullPoints(hullPoints) {

  let maxHullPoints = starshipMaxHullPoints.value;
  let hullPointsChange = hullPoints
  let hullPointsSum = rawStarshipInfo.value.hullPoints + hullPointsChange;

  // If the sum of the points are over the maximum allowed for the class. Limits the points to the maximum
  if (hullPointsSum > maxHullPoints) {
    rawStarshipInfo.value.hullPoints = maxHullPoints;
  }

  // If the sum of the points are under 0. Limits the points to 0 (min)
  if (hullPointsSum < 0) {
    rawStarshipInfo.value.hullPoints = 0;
  }

  // If the sum of the points are between 0 and the maximum allowed for the class (between min and max)
  if (hullPointsSum >= 0 && hullPointsSum <= maxHullPoints) {
    rawStarshipInfo.value.hullPoints += hullPointsChange;
  }

}

// Updates the starship credits
function updateCredits(credits) {

  let creditsChange = credits
  let creditsSum = rawStarshipInfo.value.credits + creditsChange;

  // If the sum of the credits are under 0. Limits the credits to 0 (min)
  if (creditsSum < 0) {
    rawStarshipInfo.value.credits = 0;
  }

  // If the sum of the credits are superior or equal to 0
  if (creditsSum >= 0) {
    rawStarshipInfo.value.credits += creditsChange;
  }

}

// Saves the updated starship infos to the database
async function saveStarshipInfo() {

  let updatedHullPoints = rawStarshipInfo.value.hullPoints;
  let updatedCredits = rawStarshipInfo.value.credits;

  // Gets starship public id
  let starshipPublicId = rawStarshipInfo.value.publicId;

  // Saving the starship hull points value to the database
  const hullPointsData = {
    hullPoints: updatedHullPoints
  }

  try {

    await updateStarshipHullPoints(starshipPublicId, hullPointsData);

  } catch (error) {
    console.log(error);
  }

  // Saving the starship credits value to the database
  const creditsData = {
    credits: updatedCredits
  }

  try {

    await updateStarshipCredits(starshipPublicId, creditsData);

  } catch (error) {
    console.log(error);
  }

}

// -- Computed properties --

const starshipMaxHullPoints = computed(() => {
  return starshipClassesList.value.find(element => element.id === props.starshipInfo.starshipClassId).hullPoints;
});

</script>

<template>

  <div id="starship-encounters">
      <h3>Encounters log</h3>

      <p id="starship-encounters-message">
        {{ encounterPrompt ? encounterPrompt : 'Waiting for an encounter.' }}
      </p>

      <p id="starship-choice-results">
        <span 
          v-for="(value, index) in encounterChoiceResults" 
          :key="index">
          {{ index }}: {{ value }}
          <br>
        </span>
      </p>

      <ul v-if="encounterChoices" id="starship-encounters-choices-list">

        <li 
          v-for="choice in encounterChoices"
          :key="choice.id">
          
          <button class="button" @click="handleChoice(choice)">
            {{ choice.text }}
          </button>

        </li>

      </ul>

  </div>
    
</template>

<style>
#starship-encounters {
  width: 100%;
}

#starship-encounters-message {
  padding: 0 15px;
}

#starship-encounters-message,
#starship-choice-results {
  font-size: 1.1em;
  text-align: center;
}

#starship-encounters-choices-list {
  list-style: none;
  padding: 0;
  text-align: center;
}

#starship-encounters-choices-list button {
  width: 80%;
  margin-top: 0;
  margin-bottom: 10px;
}
</style>