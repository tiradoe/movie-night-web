<template>
  <div v-if="props.movie != null" class="sm:m-5 p-10 movie-card neon-border">
    <div>
      <h2 id="modal-title" class="row pb-10 text-center sm:text-left">
        {{ movie.title }} ({{ movie.year }})
      </h2>

      <div class="grid sm:grid-cols-2 gap-5">
        <!-- MODAL POSTER -->
        <MoviePoster
          :image="movie.poster"
          class="max-h-72 max-w-60 sm:max-h-2xl sm:max-w-72 mx-auto sm:mx-0"
        />

        <div class="mx-auto sm:mx-none">
          <label class="" for="list-picker">Add To List</label><br />
          <select id="list-picker" v-model="list_id" class="p-1 text-black">
            <option v-for="list in lists" :value="list.id">
              {{ list.name }}
            </option>
          </select>
          <button
            class="modal-poster btn p-1"
            type="button"
            @click="addMovie(movie.imdb_id)"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { MovieList } from "~/types/movielist";
import type { Movie } from "~/types/movie";

const props = defineProps<{ movie: Movie }>();
const list_id = ref(0);
const lists = ref<MovieList[]>(new Array<MovieList>());
const emit = defineEmits<{
  (e: "close-modal"): void;
}>();

const addMovie = function (imdb_id: string) {
  if (typeof imdb_id === "undefined") {
    console.log("No imdb id");
  }
  let config = useRuntimeConfig();

  return fetch(
    `${config.public.apiURL}/lists/${list_id.value}/movie/${imdb_id}/`,
    {
      method: "PUT",
      body: `{ imdb_id: ${imdb_id}, list_id: ${list_id}}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${useCookie("token").value}`,
      },
    },
  )
    .then((response) => response.json())
    .then((_json) => {
      emit("close-modal");
    })
    .catch((err) => console.log(err));
};
const getLists = function () {
  let config = useRuntimeConfig();
  fetch(`${config.public.apiURL}/lists`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((json) => (lists.value = json))
    .catch((err) => console.log(err));
};
onMounted(() => {
  getLists();
});
</script>

<style scoped></style>
