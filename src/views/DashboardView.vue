<script setup>
import { ref, reactive, onBeforeMount } from 'vue';

// API methods
import { getStarships } from "../api/methods/starship.js";
import { getStarshipClasses } from "../api/methods/starship-class.js";

// Vue components
import StarshipSelectionScreen from '@/components/dashboard/StarshipSelectionScreen.vue';
import StarshipInGameScreen from '@/components/dashboard/StarshipInGameScreen.vue';

// Starships Data
const state = reactive({
  starshipClassesList: [],
  starshipList: []
})

const inGame = ref(false);

// Informations of the starship selected to play (from emit)
const starshipInfo = ref({});

// Before the component is to be mounted
onBeforeMount(() => {

  // Getting the starship classes
  getStarshipClasses()
    .then(response => {
      state.starshipClassesList = response.data;
    })
    .catch(error => {
      console.log(error);
    });

  // Getting the starships
  getStarships()
    .then(response => {
      state.starshipList = response.data;
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
      :starship-classes-list="state.starshipClassesList"
      :starship-list="state.starshipList"
      @game-start="inGame = true"
      @selected-starship-info="(selectedStarshipInfo) => starshipInfo = selectedStarshipInfo" />

  </div>


  <!-- Starship dashboard - In game -->
  <div v-if="inGame === true">

    <StarshipInGameScreen
      :starship-info="starshipInfo"
      :starship-classes-list="state.starshipClassesList"
      @game-stop="inGame = false" />

  </div>

</template>

<style></style>