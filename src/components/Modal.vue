<template>
  <div v-show="visible" id="movie-modal" class="movie-modal movie-card p-5">
    <span
      class="hover-pointer font-bold w-full block text-right sm:pr-5 pb-3 pt-5"
      @click="toggleModal()"
    >
      X
    </span>
    <slot class=""></slot>
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
