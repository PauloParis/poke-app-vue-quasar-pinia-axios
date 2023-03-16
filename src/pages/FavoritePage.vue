<template>
  <q-page class="q-ma-md row justify-center">
    <div class="" v-for="(poke, index) in pokemonStore.favorite" :key="index">
      <div class="col-12">
        <q-card
          :class="`${
            $q.dark.isActive ? 'my-card-dark' : 'my-card-light'
          } q-ma-md no-shadow`"
        >
          <q-card-section class="row justify-center">
            <img
              style="height: 150px; width: 100%"
              :src="`${poke.sprites.other.dream_world.front_default}`"
            />
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section class="row justify-between items-center">
            <div class="col-8 text-h6">{{ poke.name }}</div>
            <div class="column items-end text-h6">#{{ poke.id }}</div>
          </q-card-section>
          <q-card-section class="no-padding">
            <div class="row justify-center">
              <RouterLink class="no-underline" :to="`/pokemon/${poke.id}`"
                ><q-btn style="width: 210px" class="bg-primary text-white"
                  >Ver Información</q-btn
                ></RouterLink
              >
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store";
import { watchEffect } from "vue";
import { useQuasar } from "quasar";

const pokemonStore = usePokemonStore();
var array = JSON.parse(localStorage.getItem("favorito"));
pokemonStore.favoritePokemon(array);

const $q = useQuasar();
watchEffect(() => $q.dark.isActive);
</script>
