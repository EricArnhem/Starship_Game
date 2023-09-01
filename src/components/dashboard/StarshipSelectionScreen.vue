<script setup>
import { ref, computed, inject } from 'vue';
import { hideSideNav, windowWidth } from '@/components/navigation/state';

// Vue components
import ClassesLegend from '@/components/ClassesLegend.vue';
import StarshipCard from '@/components/cards/StarshipCard.vue';

const emit = defineEmits([
  'gameStart',
  'selectedStarshipInfo'
]);

const starshipList = inject('starshipList');

const selectedStarshipInfo = ref({});

let filteredStarshipList = ref([]);

// -- Methods --

// Starts the game with the selected starship infos
function startGame(starshipPublicId) {

  // Gets the data for the selected starship using the publicID
  selectedStarshipInfo.value = starshipList.value.find(element => element.publicId === starshipPublicId);
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
    return starshipList.value;

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
      @starship-list-filter="(filteredList) => filteredStarshipList = filteredList" 
    />

    <div class="cards-container">
      
      <StarshipCard 
        v-for="(starship) in displayStarshipList"
        :key="starship.publicId"
        :starship-stats="starship"
        :show-play-button="true"
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

.card {
  padding-bottom: 15px;
}

@media screen and (max-width: 480px) {
  h2 {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>