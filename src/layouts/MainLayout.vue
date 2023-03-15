<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="row items-center" elevated style="height: 70px">
      <q-toolbar>
        <q-toolbar-title
          ><RouterLink
            class="no-underline"
            to="/"
            @click="pokemonStore.randomName = []"
          >
            Pokemon
          </RouterLink></q-toolbar-title
        >
        <q-toolbar-title
          ><RouterLink class="no-underline" to="/game">
            Juego
          </RouterLink></q-toolbar-title
        >
        <q-toolbar-title
          ><RouterLink
            class="no-underline"
            to="/favorite"
            @click="pokemonStore.randomName = []"
          >
            Favoritos
          </RouterLink></q-toolbar-title
        >

        <q-btn>modo noche</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store";

const pokemonStore = usePokemonStore();
</script>
<style>
.no-underline {
  text-decoration: none;
}
.no-underline:active {
  color: white;
}
.no-underline:hover {
  color: green;
}
</style>
