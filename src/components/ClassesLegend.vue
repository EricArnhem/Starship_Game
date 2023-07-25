<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  starshipClassesList: Array,
  starshipList: Array
})

const emit = defineEmits([
  'starshipListFilter'
]);

let starshipFilterClassId = ref(0);

// -- Computed properties --

// Get a filtered version of the starship list
const filteredStarshipList = computed(() => {

  let starshipList = props.starshipList;

  // If we didn't select any class
  if (starshipFilterClassId.value === 0) {

    return starshipList; // Returns the original/unfiltered list

  } else {
    // If a class is selected, returns a filtered list that only contains starships of that class
    const filteredList = starshipList.filter((starship) => starship.starshipClassId === starshipFilterClassId.value);
    return filteredList

  }

});

// -- Watchers --

// Sends the starship list to the parents component
watch(starshipFilterClassId, () => {

  emit('starshipListFilter', filteredStarshipList)

}, { immediate: true });

</script>

<template>
  <div id="starship-classes-legend">
    <div
      class="starship-class-legend"
      v-for="(starshipClass) in starshipClassesList"
      :key="starshipClass.id"
      @click="starshipFilterClassId = starshipClass.id">
      <span>{{ starshipClass.name }}</span>
      <div
        class="starship-class-color"
        :style="{ '--starship-class-color': starshipClass.color }">

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
</style>