<script lang="ts" setup>
import placeholderPoster from "assets/img/poster-placeholder.svg";

const imgRef = ref<HTMLImageElement | null>(null);
const props = defineProps<{ image: string }>();

const handleImageError = function (event: Event) {
  (event.target as HTMLImageElement).classList.remove("lazyload");
  (event.target as HTMLImageElement).classList.add("object-cover");
  (event.target as HTMLImageElement).src = placeholderPoster;
};

watch(
  () => props.image,
  (newImage) => {
    if (imgRef.value && newImage) {
      imgRef.value.classList.add("lazyload");
      imgRef.value.setAttribute("data-src", newImage);
    }
  },
);
</script>

<template>
  <div class="aspect-[2/3] w-full text-blue-300">
    <img
      ref="imgRef"
      :data-src="props.image"
      alt="Movie Details"
      class="lazyload hover-pointer w-full h-full"
      @error="handleImageError"
    />
  </div>
</template>

<style scoped></style>
