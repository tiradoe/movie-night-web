<template>
  <div class="sm:m-5 p-10 movie-card neon-border">
    <div>
      <LoadingIcon v-if="updating" />
      <h2 class="text-xl pb-10 text-center sm:text-left">
        {{ movie.title }} ({{ movie.year }})
      </h2>
      <div class="sm:inline-flex sm:space-x-5">
        <MoviePoster
          :image="movie.poster"
          class="max-h-80 max-w-60 mx-auto sm:mx-none"
        />
        <div class="pt-5 sm:pt-0">
          <p>{{ movie.plot }}</p>

          <ScheduleMovie
            v-if="logged_in"
            :movie="movie"
            class="mt-5"
            @close-modal="$emit('close-modal')"
          />

          <button
            v-if="logged_in"
            class="my-10 btn p-2 rounded"
            @click="updateMovie"
          >
            Refresh movie
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ScheduleMovie from "~/components/forms/ScheduleMovie.vue";

const props = defineProps(["movie", "updating"]);
const emits = defineEmits(["close-modal", "update-movie"]);
const logged_in = ref(false);

const updateMovie = function () {
  emits("update-movie");
};

onMounted(() => {
  const token = useCookie("token").value;
  if (token) {
    logged_in.value = true;
  }
});
</script>

<style scoped></style>
