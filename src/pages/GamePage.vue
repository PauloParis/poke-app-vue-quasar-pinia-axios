<template>
  <q-page class="q-ma-md">
    <div
      :class="`text-h3 text-center text-blue-grey-14 q-mb-sm  row items-center justify-center`"
    >
      ¿Quien es ese Pokemon?
    </div>
    <div class="row items-center justify-center">
      <q-card class="my-card-game q-ma-md bg-grey-13">
        <q-card-section class="row justify-center">
          <img
            :class="{ 'hidden-pokemon': estado != true }"
            style="height: 150px; width: 100%"
            :src="`${pokemonStore.dataGame.img}`"
          />
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="row justify-between items-center">
          <div v-if="estado == true" class="col-8 text-h6 text-dark">
            {{ pokemonStore.dataGame.name }}
          </div>
          <div v-if="estado == true" class="column items-end text-h6 text-dark">
            #{{ pokemonStore.dataGame.id }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div v-if="estado == true" class="row justify-center">
      <div
        class="bg-green-3 col-12 col-md-4 text-h6 text-weight-bold q-pa-md text-green-10"
        style="border-radius: 5px"
      >
        <div class="row justify-center">Correcto!!!</div>
      </div>
    </div>
    <div v-else-if="estado == false" class="row justify-center">
      <div
        class="bg-red-3 col-12 col-md-4 text-h6 text-weight-bold q-pa-md text-red-10"
        style="border-radius: 5px"
      >
        <div class="row justify-center">Intentalo de Nuevo!!!</div>
      </div>
    </div>

    <div class="row justify-center">
      <div
        class="col-12 row justify-center"
        v-for="(name, index) in pokemonStore.randomName"
        :key="index"
      >
        <div
          :class="`row justify-center ${
            $q.dark.isActive ? 'efecto-name-dark' : 'efecto-name-light'
          } q-pa-xs q-mt-sm`"
          style="width: 300px; border-radius: 10px"
          @click="probando(name)"
        >
          {{ name }}
        </div>
      </div>
    </div>

    <div class="row justify-center q-mt-md">
      <q-btn
        @click="pokemonStore.gamePokemon, vaciar()"
        color="primary"
        glossy
        style="width: 300px"
        >Nuevo Juego</q-btn
      >
    </div>
  </q-page>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store.js";
import { watchEffect, ref, onMounted } from "vue";
import { useQuasar } from "quasar";

const pokemonStore = usePokemonStore();
const estado = ref("random");
const $q = useQuasar();

watchEffect(() => $q.dark.isActive);
pokemonStore.randomName = [];
/* onMounted(() => {
  pokemonStore.randomName = [];
}); */

pokemonStore.gamePokemon();

const vaciar = async () => {
  pokemonStore.randomName = [];
  estado.value = "random";
  await pokemonStore.gamePokemon();
};

const probando = (name) => {
  if (name == pokemonStore.dataGame.name) {
    estado.value = true;
  } else {
    estado.value = false;
  }
};
</script>
