<template>
  <div id="movie-modal" class="movie-modal movie-card hidden p-5">
    <span class="hover-pointer font-bold w-full block text-right sm:pr-5 pb-3 pt-5" @click="closeModal()">
      X
    </span>
    <slot class=""></slot>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    closeModal: function () {
      document.getElementById("movie-modal").classList.add("hidden")
    },
  },
}
</script>

<style scoped>

</style>