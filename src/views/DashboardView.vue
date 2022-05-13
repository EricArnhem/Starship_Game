<script setup>
import { ref } from 'vue';
import AlertScreen from '../components/AlertScreen.vue';
import StatsTable from '../components/StatsTable.vue';

const inGame = ref(false);
const starshipSelect = ref('');

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
          <button id="play-button" v-if="starshipSelect" @click="inGame = true">Play</button>

        </div>

      </div>
    </div>

  </div>

  <!-- Starship dashboard - In game -->
  <div v-if="inGame === true">
    <AlertScreen />
    <div id="starship-data">
      <div id="starship-info">
        <p class="starship-name">{{ starshipSelect }}</p>
        <StatsTable />
      </div>
    </div>
  </div>

</template>

<style scoped>
/* Style for both parts */
.starship-name {
  font-size: 1.4em;
  font-weight: bold;
  /* margin-top: 0; */
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

#play-button {
  padding: 10px 6px;
  width: 50%;
  margin: auto;
  margin-top: 25px;
  font-size: 1rem;
  color: inherit;
  background-color: var(--content-box-bg-color);
  border: 1px solid var(--main-border-color);
  border-radius: 3px;
}

#play-button:hover {
  background-color: #3a3a3a;
  cursor: pointer;
  transition: 0.1s;
}

/* Starship dashboard - In game */
#starship-data {
  display: flex;
  justify-content: center;
}
</style>