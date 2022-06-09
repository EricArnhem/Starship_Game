<script setup>
import { reactive, ref, watch, computed } from 'vue'
import StarshipForm from '@/components/StarshipForm.vue';
import StarshipDeleteButton from '@/components/StarshipDeleteButton.vue';
import ClassesLegend from '@/components/ClassesLegend.vue';
import MyModal from '@/components/modal/MyModal.vue';
import { modalOpen, openModal } from '@/components/modal/state';

import starshipClassesData from '@/data/starshipClassesData.json';
import starshipsData from '@/data/starshipsData.json';

// Starship classes list
const starshipClasses = reactive(starshipClassesData);

// List of existing Starships
const starshipList = reactive(starshipsData);

// true if the form is in update mode
const updateForm = ref(false);

// Values used to fill the form
const formStarshipName = ref('');
const formStarshipClass = ref('');

// -- Methods --

// Opens the Update form with the correct starship values
function openUpdateForm(starshipName) {
  // If the starship name provided has a matching starship
  if (starshipList.hasOwnProperty(starshipName)) {
    // We give the starship's info to the form variables
    formStarshipName.value = starshipName;
    formStarshipClass.value = starshipList[starshipName].Class;
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
  // Opens the form in Create mode
  updateForm.value = false;
  openModal();
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
  <ClassesLegend :starship-classes="starshipClasses" />

  <div class="starship-cards-container">

    <div
      class="starship-card"
      v-for="(starship, index) in starshipList"
      @click="openUpdateForm(index);"
      :key="index"
      :style="{ '--card-corner-color': starshipClasses[starship.Class].Color }">

      <span class="starship-card-title">{{ index }}</span>

      <table class="starship-card-stats">
        <tbody>
          <tr>
            <td>Class</td>
            <td>{{ starship.Class }}</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>{{ starshipClasses[starship.Class].Speed }} km/h</td>
          </tr>
          <tr>
            <td>Fuel capacity</td>
            <td>{{ starshipClasses[starship.Class]['Fuel capacity'] }} kg</td>
          </tr>
          <tr>
            <td>Fuel left</td>
            <td>{{ starship['Fuel left'] }} kg</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="starship-card"
      id="create-starship-card"
      @click="openCreateForm();">
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
          :starship-classes="starshipClasses"
          :update-form="updateForm"
          :form-starship-name="formStarshipName"
          :form-starship-class="formStarshipClass" />

      </template>

      <template #footer v-if="updateForm">
        <StarshipDeleteButton />
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
@media (max-width: 355px) {
  #create-starship-card {
    max-width: 240px;
  }
}

/* Colored corners depending on the starship class */
.starship-card:after {
  content: "";
  position: absolute;
  margin: -50px;
  width: 60px;
  height: 60px;
  transform: rotate(45deg);
  background-color: var(--card-corner-color);
}

/* Removes the corner on the Create starship card */
#create-starship-card:after {
  content: none;
}
</style>