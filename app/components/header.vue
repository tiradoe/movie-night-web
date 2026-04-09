<script lang="ts" setup>
</script>
<template>
  <nav class="header">
    <span class="logo">
      <NuxtLink to="/lists">
      Movie Night
      </NuxtLink>
    </span>
    <ul class="links">
      <li>
        <NuxtLink to="/lists">Lists</NuxtLink>
      </li>
      <!-- <li>
        <NuxtLink to="/schedule">Schedule</NuxtLink>
      </li>
      -->
      <li>
        <ProfileMenu/>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font: bold 1.5rem sans-serif;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 1rem 0;
}

.links {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  list-style: none;
}

.links li {
  cursor: pointer;
}

/* sm */
@media (min-width: 640px) {
  .header {
    justify-content: space-between;
    flex-direction: row;
  }
}

/* md */
@media (min-width: 768px) {
}

/* lg */
@media (min-width: 1024px) {
}

/* xl */
@media (min-width: 1280px) {
}

/* 2xl */
@media (min-width: 1536px) {
}
</style>