<template>
  <q-page class="row justify-center items-center">
    <div class="col-12 col-md-6">
      <div class="text-center q-mb-sm">
        <img src="../assets/who.png" alt="" />
        <div class="row justify-center q-mt-md">
          <q-btn
            @click="nuevoJuego()"
            color="primary"
            glossy
            style="width: 300px"
            >Nuevo Juego</q-btn
          >
        </div>
      </div>
    </div>
    <GamePoke
      :estado="estado"
      :estadoImg="estadoImg"
      :img="img"
      :id="id"
      :nombresAleatorios="nombresAleatorios"
      :randomElemento="randomElemento"
      @cambiarEstado="cambiarEstadoEnComponenteA"
    ></GamePoke>
  </q-page>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store.js";
import { ref } from "vue";
import GamePoke from "src/components/GamePoke.vue";

const pokemonStore = usePokemonStore();
const estado = ref();
const estadoImg = ref(false);
const randomElemento = ref();
const nombresAleatorios = ref([]);
const id = ref();
const img = ref("");
pokemonStore.getPokemons();

const cambiarEstadoEnComponenteA = (nuevoEstado) => {
  estado.value = nuevoEstado;
};

const nuevoJuego = () => {
  estado.value = null;
  estadoImg.value = true;
  const getRandomIndex = (max) => Math.floor(Math.random() * max);

  const randomIndex = getRandomIndex(151);
  randomElemento.value = pokemonStore.pokemones[0][randomIndex];

  nombresAleatorios.value = [randomElemento.value];
  const { url } = randomElemento.value;
  id.value = url.split("/")[6];
  img.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id.value}.svg`;

  while (nombresAleatorios.value.length < 4) {
    const indiceRandom = getRandomIndex(pokemonStore.pokemones[0].length);
    const elementoRandom = pokemonStore.pokemones[0][indiceRandom];

    if (
      !nombresAleatorios.value.some((el) => el.name === elementoRandom.name)
    ) {
      nombresAleatorios.value.push(elementoRandom);
    }
  }

  nombresAleatorios.value.sort((a, b) => a.name.localeCompare(b.name));
};
</script>

<style scoped>
img {
  width: 480px;
  object-fit: contain;
}

q-page {
  height: 100vh;
}

@media only screen and (max-width: 1024px) {
  img {
    width: 380px;
  }
}
</style>
