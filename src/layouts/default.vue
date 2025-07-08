<template>
  <div class="container mx-auto">
    <Navbar />
    <NuxtPage class="mb-32" />
  </div>
</template>

<script>
import Navbar from "~/components/common/navigation/navbar.vue";

export default {
  name: "default",
  components: { Navbar },
};
</script>

<style scoped></style>
