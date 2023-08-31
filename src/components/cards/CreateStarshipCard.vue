<script setup>
</script>

<template>
  <div id="create-starship-card" class="starship-card">
    <span id="create-starship-card-title">Create a new Starship</span>
    <img id="plus-svg" src="@/images/plus.svg" title="Create a new Starship" alt="Plus icon">
   </div>
</template>

<style>
#create-starship-card {
  justify-content: center;
  min-height: 245px;
}

#create-starship-card-title {
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
}

#plus-svg {
  margin-top: 20px;
  height: 85px;
}

/* Changes for mobile version */
@media screen and (max-width: 355px) {
  #create-starship-card {
    max-width: 240px;
  }
}
</style>