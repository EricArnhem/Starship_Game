<script setup>
import { ref } from 'vue';
import { hideNavbar } from '@/components/navbar/state';

import ClassesLegend from '@/components/ClassesLegend.vue';

const props = defineProps({
  starshipClasses: Object,
  starshipList: Object
});

const emit = defineEmits([
  'gameStart',
  'selectedStarshipName',
  'selectedStarshipInfo'
]);

const selectedStarshipName = ref('');
const selectedStarshipInfo = ref({});

// -- Methods --

// Starts the game with the selected starship infos
function startGame(starshipName) {
  // Gets the name
  selectedStarshipName.value = starshipName;
  emit('selectedStarshipName', selectedStarshipName);
  // Gets the class and fuel left
  selectedStarshipInfo.value = props.starshipList[starshipName];
  emit('selectedStarshipInfo', selectedStarshipInfo);
  // Sends event to start the game
  emit('gameStart');
}

</script>

<template>

  <div id="starship-select-screen">

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
        <button class="button play-button" @click="startGame(index); hideNavbar()">Play</button>

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