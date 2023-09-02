<script setup>
import { ref, inject } from 'vue';

const emit = defineEmits([
  'starshipListFilter'
]);

// Starships Data
const starshipClassesList = inject('starshipClassesList');
const starshipList = inject('starshipList');

const selectedClassId = ref(0);

// -- Methods --

// Checks if the selected id is the same or different from the last one selected
function checkClassId(classId) {

  // Get the old value (not modified yet)
  let lastSelectedClassId = selectedClassId.value;

  // If the ids are different (new class selected)
  if (classId !== lastSelectedClassId) {

    // Save the new value into the variable
    selectedClassId.value = classId;

  } else {
    // If the values are the same
    // This will tell filterStarshipList() to send an empty array instead of filtering
    selectedClassId.value = 0;

  }

  // Calls the filter method with the value determined
  filterStarshipList(selectedClassId.value);

}

// Filters starships by the class provided (sends (emit) empty array if classId = 0)
function filterStarshipList(classId) {

  // Sends empty array to tell the parent component to display the full starship list
  if (classId === 0) {

    emit('starshipListFilter', []);

  } else {

    // Get a filtered list containing only starships of the selected class
    const filteredList = starshipList.value.filter((starship) => starship.starshipClassId === classId);

    // Send that list to the parent component
    emit('starshipListFilter', filteredList);

  }

}

</script>

<template>
  <div id="starship-classes-legend">
    <div
      class="starship-class-legend"
      :class="{ 'highlight-class': selectedClassId === starshipClass.id }"
      v-for="(starshipClass) in starshipClassesList"
      :key="starshipClass.id"
      @click="checkClassId(starshipClass.id)"
    >

      <span>{{ starshipClass.name }}</span>
      <div
        class="starship-class-color"
        :style="{ '--starship-class-color': starshipClass.color }"
      >
      </div>
      
    </div>
  </div>
</template>

<style scoped>
#starship-classes-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
}

.starship-class-legend {
  display: flex;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 5px;
  font-size: 1.1em;
  padding: 4px;
  cursor: pointer;
  user-select: none;
  /* Safari */
  -webkit-user-select: none;
}

.starship-class-legend:last-child {
  margin-right: 0;
}

@media only screen and (min-width: 901px) {
  .starship-class-legend:hover {
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px;
    transition: .1s;
  }
}

.starship-class-color {
  display: inline-block;
  height: 15px;
  width: 15px;
  margin-left: 5px;
  background-color: var(--starship-class-color);
  border: 1px solid black;
  border-radius: 3px;
}

.highlight-class {
  border-radius: 5px;
  box-shadow: 0px 0px 5px 1px;
}
</style>