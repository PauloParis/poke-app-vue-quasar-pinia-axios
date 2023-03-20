<template>
  <q-page class="q-ma-md row justify-center">
    <div class="" v-for="(poke, index) in pokemonStore.favorite" :key="index">
      <div class="col-12">
        <CardPoke :name="poke.name" :id="poke.id"></CardPoke>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store";
import { watchEffect } from "vue";
import { useQuasar } from "quasar";

import CardPoke from "src/components/CardPoke.vue";

const pokemonStore = usePokemonStore();
var array = JSON.parse(localStorage.getItem("favorito"));
pokemonStore.favoritePokemon(array);

const $q = useQuasar();
watchEffect(() => $q.dark.isActive);
</script>
