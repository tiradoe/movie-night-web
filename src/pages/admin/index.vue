<template>
  <div class="p-5 sm:p-0">
    <Modal ref="movie_modal">
      <AddMovie
        v-if="modal_movie"
        :movie="modal_movie"
        @close-modal="closeModal"
      ></AddMovie>
    </Modal>

    <div class="text-center sm:text-left">
      <ul class="inline-flex space-x-5 pb-3">
        <li
          id="search-tab"
          class="hover-pointer me-3 underline"
          @click="toggleDisplay('search')"
        >
          Search
        </li>
        <li
          id="showings-tab"
          class="hover-pointer me-3"
          @click="toggleDisplay('showings')"
        >
          Showings
        </li>
        <li
          id="lists-tab"
          class="hover-pointer"
          @click="toggleDisplay('lists')"
        >
          Lists
        </li>
        <li id="logout" class="hover-pointer" @click="logout">Logout</li>
      </ul>
    </div>

    <div id="search">
      <search @show-modal="showModal" />
    </div>

    <div id="showings" class="hidden">
      <showings />
    </div>

    <div id="lists" class="hidden">
      <lists></lists>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddMovie from "~/components/modal-content/AddMovie.vue";
import Search from "~/components/admin/search.vue";
import Showings from "~/components/admin/showings.vue";
import Lists from "~/components/admin/lists.vue";
import type { MovieList } from "~/types/movielist";
import { useCookie } from "#app";
import type { Movie } from "~/types/movie";
import Modal from "~/components/Modal.vue";

const lists = defineModel<MovieList>("movie-lists", { default: [] });
const modal_movie = defineModel<Movie>("#movie-modal");

const movie_modal = ref<InstanceType<typeof Modal> | null>(null);

const closeModal = function () {
  movie_modal?.value?.toggleModal();
};
const showModal = function (movie: Movie) {
  modal_movie.value = movie;
  movie_modal?.value?.toggleModal();
};
const toggleDisplay = function (element_id: string) {
  let tabs = ["search", "showings", "lists"];

  tabs.forEach((value) => {
    if (value === element_id) {
      document.getElementById(element_id)?.classList.toggle("hidden");
      document
        .getElementById(element_id + "-tab")
        ?.classList.toggle("underline");
    } else if (!document.getElementById(value)?.classList.contains("hidden")) {
      document.getElementById(value)?.classList.toggle("hidden");
      document.getElementById(value + "-tab")?.classList.toggle("underline");
    }
  });
};
const logout = () => {
  let config = useRuntimeConfig();
  fetch(`${config.public.apiURL}/auth/logout/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${useCookie("token").value}`,
    },
  })
    .then((response) => response)
    .then((_json) => {
      let token = useCookie("token");
      token.value = null;
      navigateTo("/");
    })
    .catch((err) => console.log(err));
};

onMounted(() => {
  const token = useCookie("token").value;
  if (!token) {
    navigateTo("/");
  }
});
</script>

<style scoped></style>
