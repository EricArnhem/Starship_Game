<script setup>
import { ref, computed } from 'vue';
import { hideSideNav, windowWidth } from '@/components/navigation/state';

import ClassesLegend from '@/components/ClassesLegend.vue';
import StarshipCard from '@/components/cards/StarshipCard.vue';

const props = defineProps({
  starshipClassesList: Array,
  starshipList: Array
});

const emit = defineEmits([
  'gameStart',
  'selectedStarshipInfo'
]);

const selectedStarshipInfo = ref({});

let filteredStarshipList = ref([]);

// -- Methods --

// Starts the game with the selected starship infos
function startGame(starshipPublicId) {

  // Gets the data for the selected starship using the publicID
  selectedStarshipInfo.value = props.starshipList.find(element => element.publicId === starshipPublicId);
  // Sends event with the starship data 
  emit('selectedStarshipInfo', selectedStarshipInfo.value);

  // Sends event to start the game
  emit('gameStart');

  // Hides side navigation on small screens
  if (windowWidth.value <= 900) {
    hideSideNav();
  }

  // Scrolls to top of the page
  window.scrollTo({ top: 0 });

}

// -- Computed properties --

const displayStarshipList = computed(() => {

  // If a class filter is selected (filtered list empty)
  if (filteredStarshipList.value.length === 0) {

    // Returns the full starship list (original)
    return props.starshipList;

  } else {
    // If a class filter a selected

    // Returns the filtered list
    return filteredStarshipList.value;

  }

});

</script>

<template>

  <div id="starship-select-screen">

    <h1>Starship Game</h1>
    <h2>Select a Starship to start the game</h2>
    <ClassesLegend 
    :starship-classes-list="starshipClassesList" 
    :starship-list="starshipList"
    @starship-list-filter="(filteredList) => filteredStarshipList = filteredList" />

    <div class="starship-cards-container">
      
      <StarshipCard 
        v-for="(starship, index) in displayStarshipList"
        :key="index"
        :starship-stats="starship"
        :starship-classes-list="starshipClassesList" 
        @selected-starship-id="(starshipId) => startGame(starshipId)"
      />

    </div>

  </div>

</template>

<style scoped>
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
  padding-bottom: 15px;
}

.play-button {
  margin-top: 20px;
  cursor: pointer;
}

@media screen and (max-width: 480px) {
  h2 {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>