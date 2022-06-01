<script setup>
import { reactive, ref } from 'vue'
import StarshipForm from '../components/StarshipForm.vue';
import ClassesLegend from '../components/ClassesLegend.vue';
import starshipClassesData from '@/data/starshipClassesData.json';
import starshipsData from '@/data/starshipsData.json';

// Starship classes list
const starshipClasses = reactive(starshipClassesData);

// List of existing Starships
const starshipList = reactive(starshipsData);

// Shows the modal (starship form) or not
const showModal = ref(false);
</script>

<template>
  <h1>Manage your Starships</h1>
  <ClassesLegend :starship-classes="starshipClasses" />

  <div class="starship-cards-container">

    <div
      class="starship-card"
      v-for="(starship, index) in starshipList"
      @click="showModal = true"
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
    </div>

    <div class="starship-card" id="create-starship-card">
      <span id="create-starship-card-title">Create a new Starship</span>
      <img id="plus-svg" src="@/images/plus.svg" title="Create a new Starship" alt="Plus icon">
    </div>

  </div>

  <!-- Starship Form to use in the modal -->
  <Teleport to="body">
    <StarshipForm
      :starship-classes="starshipClasses"
      :show-modal="showModal"
      @close="showModal = false" />
  </Teleport>

</template>

<style scoped>
#create-starship-card {
  justify-content: center;
  min-height: 245px;
}

#create-starship-card-title {
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
}

#plus-svg {
  margin-top: 20px;
  height: 85px;
}

/* Changes for mobile version */
@media (max-width: 355px) {
  #create-starship-card {
    max-width: 240px;
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

/* Removes the corner on the Create starship card */
#create-starship-card:after {
  content: none;
}
</style>