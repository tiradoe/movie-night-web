<template>
  <div v-show="visible" id="movie-modal" class="movie-modal movie-card">
    <div class="max-w-4xl mx-auto flex flex-col px-2 sm:px-0">
      <span
        class="hover-pointer font-bold self-end pr-1 sm:pr-5 pt-5 pb-5 sm:pb-0"
        @click="toggleModal()"
      >
        <span class="bg-red-600 p-2 rounded">X</span>
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const visible = ref(false);

const toggleModal = () => {
  visible.value = !visible.value;
};

defineExpose({ toggleModal });
</script>

<style scoped></style>
