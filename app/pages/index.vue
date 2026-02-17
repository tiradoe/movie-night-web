<script lang="ts" setup>
import PageTitle from "~/components/common/page-title.vue";

const user = "Eddie";
const welcomeMessage = computed(() => `Welcome, ${user}!`)
</script>

<template>
  <PageTitle :title="welcomeMessage"/>

  <div class="content">
    <div>
      <h2>Next up</h2>
      <span>Nothing Scheduled :(</span>
    </div>

    <div>
      <h2>Activity Feed</h2>
      <ul>
        <li>Ed created a list: "Best of 2023"</li>
        <li>Ed added a movie to "Best of 2023": "The Dark Knight"</li>
        <li>Ed added a movie to "Best of 2023": "The Dark Knight Rises"</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.page-title {
  margin: 1rem 0;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

</style>