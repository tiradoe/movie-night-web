<script lang="ts" setup>
const dropdownOpen = ref(false)
const profileMenu = ref<HTMLElement | null>(null)

const {logout} = useAuth()

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const onClickOutside = (e: MouseEvent) => {
  if (profileMenu.value && !profileMenu.value.contains(e.target as Node)) {
    dropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="profileMenu" class="profile-menu">
    <button class="profile-pic" @click="toggleDropdown">
      <img alt="Profile" src="~/assets/img/profile-placeholder.svg"/>
    </button>

    <ul v-if="dropdownOpen" class="dropdown">
      <li>
        <NuxtLink to="/account" @click="dropdownOpen = false">Account</NuxtLink>
      </li>
      <li @click="logout">Log Out</li>
    </ul>
  </div>
</template>

<style scoped>
.profile-menu {
  position: relative;
}

.profile-pic {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.profile-pic img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  list-style: none;
  padding: 0.25rem 0;
  min-width: 8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.dropdown li {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  white-space: nowrap;
}

.dropdown li:hover {
  background: #f0f0f0;
}

</style>