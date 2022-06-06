<script setup>
import { ref, reactive } from 'vue';
import StarshipSelectionScreen from '@/components/dashboard/StarshipSelectionScreen.vue';
import StarshipInGameScreen from '@/components/dashboard/StarshipInGameScreen.vue';

import starshipClassesData from '@/data/starshipClassesData.json';
import starshipsData from '@/data/starshipsData.json';

// Starship classes list
const starshipClasses = reactive(starshipClassesData);

// List of existing Starships
const starshipList = reactive(starshipsData);

const inGame = ref(false);

// Name and info of the starship selected to play (from emits)
const starshipName = ref('');
const starshipInfo = ref({});

</script>

<template>

  <!-- Starship selection screen - Not in game -->
  <div v-if="inGame === false">

    <StarshipSelectionScreen
      :starship-classes="starshipClasses"
      :starship-list="starshipList"
      @game-start="inGame = true"
      @selected-starship-name="(selectedStarshipName) => starshipName = selectedStarshipName"
      @selected-starship-info="(selectedStarshipInfo) => starshipInfo = selectedStarshipInfo" />

  </div>


  <!-- Starship dashboard - In game -->
  <div v-if="inGame === true">

    <StarshipInGameScreen
      :starship-name="starshipName"
      :starship-info="starshipInfo"
      :starship-classes="starshipClasses"
      @game-stop="inGame = false" />

  </div>

</template>

<style>
</style>