<template>
  <div class="col-12 col-md-8 q-pa-md">
    <q-card
      :class="`${
        $q.dark.isActive ? 'poke-card-dark' : 'poke-card-light'
      } borde q-pa-lg`"
    >
      <!-- Nombre -->
      <div class="row items-center">
        <!-- Nombre -->
        <div class="col-12 col-sm-6 text-h3 q-mb-sm text-weight-bolder">
          {{ pokemonStore.poke.nombre }}
        </div>
        <div class="col-sm-6 row justify-end">
          <q-btn
            @click="favorito(pokemonStore.poke.id)"
            color="primary"
            :outline="estado"
            rounded
            glossy
            ><div class="row" v-if="estado == true">
              <div class="col row items-center q-pr-md">En Favoritos</div>
              <img
                class="row items-center pokefav"
                src="../assets/pokeball.png"
                alt=""
              />
            </div>
            <div class="row" v-else>
              <div class="col row items-center q-pr-md">
                Guardar en Favoritos
              </div>
              <img
                class="row items-center pokefav"
                src="../assets/pokeballblack.png"
                alt=""
              /></div
          ></q-btn>
        </div>
      </div>

      <div class="text-h5 text-weight-medium q-mt-md q-mb-sm">Stats</div>
      <!-- Información -->
      <q-card-section class="no-padding">
        <div
          class="row items-center q-mt-xs"
          v-for="(estadistik, item) in pokemonStore.poke.estadistica"
          :key="item"
        >
          <!-- ataque y defensa -->
          <div
            :class="`col-3 ${
              $q.dark.isActive ? `text-grey-5` : 'text-grey-9'
            } text-caption row q-pr-md`"
            style="font-size: 15px; font-weight: 500"
          >
            {{ estadistik[0] }}
          </div>
          <div class="col">
            <EstadisticaBar
              :estadistica="estadistik[1]"
              :color="color[item]"
            ></EstadisticaBar>
          </div>
          <div
            :class="`col-2 row justify-end ${
              $q.dark.isActive ? `text-grey-5` : 'text-grey-9'
            }`"
            style="font-size: 20px; font-weight: 500"
          >
            {{ estadistik[1] }}
          </div>
        </div>
      </q-card-section>

      <div class="text-h5 text-weight-medium q-mt-md">Sprites</div>
      <!-- Sprites -->
      <div class="row">
        <div class="col-3 row justify-center" style="height: 100px">
          <img :src="pokemonStore.poke.sprites.front_default" />
        </div>
        <div class="col-3 row justify-center" style="height: 100px">
          <img :src="pokemonStore.poke.sprites.back_default" />
        </div>
        <div class="col-3 row justify-center" style="height: 100px">
          <img :src="pokemonStore.poke.sprites.front_shiny" />
        </div>
        <div class="col-3 row justify-center" style="height: 100px">
          <img :src="pokemonStore.poke.sprites.back_shiny" />
        </div>
      </div>

      <q-card-section> </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store";
import { ref, watchEffect } from "vue";
import { useQuasar } from "quasar";

import { useNotify } from "src/composables/notifyHook";
import { useRoute } from "vue-router";

import EstadisticaBar from "src/components/EstadisticaBar.vue";

const pokemonStore = usePokemonStore();
const $q = useQuasar();
const { successNotify, failNotify } = useNotify();
const route = useRoute();

const estado = ref(false);
const color = ["green", "red", "blue", "pink", "cyan", "purple"];
var array = JSON.parse(localStorage.getItem("favorito")) || [];

const favorito = (id) => {
  estado.value = !estado.value;

  if (!array.includes(id)) {
    array.push(id);
    successNotify("Pokemon agregado a favoritos", "bottom", "1500");
  } else {
    array = array.filter((item) => item !== id);
    failNotify("Pokemon eliminado de favoritos", "bottom", "1500");
  }

  localStorage.setItem("favorito", JSON.stringify(array));
};

(async () => {
  await pokemonStore.infoPokemon(route.params.id);

  if (array.includes(route.params.id)) {
    estado.value = true;
  }
})();

watchEffect(() => $q.dark.isActive);
</script>
