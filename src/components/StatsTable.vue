<script setup>
defineProps({
  starshipName: String,
  starshipInfo: Object,
  starshipClasses: Object
});
</script>

<template>

  <table id="starship-stats">
    <thead>
      <tr>
        <th colspan="2">Starship stats</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Name</td>
        <td>{{ starshipName }}</td>
      </tr>
      <tr>
        <td>Class</td>
        <td>{{ starshipInfo.Class }}</td>
      </tr>
      <tr>
        <td>Speed</td>
        <td>{{ starshipClasses[starshipInfo.Class].Speed }} km/h</td>
      </tr>
      <tr>
        <td>Fuel capacity</td>
        <td>{{ starshipClasses[starshipInfo.Class]['Fuel capacity'] }} kg</td>
      </tr>
      <tr>
        <td>Fuel left</td>
        <td>{{ starshipInfo['Fuel left'] }} kg</td>
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
  background-color: #222368;
}

#starship-stats tbody {
  background-color: var(--table-bg-color);
}
</style>