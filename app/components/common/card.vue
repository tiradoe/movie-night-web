<script lang="ts" setup>

</script>

<template>
  <div class="card">
    <slot/>
  </div>

</template>

<style scoped>
.card {
  padding: 2rem;
  background-color: var(--card-background);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

@media (max-width: 640px) {
  .card {
    padding: 1rem;
  }
}

</style>