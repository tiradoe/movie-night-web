<template>
  <div v-if="movie != null" class="sm:m-5 p-10 movie-card neon-border">
    <div>
      <h2 id="modal-title" class="row pb-3">
        {{ movie.Title }} ({{ movie.Year }})
      </h2>

      <div class="grid sm:grid-cols-2">
        <!-- MODAL POSTER -->
        <div class="text-end">
          <img id="modal-poster" :src="movie.Poster" alt="poster" class="pt-5"/>
        </div>

        <div class="pt-5">
          <label class="" for="list-picker">Add To List</label><br/>
          <select id="list-picker" v-model="list_id" class="p-1 text-black">
            <option v-for="list in lists" :value="list.id">{{ list.name }}</option>
          </select>
          <button class="modal-poster btn p-1" type="button" @click="addMovie(movie.imdbID)">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "AddMovie",
  data: () => ({
    list_id: 0,
    lists: {}
  }),
  methods: {
    addMovie: function (imdb_id) {
      let config = useRuntimeConfig()
      let list = parseInt(this.list_id)

      return fetch(`${config.public.apiURL}/lists/movie`, {
        method: "POST",
        body: JSON.stringify({imdb_id: imdb_id, list_id: list}),
        headers: {
          "Content-type": "application/json",
          "token": useCookie("token").value,
        }
      })
          .then(response => response.json())
          .then(_json => {
            this.$parent.closeModal()
          })
          .catch(err => console.log(err))
    },
    getLists: function () {
      let config = useRuntimeConfig()
      fetch(`${config.public.apiURL}/lists`, {
        method: "GET",
        headers: {"Content-type": "application/json",}
      })
          .then(response => response.json())
          .then(json => this.lists = json)
          .catch(err => console.log(err))
    },
  },
  mounted() {
    this.getLists();
  },
  props: ['movie']
}
</script>

<style scoped>

</style>