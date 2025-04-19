<template>
  <div v-if="list_id !== 0" class="p-5 sm:p-0">
    <Modal ref="movie_modal">
      <ShowMovie
        v-if="modal_movie"
        :movie="modal_movie"
        @close-modal="closeModal"
      ></ShowMovie>
    </Modal>
    <h2 class="text-xl font-bold pb-5">{{ list.name }}</h2>
    <div class="grid grid-cols-2 rounded movie-card neon-border p-5">
      <div>
        <ul class="flex flex-row">
          <li>
            <label class="mr-2" for="hide_scheduled">Hide Scheduled</label>
            <input
              id="hide_scheduled"
              v-model="hide_scheduled"
              type="checkbox"
              @change="hideScheduled"
            />
          </li>
        </ul>
      </div>
      <input
        v-model="movie_query"
        class="p-1 rounded"
        placeholder="Filter Movies"
        type="text"
        @input="filterMovies"
      />
    </div>

    <!-- MOVIE LIST -->
    <ul
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-5"
    >
      <li
        v-for="movie in filtered_movies"
        :key="movie.id"
        class="rounded movie-card neon-border"
      >
        <!-- POSTER -->
        <img
          :data-src="movie.poster"
          alt="movie poster"
          class="lazyload p-3 movie-poster hover-pointer mx-auto"
          @click="showModal(movie)"
        />
        <div class="p-5 flex flex-col">
          <!-- TITLE -->
          <span class="font-bold text-center mb-1">{{ movie.title }}</span>
          <span
            v-if="logged_in"
            class="text-center hover-pointer"
            @click="removeMovie(movie.imdb_id)"
          >
            X
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ShowMovie from "~/components/modal-content/ShowMovie.vue";
import "lazysizes";
import type { MovieList } from "~/types/movielist";
import type { Movie } from "~/types/movie";
import Modal from "~/components/Modal.vue";

const list_id = ref(0);
const list = defineModel<MovieList>("movie_list", { default: [] });
const modal_movie: Ref<Movie | null> = ref(null);
const movies = defineModel<Movie[] | []>("movies", {
  default: [],
});
const filtered_movies = defineModel<Movie[]>("filtered_movies");
const movie_query = ref("");
const logged_in = ref(false);
const hide_scheduled = ref(false);

const getList = async function (list_id: number) {
  let config = useRuntimeConfig();
  $fetch<MovieList>(`${config.public.apiURL}/lists/${list_id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${useCookie("token").value}`,
    },
  })
    .then((data) => {
      list.value = data;
      movies.value = data?.movies || [];
      filtered_movies.value = movies.value;
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        navigateTo("/");
      }
      if (err.statusCode === 404) {
        alert("List not found");
        navigateTo("/lists");
      }
    });
};

const hideScheduled = function () {
  if (hide_scheduled && movies.value.length > 0) {
    let filtered = movies.value.filter((movie) => {
      return movie.last_watched === null;
    });
    if (typeof filtered != "undefined") {
      filtered_movies.value = filtered;
    }
  } else {
    filtered_movies.value = movies.value;
  }
};

const removeMovie = async function (movie_id: string) {
  let config = useRuntimeConfig();
  let confirmed = confirm("Remove movie from list?");

  if (!confirmed) {
    return false;
  }

  const { data, error } = await useFetch<MovieList>(
    `${config.public.apiURL}/lists/${list_id.value}/movie/${movie_id}/`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${useCookie("token").value}`,
      },
    },
  );

  if (error.value) {
    if (error.value.statusCode === 401) {
      navigateTo("/");
    }
    if (error.value.statusCode === 404) {
      alert("List not found");
      navigateTo("/lists");
    }
  } else {
    if (!data.value) {
      alert("List not found");
      navigateTo("/lists");
    } else {
      list.value = data.value;
      movies.value = data.value?.movies || [];
      filtered_movies.value = movies.value;
    }
  }
};

const filterMovies = function () {
  if (!movie_query) {
    filtered_movies.value = movies.value;
    return;
  }

  filtered_movies.value = movies.value.filter((movie) => {
    return (
      movie.title.toLowerCase().search(movie_query.value.toLowerCase()) > -1
    );
  });
};

const showModal = function (movie: Movie) {
  modal_movie.value = movie;
  movie_modal.value?.toggleModal();
};

const movie_modal = ref<InstanceType<typeof Modal> | null>(null);
const closeModal = function (movie: Movie) {
  movie_modal.value?.toggleModal();
};

onMounted(() => {
  const route = useRoute();
  if (typeof route.params.id === "string") {
    const list_param: string = route.params.id;
    list_id.value = parseInt(list_param);
    getList(list_id.value);
  }

  const token = useCookie("token").value;
  if (token) {
    logged_in.value = true;
  }
});
</script>

<style scoped></style>
