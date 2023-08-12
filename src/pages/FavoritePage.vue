<template>
  <q-page class="q-mx-md q-mt-md row justify-between justify-center-sm">
    <div v-for="(poke, index) in pokemonStore.favorite" :key="index">
      <CardPoke :name="poke.name" :id="poke.id"></CardPoke>
    </div>
  </q-page>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store";
import { watchEffect } from "vue";
import { useQuasar } from "quasar";
import CardPoke from "src/components/CardPoke.vue";

const pokemonStore = usePokemonStore();
const favoritos = JSON.parse(localStorage.getItem("favorito")) || [];
pokemonStore.favoritePokemon(favoritos);

const $q = useQuasar();
watchEffect(() => $q.dark.isActive);
</script>
