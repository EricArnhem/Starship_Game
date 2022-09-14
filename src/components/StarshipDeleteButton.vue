<script setup>
import { ref } from 'vue'

// API methods
import { deleteStarship } from "../api/methods/starship.js";

const props = defineProps({
  starshipPublicId: String
});

const emit = defineEmits(['starshipDeleted']);

const deleteButtonClick = ref(false);

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

    <button
      type="button"
       class="button"
       id="delete-button"
       title="Delete the Starship"
       @click="deleteButtonClick = true">
      <img src="@/images/trashcan.svg" alt="trashcan" id="trashcan-svg">
    </button>

    <!-- <div id="delete-verification" v-if="deleteButtonClick">
      <span>Are you sure?</span>
      <div id="delete-verification-buttons">
        <button
          class="button"
          id="delete-button-yes"
          @click="handleDelete()">
          Yes
        </button>
        <button
          class="button"
          id="delete-button-no"
          @click="deleteButtonClick = false">
          No
        </button>
      </div>
    </div> -->
    
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
</style>