<template>
  <div class="sm:m-5 p-10 movie-card neon-border">
    <div>
      <h2 class="text-xl pb-3 text-center sm:text-left">
        {{ movie.title }} ({{ movie.year }})
      </h2>
      <div class="sm:inline-flex sm:space-x-5">
        <img :src="movie.poster" alt="movie poster" class="mx-auto sm:mx-0 neon-border"/>
        <div class="pt-5 sm:pt-0">
          <p>{{ movie.plot }}</p>
          <ScheduleMovie v-if="logged_in" :movie="movie" class="mt-5"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ScheduleMovie from "~/components/forms/ScheduleMovie.vue";

export default {
  name: "ShowMovie",
  data: () => ({
    logged_in: false,
  }),
  components: {ScheduleMovie},
  props: ["movie"],
  mounted() {
    const token = useCookie("token").value;
    if (token) {
      this.logged_in = true;
    }
  }
}
</script>

<style scoped>

</style>