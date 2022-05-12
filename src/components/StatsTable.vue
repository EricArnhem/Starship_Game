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
#starship-stats {
  width: 70vw;
  max-width: 400px;
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
  background-color: var(--content-box-bg-color);
}
</style>