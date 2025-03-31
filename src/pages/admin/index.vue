<template>
  <div class="p-5 sm:p-0">
    <Modal>
      <AddMovie v-if="modal_movie" :movie="modal_movie"></AddMovie>
    </Modal>

    <div class="text-center sm:text-left">
      <ul class="inline-flex space-x-5 pb-3">
        <li id="search-tab" class="hover-pointer me-3 underline" @click="toggleDisplay('search')">Search</li>
        <li id="showings-tab" class="hover-pointer me-3" @click="toggleDisplay('showings')">Showings</li>
        <li id="lists-tab" class="hover-pointer" @click="toggleDisplay('lists')">Lists</li>
        <li id="logout" class="hover-pointer" @click="logout">Logout</li>
      </ul>
    </div>

    <div id="search">
      <search/>
    </div>

    <div id="showings" class="hidden">
      <showings/>
    </div>

    <div id="lists" class="hidden">
      <lists></lists>
    </div>
  </div>
</template>

<script>
import AddMovie from "~/components/modal-content/AddMovie.vue";
import Search from "~/components/admin/search.vue";
import Showings from "~/components/admin/showings.vue";
import Lists from "~/components/admin/lists.vue";

export default {
  name: "index",
  components: {Lists, Showings, Search, AddMovie},
  data: () => ({
    lists: [],
    modal_movie: null,
  }),
  methods: {
    showModal: function (movie) {
      this.modal_movie = movie;
      document.getElementById("movie-modal").classList.remove("hidden");
    },
    toggleDisplay: function (id) {
      let tabs = ["search", "showings", "lists"];

      tabs.forEach((value) => {
        if (value === id) {
          document.getElementById(id).classList.toggle("hidden");
          document.getElementById(id + "-tab").classList.toggle("underline");
        } else if (!document.getElementById(value).classList.contains("hidden")) {
          document.getElementById(value).classList.toggle("hidden");
          document.getElementById(value + "-tab").classList.toggle("underline");
        }
      })
    },
    logout: () => {
      let config = useRuntimeConfig()
      let token = useCookie("token").value;
      fetch(`${config.public.apiURL}/logout`, {
        method: "PUT",
        headers: {"Content-type": "application/json", "token": token},
      })
          .then(response => response.json())
          .then(_json => {
            let token = useCookie("token");
            token.value = null;
            window.location = "/";
          })
          .catch(err => console.log(err))
    }
  },
  mounted() {
    const token = useCookie("token").value;
    if (!token) {
      navigateTo("/")
    }
  }
}
</script>

<style scoped>

</style>