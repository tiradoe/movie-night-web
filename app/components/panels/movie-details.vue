<script lang="ts" setup>
import type {Movie} from "~/types/movie";

defineProps<{
  selectedMovie: Movie;
}>();

</script>

<template>
  <div class="movie-details">
    <img :alt="selectedMovie!.title" :src="selectedMovie!.poster" class="movie-poster"/>
    <h2 class="movie-title">{{ selectedMovie!.title }}</h2>
  </div>
</template>

<style scoped>
.movie-details {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.movie-poster {
  width: 100%;
}

@media (max-width: 767px) {
  .movie-details {
    align-items: center;
  }

  .movie-poster {
    margin: 0 auto;
  }
}

</style>