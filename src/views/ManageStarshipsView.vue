<script setup>
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, watch, computed, onMounted } from 'vue'

// API methods
import { getStarships } from "@/api/methods/starship.js";
import { getStarshipClasses } from "@/api/methods/starship-class.js";

// Vue components
import StarshipForm from '@/components/StarshipForm.vue';
import ClassesLegend from '@/components/ClassesLegend.vue';
import StarshipCard from '@/components/cards/StarshipCard.vue';

import MyModal from '@/components/modal/MyModal.vue';
import { modalOpen, openModal } from '@/components/modal/state';

const route = useRoute();
const router = useRouter();

const state = reactive({
  starshipClassesList: [],
  starshipList: []
})

const showModalForm = ref(true);
const showSubmitResult = ref(false);

let submitResultMessage = ref('');
let submitResultStatus = ref('');

let filteredStarshipList = ref([]);

// When component is mounted
onMounted(() => {
  // Checks if we accessed the create path and if so opens the Create form modal
  if (route.path === '/manage-starships/create') {
    openCreateForm();
  }

  // Getting the starship classes
  getStarshipClasses()
    .then(response => {
      state.starshipClassesList = response.data;
    })
    .catch(error => {
      console.log(error);
    });

  // Getting the starships
  getStarships()
    .then(response => {
      state.starshipList = response.data;
    })
    .catch(error => {
      console.log(error);
    });

});

// true if the form is in update mode
const updateForm = ref(false);


// Values used to fill the form
const formStarshipPublicId = ref(''); // Used to select the starship to update
const formStarshipName = ref('');
const formStarshipClass = ref('');

// -- Methods --

function refreshStarshipsList() {
  getStarships()
    .then(response => {
      state.starshipList = response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function clearSubmitResult() {

  // Show the form if it was hidden
  showModalForm.value = true;
  // Hides the submit result
  showSubmitResult.value = false;

  // Clear the result message/status
  submitResultMessage.value = '';
  submitResultStatus.value = '';

}

// Opens the Update form with the correct starship values
function openUpdateForm(starshipPublicId, starshipClassId) {
  // If the starship publicId provided has a matching starship
  if (state.starshipList.find(element => element.publicId === starshipPublicId)) {
    // We give the starship's info to the form variables
    formStarshipPublicId.value = starshipPublicId;
    formStarshipName.value = state.starshipList.find(element => element.publicId === starshipPublicId).name;
    formStarshipClass.value = state.starshipClassesList.find(element => element.id === starshipClassId).name;

    clearSubmitResult();

    // Opens the form in Update mode
    updateForm.value = true;
    openModal();
  }
}

// Opens the Create form
function openCreateForm() {
  // Resets the form values
  formStarshipName.value = '';
  formStarshipClass.value = '';

  clearSubmitResult();

  // Opens the form in Create mode
  updateForm.value = false;
  openModal();
}

// Display the result message of a create/update requests + refresh starships list
function handleSubmitResult(submitResultData, requestType) {

  // Saving values into local variables
  submitResultMessage.value = submitResultData.message;
  submitResultStatus.value = submitResultData.status;

  // Refresh starships list
  refreshStarshipsList();

  // If request was successful
  if (submitResultData.status === 200) {

    // Hides form content only if the request was not an 'update' request
    if (requestType !== 'update') {
      showModalForm.value = false;
    }

  }

  // Display the submit result
  showSubmitResult.value = true;

}

// -- Computed properties --

// Gets the right modal title depending on if we are Updating or Creating
const modalTitle = computed(() => {
  if (updateForm.value === true) {
    return 'Update a Starship';
  } else {
    return 'Create a new Starship';
  }
});

const displayStarshipList = computed(() => {

  // If a class filter is selected (filtered list empty)
  if (filteredStarshipList.value.length === 0) {

    // Returns the full starship list (original)
    return state.starshipList;

  } else {
    // If a class filter a selected

    // Returns the filtered list
    return filteredStarshipList.value;

  }

});

// -- Watchers --

// Applies a class to prevent scrolling the body when the modal is opened
watch(modalOpen, (modalOpen) => {
  if (modalOpen === true) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});

</script>

<template>
  <h1>Manage your Starships</h1>
  <ClassesLegend 
  :starship-classes-list="state.starshipClassesList" 
  :starship-list="state.starshipList"
  @starship-list-filter="(filteredList) => filteredStarshipList = filteredList" />

  <div class="starship-cards-container">

    <StarshipCard 
      v-for="(starship) in displayStarshipList"
      @click="openUpdateForm(starship.publicId, starship.starshipClassId)"
      :key="starship.publicId"
      :starship-stats="starship"
      :starship-classes-list="state.starshipClassesList" 
      :show-play-button="false"
      @selected-starship-id="(starshipId) => startGame(starshipId)"
    />

    <div
      class="starship-card"
      id="create-starship-card"
      @click="openCreateForm(); router.push('/manage-starships/create')">
      <span id="create-starship-card-title">Create a new Starship</span>
      <img id="plus-svg" src="@/images/plus.svg" title="Create a new Starship" alt="Plus icon">
    </div>

  </div>

  <!-- Modal with the Starship Form -->
  <Teleport to="body">

    <MyModal>
      <template #title>
        {{ modalTitle }}
      </template>

      <template #body>

        <StarshipForm
          :starship-classes-list="state.starshipClassesList"
          :update-form="updateForm"
          :form-starship-public-id="formStarshipPublicId"
          :form-starship-name="formStarshipName"
          :form-starship-class="formStarshipClass"
          @starship-created="handleSubmitResult"
          @starship-updated="handleSubmitResult"
          @starship-deleted="handleSubmitResult"
          @clear-submit-result="clearSubmitResult"
          v-if="state.starshipClassesList.length && showModalForm" />

        <span
          id="submit-result"
          :class="{ 'form-success': submitResultStatus === 200, 'form-error': submitResultStatus !== 200 }"
          v-if="showSubmitResult">
          {{ submitResultMessage }}
        </span>

      </template>

    </MyModal>
  </Teleport>

</template>

<style scoped>
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

/* Removes the corner on the Create starship card */
#create-starship-card:after {
  content: none;
}

.form-error {
  color: #ED4337;
  font-size: 14px;
  margin-top: 10px;
}

.form-success {
  color: #37ed5e;
  font-size: 14px;
  margin-top: 10px;
}

#submit-result,
#delete-error {
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
}
</style>