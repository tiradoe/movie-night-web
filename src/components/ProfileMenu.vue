<script lang="ts" setup>
import { logout } from "~/composables/logout";

const isAuthenticated = ref(false);
let isOpened = ref(false);
const menuRef = ref<HTMLElement>();

const toggleMenu = function () {
  isOpened.value = !isOpened.value;
};

onMounted(() => {
  const handleClickOutside = (e: Event) => {
    if (!menuRef.value?.contains(e.target as Node)) {
      isOpened.value = false;
    } else {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains("menu-link") ||
        target.closest(".menu-link")
      ) {
        isOpened.value = false;
      }
    }
  };

  document.addEventListener("click", handleClickOutside);

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});
</script>

<template>
  <div ref="menuRef" class="profile-menu">
    <img
      alt="profile menu"
      class="profile-pic"
      src="https://placecage.lucidinternets.com/50/50"
      tabindex="0"
      @click="toggleMenu"
      @keydown.enter="toggleMenu"
      @keydown.space="toggleMenu"
    />
    <div class="menu-content">
      <ul v-show="isOpened">
        <li role="none">
          <NuxtLink class="menu-link" to="/admin">Admin</NuxtLink>
        </li>
        <li role="none">
          <NuxtLink class="menu-link" to="/user/profile"> Profile</NuxtLink>
        </li>
        <li role="none">
          <NuxtLink class="menu-link" to="/user/settings"> Settings</NuxtLink>
        </li>
        <li
          id="logout"
          class="menu-link"
          role="none"
          tabindex="0"
          @click="logout"
        >
          Logout
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.profile-menu {
  position: relative;
  display: inline-block;
}

.profile-pic {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.profile-pic:hover {
  border: 1px solid #6f0b51;
}

.menu-content {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 150px;
  background-color: #f9f9f9;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  overflow: hidden;
  border-radius: 0.5rem;
  text-align: center;
}

.menu-content li {
  color: black;
  text-decoration: none;
  display: block;
}

.menu-content li:hover {
  background-color: #6f0b51;
  color: white;
}

.menu-link {
  padding: 12px 16px;
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
}
</style>
