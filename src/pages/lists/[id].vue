<template>
  <LoadingIcon v-if="loading" show-quote="true" />
  <div v-else class="p-5 sm:p-0">
    <Modal ref="movie_modal">
      <ShowMovie
        v-if="modal_movie"
        :movie="modal_movie"
        :updating="updating"
        @close-modal="closeModal"
        @update-movie="updateMovie(modal_movie)"
      ></ShowMovie>
    </Modal>
    <h2 class="text-xl font-bold pb-5">{{ list.name }}</h2>
    <div
      v-if="movies.length > 1 && !loading"
      class="grid grid-cols-2 rounded movie-card neon-border p-5"
    >
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

    <div v-if="movies.length < 1 && !loading" class="mt-10 flex gap-5 flex-col">
      No Movies Found
      <MovieQuote />
    </div>
    <!-- MOVIE LIST -->
    <ul
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-5"
    >
      <li
        v-for="movie in filtered_movies"
        :key="movie.poster"
        class="rounded movie-card neon-border flex flex-col overflow-hidden"
      >
        <!-- POSTER -->
        <MoviePoster
          :image="movie.poster"
          class="flex-shrink-0"
          @click="showModal(movie)"
        />
        <div class="p-5 flex flex-col justify-between flex-1">
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
import Modal from "~/components/common/ui/Modal.vue";
import { useCookie } from "#app";
import { $fetch } from "ofetch";
import MoviePoster from "~/components/MoviePoster.vue";

const list_id = ref(0);
const list = defineModel<MovieList>("movie_list", { default: [] });
const loading = ref(true);
const modal_movie: Ref<Movie | null> = ref(null);
const movies = defineModel<Movie[] | []>("movies", {
  default: [],
});
const filtered_movies = defineModel<Movie[]>("filtered_movies");
const movie_query = ref("");
const logged_in = ref(false);
const hide_scheduled = ref(false);

const getList = async function (list_id: number) {
  loading.value = true;
  let config = useRuntimeConfig();
  let headers: any = {
    "Content-type": "application/json",
  };

  if (typeof useCookie("token").value !== "undefined") {
    headers["Authorization"] = `Token ${useCookie("token").value}`;
  }

  $fetch<MovieList>(`${config.public.apiURL}/lists/${list_id}`, {
    method: "GET",
    headers: headers,
  })
    .then((data) => {
      list.value = data;
      movies.value = data?.movies || [];
      filtered_movies.value = movies.value;
      loading.value = false;
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
  if (hide_scheduled.value && movies.value.length > 0) {
    let filtered = movies.value.filter((movie) => {
      return !movie.has_been_scheduled;
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

const updating = ref(false);
const updateMovie = async function (movie: Movie) {
  let config = useRuntimeConfig();
  updating.value = true;

  $fetch<Movie>(`${config.public.apiURL}/movies/${movie.id}/`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${useCookie("token").value}`,
    },
    body: JSON.stringify(movie),
  })
    .then((data) => {
      modal_movie.value = data || [];
      movies.value = movies.value.map((movie) => {
        return movie.id === data.id ? data : movie;
      });
      filtered_movies.value = movies.value;
      updating.value = false;
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        navigateTo("/");
      }
      if (err.statusCode === 404) {
        alert("Unable to update movie");
      }
      updating.value = false;
    });
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
