<script setup>
import { computed, watch, inject } from 'vue';
import { animateNumber } from '@/components/dashboard/animate-number.js';

const props = defineProps({
  starshipInfo: Object,
  refuelAnimationData: Object
});

const starshipClassesList = inject('starshipClassesList');

// -- Computed properties --

const starshipClassColor = computed(() => {
  return starshipClassesList.value.find(element => element.id === props.starshipInfo.starshipClassId).color;
});

const starshipClassName = computed(() => {
  return starshipClassesList.value.find(element => element.id === props.starshipInfo.starshipClassId).name;
});

const starshipClassSpeed = computed(() => {
  return starshipClassesList.value.find(element => element.id === props.starshipInfo.starshipClassId).speed;
});

const starshipClassFuelCapacity = computed(() => {
  return starshipClassesList.value.find(element => element.id === props.starshipInfo.starshipClassId).fuelCapacity;
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
    <tbody>
      <tr>
        <td>Name</td>
        <td>{{ starshipInfo.name }}</td>
      </tr>
      <tr>
        <td>Class</td>
        <td>
          {{ starshipClassName }} 
          <div
            class="starship-class-color"
            :style="{ '--starship-class-color': starshipClassColor }" 
          >
          </div>
        </td>
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
  border: 0;
  border-spacing: 0;
}

#starship-stats tbody {
  background-color: var(--table-bg-color);
}

#starship-stats td {
  border: 1px solid var(--main-border-color);
  /* Prevents double borders in table cells */
  border-bottom: 0;
  padding: 12px 24px;
}

@media screen and (max-width: 480px) {
  #starship-stats {
    width: 95vw;
  }

  #starship-stats td {
    padding: 12px 12px;
  }
}

#starship-stats td:first-of-type {
  font-weight: bold;
}

#starship-stats td:first-child {
  /* Prevents double borders in table cells */
  border-right: 0;
}

#starship-stats td:last-of-type {
  overflow-wrap: anywhere;
}

/* -- Rounds table corners -- */

/* Top left corner */
#starship-stats tr:first-of-type td:first-child {
  border-top-left-radius: 10px;
}

/* Top right corner */
#starship-stats tr:first-of-type td:last-child {
  border-top-right-radius: 10px;
}

/* Bottom left corner */
#starship-stats tr:last-of-type td:first-child {
  border-bottom: 1px solid var(--main-border-color);
  border-bottom-left-radius: 10px;
}

/* Bottom right corner */
#starship-stats tr:last-of-type td:last-child {
  border-bottom: 1px solid var(--main-border-color);
  border-bottom-right-radius: 10px;
}

.starship-class-color {
  display: inline-block;
  vertical-align: middle;
  height: 13px;
  width: 13px;
  background-color: var(--starship-class-color);
  border: 1px solid black;
  border-radius: 3px;
}
</style>