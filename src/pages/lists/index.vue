<template>
  <div class="p-5 sm:p-0">
    <ul class="grid grid-cols-2 gap-3 mt-5">
      <li v-for="list in lists" class="movie-card neon-border p-5 rounded">
        <div class="grid grid-rows-2 gap-3">
          <NuxtLink :to="`/lists/${list.id}`" class="underline">
            <h2 class="text-lg">{{ list.name }}</h2>
          </NuxtLink>
          <span>Movies: {{ list.movie_count }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "index",
  data: () => ({
    lists: [],
  }),
  methods: {
    getLists: function () {
      let config = useRuntimeConfig();
      fetch(`${config.public.apiURL}/lists`, {
        method: "GET",
        headers: {"Content-type": "application/json"}
      })
          .then(response => response.json())
          .then(json => this.lists = json)
          .catch(err => console.log(err))
    },
  },
  mounted() {
    this.getLists()
  }
}
</script>

<style scoped>

</style>