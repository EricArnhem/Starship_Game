<script setup>
import { ref } from 'vue';
import encountersList from '@/data/encountersList.json';

const encounterPrompt = ref('');
const encounterChoices = ref([]);

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

  console.log(encounterData);

  encounterPrompt.value = encounterData.prompt;
  encounterChoices.value = encounterData.choices;

}

newEncounter()

</script>

<template>

  <div id="starship-encounters">
      <h3>Encounters log</h3>

      <p id="starship-encounters-message">
        {{ encounterPrompt ? encounterPrompt : 'Waiting for an encounter.' }}
      </p>

      <ul v-if="encounterChoices" id="starship-encounters-choices-list">

        <li 
          v-for="choice in encounterChoices"
          :key="choice.id">
          
          <button class="button" @click="encounterPrompt = choice.outcome.prompt">
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