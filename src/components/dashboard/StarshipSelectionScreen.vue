<script setup>
import { ref } from 'vue';
import { hideNavbar } from '@/components/navbar/state';

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

// -- Methods --

// Starts the game with the selected starship infos
function startGame(starshipPublicId) {

  // Gets the data for the selected starship using the publicID
  selectedStarshipInfo.value = props.starshipList.find(element => element.publicId === starshipPublicId);
  // Sends event with the starship data 
  emit('selectedStarshipInfo', selectedStarshipInfo);

  // Sends event to start the game
  emit('gameStart');
}

</script>

<template>

  <div id="starship-select-screen">

    <h1>Starship Game</h1>
    <h2>Select a Starship to start the game</h2>
    <ClassesLegend :starship-classes-list="starshipClassesList" />
    <div class="starship-cards-container">
      <div
        class="starship-card"
        v-for="(starship, index) in starshipList"
        :key="index"
        :style="{ '--card-corner-color': (starshipClassesList ? starshipClassesList.find(element => element.id === starship.starshipClassId).color : '') }">
        <span class="starship-card-title">{{ starship.name }}</span>
        <table class="starship-card-stats">
          <tbody>
            <tr>
              <td>Class</td>
              <td>{{ starshipClassesList.find(element => element.id === starship.starshipClassId).name }}</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{{ starshipClassesList.find(element => element.id === starship.starshipClassId).speed }} km/h</td>
            </tr>
            <tr>
              <td>Fuel capacity</td>
              <td>{{ starshipClassesList.find(element => element.id === starship.starshipClassId).fuelCapacity }} kg</td>
            </tr>
            <tr>
              <td>Fuel left</td>
              <td>{{ starship.fuelLeft }} kg</td>
            </tr>
          </tbody>
        </table>
        <button class="button play-button" @click="startGame(starship.publicId); hideNavbar()">Play</button>

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