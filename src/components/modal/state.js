import { ref } from 'vue';

export const modalOpen = ref(false);

// Opens the modal
export const openModal = () => (modalOpen.value = true);

// Closes the modal
export const closeModal = () => (modalOpen.value = false);