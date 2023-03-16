<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      :class="`row items-center ${
        $q.dark.isActive ? 'layout-bg-dark' : 'layout-bg-light'
      }`"
      elevated
      style="height: 70px"
    >
      <q-toolbar>
        <q-toolbar-title class="tamano-letra no-padding">
          <q-item
            class="row justify-center text-start"
            active-class="my-menu-page"
            exact
            to="/"
            @click="pokemonStore.randomName = []"
            >Pokemones</q-item
          >
        </q-toolbar-title>

        <!-- <q-toolbar-title
          ><RouterLink
            active-class="my-menu-page"
            class="no-underline"
            to="/"
            @click="pokemonStore.randomName = []"
          >
            Pokemon
          </RouterLink></q-toolbar-title
        > -->
        <q-toolbar-title class="tamano-letra no-padding">
          <q-item
            class="row justify-center"
            active-class="my-menu-page"
            to="/game"
          >
            Juego
          </q-item></q-toolbar-title
        >
        <q-toolbar-title class="tamano-letra no-padding"
          ><q-item
            active-class="my-menu-page"
            class="row justify-center"
            to="/favorite"
            @click="pokemonStore.randomName = []"
            >Favoritos</q-item
          ></q-toolbar-title
        >
        <q-toggle
          v-model="pokemonStore.dark"
          checked-icon="dark_mode"
          size="lg"
          unchecked-icon="light_mode"
          @click="modo()"
        />
      </q-toolbar>
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
