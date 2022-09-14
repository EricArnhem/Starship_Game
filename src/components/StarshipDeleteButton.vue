<script setup>
import { ref } from 'vue'

// API methods
import { deleteStarship } from "../api/methods/starship.js";

// Popover
import Popper from "vue3-popper";

const props = defineProps({
  starshipPublicId: String
});

const emit = defineEmits(['starshipDeleted']);

// -- Methods --
async function handleDelete() {

  // Getting starship public id passed as a prop
  let starshipPublicId = props.starshipPublicId;
  let requestType = 'delete';

  // Deleting the starship
  try {

    let result = await deleteStarship(starshipPublicId);

    if (result.status === 200) {
      // If starship has been deleted

      const submitResultData = {
        message: result.data.message,
        status: result.status
      }

      // Refresh starships list and sending result message + status + request type to the parent component
      emit('starshipDeleted', submitResultData, requestType);

    } else {
      // If error during deletion

      const submitResultData = {
        message: "Error while deleting the Starship.",
        status: result.response.status // Using .response because Error message has a different structure
      }

      // Refresh starships list and sending result message + status + request type to the parent component
      emit('starshipDeleted', submitResultData, requestType);
    }

  } catch (error) {
    console.log(error);
  }

}
</script>

<template>
  <div>
      
      <Popper arrow placement="bottom">
        <button
          type="button"
           class="button"
           id="delete-button"
           title="Delete the Starship">
          <img src="@/images/trashcan.svg" alt="trashcan" id="trashcan-svg">
        </button>

        <template #content="{ close }">

          <span>Do you want to delete the Starship?</span>
          <div id="delete-verification-buttons">
            <button
              type="button"
              class="button"
              id="delete-button-yes"
              @click="handleDelete()">
              Yes
            </button>
            <button
              type="button"
              class="button"
              id="delete-button-no"
              @click="close">
              No
            </button>
          </div>

        </template>
      </Popper>
    
  </div>
</template>

<style>
#trashcan-svg {
  height: 21px;
}

#delete-button {
  display: flex;
  width: auto;
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
  width: 50%;
  border: none;
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

/* Popper style */
:root {
  --popper-theme-background-color: var(--button-bg-color);
  --popper-theme-background-color-hover: var(--button-bg-color);
  --popper-theme-text-color: inherit;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 10px;
  --popper-theme-border-color: var(--main-border-color);
  --popper-theme-padding: 32px;
}

.popper {
  /* hacky fix to remove the horizontal scroll bar when popper is open*/
  inset: 0px auto auto -5px !important;
}
</style>