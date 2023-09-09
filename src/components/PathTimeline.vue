<script setup>
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
  transition: transform 1s linear;
}

#ship-svg:hover {
  /* -4px to compensate for the margin on .location-path */
  transform: translateX(calc(var(--location-dot-size) + var(--location-path-width) - 4px));
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