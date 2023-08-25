<script setup>
import { ref, computed } from 'vue';
import { hideNavbar, windowWidth } from '@/components/navbar/state';

import ClassesLegend from '@/components/ClassesLegend.vue';

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

  // Hides sidebar on small screens
  if (windowWidth.value <= 900) {
    hideNavbar();
  }

  // Scrolls to top of the page
  window.scrollTo({ top: 0 });

}

// Returns the starship class color by providing the classID
function getStarshipClassColor(starshipClassId) {

  // If the array is not empty (prevents error when array is briefly empty)
  if (props.starshipClassesList.length) {
    return props.starshipClassesList.find(element => element.id === starshipClassId).color;
  }

}

// Returns the starship class name by providing the classID
function getStarshipClassName(starshipClassId) {

  // If the array is not empty (prevents error when array is briefly empty)
  if (props.starshipClassesList.length) {
    return props.starshipClassesList.find(element => element.id === starshipClassId).name;
  }

}

// Returns the starship class speed by providing the classID
function getStarshipClassSpeed(starshipClassId) {

  // If the array is not empty (prevents error when array is briefly empty)
  if (props.starshipClassesList.length) {
    return props.starshipClassesList.find(element => element.id === starshipClassId).speed;
  }

}

// Returns the starship class fuel capacity by providing the classID
function getStarshipClassFuelCapacity(starshipClassId) {

  // If the array is not empty (prevents error when array is briefly empty)
  if (props.starshipClassesList.length) {
    return props.starshipClassesList.find(element => element.id === starshipClassId).fuelCapacity;
  }

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
      <div
        class="starship-card"
        v-for="(starship, index) in displayStarshipList"
        :key="index"
        :style="{ '--card-corner-color': getStarshipClassColor(starship.starshipClassId) }">
        <span class="starship-card-title">{{ starship.name }}</span>
        <table class="starship-card-stats">
          <tbody>
            <tr>
              <td>Class</td>
              <td>{{ getStarshipClassName(starship.starshipClassId) }}</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{{ getStarshipClassSpeed(starship.starshipClassId) }} km/h</td>
            </tr>
            <tr>
              <td>Fuel capacity</td>
              <td>{{ getStarshipClassFuelCapacity(starship.starshipClassId) }} kg</td>
            </tr>
            <tr>
              <td>Fuel left</td>
              <td>{{ starship.fuelLeft }} kg</td>
            </tr>
          </tbody>
        </table>
        <button class="button play-button" @click="startGame(starship.publicId)">Play</button>

      </div>
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
</style>