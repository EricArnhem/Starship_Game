<script setup>
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
        <td>Falcon</td>
      </tr>
      <tr>
        <td>Speed</td>
        <td>25000 km/h</td>
      </tr>
      <tr>
        <td>Fuel capacity</td>
        <td>5000 kg</td>
      </tr>
      <tr>
        <td>Fuel left</td>
        <td>3500 kg</td>
      </tr>
    </tbody>
  </table>

</template>

<style>
#starship-stats,
#starship-stats th,
#starship-stats td {
  width: 400px;
  border: 1px solid aliceblue;
  border-collapse: collapse;
}

#starship-stats th,
#starship-stats td {
  padding: 0.7rem 1.5rem;
}

#starship-stats td:first-of-type {
  font-weight: bold;
}

#starship-stats thead {
  background-color: #222368;
}

#starship-stats tbody {
  background-color: #2a2a2a;
}
</style>