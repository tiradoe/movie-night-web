<template>
  <div class="p-5 sm:p-0">
    <LoadingIcon v-if="loading" />
    <div v-else>
      <div
        v-if="schedule && schedule?.showings.length < 1 && !loading"
        class="p-5"
      >
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
      <LoadingIcon v-if="loadingPrevious" />
      <div v-else id="previous-showings" class="mt-5 list-group">
        <span
          class="block mb-5 hover-pointer underline"
          @click="getSchedule(true)"
        >
          Previous Showings
        </span>
        <ul class="flex flex-col gap-5">
          <li
            v-for="showing in past_showings"
            class="p-5 movie-card neon-border"
          >
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
  </div>
</template>

<script lang="ts" setup>
import type { Showing } from "~/types/showing";
import type { Schedule } from "~/types/schedule";
import { $fetch } from "ofetch";
import { useCookie } from "#app";

const schedule = defineModel<Schedule>("schedule");
const past_showings = defineModel<Showing[]>("past_showings", {
  default: [],
});
const loading = ref(true);
const loadingPrevious = ref(false);
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
  if (previous) loadingPrevious.value = true;
  else loading.value = true;

  let config = useRuntimeConfig();
  if (got_previous.value) {
    return false;
  }

  let params = "";
  if (previous) params = "?past_showings=true";

  let headers: any = {
    "Content-type": "application/json",
  };

  if (typeof useCookie("token").value !== "undefined") {
    headers["Authorization"] = `Token ${useCookie("token").value}`;
  }

  await $fetch(`${config.public.apiURL}/schedules/1${params}`, {
    method: "GET",
    headers: headers,
  })
    .then((data) => {
      if (previous) {
        past_showings.value = data.past_showings;
      } else {
        schedule.value = data;
      }
      loading.value = false;
      loadingPrevious.value = false;
    })
    .catch((err) => {
      switch (err.statusCode) {
        case 401:
          useCookie("token").value = null;
          navigateTo("/");
          break;
        case 404:
          alert("Unable to find schedule");
          navigateTo("/");
          break;
      }
    });

  return schedule;
};

onMounted(() => {
  getSchedule();
});
</script>

<style scoped></style>
