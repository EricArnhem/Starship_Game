<script setup>
import { ref, watch, computed, inject, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  starshipInfo: Object,
  animateShip: Boolean
});

const emit = defineEmits([
  'resetAnimateShip',
  'pauseEngines'
]);

const starshipClassesList = inject('starshipClassesList');

const segmentCount = ref(0);
const locationCount = ref(0);

const pathDistance = 15000;

let shipTransitionTimeout;

// -- Lifecycle Hooks --

onMounted(() => {

  console.log(pathSegmentWidth.value);
  console.log(pathSegmentsCount.value);

  // Put the starship at the start if it was previously moved
  resetStarshipPosition();

});

onUnmounted(() => {
  clearTimeout(shipTransitionTimeout);
})

// -- Methods --

// Resets the starship's position back to the start without transition
function resetStarshipPosition() {
  const shipElement = document.getElementById('ship-svg');
  shipElement.style.transitionDuration = '0s';
  shipElement.style.transform = 'translate(0)';

  // Set back the default transition duration
  setTimeout(() => {
    shipElement.style.transitionDuration = '1s';
  }, 100);
}

// Moves the ship to the next location (dot)
function nextLocation() {

  // If we try to move while on the last location
  if (locationCount.value > 3) {

    // Resets locationCount
    locationCount.value = 0;

    // Moves the starship back to the start
    resetStarshipPosition()

  }

  segmentCount.value = segmentCount.value + 1;

  // Checks the segment count value to see if we arrived at a location
  if (segmentCount.value > pathSegmentsCount.value) {
    // If we arrived at a location, increases the location count
    locationCount.value = locationCount.value + 1
    // Resets the segment count
    segmentCount.value = 0;
  }

  const shipElement = document.getElementById('ship-svg');

  // Calculates width based on which segment we are on
  let width = pathSegmentWidth.value * segmentCount.value;

  // Animates the starship to the next segment
  shipElement.style.transform = `translateX(${width}px)`;

}

// -- Computed properties --

const starshipSpeed = computed(() => {
  return starshipClassesList.value.find(element => element.id === props.starshipInfo.starshipClassId).speed;
});

// Calculates the distance between two locations (dots)
const distanceBetweenLocations = computed(() => {

  // Selecting the #timeline element
  let timelineElement = document.getElementById('timeline');

  if (timelineElement) {

    // Getting elements sizes from CSS to calculate the distance for the ship to move
    let locationDotSize = parseInt(getComputedStyle(timelineElement).getPropertyValue("--location-dot-size"));
    let locationPathWidth = parseInt(getComputedStyle(timelineElement).getPropertyValue("--location-path-width"));

    // -4 to compensate for the margin on .location-path 
    let distance = (locationDotSize + locationPathWidth - 4);

    return distance;

  }

  return 0;

});

// Calcutates the number of segments (steps) between one dot to another
const pathSegmentsCount = computed(() => {

  // Ratio beetween Path distance & Starship speed
  let distanceSpeedRatio = pathDistance / starshipSpeed.value;
  let segmentCount = Math.round(distanceSpeedRatio);
  return segmentCount;

});

// Calculates the width of one segment
const pathSegmentWidth = computed(() => {

  return distanceBetweenLocations.value / pathSegmentsCount.value;

});


// -- Watchers --

// When the parent component tells us to start the animation (variable set to true)
watch(() => props.animateShip, () => {
  if (props.animateShip === true) {
    // Starts animation (going to next location)
    locationCount.value++;
    nextLocation();
    // Immediatly resets the variable used to start the animation (back to false)
    emit('resetAnimateShip');
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
      </div>
    </div>
  </div>

  <button @click="nextLocation()" >Move</button>

</template>

<style>
#timeline {
  --location-dot-size: 30px;
  --location-path-width: 70px;
  --location-dot-color: linear-gradient(333deg, #8339c5 0%, #3851d1 70%);
  --location-dot-center-color: #b8b8b8;
  --location-path-color: #474747;
}

#timeline {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
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
  transition-property: transform;
  transition-timing-function: linear;
  transition-duration: 1s;
}

.location {
  display: flex;
  align-items: center;
  width: fit-content;
}

.location-dot {
  height: var(--location-dot-size);
  width: var(--location-dot-size);
  background-image: var(--location-dot-color);
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

/* Reduces scale on small screens */
@media screen and (max-width: 480px) {

  #timeline {
    scale: 0.9;
    margin: 0;
  }

}
</style>