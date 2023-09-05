<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
  starshipStats: Object,
  showPlayButton: Boolean
});

const emit = defineEmits([
  'selectedStarshipId'
]);

const starshipClassesList = inject('starshipClassesList');

// -- Computed properties --

const starshipClassColor = computed(() => {

  if (starshipClassesList.value && props.starshipStats.starshipClassId) {

    let classList = starshipClassesList.value;
    let classId = props.starshipStats.starshipClassId;

    // Get the starship class from its id
    const starshipClass = classList.find(element => element.id === classId);

    // If the class has been found
    if (starshipClass) {
      return starshipClass.color;
    }
  }

  return '';

});

const starshipClassName = computed(() => {

  if (starshipClassesList.value && props.starshipStats.starshipClassId) {

    let classList = starshipClassesList.value;
    let classId = props.starshipStats.starshipClassId;

    // Get the starship class from its id
    const starshipClass = classList.find(element => element.id === classId);

    // If the class has been found
    if (starshipClass) {
      return starshipClass.name;
    }
  }

  return '';

});

const starshipClassSpeed = computed(() => {

  if (starshipClassesList.value && props.starshipStats.starshipClassId) {

    let classList = starshipClassesList.value;
    let classId = props.starshipStats.starshipClassId;

    // Get the starship class from its id
    const starshipClass = classList.find(element => element.id === classId);

    // If the class has been found
    if (starshipClass) {
      return starshipClass.speed;
    }
  }

  return '';

});

const starshipClassFuelCapacity = computed(() => {

  if (starshipClassesList.value && props.starshipStats.starshipClassId) {

    let classList = starshipClassesList.value;
    let classId = props.starshipStats.starshipClassId;

    // Get the starship class from its id
    const starshipClass = classList.find(element => element.id === classId);

    // If the class has been found
    if (starshipClass) {
      return starshipClass.fuelCapacity;
    }
  }

  return '';

});

</script>

<template>
  <div
    class="card starship-card"
    :style="{ '--card-corner-color': starshipClassColor }" 
  >

    <span class="card-title">{{ starshipStats.name }}</span>
    <table class="card-stats-table">
      <tbody>
        <tr>
          <td>Class</td>
           <td>{{ starshipClassName }}</td>
        </tr>
        <tr>
          <td>Speed</td>
          <td>{{ starshipClassSpeed }} km/h</td>
        </tr>
        <tr>
          <td>Fuel</td>
          <td>{{ `${starshipStats.fuelLeft}/${starshipClassFuelCapacity}` }} kg</td>
        </tr>
      </tbody>
     </table>
    <button
      v-if="showPlayButton"
      class="button play-button" 
      @click="emit('selectedStarshipId', starshipStats.publicId)"
    >
      Play
    </button>

    </div>

</template>

<style scoped>
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

.play-button {
  margin-top: 20px;
  cursor: pointer;
}
</style>