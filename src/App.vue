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
body {
  display: flex;
  min-height: 100vh;
  background-color: #181818;
  font-family: sans-serif;
  color: #ebebeb;
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
}

nav {
  height: 100%;
  width: 45px;
  border-right: 1px solid rgba(146, 146, 146, 0.75);
  box-shadow: 1px 0 1px rgba(146, 146, 146, 0.75);
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
</style>
