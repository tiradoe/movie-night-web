<template>
  <div class="auth-container">
    <slot/>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  gap: 3rem;
}
</style>
