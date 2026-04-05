<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()

</script>

<template>
  <h2>{{ props.title }}</h2>
</template>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: bold;
}
</style>