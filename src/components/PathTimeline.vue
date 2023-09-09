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

const locationCount = ref(0);

const pathDistance = 15000;

let shipTransitionTimeout;

// -- Lifecycle Hooks --

onMounted(() => {
  // Sets ship transition duration based on the current ship speed
  setTransitionDuration(shipTransitionDuration.value);

});

onUnmounted(() => {
  clearTimeout(shipTransitionTimeout);
})

// -- Methods --

// Changes the ship transition duration
function setTransitionDuration(duration) {

  const shipElement = document.getElementById('ship-svg');
  shipElement.style.transitionDuration = `${duration}s`;

}

// Moves the ship to the next location (dot)
function nextLocation() {

  let timelineElement = document.getElementById('timeline');
  // Getting elements sizes from CSS to calculate the distance for the ship to move
  let locationDotSize = parseInt(getComputedStyle(timelineElement).getPropertyValue("--location-dot-size"));
  let locationPathWidth = parseInt(getComputedStyle(timelineElement).getPropertyValue("--location-path-width"));

  // -4 to compensate for the margin on .location-path 
  let shipAnimationWidth = (locationDotSize + locationPathWidth - 4) * locationCount.value;

  const shipElement = document.getElementById('ship-svg');

  // Animation the ship up to the location wanted
  shipElement.style.transform = `translateX(${shipAnimationWidth}px)`;

  // Pause the engines when we arrived at the location
  shipTransitionTimeout = setTimeout(() => {

    emit('pauseEngines');

  }, shipTransitionDuration.value * 1000);

}

// -- Computed properties --

const starshipSpeed = computed(() => {
  return starshipClassesList.value.find(element => element.id === props.starshipInfo.starshipClassId).speed;
});

// Rounded duration used for the ship transition
const shipTransitionDuration = computed(() => {

  // Path distance / Ship speed
  let duration = pathDistance / starshipSpeed.value;
  let roundedDuration = Math.round(duration);
  return roundedDuration;

});

// -- Watchers --

// Resets locationCount and moves ship back to the start 
watch(locationCount, (count) => {

  // If we try to move while on last location
  if (count > 4) {
    // Resets locationCount
    locationCount.value = 0;
    // Moves the ship back to the start without transition
    setTransitionDuration(0);
    nextLocation();

  } else {
    setTimeout(() => {
      // Add back the default transition duration after a timeout otherwise the changed duration gets reverted too quickly
      setTransitionDuration(shipTransitionDuration.value);
    }, 100);
  }

});

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