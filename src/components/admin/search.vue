<template>
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

const emit = defineEmits<{
  (e: "show-modal", movie: Movie): void;
}>();
const movies = defineModel<Movie[]>("movie_list", { default: [] });

const showModal = (movie: Movie) => {
  emit("show-modal", movie);
};

const findMovies = async function (e: Event) {
  let config = useRuntimeConfig();
  e.preventDefault();
  let searchTerm = (document.getElementById("search-field") as HTMLInputElement)
    ?.value;

  if (!searchTerm) {
    return;
  }

  const { data, error } = await useFetch<Movie[]>(
    `${config.public.apiURL}/movies/search?q=${searchTerm}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${useCookie("token").value}`,
      },
    },
  );

  if (error.value) {
    if (error.value.statusCode === 401) {
      alert("Unauthorized");
    }
  } else {
    if (!data.value) {
      alert("No movies found.");
    } else {
      movies.value = data.value || [];
    }
  }
};
</script>

<style scoped></style>
