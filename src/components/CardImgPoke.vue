<template>
  <div class="col-12 col-md-4 q-pa-md">
    <q-card
      :class="`${
        $q.dark.isActive ? 'poke-card-dark' : 'poke-card-light'
      } borde q-pa-md row justify-center`"
      style="height: 550px"
    >
      <img
        class="col-12"
        :src="pokemonStore.poke.image"
        style="width: 350px; height: 350px"
      />
      <div class="col-12 row justify-center items-center">
        <!-- Tipo -->
        <div
          class="q-ma-xs"
          v-for="(type, item) in pokemonStore.poke.tipo"
          :key="item"
        >
          <div
            :class="`text-white ${type.color} q-px-md text-h6 borde bg-primary`"
          >
            {{ type.type }}
          </div>
        </div>
      </div>
      <!-- peso y altura -->
      <div class="col-12 row justify-center q-mt-sm">
        <div
          class="row justify-center q-pa-sm col-12 col-sm-8 col-md-12 col-lg-12 text-weight-medium"
        >
          <div
            :class="`${
              $q.dark.isActive ? 'text-white' : 'text-grey-10'
            } col-4 row text-body1 justify-center`"
          >
            <div class="row">
              <div class="col-12 text-center">Altura</div>
              <div class="col-12 text-center text-h6 text-weight-medium">
                {{ pokemonStore.poke.altura }} [m]
              </div>
            </div>
          </div>
          <div class="col-4 row items-center justify-center">
            <img class="pokeball" src="../assets/pokeball.png" alt="" />
          </div>
          <div
            :class="`${
              $q.dark.isActive ? 'text-white' : 'text-grey-10'
            } col-4 row text-body1 justify-center `"
          >
            <div class="row">
              <div class="col-12 text-center text-weight-bold">Peso:</div>
              <div class="col-12 text-center text-h6 text-weight-medium">
                {{ pokemonStore.poke.peso }} [kg]
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store";
import { watchEffect } from "vue";
import { useQuasar } from "quasar";

const pokemonStore = usePokemonStore();
const $q = useQuasar();

watchEffect(() => $q.dark.isActive);
</script>
