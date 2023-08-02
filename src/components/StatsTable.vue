<script setup>
import { computed, watch } from 'vue';
import { animateNumber } from '@/components/dashboard/animate-number.js';

const props = defineProps({
  starshipInfo: Object,
  starshipClassesList: Array,
  refuelAnimationData: Object
});

// -- Computed properties --

const starshipClassColor = computed(() => {
  return props.starshipClassesList.find(element => element.id === props.starshipInfo.starshipClassId).color;
});

const starshipClassName = computed(() => {
  return props.starshipClassesList.find(element => element.id === props.starshipInfo.starshipClassId).name;
});

const starshipClassSpeed = computed(() => {
  return props.starshipClassesList.find(element => element.id === props.starshipInfo.starshipClassId).speed;
});

const starshipClassFuelCapacity = computed(() => {
  return props.starshipClassesList.find(element => element.id === props.starshipInfo.starshipClassId).fuelCapacity;
});

// -- Watchers --
// Animate the fuelLeft value when the props containing the animation data changes
watch(() => props.refuelAnimationData, (refuelAnimationData) => {
  const fuelLeftElement = document.getElementById('stats-fuel-left');

  const fuelLeft = refuelAnimationData.fuelLeft;
  const fuelCapacity = refuelAnimationData.fuelCapacity;
  const refuelDuration = refuelAnimationData.refuelDuration;

  animateNumber(fuelLeftElement, fuelLeft, fuelCapacity, refuelDuration);
});

</script>

<template>

  <table id="starship-stats">
    <thead
    :style="{ '--starship-class-color': starshipClassColor }">
      <tr>
        <th colspan="2">Starship stats</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Name</td>
        <td>{{ starshipInfo.name }}</td>
      </tr>
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
        <td><span id="stats-fuel-left">{{ starshipInfo.fuelLeft }}</span> kg</td>
      </tr>
    </tbody>
  </table>

</template>

<style>
#starship-stats {
  width: 70vw;
  max-width: 400px;
  margin: auto;
}

#starship-stats,
#starship-stats th,
#starship-stats td {
  border: 1px solid var(--main-border-color);
  border-collapse: collapse;
}

#starship-stats th,
#starship-stats td {
  padding: 12px 24px;
}

@media (max-width: 480px) {
  #starship-stats {
    width: 95vw;
  }

  #starship-stats th,
  #starship-stats td {
    padding: 12px 12px;
  }
}

#starship-stats td:first-of-type {
  font-weight: bold;
}

#starship-stats td:last-of-type {
  overflow-wrap: anywhere;
}

#starship-stats thead {
  background-color: var(--starship-class-color);
}

#starship-stats tbody {
  background-color: var(--table-bg-color);
}
</style>