<script setup>
import { RouterLink } from 'vue-router';
import { toggleNavbar, navbarMargin } from './state';
</script>

<template>

  <nav :style="{ 'margin-left': navbarMargin }">
    <ul id="navigation-links">
      <li>
        <RouterLink to="/"><img src="@/images/dashboard.svg" title="Dashboard"></RouterLink>
      </li>
      <li>
        <RouterLink to="/manage-starships"><img src="@/images/rocket.svg" title="Manage Starships"></RouterLink>
      </li>
    </ul>
    <span id="burger-button" @click="toggleNavbar"></span>
  </nav>

</template>

<style>
nav {
  position: relative;

  height: 100%;
  width: 45px;
  padding: 0 7px;

  border-right: 1px solid var(--main-border-color);
  box-shadow: 1px 0 1px var(--main-border-color);

  transition: margin 0.5s ease;
}

#burger-button {
  position: absolute;
  top: 10px;
  margin-left: 53px;
  width: 35px;
  height: 55px;

  background-color: var(--content-box-bg-color);
  background-image: url(@/images/hamburger-menu.svg);
  background-size: 125%;
  background-repeat: no-repeat;
  background-position: center;

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
</style>