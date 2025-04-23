<template>
  <video
    alt="Loading"
    autoplay
    class="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    loop
    muted
    playsinline
  >
    <source
      v-if="supportsHEVC"
      src="/assets/img/movie-loader.mov"
      type="video/quicktime"
    />
    <source v-else src="/assets/img/movie-loader.webm" type="video/webm" />
  </video>
</template>

<script lang="ts" setup>
const supportsHEVC = ref(false);

onMounted(() => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // iOS devices also support HEVC
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  supportsHEVC.value = isSafari || isIOS;
});
</script>

<style scoped></style>
