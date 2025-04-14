<template>
  <div class="p-5 sm:p-0">
    <div v-if="schedule && schedule?.showings.length < 1" class="p-5">
      <span>No Showings Found</span>
    </div>
    <ul class="flex flex-col gap-5">
      <li
        v-for="showing in schedule?.showings"
        class="p-5 movie-card neon-border"
      >
        <div class="sm:grid grid-cols-2 lg:grid-cols-3">
          <img
            :src="showing.movie.poster"
            alt="Movie Poster"
            class="mx-auto mb-5 sm:mb-0 sm:mx-0 neon-border bg-black schedule-poster"
          />

          <div class="self-center text-left">
            <h5 class="text-center sm:text-left mb-3 text-xl">
              {{ showing.movie.title }}
            </h5>
            <h5 class="text-center sm:text-left mb-3">
              {{ formatDate(showing.showtime) }}
            </h5>
            <span class="">{{ showing.movie.plot }}</span>
          </div>
        </div>
      </li>
    </ul>

    <!-- PREVIOUS SHOWINGS -->
    <div id="previous-showings" class="mt-5 list-group">
      <span
        class="block mb-5 hover-pointer underline"
        @click="getSchedule(true)"
      >
        Previous Showings
      </span>
      <span id="loader" class="hidden">Loading...</span>
      <ul class="flex flex-col gap-5">
        <li v-for="showing in past_showings" class="p-5 movie-card neon-border">
          <div class="sm:grid grid-cols-2 lg:grid-cols-3">
            <img
              :src="showing.movie.poster"
              alt="Movie Poster"
              class="mx-auto mb-5 sm:mb-0 sm:mx-0 neon-border bg-black schedule-poster"
            />

            <div class="self-center text-left">
              <h5 class="text-xl mb-3">{{ showing.movie.title }}</h5>
              <h5 class="mb-3">{{ formatDate(showing.showtime) }}</h5>
              <span class="">{{ showing.movie.plot }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Showing } from "~/types/showing";
import type { Schedule } from "~/types/schedule";

const schedule = defineModel<Schedule>("schedule");
const past_showings = defineModel<Showing[]>("past_showings", {
  default: [],
});
const got_previous = ref(false);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDate = function (date_string: string) {
  let date = new Date(date_string);
  let month = months[date.getMonth()];

  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};

const getSchedule = async function (previous = false) {
  let config = useRuntimeConfig();
  if (got_previous.value) {
    return false;
  }

  document.getElementById("loader")?.classList.toggle("hidden");

  let params = "";
  if (previous) params = "?past_showings=true";

  const { data, error } = await useFetch<Schedule>(
    `${config.public.apiURL}/schedules/1${params}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
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
      alert("Schedule not found");
      navigateTo("/");
    }
  } else {
    if (!data.value) {
      alert("Schedule not found");
      navigateTo("/");
    } else {
      if (previous) {
        past_showings.value = data.value.past_showings;
      } else {
        schedule.value = data.value;
      }
      document.getElementById("loader")?.classList.toggle("hidden");
    }
  }

  return schedule;
};

onMounted(() => {
  getSchedule();
});
</script>

<style scoped></style>
