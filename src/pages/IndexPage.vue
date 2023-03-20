<template>
  <q-page class="q-ma-md row justify-center">
    <div
      class=""
      v-for="(poke, index) in pokemonStore.pokemones[0]"
      :key="index"
    >
      <div class="col-12">
        <CardPoke :name="poke.name" :id="index + 1"></CardPoke>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store.js";
import { onMounted, watchEffect } from "vue";
import { useQuasar } from "quasar";

import CardPoke from "src/components/CardPoke.vue";

const pokemonStore = usePokemonStore();
const $q = useQuasar();

onMounted(async () => {
  try {
    $q.loading.show();
    await pokemonStore.getPokemons();
  } catch (error) {
    console.log(error);
  } finally {
    $q.loading.hide();
  }
});

watchEffect(() => $q.dark.isActive);
</script>
