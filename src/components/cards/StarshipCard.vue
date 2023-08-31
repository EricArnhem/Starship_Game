<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  starshipStats: Object,
  starshipClassesList: Array,
  showPlayButton: Boolean
});

const emit = defineEmits([
  'selectedStarshipId'
]);

const starshipName = ref(props.starshipStats.name);
const starshipFuelLeft = ref(props.starshipStats.fuelLeft);
const starshipPublicId = ref(props.starshipStats.publicId);

const classList = ref(props.starshipClassesList);
const classId = ref(props.starshipStats.starshipClassId);

const showPlayButton = ref(props.showPlayButton);

// -- Computed properties --

const starshipClassColor = computed(() => {

  if (classList.value && classId.value) {

    // Get the starship class from its id
    const starshipClass = classList.value.find(element => element.id === classId.value);

    // If the class has been found
    if (starshipClass) {
      return starshipClass.color;
    }
  }

  return '';

});

const starshipClassName = computed(() => {

  if (classList.value && classId.value) {

    // Get the starship class from its id
    const starshipClass = classList.value.find(element => element.id === classId.value);

    // If the class has been found
    if (starshipClass) {
      return starshipClass.name;
    }
  }

  return '';

});

const starshipClassSpeed = computed(() => {

  if (classList.value && classId.value) {

    // Get the starship class from its id
    const starshipClass = classList.value.find(element => element.id === classId.value);

    // If the class has been found
    if (starshipClass) {
      return starshipClass.speed;
    }
  }

  return '';

});

const starshipClassFuelCapacity = computed(() => {

  if (classList.value && classId.value) {

    // Get the starship class from its id
    const starshipClass = classList.value.find(element => element.id === classId.value);

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
    class="starship-card"
    :style="{ '--card-corner-color': starshipClassColor }">

    <span class="starship-card-title">{{ starshipName }}</span>
    <table class="starship-card-stats">
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
           <td>Fuel capacity</td>
           <td>{{ starshipClassFuelCapacity }} kg</td>
        </tr>
        <tr>
          <td>Fuel left</td>
          <td>{{ starshipFuelLeft }} kg</td>
        </tr>
      </tbody>
     </table>
    <button
      v-if="showPlayButton"
      class="button play-button" 
      @click="emit('selectedStarshipId', starshipPublicId)"
    >
      Play
    </button>

    </div>

</template>

<style>
/* -- Starships cards -- */
.starship-card {
  background-color: var(--content-box-bg-color);
  border: 1px solid var(--main-border-color);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 275px;
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.starship-card:hover {
  cursor: pointer;
  transform: translate(5px, -5px);
  filter: drop-shadow(-8px 8px 1px var(--main-border-color));
  transition: 200ms;
}

/* Card title */
.starship-card-title {
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
  border-bottom: 1px solid var(--main-border-color);
  padding-bottom: 5px;
}

/* Stats table */
.starship-card-stats {
  margin-top: 16px;
  border-collapse: collapse;
}

/* Table borders */
.starship-card-stats tr:not(:last-of-type) {
  border-bottom: 1px solid var(--main-border-color);
}

.starship-card-stats td:first-of-type {
  border-right: 1px solid var(--main-border-color);
  font-weight: bold;
}

/* Padding and text alignment */
.starship-card-stats td {
  padding: 10px 3px;
}

.starship-card-stats td:last-of-type {
  text-align: right;
}

/* Changes for mobile version */
@media screen and (max-width: 355px) {
  .starship-card {
    width: auto;
    min-width: 200px;
    max-width: 275px;
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