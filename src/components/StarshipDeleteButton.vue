<script setup>
import { ref } from 'vue'

const deleteButtonClick = ref(false);
</script>

<template>
  <div id="delete-starship">
    <button
      class="button"
      id="delete-button"
      @click="deleteButtonClick = true">
      <img src="@/images/warning-sign-color.svg" alt="warning-sign" id="warning-sign-svg">
      Delete the Starship
    </button>
  </div>
  <div id="delete-verification" v-if="deleteButtonClick">
    <span>Are you sure?</span>
    <div id="delete-verification-buttons">
      <button
        class="button"
        id="delete-button-yes">
        Yes
      </button>
      <button
        class="button"
        id="delete-button-no"
        @click="deleteButtonClick = false">
        No
      </button>
    </div>
  </div>
</template>

<style>
#delete-starship {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

#warning-sign-svg {
  height: 17px;
  margin-right: 5px;
  margin-top: -1px;
}

#delete-button {
  display: flex;
  justify-content: center;
  width: 50%;
  margin-left: 20px;
  margin-right: 20px;
}

#delete-verification {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}

#delete-verification-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
}

#delete-verification-buttons button {
  margin: initial;
  width: 30%;
}

#delete-button-yes {
  background-color: #1e8144;
  margin-right: 10px !important;
}

#delete-button-yes:hover {
  background-color: #249650;
}

#delete-button-no {
  background-color: #b23229;
}

#delete-button-no:hover {
  background-color: #d53c32;
}

/* Media query for mobile */
@media (max-width: 480px) {
  #delete-button {
    width: 100%;
  }
}
</style>