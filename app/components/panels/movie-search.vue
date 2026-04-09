<script lang="ts" setup>
import type {MovieSearchResult} from "~/types/movie-search-results";
import type {MovieList} from "~/types/movie-list";
import type {ResourceResponse} from "@/types/api";

const emit = defineEmits(['add-movie']);
const props = defineProps<{
  movieListId: string
}>()

const searchQuery = ref("");

const movies = ref<MovieSearchResult[]>([]);
const searchMovies = () => {
  $api<ResourceResponse<MovieSearchResult[]>>(`/api/movies/search/${searchQuery.value}`, {
    method: "GET"
  }).then((response) => {
    movies.value = response.data
  }).catch((error) => {
    alert(error.message)
  });
}

const addMovieToList = (movie: MovieSearchResult) => {
  $api<ResourceResponse<MovieList>>(`/api/movielists/${props.movieListId}/movies`, {
    body: {
      movie: movie
    },
    method: "POST"
  }).then((list) => {
    emit('add-movie', list.data);
  }).catch((error) => {
    alert(error.message)
  });
}

</script>

<template>
  <div>
    <h2>Movie Search</h2>
    <form @submit.prevent="searchMovies">
      <label for="search">Search Movies</label>

      <div>
        <input id="search" v-model="searchQuery" type="text"/>
        <button>Search</button>
      </div>
    </form>
    <ul class="results-list">
      <li v-for="movie in movies" :key="movie.imdbId" class="movie-result">
        <img :src="movie.poster" alt="movie poster">
        <div class="movie-details">
          <span>{{ movie.title }}</span>
          <span>{{ movie.year }}</span>
          <button @click="addMovieToList(movie)">Add Movie</button>
        </div>
      </li>
    </ul>
  </div>


</template>

<style scoped>
.results-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin: 1rem 0;
}

.movie-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  padding: 0.5rem;
}

.movie-result {
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  align-items: center;
  text-align: center;
}

.movie-result img {
  height: 10rem;
  width: 10rem;
}

</style>