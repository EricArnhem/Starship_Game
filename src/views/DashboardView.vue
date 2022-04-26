<script setup>
import AlertScreen from '../components/AlertScreen.vue';
import StatsTable from '../components/StatsTable.vue';

</script>

<template>
  <AlertScreen />
  <div id="starship-data">
    <StatsTable />
  </div>
</template>

<style>
#starship-data {
  display: flex;
  justify-content: center;
}
</style>