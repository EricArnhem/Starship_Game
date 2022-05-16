<script setup>
import { ref } from 'vue';
import AlertScreen from '../components/AlertScreen.vue';
import StatsTable from '../components/StatsTable.vue';

const inGame = ref(true);
const starshipSelect = ref('Falcon');

</script>

<template>

  <!-- Starship select screen - Not in game -->
  <div v-if="inGame === false">
    <h1>Starship Game</h1>

    <div class="wrapper-content-box">
      <div class="content-box">
        <h2>Select a Starship to start the game</h2>

        <div class="body-content-box">

          <select id="starship-select" v-model="starshipSelect">
            <option disabled value="">Select a Starship</option>
            <option>Falcon</option>
            <option>Slug</option>
          </select>

          <div v-if="starshipSelect">
            <p class="starship-name">{{ starshipSelect }}</p>
            <StatsTable />
          </div>
          <button class="button-dark" v-if="starshipSelect" @click="inGame = true">Play</button>

        </div>

      </div>
    </div>

  </div>

  <!-- Starship dashboard - In game -->
  <div v-if="inGame === true">
    <AlertScreen />
    <div id="starship-data" class="content-box">
      <div id="starship-info">
        <p class="starship-name">{{ starshipSelect }}</p>
        <StatsTable />
      </div>
      <div id="starship-encounters">
        <p id="starship-encounters-title">Encounters log</p>
        <div id="starship-encounters-choices">
          <p>You have encountered a foreign ship.</p>
          <ul>
            <li>Option A</li>
            <li>Option B</li>
            <li>Option C</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
/* Style for both parts */
.starship-name,
#starship-encounters-title {
  font-size: 1.4em;
  font-weight: bold;
  text-align: center;
  text-decoration: underline double 1px;
  text-underline-offset: 4px;
}

/* Starship select screen - Not in game */
h1 {
  text-align: center;
  text-decoration: underline double 1px;
  text-underline-offset: 9px;
}

#starship-select {
  padding: 10px;
  font-size: 1em;
  width: 50%;
  border-radius: 3px;
}

@media (max-width: 480px) {
  #starship-select {
    width: 100%;
  }
}

/* Starship dashboard - In game */
#starship-data {
  display: flex;
  justify-content: space-evenly;
}

#starship-info {
  border: 1px solid green;
  width: 100%;
}

#starship-encounters {
  border: 1px solid red;
  width: 100%;
}

#starship-encounters-choices {
  width: fit-content;
  margin: auto;
}
</style>