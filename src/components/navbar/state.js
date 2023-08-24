import { ref, computed, watch } from 'vue';

export const windowWidth = ref(window.innerWidth)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

// Updates window width and height variable on window resize
window.addEventListener('resize', handleResize);

export const navbarCollapsed = ref(true);

// Toggles the navbar state
export const toggleNavbar = () => (navbarCollapsed.value = !navbarCollapsed.value);

// Shows the navbar
export const showNavbar = () => (navbarCollapsed.value = false);

// Hides the navbar
export const hideNavbar = () => (navbarCollapsed.value = true);

// Margins sizes when collapsed or not
export const NAVBAR_MARGIN = 0;
export const NAVBAR_MARGIN_COLLAPSED = -210;

// Calculate which margin value to use depending on the navbar status
export const navbarMargin = computed(
  () => `${navbarCollapsed.value ? NAVBAR_MARGIN_COLLAPSED : NAVBAR_MARGIN}px`
);

// Shows side navbar if screen is over 900px in width
watch(windowWidth, (newWidth) => {
  if (newWidth > 900) {
    navbarCollapsed.value = false;
  } else {
    navbarCollapsed.value = true;
  }
}, { immediate: true })