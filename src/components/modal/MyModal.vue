<script setup>
import { useRoute, useRouter } from 'vue-router'
import { modalOpen, closeModal } from '@/components/modal/state';

const route = useRoute();
const router = useRouter();
</script>

<template>

  <Transition name="modal">

    <div class="modal-mask" v-if="modalOpen">
      <div class="modal-wrapper">
        <div class="modal-container content-box">

          <div class="modal-header">
            <h2>
              <slot name="title"></slot>
            </h2>
            <img src="@/images/close-cross.svg" alt="Close cross" title="Close" @click="closeModal(); router.push(route.matched[0])" id="modal-close-cross">
          </div>

          <div class="body-content-box modal-body">

            <slot name="body"></slot>

          </div>

          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>

        </div>
      </div>
    </div>

  </Transition>

</template>

<style>
/* -- Modal styling -- */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  overflow-y: auto;
}

.modal-container {
  margin-top: 25px;
  padding: 20px 30px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.modal-body {
  width: 70vw;
}

.modal-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid var(--main-border-color);
  margin-top: 25px;
}

/* Media query for mobile */
@media screen and (max-width: 480px) {
  .modal-container {
    border: 1px solid var(--main-border-color);
    border-radius: 10px;
    margin: 10px;
    padding: 20px;
  }

  .modal-body {
    width: 100%;
  }
}

#modal-close-cross {
  cursor: pointer;
  margin-left: 15px;
}

#modal-close-cross:hover {
  opacity: 0.7;
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>