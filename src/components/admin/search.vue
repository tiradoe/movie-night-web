<template>
  <LoadingIcon v-if="loading" class="p-1 bg-gray-900 rounded-3xl" />
  <form class="py-3 p-sm-0 align-items-center" @submit="findMovies">
    <label class="px-0" for="search-field">Search</label>
    <div class="px-0 mx-0">
      <input id="search-field" class="p-1" name="search-field" type="text" />
      <button class="btn p-1" type="button" @click="findMovies">Submit</button>
    </div>
  </form>
  <ul class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
    <li v-for="movie in movies" class="p-1 movie-card">
      <MoviePoster :image="movie.poster" @click="showModal(movie)" />
      <div class="p-2">
        <h5 class="text-center">{{ movie.title }} ({{ movie.year }})</h5>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Movie } from "~/types/movie";
import "lazysizes";

const loading = ref(false);

const emit = defineEmits<{
  (e: "show-modal", movie: Movie): void;
}>();
const movies = ref<Movie[]>([]);

const showModal = (movie: Movie) => {
  emit("show-modal", movie);
};

const findMovies = async function (e: Event) {
  let config = useRuntimeConfig();
  e.preventDefault();
  loading.value = true;
  let searchTerm = (document.getElementById("search-field") as HTMLInputElement)
    ?.value;

  if (!searchTerm) {
    return;
  }

  $fetch<Movie[]>(`${config.public.apiURL}/movies/search?q=${searchTerm}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${useCookie("token").value}`,
    },
  })
    .then((data) => {
      movies.value = data;
      loading.value = false;
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        navigateTo("/login");
      } else if (err.statusCode === 404) {
        alert("No movies found");
        loading.value = false;
      } else {
        alert("An error occurred. Please try again later.");
      }
    });
};
</script>

<style scoped></style>
