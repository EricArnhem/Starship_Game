<script setup>
import { ref, watch } from 'vue';

const locationCount = ref(0);

// -- Methods --

function nextLocation() {

  let timelineElement = document.getElementById('timeline');
  // Getting elements sizes from CSS to calculate the distance for the ship to move
  let locationDotSize = parseInt(getComputedStyle(timelineElement).getPropertyValue("--location-dot-size"));
  let locationPathWidth = parseInt(getComputedStyle(timelineElement).getPropertyValue("--location-path-width"));

  // -4 to compensate for the margin on .location-path 
  let shipAnimationWidth = (locationDotSize + locationPathWidth - 4) * locationCount.value;

  const ship = document.getElementById('ship-svg');

  // Animation the ship up to the location wanted
  ship.style.transform = `translateX(${shipAnimationWidth}px)`;

}

// -- Watchers --

// Resets locationCount when it reaches 5 (trying to move while on last location)
watch(locationCount, (count) => {
  if (count > 4) {
    locationCount.value = 0;
    nextLocation();
  }
});

</script>

<template>

  <div id="timeline">
    <div id="ship-container">
      <img id="ship-svg" src="@/images/rocket-horizontal.svg" />
      <div class="location">
        <div class="location-dot"></div>
        <div class="location-path"></div>
      </div>
      <div class="location">
        <div class="location-dot"></div>
        <div class="location-path"></div>
      </div>
      <div class="location">
        <div class="location-dot"></div>
        <div class="location-path"></div>
      </div>
      <div class="location">
        <div class="location-dot"></div>
        <div class="location-path"></div>
      </div>
      <div class="location">
        <div class="location-dot"></div>
      </div>
    </div>
  </div>

  <button @click="locationCount++; nextLocation()" >Move</button>

</template>

<style>
#timeline {
  --location-dot-size: 30px;
  --location-path-width: 100px;
  --location-dot-color: #2d2d8d;
  --location-dot-center-color: #b8b8b8;
  --location-path-color: #474747;
  /* -4px to compensate for the margin on .location-path */
  --ship-animation-width: calc(var(--location-dot-size) + var(--location-path-width) - 4px);
}

#timeline {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
}

#ship-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

#ship-svg {
  width: 50px;
  position: absolute;
  left: -12px;
  z-index: 3;
  transition: transform 1s linear;
}

#ship-svg:hover {
  transform: translateX(var(--ship-animation-width));
}

.location {
  display: flex;
  align-items: center;
  width: fit-content;
}

.location-dot {
  height: var(--location-dot-size);
  width: var(--location-dot-size);
  background-color: var(--location-dot-color);
  box-shadow: inset 0px 0px 0px 4px var(--location-dot-center-color);
  border-radius: 50px;
  z-index: 2;
}

.location-path {
  width: var(--location-path-width);
  height: 10px;
  background-color: var(--location-path-color);
  z-index: 1;
  margin: 0 -2px;
}

/* Reduces path size on small screens */
@media screen and (max-width: 600px) {

  #timeline {
    --location-path-width: 70px;
    padding: 0;
  }

}

@media screen and (max-width: 480px) {

  #timeline {
    --location-path-width: 40px;
    padding: 0 15px;
  }

}
</style>