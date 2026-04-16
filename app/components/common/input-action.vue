<script lang="ts" setup>
const model = defineModel<string>({default: ''});

defineProps<{
  placeholder: string
  buttonText: string
  inputName: string
  inputId?: string
}>()

const emit = defineEmits(['action'])

</script>

<template>
  <div class="form-group">
    <input :id="inputId"
           v-model="model"
           :name="inputName"
           :placeholder="placeholder"
           type="text">
    <button @click="emit('action')">{{ buttonText }}</button>
  </div>

</template>

<style scoped>
button {
  background-color: var(--color-button-primary, #007bff);
  color: var(--color-action-button-text, white);
  padding: .5rem 1rem;
  border: none;
  border-radius: 0 4px 4px 0;
}

input {
  padding: .5rem;
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 4px 0 0 4px;
  flex: 1;
}

.form-group {
  display: flex;
}


</style>