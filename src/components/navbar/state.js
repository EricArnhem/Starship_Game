import { ref, computed } from 'vue';

export const navbarCollapsed = ref(false);

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