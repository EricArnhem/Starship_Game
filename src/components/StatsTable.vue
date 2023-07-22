<script setup>
import { computed } from 'vue';

const props = defineProps({
  starshipInfo: Object,
  starshipClassesList: Array
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
        <td>{{ starshipInfo.fuelLeft }} kg</td>
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
    width: auto;
    margin: 0 10px;
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