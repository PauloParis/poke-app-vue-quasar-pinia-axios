<template>
  <div class="row q-ma-md">
    <!-- imagen -->
    <div class="col-12 col-md-4">
      <q-card
        class="bg-dark borde q-ma-sm q-pa-md row justify-center"
        style="height: 520px"
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
            <!-- 'text-white q-px-md text-h6 borde' -->
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
            style="border-radius: 5px"
            class="row justify-center q-pa-sm col-12 col-sm-8 col-lg-12 text-white text-weight-medium bg-secondary"
          >
            <div class="col-6 row justify-center text-grey-4">Altura:</div>
            <div class="col-6 row justify-center text-grey-4">Peso:</div>
            <div class="col-6 row justify-center text-body1 text-weight-medium">
              {{ pokemonStore.poke.altura }} [m]
            </div>
            <div class="col-6 row justify-center text-body1 text-weight-medium">
              {{ pokemonStore.poke.peso }} [kg]
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <!-- información -->
    <div class="col-12 col-md-8">
      <q-card class="bg-dark borde q-ma-sm q-pa-lg" style="height: 520px">
        <!-- Nombre y Tipo -->
        <div class="row items-center">
          <!-- Nombre -->
          <div class="q-mr-lg text-white text-h3 text-weight-bolder">
            {{ pokemonStore.poke.nombre }}
          </div>
          <div class="col row justify-end">
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

        <div class="text-white text-h5 text-weight-medium q-mt-md q-mb-sm">
          Stats
        </div>
        <!-- Información -->
        <q-card-section class="no-padding">
          <div
            class="row items-center q-mt-xs text-white"
            v-for="(esta, item) in pokemonStore.poke.estadistica"
            :key="item"
          >
            <!-- ataque y defensa -->

            <div :class="`col-3 text-grey-5 text-caption row q-pr-md`">
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

        <div class="text-white text-h5 text-weight-medium q-mt-md">Sprites</div>
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

const pokemonStore = usePokemonStore();
const route = useRoute();
const $q = useQuasar();

const color = ["green", "red", "blue", "teal", "pink", "cyan"];
const estado = ref(false);

/* onMounted(async () => {
  await pokemonStore.infoPokemon(route.params.id);
});
 */
pokemonStore.infoPokemon(route.params.id);

var array = JSON.parse(localStorage.getItem("favorito"));
let found = array.find((item) => item == route.params.id);
if (found != undefined) {
  estado.value = true;
}

const favorito = async (id) => {
  //si no tengo favoritos
  if (array === null) {
    let idd = [id];
    estado.value = false;
    $q.notify({
      type: "Positive",
      message: "Pokemon agregado a favoritos",
    });
    return localStorage.setItem("favorito", JSON.stringify(idd));
  }

  let found = array.find((item) => item == id);
  // si ya tengo guardado ese favorito, lo elimino
  if (found != undefined) {
    array = array.filter((item) => item != found);
    estado.value = false;
    return localStorage.setItem("favorito", JSON.stringify(array));
  }
  // guardo el favorito
  array.push(id);
  estado.value = true;
  $q.notify({
    type: "positive",
    message: "Pokemon agregado a favoritos",
  });
  localStorage.setItem("favorito", JSON.stringify(array));
};
</script>

<style>
.borde {
  border-radius: 10px;
}
</style>
