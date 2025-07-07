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
      <lists />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddMovie from "~/components/modal-content/AddMovie.vue";
import Search from "~/components/admin/search.vue";
import Showings from "~/components/admin/showings.vue";
import Lists from "~/components/admin/lists.vue";
import type { Movie } from "~/types/movie";
import Modal from "~/components/common/ui/Modal.vue";
import { logout } from "~/composables/logout";

const modal_movie = defineModel<Movie>("#movie-modal");

const movie_modal = ref<InstanceType<typeof Modal> | null>(null);
const current_view = ref("search");

const closeModal = function () {
  movie_modal?.value?.toggleModal();
};
const showModal = function (movie: Movie) {
  modal_movie.value = movie;
  movie_modal?.value?.toggleModal();
};
const toggleDisplay = function (element_id: string) {
  if (element_id === current_view.value) return;
  let tabs = ["search", "showings", "lists"];

  tabs.forEach((value) => {
    if (value === element_id) {
      document.getElementById(element_id)?.classList.toggle("hidden");
      document
        .getElementById(element_id + "-tab")
        ?.classList.toggle("underline");
      current_view.value = element_id;
    } else if (!document.getElementById(value)?.classList.contains("hidden")) {
      document.getElementById(value)?.classList.toggle("hidden");
      document.getElementById(value + "-tab")?.classList.toggle("underline");
    }
  });
};
</script>

<style scoped></style>
