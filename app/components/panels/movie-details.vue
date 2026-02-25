<script lang="ts" setup>
import type {Movie} from "~/types/movie";
import type {MovieCriticScore} from "~/types/movie-critic-score";
import posterPlaceholder from "~/assets/img/poster-placeholder.svg";

const props = defineProps<{
  selectedMovie: Movie;
}>();

const emit = defineEmits(['remove-movie']);

const criticScores = computed(() => {
  const scores = JSON.parse(props.selectedMovie.critic_scores)
  const parsedScores: MovieCriticScore[] = []
  scores.map((score: MovieCriticScore) => {
    parsedScores.push({Value: score.Value, Source: score.Source})
  })

  return parsedScores
})
</script>

<template>
  <div class="movie-details">
    <div class="movie-details-header">
      <img :alt="selectedMovie.title"
           :src="selectedMovie.poster"
           class="movie-poster"
           @error="(e) => (e.target as HTMLImageElement).src = posterPlaceholder"
      />
      <h2 class="movie-title">{{ selectedMovie.title }} ({{ selectedMovie.year }})</h2>
    </div>
    <dl class="movie-details-list">
      <div class="movie-detail">
        <dt>Plot</dt>
        <dd>{{ selectedMovie.plot }}</dd>
      </div>
      <div class="movie-detail">
        <dt>Genre</dt>
        <dd>{{ selectedMovie.genre }}</dd>
      </div>
      <div class="movie-detail">
        <dt>Actors</dt>
        <dd>{{ selectedMovie.actors }}</dd>
      </div>
      <div class="movie-detail">
        <dt>Directed By</dt>
        <dd>{{ selectedMovie.director }}</dd>
      </div>
      <div class="movie-detail">
        <dt class="detail-title">Critic Scores:</dt>
        <div v-for="score in criticScores" :key="score.Source">
          <dd class="critic-score-source">{{ score.Source }}</dd>
          <dd>{{ score.Value }}</dd>
        </div>
      </div>
    </dl>

    <button type="button" @click="emit('remove-movie', selectedMovie.id)">Remove From List</button>
  </div>
</template>

<style scoped>
dt {
  font-weight: bold;
}

.critic-score-source {
}

.movie-detail {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.movie-details {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: center;
  max-width: 40rem;
  margin: 0 auto;
}

.movie-details img {
  max-width: 15em;
  margin: 2rem auto;
}

.movie-details-header {
  margin: 2em 0;
}

.movie-details-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.movie-poster {
  width: 100%;
}

.movie-title {
  text-align: center;
}

@media (max-width: 1300px) {
  .movie-plot {
    margin: unset;
  }
}

@media (max-width: 767px) {
  .movie-details {
    align-items: center;
  }


  .movie-details img {
    max-height: 15em;
    max-width: 10em;
  }
}

</style>