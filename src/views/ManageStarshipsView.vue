<script setup>
import StarshipForm from '../components/StarshipForm.vue';
</script>

<template>
  <h1>Manage your Starships</h1>

  <div class="starship-cards-container">

    <div class="starship-card">
      <span class="starship-card-title">Falcon</span>

      <table class="starship-card-stats">
        <tbody>
          <tr>
            <td>Class</td>
            <td>Fighter</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>70000 km/h</td>
          </tr>
          <tr>
            <td>Fuel capacity</td>
            <td>1500 kg</td>
          </tr>
          <tr>
            <td>Fuel left</td>
            <td>1000 kg</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="starship-card">
      <span class="starship-card-title">Mantis</span>

      <table class="starship-card-stats">
        <tbody>
          <tr>
            <td>Class</td>
            <td>Explorer</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>50000 km/h</td>
          </tr>
          <tr>
            <td>Fuel capacity</td>
            <td>3000 kg</td>
          </tr>
          <tr>
            <td>Fuel left</td>
            <td>2300 kg</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="starship-card">
      <span class="starship-card-title">Slug</span>

      <table class="starship-card-stats">
        <tbody>
          <tr>
            <td>Class</td>
            <td>Hauler</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>30000 km/h</td>
          </tr>
          <tr>
            <td>Fuel capacity</td>
            <td>5000 kg</td>
          </tr>
          <tr>
            <td>Fuel left</td>
            <td>3200 kg</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="starship-card" id="create-starship-card">
      <span id="create-starship-card-title">Create a new Starship</span>
      <img id="plus-svg" src="@/images/plus.svg" title="Create a new Starship" alt="Plus icon">
    </div>

  </div>

  <!-- Starship Form to use in the modal -->
  <div class="wrapper-content-box" v-if="false">
    <div class="content-box">
      <h2>Create a new Starship</h2>
      <div class="body-content-box">
        <StarshipForm />
      </div>
    </div>
  </div>

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
</style>