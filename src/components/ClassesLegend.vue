<script setup>
defineProps({
  starshipClasses: Object
})
</script>

<template>
  <div id="starship-classes-legend">
    <div
      class="starship-class-legend"
      v-for="(starshipClass, index) in starshipClasses"
      :key="index">
      <span>{{ index }}</span>
      <div
        class="starship-class-color"
        :style="{ '--starship-class-color': starshipClass.Color }">

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