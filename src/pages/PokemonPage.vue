<template>
  <div class="row q-ma-md">
    <!-- imagen -->
    <div class="col-12 col-md-4">
      <q-card
        :class="`${
          $q.dark.isActive ? 'poke-card-dark' : 'poke-card-light'
        } borde q-ma-sm q-pa-md row justify-center`"
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
            class="row justify-center q-pa-sm col-12 col-sm-8 col-lg-12 text-weight-medium poke-border"
          >
            <div
              :class="`${
                $q.dark.isActive ? 'text-white' : 'text-grey-10'
              } col-6 row text-body1 justify-center `"
            >
              Altura:
            </div>
            <div
              :class="`${
                $q.dark.isActive ? 'text-white' : 'text-grey-10'
              } col-6 row text-body1 justify-center `"
            >
              Peso:
            </div>
            <div class="col-6 row justify-center text-h6 text-weight-medium">
              {{ pokemonStore.poke.altura }} [m]
            </div>
            <div class="col-6 row justify-center text-h6 text-weight-medium">
              {{ pokemonStore.poke.peso }} [kg]
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <!-- información -->
    <div class="col-12 col-md-8">
      <q-card
        :class="`${
          $q.dark.isActive ? 'poke-card-dark' : 'poke-card-light'
        } borde q-ma-sm q-pa-lg`"
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
              ><div v-if="estado == true">En Favoritos</div>
              <div v-else>Guardar en Favoritos</div></q-btn
            >
          </div>
        </div>

        <div class="text-h5 text-weight-medium q-mt-md q-mb-sm">Stats</div>
        <!-- Información -->
        <q-card-section class="no-padding">
          <div
            class="row items-center q-mt-xs"
            v-for="(esta, item) in pokemonStore.poke.estadistica"
            :key="item"
          >
            <!-- ataque y defensa -->

            <div
              :class="`col-3 ${
                $q.dark.isActive ? 'text-grey-5' : 'text-grey-9'
              } text-caption row q-pr-md`"
            >
              {{ esta[0] }}
            </div>
            <div class="col-8">
              <q-slider
                disable
                v-model="esta[1]"
                :min="0"
                :max="200"
                track-color="grey-7"
                :color="color[item]"
              />
            </div>
            <div class="col-1 row justify-end">{{ esta[1] }}</div>
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
  </div>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

const pokemonStore = usePokemonStore();
const route = useRoute();
const $q = useQuasar();

watchEffect(() => $q.dark.isActive);

const color = ["green", "red", "blue", "teal", "pink", "cyan"];
const estado = ref(false);

pokemonStore.infoPokemon(route.params.id);

var array = JSON.parse(localStorage.getItem("favorito"));
let found;
if (array != null) {
  found = array.find((item) => item == route.params.id);
  if (found != undefined) {
    estado.value = !estado.value;
  }
}

const favorito = async (id) => {
  //si no tengo favoritos
  if (array == null) {
    let idd = [id];
    estado.value = !estado.value;
    $q.notify({
      type: "positive",
      message: "Pokemon agregado a favoritos",
    });
    return localStorage.setItem("favorito", JSON.stringify(idd));
  }

  let found = array.find((item) => item == id);
  // si ya tengo guardado ese favorito, lo elimino
  if (found != undefined) {
    array = array.filter((item) => item != found);
    estado.value = !estado.value;
    $q.notify({
      type: "negative",
      message: "Pokemon fue sacado de los favoritos",
    });
    return localStorage.setItem("favorito", JSON.stringify(array));
  }
  // guardo el favorito
  array.push(id);
  estado.value = !estado.value;
  $q.notify({
    type: "positive",
    message: "Pokemon agregado a favoritos",
  });
  localStorage.setItem("favorito", JSON.stringify(array));
};
</script>
