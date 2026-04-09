<script lang="ts" setup>
import {type Movie} from "~/types/movie";
import posterPlaceholder from "~/assets/img/poster-placeholder.svg";
import Card from "~/components/common/card.vue";

type SortField = 'title' | 'year'
type SortDirection = 'asc' | 'desc'
type SortOption = { field: SortField, direction: SortDirection }

const props = defineProps<{
  movies: Movie[]
}>()

const emit = defineEmits<{
  'movie-clicked': [movie: Movie],
  'add-movie': []
}>()

const searchQuery = ref('');
const imageErrors = ref<Set<number>>(new Set());
const sortMenuOpen = ref(false);
const sortMenuRef = ref<HTMLElement | null>(null);
const currentSort = ref<SortOption>({field: 'title', direction: 'asc'});

const sortMovies = (movies: Movie[]): Movie[] => {
  if (!currentSort.value) return movies;

  const {field, direction} = currentSort.value;
  return [...movies].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    let comparison: number;
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      comparison = aVal.localeCompare(bVal);
    } else {
      comparison = (aVal as number) - (bVal as number);
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}

const filteredMovies = ref<Movie[]>(sortMovies(props.movies));

const applySort = (field: SortField, direction: SortDirection) => {
  currentSort.value = {field, direction};
  filteredMovies.value = sortMovies(filteredMovies.value);
  sortMenuOpen.value = false;
}

const toggleSortMenu = () => {
  sortMenuOpen.value = !sortMenuOpen.value;
}

const onSortClickOutside = (e: MouseEvent) => {
  if (sortMenuRef.value && !sortMenuRef.value.contains(e.target as Node)) {
    sortMenuOpen.value = false;
  }
}

onMounted(() => document.addEventListener('click', onSortClickOutside))
onUnmounted(() => document.removeEventListener('click', onSortClickOutside))

watch(() => props.movies, (newMovies) => {
  filteredMovies.value = sortMovies(newMovies);
});

const movieSearch = () => {
  const filtered = props.movies.filter(
      movie => movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  filteredMovies.value = sortMovies(filtered);
}

const handleImageError = (e: Event, movieId: number) => {
  (e.target as HTMLImageElement).src = posterPlaceholder;
  imageErrors.value.add(movieId);
}

const isSortActive = (field: SortField, direction: SortDirection): boolean => {
  return currentSort.value?.field === field && currentSort.value?.direction === direction;
}

</script>

<template>
  <Card>
    <div class="list-controls-container">
      <div class="list-controls">
        <input v-model="searchQuery" placeholder="Search Movies" type="text" @keyup="movieSearch"/>
        <div ref="sortMenuRef" class="sort-menu-container">
          <Icon
              class="list-controls-icon"
              name="solar:sort-vertical-linear"
              size="24"
              title="Sort Movies"
              @click="toggleSortMenu"
          />
          <ul v-if="sortMenuOpen" class="sort-dropdown">
            <li @click.stop="applySort('title', 'asc')">
              <Icon v-if="isSortActive('title', 'asc')" name="solar:check-circle-linear" size="16"/>
              Title (A-Z)
            </li>
            <li @click.stop="applySort('title', 'desc')">
              <Icon v-if="isSortActive('title', 'desc')" name="solar:check-circle-linear" size="16"/>
              Title (Z-A)
            </li>
            <li @click.stop="applySort('year', 'asc')">
              <Icon v-if="isSortActive('year', 'asc')" name="solar:check-circle-linear" size="16"/>
              Year (Oldest First)
            </li>
            <li @click.stop="applySort('year', 'desc')">
              <Icon v-if="isSortActive('year', 'desc')" name="solar:check-circle-linear" size="16"/>
              Year (Newest First)
            </li>
          </ul>
        </div>
      </div>
      <button class="add-movie-button" @click="emit('add-movie')">Add Movie</button>
    </div>
    <div v-if="filteredMovies.length === 0" class="movie-quote">
      <span class="quote">"You complete me."</span>
      <span class="attribution">Tom Cruise, Jerry Maguire</span>
    </div>
    <ul v-else class="movie-list">
      <li v-for="movie in filteredMovies" :key="movie.id" class="movie" @click="emit('movie-clicked', movie)">
        <div class="movie-poster-container">
          <img
              :class="{ 'movie-poster-error': imageErrors.has(movie.id) }"
              :src="movie.poster"
              alt=""
              class="movie-poster"
              @error="(e) => handleImageError(e, movie.id)"
          />
          <div v-if="imageErrors.has(movie.id)" class="movie-title-overlay">
            {{ movie.title }}
          </div>
        </div>
      </li>
    </ul>
  </Card>
</template>

<style scoped>

.list-controls-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
}

.list-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-menu-container {
  position: relative;
}

.sort-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  list-style: none;
  padding: 0.25rem 0;
  min-width: 10rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.sort-dropdown li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  white-space: nowrap;
  cursor: pointer;
}

.sort-dropdown li:hover {
  background: #f0f0f0;
}

.movie-list {
  display: grid;
  /*grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));*/
  grid-template-columns: repeat(auto-fill, minmax(14em, 1fr));
  gap: 1rem;
}

.movie {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.movie-poster-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.movie img {
  object-fit: fill;
  width: 100%;
  height: 100%;
  max-height: 25rem;
}

.movie img.movie-poster-error {
  object-fit: cover;
}

.movie-title-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  max-width: 90%;
  word-wrap: break-word;
}

.movie-quote {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 5rem 0;
}

@media (max-width: 640px) {
  .list-controls-container {
    flex-direction: column;
  }

  .list-controls {
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding-bottom: 1rem;
  }

  .list-controls input {
    flex-grow: 1;
  }
}
</style>