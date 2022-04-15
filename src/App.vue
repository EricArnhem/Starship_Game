<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <ul id="navigation-links">
        <li><RouterLink to="/"><img src="/svg/dashboard.svg" title="Dashboard" class="filter-white"></RouterLink></li>
        <li><RouterLink to="/manage-starships"><img src="/svg/rocket.svg" title="Manage Starships" class="filter-white"></RouterLink></li>
      </ul>      
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>

/* Filter used to change the svgs color to white (#f5f5f5) */
.filter-white {
  filter: invert(92%) sepia(65%) saturate(5592%) hue-rotate(186deg) brightness(129%) contrast(92%);
}

body {
  background-color: #181818;
  font-family: sans-serif;
  color: rgba(235, 235, 235, 0.64);
  margin: 0;
}

#app {
  display: flex;
  flex-direction: row;
}

nav {
  min-height: 100vh;
  width: 45px;
  border-right: 1px solid rgba(146, 146, 146, 0.75);
  padding: 0 0.3rem;
  /* temporary margin */
  margin-right: 1rem; 
}

a {
  text-decoration: none;
  color: hsl(216, 85%, 52%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(216, 85%, 52%, 0.2);
  }
}

nav a.router-link-exact-active {
  color: rgba(235, 235, 235, 0.64);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
}

#navigation-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

#navigation-links li {
  border-bottom: 1px solid rgba(146, 146, 146, 0.356);
  padding-top: 0.6rem;
  padding-bottom: 0.3rem;
}

#navigation-links li:last-of-type {
  border-bottom: none;
}

#navigation-links li img{
  display: block;
  height: 45px;
}
</style>
