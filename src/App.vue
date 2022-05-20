<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <ul id="navigation-links">
        <li>
          <RouterLink to="/"><img src="./images/dashboard.svg" title="Dashboard"></RouterLink>
        </li>
        <li>
          <RouterLink to="/manage-starships"><img src="./images/rocket.svg" title="Manage Starships"></RouterLink>
        </li>
      </ul>
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
  --button-dark-bg-color: #242424;
  --button-dark-bg-hover-color: #3a3a3a;
  --button-dark-bg-active-color: #474747;
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

.button-dark {
  padding: 10px 6px;
  width: 50%;
  margin: auto;
  margin-top: 25px;
  font-size: 1rem;
  color: inherit;
  background-color: var(--button-dark-bg-color);
  border: 1px solid var(--main-border-color);
  border-radius: 3px;
}

.button-dark:hover {
  background-color: var(--button-dark-bg-hover-color);
  cursor: pointer;
  transition: 0.1s;
}

.button-dark:active {
  background-color: var(--button-dark-bg-active-color);
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

@media (max-width: 480px) {
  .content-box {
    margin: 0;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
  }
}

.body-content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vw;
  min-width: 100%;
  max-width: 650px;
}
</style>
