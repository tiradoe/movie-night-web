<script lang="ts" setup></script>

<template>
  <video
    alt="Loading"
    autoplay
    class="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    loop
    muted
    type="video/webm"
  >
    <source
      src="/assets/img/movie-loader.mp4"
      type="video/mp4; codecs='hvc1'"
    />
    <source src="/assets/img/movie-loader.webm" type="video/webm" />
  </video>
</template>

<style scoped></style>
