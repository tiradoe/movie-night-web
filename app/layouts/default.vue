<script lang="ts" setup>

</script>

<template>
  <div class="container">
    <Header/>
    <slot/>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  padding: 1rem 5rem;
  max-width: 1280px;
}

</style>