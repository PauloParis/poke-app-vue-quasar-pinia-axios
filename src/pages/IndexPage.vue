<template>
  <FiltroRegion></FiltroRegion>
  <q-page class="q-mx-md row justify-between justify-center-sm">
    <div v-for="(poke, index) in pokemonStore.pokemones[0]" :key="index">
      <CardPoke :name="poke.name" :id="id(poke.url)"></CardPoke>
    </div>
  </q-page>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store.js";
import { watchEffect, computed } from "vue";
import { useQuasar } from "quasar";
import CardPoke from "src/components/CardPoke.vue";
import FiltroRegion from "src/components/FiltroRegion.vue";

const pokemonStore = usePokemonStore();
pokemonStore.getPokemons();

const obtenerIdUrl = (url) => parseInt(url.split("/").slice(-2, -1)[0]);
const id = computed(() => obtenerIdUrl);

const $q = useQuasar();
watchEffect(() => $q.dark.isActive);
</script>
