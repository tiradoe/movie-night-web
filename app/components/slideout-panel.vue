<script lang="ts" setup>
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Transition name="slideout-backdrop">
    <div v-if="open" class="backdrop" @click="emit('close')"/>
  </Transition>

  <Transition name="slideout">
    <div v-if="open" class="panel">
      <button class="close-button" @click="emit('close')">&times;</button>
      <slot/>
    </div>
  </Transition>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  background: var(--color-surface, #fff);
  z-index: 101;
  overflow-y: auto;
  padding: 1rem;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: inherit;
  line-height: 1;
  padding: 0.25rem 0.5rem;
}

@media (max-width: 767px) {
  .panel {
    width: 100%;
  }
}

/* Backdrop transitions */
.slideout-backdrop-enter-active,
.slideout-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.slideout-backdrop-enter-from,
.slideout-backdrop-leave-to {
  opacity: 0;
}

/* Panel transitions */
.slideout-enter-active,
.slideout-leave-active {
  transition: transform 0.3s ease;
}

.slideout-enter-from,
.slideout-leave-to {
  transform: translateX(100%);
}
</style>
