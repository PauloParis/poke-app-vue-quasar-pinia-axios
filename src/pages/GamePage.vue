<template>
  <q-page class="q-ma-md row justify-center">
    <div class="" v-for="(poke, index) in pokemonStore.pokemones" :key="index">
      <div class="col-12">
        <q-card class="my-card q-ma-md bg-primary">
          <q-card-section class="row justify-center">
            <img
              class="hidden-pokemon"
              :src="poke.sprites.other.dream_world.front_default"
              style="width: 150px; height: 150px"
            />
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section class="row justify-between items-center">
            <div class="col-4 text-h6 text-white">{{ poke.name }}</div>
            <div class="column items-end text-h6 text-white">
              #{{ poke.id }}
            </div>
          </q-card-section>
          <!-- <q-card-section class="no-padding"> -->
          <div class="row justify-center">
            <RouterLink class="no-underline" :to="`/pokemon/${poke.id}`"
              ><q-btn
                style="width: 100%"
                class="bg-primary text-white row justify-center q-mx-md"
                >Ver Información</q-btn
              ></RouterLink
            >
          </div>

          <!-- /q-card-section> -->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store.js";
const pokemonStore = usePokemonStore();
pokemonStore.getPokemons();
</script>

<style>
.my-card {
  width: 240px;
  height: 300px;
  border: solid #151414f7;
  border-width: thin;
  border-radius: 10px;
}

.hidden-pokemon {
  filter: brightness(0);
}
.no-underline {
  text-decoration: none;
}
/* .body
  background: $dark */
</style>
