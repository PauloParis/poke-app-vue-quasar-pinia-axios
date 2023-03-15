<template>
  <q-page class="q-ma-md row justify-center">
    <div class="" v-for="(poke, index) in pokemonStore.favorite" :key="index">
      <div class="col-12">
        <q-card class="my-card q-ma-md bg-grey-10">
          <q-card-section class="row justify-center">
            <img
              style="height: 150px; width: 100%"
              :src="`${poke.sprites.other.dream_world.front_default}`"
            />
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section class="row justify-between items-center">
            <div class="col-8 text-h6 text-white">{{ poke.name }}</div>
            <div class="column items-end text-h6 text-white">
              #{{ poke.id }}
            </div>
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

const pokemonStore = usePokemonStore();
var array = JSON.parse(localStorage.getItem("favorito"));
array.reverse();
pokemonStore.favoritePokemon(array);
</script>

<style>
.my-card {
  width: 240px;
  height: 300px;
  border: solid #151414f7;
  border-width: thin;
  border-radius: 10px;
}
.no-underline {
  text-decoration: none;
}
</style>
