<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/create-starship">Create a Starship</RouterLink>
      <RouterLink to="/remove-starship">Remove a Starship</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>

body {
  background-color: #181818;
  font-family: sans-serif;
  color: rgba(235, 235, 235, 0.64);
}

#app {
  padding: 2rem;
}

nav {
  font-size: 1.2rem;
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
  padding: 0 1rem;
}
</style>
