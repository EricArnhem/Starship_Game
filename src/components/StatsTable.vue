<script setup>
const props = defineProps({
  starshipInfo: Object,
  starshipClassesList: Array
});

// -- Methods --

// Returns the starship class color by providing the classID
function getStarshipClassColor(starshipClassId) {

// If the array is not empty (prevents error when array is briefly empty)
if (props.starshipClassesList.length) {
  return props.starshipClassesList.find(element => element.id === starshipClassId).color;
}

}

// Returns the starship class name by providing the classID
function getStarshipClassName(starshipClassId) {

// If the array is not empty (prevents error when array is briefly empty)
if (props.starshipClassesList.length) {
  return props.starshipClassesList.find(element => element.id === starshipClassId).name;
}

}

// Returns the starship class speed by providing the classID
function getStarshipClassSpeed(starshipClassId) {

// If the array is not empty (prevents error when array is briefly empty)
if (props.starshipClassesList.length) {
  return props.starshipClassesList.find(element => element.id === starshipClassId).speed;
}

}

// Returns the starship class fuel capacity by providing the classID
function getStarshipClassFuelCapacity(starshipClassId) {

// If the array is not empty (prevents error when array is briefly empty)
if (props.starshipClassesList.length) {
  return props.starshipClassesList.find(element => element.id === starshipClassId).fuelCapacity;
}

}

</script>

<template>

  <table id="starship-stats">
    <thead
    :style="{ '--starship-class-color': getStarshipClassColor(starshipInfo.starshipClassId) }">
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
        <td>{{ getStarshipClassName(starshipInfo.starshipClassId) }}</td>
      </tr>
      <tr>
        <td>Speed</td>
        <td>{{ getStarshipClassSpeed(starshipInfo.starshipClassId) }} km/h</td>
      </tr>
      <tr>
        <td>Fuel capacity</td>
        <td>{{ getStarshipClassFuelCapacity(starshipInfo.starshipClassId) }} kg</td>
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