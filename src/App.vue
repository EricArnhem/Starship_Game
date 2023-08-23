<script setup>
import { RouterView } from 'vue-router'
import TheNavbar from './components/navbar/TheNavbar.vue';
</script>

<template>
  <header>
    <TheNavbar />
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>
@font-face {
  font-family: "Rubik";
  src: url("./fonts/Rubik-VariableFont_wght.ttf") format("truetype");
  font-style: normal;
}

:root {
  --main-font-family: Rubik, sans-serif;
  --main-bg-color: #181818;
  --main-text-color: #ebebeb;
  --main-border-color: rgba(146, 146, 146, 0.75);
  --content-box-bg-color: #2a2a2a;
  --button-bg-color: #242424;
  --button-bg-hover-color: #3a3a3a;
  --button-bg-active-color: #474747;
  --table-bg-color: #242424;
}

body {
  display: flex;
  min-height: 100vh;
  background-color: var(--main-bg-color);
  font-family: var(--main-font-family);
  color: var(--main-text-color);
  margin: 0;
}

#app {
  display: flex;
  flex-direction: row;
  flex: auto;
}

main {
  display: flex;
  flex: auto;
  flex-direction: column;
  padding-bottom: 30px;
  /* Compensate for the navbar height */
  margin-top: 50px;
}

@media (max-width: 480px) {
  main {
    padding-bottom: 0;
  }
}

h1 {
  text-align: center;
  /* Padding equal to the width of the open/close navbar button */
  padding-left: 35px;
  padding-right: 35px;
}

h2 {
  border-left: 2px solid var(--main-border-color);
  padding-left: 10px;
  margin-top: 0;
}

h3 {
  font-size: 1.4em;
  font-weight: bold;
  text-align: center;
  padding-left: 25px;
  padding-right: 25px;
}

h1,
h3 {
  border-bottom: 2px solid;
  border-image: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%) 1;
  width: fit-content;
  margin-inline: auto;
  padding-bottom: 10px;
}

/* Global classes */
.text-center {
  text-align: center;
}

/* Used on the body when the modal is opened */
.overflow-hidden {
  overflow: hidden;
}

.button {
  padding: 10px 6px;
  width: 50%;
  margin: auto;
  margin-top: 25px;
  font-size: 1rem;
  font-family: inherit;
  color: inherit;
  background-color: var(--button-bg-color);
  border: 1px solid var(--main-border-color);
  border-radius: 3px;
}

.button:hover:not([disabled]) {
  background-color: var(--button-bg-hover-color);
  cursor: pointer;
  transition: 0.1s;
}

.button:active:not([disabled]) {
  background-color: var(--button-bg-active-color);
  transition: 0.1s;
}

.button:disabled {
  opacity: 0.5;
  transition: 0.1s;
  cursor: not-allowed;
}

.wrapper-content-box {
  display: flex;
  justify-content: center;
}

.content-box {
  background-color: var(--content-box-bg-color);
  border: 1px solid var(--main-border-color);
  border-radius: 10px;
  padding: 30px;
  margin: 0 10px;
  box-sizing: border-box;
}

.body-content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vw;
  min-width: 100%;
  max-width: 650px;
}

@media (max-width: 480px) {
  .content-box {
    margin: 0;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
    padding: 20px;
  }

  .body-content-box {
    width: 100%;
  }
}

/* -- Starships cards -- */
.starship-cards-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.starship-card {
  background-color: var(--content-box-bg-color);
  border: 1px solid var(--main-border-color);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 275px;
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.starship-card:hover {
  cursor: pointer;
  transform: translate(5px, -5px);
  filter: drop-shadow(-8px 8px 1px var(--main-border-color));
  transition: 200ms;
}

/* Card title */
.starship-card-title {
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
  border-bottom: 1px solid var(--main-border-color);
  padding-bottom: 5px;
}

/* Stats table */
.starship-card-stats {
  margin-top: 16px;
  border-collapse: collapse;
}

/* Table borders */
.starship-card-stats tr:not(:last-of-type) {
  border-bottom: 1px solid var(--main-border-color);
}

.starship-card-stats td:first-of-type {
  border-right: 1px solid var(--main-border-color);
  font-weight: bold;
}

/* Padding and text alignment */
.starship-card-stats td {
  padding: 10px 3px;
}

.starship-card-stats td:last-of-type {
  text-align: right;
}

/* Changes for mobile version */
@media (max-width: 355px) {
  .starship-card {
    width: auto;
    min-width: 200px;
    max-width: 275px;
  }
}
</style>
