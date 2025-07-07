<script lang="ts" setup></script>

<template>
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
          <span id="name">Eddie Tirado</span>
        </li>
        <li class="user-detail">
          <label for="username">Username</label>
          <span id="username">tiradoe@movienight.social</span>
        </li>
        <li class="user-detail">
          <label for="date-joined">Date Joined</label>
          <span id="date-joined">8 Feb 1984</span>
        </li>
      </ul>
    </div>

    <hr class="neon-border my-5" />

    <div id="extra-fields">
      <div id="reviews">
        <h3 class="section-header">Reviews</h3>
        <ul class="movie-review-list">
          <li class="movie-review">
            <span>The Room</span>
            <span>*****</span>
            <span>Best. Movie. Ever.</span>
          </li>
          <li class="movie-review">
            <span>Citizen Kane</span>
            <span>*</span>
            <span>Trash</span>
          </li>
        </ul>
      </div>

      <div id="movielists">
        <h3 class="section-header">Lists</h3>
        <ul id="movielist-list"></ul>
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
