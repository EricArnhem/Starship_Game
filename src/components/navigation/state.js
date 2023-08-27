import { ref, computed, watch } from 'vue';

export const windowWidth = ref(window.innerWidth)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

// Updates window width and height variable on window resize
window.addEventListener('resize', handleResize);

export const sideNavCollapsed = ref(true);

// Toggles the side navigation state
export const toggleSideNav = () => (sideNavCollapsed.value = !sideNavCollapsed.value);

// Shows the side navigation
export const showSideNav = () => (sideNavCollapsed.value = false);

// Hides the side navigation
export const hideSideNav = () => (sideNavCollapsed.value = true);

// Margins sizes when collapsed or not
export const SIDENAV_MARGIN = 0;
export const SIDENAV_MARGIN_COLLAPSED = -210;

// Calculate which margin value to use depending on the side navigation status
export const sideNavMargin = computed(
  () => `${sideNavCollapsed.value ? SIDENAV_MARGIN_COLLAPSED : SIDENAV_MARGIN}px`
);

// Shows side navigation if screen is over 900px in width
watch(windowWidth, (newWidth) => {
  if (newWidth > 900) {
    sideNavCollapsed.value = false;
  } else {
    sideNavCollapsed.value = true;
  }
}, { immediate: true })