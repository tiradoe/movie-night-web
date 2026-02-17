<script lang="ts" setup>
import {type Movie} from "~/types/movie";
import posterPlaceholder from "~/assets/img/poster-placeholder.svg";

const props = defineProps<{
  movies: Movie[]
}>()

const filteredMovies = ref<Movie[]>(props.movies);
const searchQuery = ref('');

const emit = defineEmits<{
  'movie-clicked': [movie: Movie],
  'add-movie': []
}>()

const movieSearch = () => {
  filteredMovies.value = props.movies.filter(
      movie => movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
}

</script>

<template>
  <div>
    <div class="list-controls-container">
      <div class="list-controls">
        <input v-model="searchQuery" placeholder="Search Movies" type="text" @keyup="movieSearch"/>
        <Icon
            class="list-controls-icon"
            name="solar:filter-bold"
            size="24"
            title="Filter Movies"
        />
        <Icon
            class="list-controls-icon"
            name="solar:sort-vertical-linear"
            size="24"
            title="Sort Movies"
        />
      </div>
      <button @click="emit('add-movie')">Add Movie</button>
    </div>
    <div v-if="filteredMovies.length === 0" class="movie-quote">
      <span class="quote">"You complete me."</span>
      <span class="attribution">Tom Cruise, Jerry Maguire</span>
    </div>
    <ul v-else class="movie-list">
      <li v-for="movie in filteredMovies" :key="movie.id" class="movie" @click="emit('movie-clicked', movie)">
        <img
            alt=""
            class="movie-poster"
            src="http://fart.fart"
            @error="(e) => (e.target as HTMLImageElement).src = posterPlaceholder"
        />
        <span class="movie-title">{{ movie.title }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.list-controls-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 1rem 0;
}

.list-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max(140px, 20%), 1fr));
  gap: 1rem;
}

.movie {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.movie-quote {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 5rem 0;
}
</style>