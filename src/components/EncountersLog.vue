<script setup>
</script>

<template>

  <div id="starship-encounters">
      <h3>Encounters log</h3>
      <div id="starship-encounters-choices">
        <p id="starship-encounters-message">You have encountered a foreign ship.</p>
        <ul id="starship-encounters-choices-list">
          <li><button class="button">Option A</button></li>
          <li><button class="button">Option B</button></li>
          <li><button class="button">Option C</button></li>
        </ul>
      </div>
    </div>
    
</template>

<style>
#starship-encounters {
  width: 100%;
}

#starship-encounters-message {
  font-size: 1.1em;
  text-align: center;
}

#starship-encounters-choices {
  width: fit-content;
  margin: auto;
}

#starship-encounters-choices-list {
  list-style: none;
  padding: 0;
}

#starship-encounters-choices-list button {
  width: 100%;

  margin: 0;
  margin-bottom: 10px;
}
</style>