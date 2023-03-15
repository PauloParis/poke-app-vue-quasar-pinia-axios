<template>
  <!--   <div class="row">
    <div class="col-4 q-pa-md">
      <div class="text-black">NOMBRE: {{ pokemonStore.poke.nombre }}</div>
      <div class="text-black">PESO: {{ pokemonStore.poke.peso }} kg</div>
      <div class="text-black">ALTURA: {{ pokemonStore.poke.altura }} m</div>
      <img :src="pokemonStore.poke.image" style="width: 150px; height: 150px" />
    </div>
  </div> -->

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
    <div class="col-12 col-md-8">
      <q-card class="bg-dark borde q-ma-sm q-pa-lg" style="height: 520px">
        <!-- Nombre y Tipo -->
        <div class="row">
          <!-- Nombre -->
          <div
            class="row items-center q-mr-lg text-white text-h3 text-weight-bolder"
          >
            {{ pokemonStore.poke.nombre }}
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

            <!-- <div
              class="col-12 row justify-center items-center"
              style="border-radius: 10px; border: solid 1px #fff"
            >
              <div
                class="col-4 q-pa-xs row justify-center items-center"
                v-for="(esta, item) in pokemonStore.poke.estadistica"
                :key="item"
              >
                <div class="column items-center">
                  <div class="col text-white">
                    {{ esta[0] }}
                  </div>
                  <div class="col">
                    <q-knob
                      v-model="esta[1]"
                      show-value
                      size="40px"
                      :thickness="0.22"
                      color="orange-6"
                      track-color="orange-2"
                      class="text-orange-6 q-ma-md"
                      disable
                    />
                  </div>
                </div>
              </div>
            </div> -->
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

  <!-- <div class="text-primary text-h2">
    {{ route.params.id }}
  </div>
  <div class="text-primary"></div> -->
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const pokemonStore = usePokemonStore();
const route = useRoute();

const color = ["green", "red", "blue", "teal", "pink", "cyan"];

/* onMounted(async () => {
  await pokemonStore.infoPokemon(route.params.id);
});
 */
pokemonStore.infoPokemon(route.params.id);
//console.log(pokemonStore.info);
</script>

<style>
.borde {
  border-radius: 10px;
}
</style>
