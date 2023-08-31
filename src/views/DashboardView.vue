<script setup>
import { ref, onBeforeMount, provide } from 'vue';

// API methods
import { getStarships } from "@/api/methods/starship.js";
import { getStarshipClasses } from "@/api/methods/starship-class.js";

// Vue components
import StarshipSelectionScreen from '@/components/dashboard/StarshipSelectionScreen.vue';
import StarshipInGameScreen from '@/components/dashboard/StarshipInGameScreen.vue';

// Starships Data
const starshipClassesList = ref([]);
const starshipList = ref([]);

// Provide the starship list and classes list to all child components
provide('starshipClassesList', starshipClassesList);
provide('starshipList', starshipList);

const inGame = ref(false);

// Informations of the starship selected to play (from emit)
const starshipInfo = ref({});

// Before the component is to be mounted
onBeforeMount(() => {

  // Getting the starship classes
  getStarshipClasses()
    .then(response => {
      starshipClassesList.value = response.data;
    })
    .catch(error => {
      console.log(error);
    });

  // Getting the starships
  getStarships()
    .then(response => {
      starshipList.value = response.data;
    })
    .catch(error => {
      console.log(error);
    });

});

</script>

<template>

  <!-- Starship selection screen - Not in game -->
  <div v-if="inGame === false">

    <StarshipSelectionScreen
      @game-start="inGame = true"
      @selected-starship-info="(selectedStarshipInfo) => starshipInfo = selectedStarshipInfo" />

  </div>


  <!-- Starship dashboard - In game -->
  <div v-if="inGame === true">

    <StarshipInGameScreen
      :starship-info="starshipInfo"
      @game-stop="inGame = false" />

  </div>

</template>

<style></style>