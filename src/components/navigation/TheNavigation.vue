<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { toggleSideNav, hideSideNav, sideNavMargin, windowWidth } from './state';

const route = useRoute();

const hideTopbar = ref(false);

// Hides topbar on scroll down / Shows on scroll up
const toggleTopbarOnScroll = () => {

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    // Offset by which we need to scroll down before the topbar hides/shows
    if (Math.abs(window.scrollY - lastScrollY) < 15) {
      return
    }

    if (lastScrollY < window.scrollY) {
      // If we scroll down
      hideTopbar.value = true;
    } else {
      // If we scroll up
      hideTopbar.value = false;
    }

    lastScrollY = window.scrollY;
  });

}

// -- Lifecycle Hooks --

onMounted(() => {
  toggleTopbarOnScroll();
})

// -- Watchers --

// Hides side navigation on route change (click on router link)
watch(() => route.name, () => {
  if (smallScreenLayout.value) {
    hideSideNav();
  }
})

// -- Computed properties --

const smallScreenLayout = computed(() => {
  return (windowWidth.value <= 900) ? true : false;
});

</script>

<template>
  <nav>

    <div id="nav-topbar" :class="(hideTopbar) ? 'nav-topbar-hidden' : ''" v-if="smallScreenLayout">
      <img 
        id="open-sidenav-button" 
        src="@/images/hamburger-menu.svg" 
        @click="toggleSideNav" 
      />
      <span class="brand-name">Starship Game</span>
    </div>

    <div id="nav-sidenav" :style="{ 'margin-left': sideNavMargin }">
      <div class="nav-brand">
        <img 
          id="close-sidenav-button" 
          src="@/images/xmark.svg" 
          @click="toggleSideNav" 
          v-if="smallScreenLayout" 
        />
        <span class="brand-name">Starship Game</span>
      </div>
      <ul id="navigation-links">
        <li>
          <RouterLink to="/">
            <img src="@/images/dashboard.svg" title="Dashboard">
            Dashboard
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/manage-starships">
            <img src="@/images/rocket.svg" title="Manage Starships">
            Manage Starships
          </RouterLink>
        </li>
      </ul>
    </div>

  </nav>

</template>

<style>
nav {
  height: 100%;
}

#nav-topbar {
  z-index: 100;
  position: fixed;
  top: 0;
  height: var(--nav-topbar-height);
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--main-bg-color);
  border-bottom: 1px solid var(--main-border-color);
  box-shadow: 0 1px 1px var(--main-border-color);
  transition: transform 0.2s ease-in-out;
}

.nav-topbar-hidden {
  transform: translate3d(0, -100%, 0);
  box-shadow: none !important;
}

#nav-sidenav {
  z-index: 101;
  position: fixed;
  height: 100vh;
  width: 200px;
  background-color: var(--main-bg-color);
  border-right: 1px solid var(--main-border-color);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 1px 0 1px var(--main-border-color);
  transition: margin 0.5s ease;
}

.nav-brand {
  display: flex;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid var(--main-border-color);
}

@media screen and (min-width: 901px) {
  #nav-sidenav {
    position: relative;
  }

  .nav-brand {
    justify-content: center;
  }
}

.brand-name {
  border-bottom: 2px solid;
  border-image: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%) 1;
  padding-bottom: 3px;
}

#open-sidenav-button {
  height: 100%;
  margin: 0 10px;
  cursor: pointer;
}

#close-sidenav-button {
  height: 75%;
  margin: 0 10px;
  cursor: pointer;
}


#navigation-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

#navigation-links li {
  padding: 5px;
  padding-bottom: 0;
}

#navigation-links li img {
  height: 40px;
  margin-right: 5px;
}

#navigation-links a {
  color: var(--main-text-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 3px;
}

/* Hover on nav links */
#navigation-links a:hover {
  background-color: var(--button-bg-hover-color);
  transition: 0.1s;
}

#navigation-links a:hover img {
  filter: drop-shadow(3px 3px 2px #dddddd);
  transition: 0.1s;
}

/* Active nav link */
#navigation-links a.router-link-exact-active {
  background-color: var(--button-bg-hover-color);
}

#navigation-links a.router-link-exact-active img {
  filter: drop-shadow(3px 3px 2px #dddddd);
}
</style>