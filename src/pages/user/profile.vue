<script lang="ts" setup>
import { useCookie } from "#app";
import type { UserProfile } from "~/types/userProfile";

const config = useRuntimeConfig();

const profile = ref<UserProfile | null>(null);
const loading = ref(true);

const getProfile = async function () {
  await $fetch<UserProfile>(`${config.public.apiURL}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${useCookie("token").value}`,
    },
  })
    .then((data) => {
      profile.value = data;
      loading.value = false;
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        useCookie("token").value = null;
        navigateTo("/");
      }
    });
};

const formatDate = function (date_string: string) {
  return new Date(date_string).toLocaleDateString();
};

onMounted(getProfile);
</script>

<template>
  <LoadingIcon v-if="loading" show-quote="true" />
  <div v-else>
    <h2 class="page-header">Profile</h2>
    <div id="profile-card" class="movie-card neon-border">
      <div id="user-data">
        <div id="profile-picture">
          <img
            alt="profile image"
            class="user-icon neon-border"
            src="https://placecage.lucidinternets.com/g/200/200"
          />
        </div>
        <ul class="profile-details">
          <li class="user-detail">
            <label for="name">Name</label>
            <span id="name">{{ profile?.name || profile?.username }}</span>
          </li>
          <li class="user-detail">
            <label for="username">Username</label>
            <span id="username">{{ profile?.username }}@movienight.social</span>
          </li>
          <li class="user-detail">
            <label for="date-joined">Date Joined</label>
            <span id="date-joined">{{
              formatDate(profile?.date_joined || "")
            }}</span>
          </li>
        </ul>
      </div>

      <hr class="neon-border my-5" />

      <div id="extra-fields">
        <div id="movielists">
          <h3 class="section-header">Lists</h3>
          <ul id="movielist-list">
            <li v-for="list in profile?.lists">
              <NuxtLink :to="`/lists/${list.id}`">{{ list.name }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  font-weight: bold;
  font-size: 1.2rem;
}

.section-header {
  font-size: 1.5rem;
  line-height: calc(2 / 1.5);
  padding-bottom: 1rem;
}

#user-data {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-detail {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-icon {
  object-fit: cover;
  border-radius: 2rem;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 3rem 0;
}

.movie-card {
  padding: 2rem;
}

.movie-review {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

#extra-fields {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (width >= 48rem) {
  #user-data {
    flex-direction: row;
    gap: 5rem;
  }
}
</style>
