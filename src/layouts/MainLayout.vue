<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="text-white"
      :class="`${$q.dark.isActive ? 'layout-bg-dark' : 'layout-bg-light'}`"
      height-hint="98"
    >
      <div class="q-mx-md row justify-between">
        <q-toolbar-title class="q-ml-md no-padding">
          <div class="row items-center">
            <img src="../assets/pokelogo.png" alt="" />
          </div>
        </q-toolbar-title>
        <q-toggle
          class=""
          v-model="pokemonStore.dark"
          checked-icon="dark_mode"
          size="lg"
          unchecked-icon="light_mode"
          @click="modo()"
        />
      </div>

      <q-tabs align="center">
        <q-route-tab to="/" label="Pokemons" />
        <q-route-tab
          to="/game"
          label="Juego"
          @click="pokemonStore.randomName = []"
        />
        <q-route-tab to="/favorite" label="Favoritos" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store";
import { useQuasar } from "quasar";
import { watchEffect } from "vue";

const pokemonStore = usePokemonStore();
const $q = useQuasar();

const modo = () => {
  $q.dark.toggle();
};

watchEffect(() => $q.dark.isActive);
</script>

<style scoped>
img {
  width: 100px;
  object-fit: contain;
  aspect-ratio: 2/1;
}
</style>
