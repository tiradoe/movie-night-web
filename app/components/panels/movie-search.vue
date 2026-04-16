<script lang="ts" setup>
import type {MovieSearchResult} from "~/types/movie-search-results";
import type {MovieList} from "~/types/movie-list";
import type {ResourceResponse} from "@/types/api";
import InputAction from "~/components/common/input-action.vue";
import ButtonAction from "~/components/common/button-action.vue";

const emit = defineEmits(['add-movie']);
const props = defineProps<{
  movieListId: string
}>()

const searchQuery = ref("");
const errorMessage = ref("");

const movies = ref<MovieSearchResult[]>([]);
const searchMovies = () => {
  $api<ResourceResponse<MovieSearchResult[]>>(`/api/movies/search/${searchQuery.value}`, {
    method: "GET"
  }).then((response) => {
    errorMessage.value = "";
    movies.value = response.data
  }).catch((error) => {
    if (error.response.status === 404)
      errorMessage.value = "No movies found"
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
  <div class="content">
    <h2>Movie Search</h2>
    <form @submit.prevent="searchMovies">
      <label for="search">Search Movies</label>
      <InputAction
          v-model="searchQuery"
          button-text="Search"
          input-id="search"
          input-name="search"
          placeholder="Enter a movie title"
          @action="searchMovies"
      />
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <ul v-else class="results-list">
      <li v-for="movie in movies" :key="movie.imdbId" class="movie-result">
        <img :src="movie.poster" alt="movie poster">
        <div class="movie-details">
          <span>{{ movie.title }}</span>
          <span>{{ movie.year }}</span>
          <ButtonAction button-text="Add Movie" @action="addMovieToList(movie)"/>
        </div>
      </li>
    </ul>
  </div>


</template>

<style scoped>

h2 {
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5em;
  display: block;
}

.error-message {
  color: var(--color-error-text, red);
  text-align: center;
  margin: 5rem 0;
}

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
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.1);
  align-items: center;
  text-align: center;
  border-radius: 0.3rem;
  background-color: var(--result-background);
}

.movie-result img {
  height: 10rem;
  width: 10rem;
}

.content {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
</style>