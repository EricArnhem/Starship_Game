<script setup>
import AlertScreen from '../components/AlertScreen.vue';
import StatsTable from '../components/StatsTable.vue';

</script>

<template>
  <AlertScreen />
  <div id="starship-data">
    <div id="starship-info">
      <p id="starship-name">Falcon</p>
      <StatsTable />
    </div>
  </div>
</template>

<style scoped>
#starship-data {
  display: flex;
  justify-content: center;
}

#starship-name {
  font-size: 1.4em;
  font-weight: bold;
  margin-top: 0;
  text-align: center;
  text-decoration: underline double 1px;
  text-underline-offset: 4px;
}
</style>