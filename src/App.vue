<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';

// Shows/Hides the navbar when changed
const showNavbar = ref(true);
</script>

<template>
  <header>
    <nav :class="{ 'nav-hidden': !showNavbar }">
      <ul id="navigation-links">
        <li>
          <RouterLink to="/"><img src="./images/dashboard.svg" title="Dashboard"></RouterLink>
        </li>
        <li>
          <RouterLink to="/manage-starships"><img src="./images/rocket.svg" title="Manage Starships"></RouterLink>
        </li>
      </ul>
      <span id="burger-button" @click="showNavbar = !showNavbar"></span>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>
:root {
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
  font-family: sans-serif;
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
}

@media (max-width: 480px) {
  main {
    padding-bottom: 0;
  }
}

h1 {
  text-align: center;
  text-decoration: underline double 1px;
  text-underline-offset: 9px;
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
  text-decoration: underline double 1px;
  text-underline-offset: 4px;
}

/* Navbar */
nav {
  height: 100%;
  width: 45px;
  border-right: 1px solid var(--main-border-color);
  box-shadow: 1px 0 1px var(--main-border-color);
  padding: 0 7px;
  position: relative;
  transition: margin 0.5s ease;
}

.nav-hidden {
  margin-left: -60px;
}

#burger-button {
  background-color: var(--content-box-bg-color);
  background-image: url(@/images/hamburger-menu.svg);
  background-size: 125%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 10px;
  margin-left: 53px;
  width: 35px;
  height: 55px;
  border: 1px solid var(--main-border-color);
  border-left: 0px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  cursor: pointer;
}

nav a {
  display: inline-block;
}

nav a.router-link-exact-active {
  filter: drop-shadow(3px 3px 2px #dddddd);
}

nav a:hover {
  filter: drop-shadow(3px 3px 2px #dddddd);
  transition: 0.1s;
}

#navigation-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

#navigation-links li {
  border-bottom: 1px solid rgba(146, 146, 146, 0.356);
  padding-top: 10px;
  padding-bottom: 5px;
}

#navigation-links li:last-of-type {
  border-bottom: none;
}

#navigation-links li img {
  display: block;
  height: 45px;
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
  color: inherit;
  background-color: var(--button-bg-color);
  border: 1px solid var(--main-border-color);
  border-radius: 3px;
}

.button:hover {
  background-color: var(--button-bg-hover-color);
  cursor: pointer;
  transition: 0.1s;
}

.button:active {
  background-color: var(--button-bg-active-color);
  transition: 0.1s;
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
