<template>
  <div>
    <div class="row justify-center justify-center-sm items-center q-mt-xl">
      <div class="col-auto text-filtro-region text-h3">Filtra por Región</div>
      <img class="col-auto pikachu" src="../assets/pikachu.png" alt="" />
    </div>
    <!-- filtro -->
    <div class="row container q-mx-md q-mt-lg text-center">
      <div class="col-12">
        <div class="row justify-center text-black text-weight-medium">
          <div
            class="col-md col-sm-3 col-4 q-ma-xs region kanto q-mx-md"
            @click="filtrar(0, 150)"
          >
            1° Kanto
          </div>
          <div
            class="col-md col-sm-3 col-4 q-ma-xs region johto q-mx-md"
            @click="filtrar(151, 250)"
          >
            2° Johto
          </div>
          <div
            class="col-md col-sm-3 col-4 q-ma-xs region hoenn q-mx-md"
            @click="filtrar(251, 385)"
          >
            3° Hoenn
          </div>
          <div
            class="col-md col-sm-3 col-4 q-ma-xs region sinnoh q-mx-md"
            @click="filtrar(386, 493)"
          >
            4° Sinnoh
          </div>
          <div
            class="col-md col-sm-3 col-4 q-ma-xs region teselia q-mx-md"
            @click="filtrar(494, 648)"
          >
            5° Teselia
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store.js";
const pokemonStore = usePokemonStore();
const filtrar = async (inicio, final) => {
  pokemonStore.getPokemons(inicio, final);
};
</script>

<style scoped>
.pikachu {
  width: 80px;
  object-fit: contain;
  aspect-ratio: 4/4;
}
</style>
