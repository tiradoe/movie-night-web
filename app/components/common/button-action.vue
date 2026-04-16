<script lang="ts" setup>
const props = defineProps<{
  buttonText: string
  buttonColor?: 'primary' | 'warning' | 'danger'
}>()

const buttonColor = computed(() => props.buttonColor || 'primary')

const emit = defineEmits(['action'])
</script>

<template>
  <button
      :style="{ 'background-color': `var(--color-button-${buttonColor})` }"
      @click="emit('action')"
  >
    {{ buttonText }}
  </button>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: var(--color-action-button-text);
  border: none;
  cursor: pointer;
}
</style>