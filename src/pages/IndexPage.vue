<template>
  <q-page class="q-ma-md row justify-center">
    <div class="" v-for="(poke, index) in pokemonStore.info" :key="index">
      <div class="col-12">
        <q-card
          :class="`${
            $q.dark.isActive ? 'my-card-dark' : 'my-card-light'
          } q-ma-md no-shadow`"
        >
          <q-card-section class="row justify-center">
            <!-- <div style="height: 150px"> -->
            <img
              style="height: 150px; width: 100%"
              :src="`${poke.sprites.other.dream_world.front_default}`"
            />
            <!-- </div> -->
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
            <!-- style="width: 210px" -->
          </q-card-section>
          <!-- <q-card-section class="no-padding"> -->

          <!-- /q-card-section> -->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store.js";
import { watchEffect } from "vue";
import { useQuasar } from "quasar";

const pokemonStore = usePokemonStore();
pokemonStore.getPokemons();

const $q = useQuasar();
watchEffect(() => $q.dark.isActive);
</script>
