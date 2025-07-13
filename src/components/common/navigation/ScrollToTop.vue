<script lang="ts" setup>
//const props = defineProps(['show']);
const showScroll = ref(false);
const updateScrollPosition = () => {
  showScroll.value = document.documentElement.scrollTop > 1500;
};
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", updateScrollPosition);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollPosition);
});
</script>

<template>
  <span v-if="showScroll" class="floater overlay-text" @click="scrollToTop">
    Scroll To Top
  </span>
</template>

<style scoped>
.floater {
  display: block;
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 1000;
  cursor: pointer;
  background-color: rgba(112, 128, 144, 0.8);
  padding: 1rem;
  border-radius: 10px;
}

.overlay-text {
  color: white;
  text-shadow: 1px 1px #6f0b51;
}
</style>
