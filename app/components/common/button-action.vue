<script lang="ts" setup>
defineProps<{
  buttonText: string
}>()

const emit = defineEmits(['action'])
</script>

<template>
  <button @click="emit('action')">{{ buttonText }}</button>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: var(--color-action-button);
  color: var(--color-action-button-text);
  border: none;
  cursor: pointer;
}
</style>