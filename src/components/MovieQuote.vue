<template>
  <blockquote
    class="flex flex-col gap-10 movie-card p-10 neon-border text-center"
  >
    <span>
      {{ quote.quote }}
    </span>

    <div class="flex gap-2 italic flex-col">
      <span>{{ quote.actor }}</span>
      <span>{{ quote.movie }}</span>
    </div>
  </blockquote>
</template>

<style scoped></style>
<script lang="ts" setup>
const quotes = [
  {
    actor: "Darren Ewing as Arnold",
    movie: "Troll 2",
    quote: "They're eating her... and then they're going to eat me! OH MY GOD!",
  },
  {
    actor: "Tommy Wiseau as Johnny",
    movie: "The Room",
    quote: "You're tearing me apart, Lisa!",
  },
  {
    actor: "Arnold Schwaarzenegger as T-800",
    movie: "Terminator 2: Judgment Day",
    quote: "Hasta la vista, baby.",
  },
  {
    actor: "Karolyn Grimes as Zuzu",
    movie: "It's a Wonderful Life",
    quote: "Every time a bell rings, an angel gets his wings.",
  },
  {
    actor: "Pat Morita as Mr. Miyagi",
    movie: "The Karate Kid",
    quote: "Wax on, Wax off",
  },
  {
    actor: "Dolph Lundgren as Drago",
    movie: "Rocky 4",
    quote: "I must break you.",
  },
];

const randomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

const quote = ref(randomQuote());
</script>
