<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="row items-center" elevated style="height: 80px">
      <q-toolbar>
        <q-toolbar-title
          ><RouterLink class="no-underline" to="/">
            Pokemon
          </RouterLink></q-toolbar-title
        >
        <q-toolbar-title
          ><RouterLink class="no-underline" to="/game">
            Juego
          </RouterLink></q-toolbar-title
        >
        <q-toolbar-title
          ><RouterLink class="no-underline" to="/favorite">
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

<script setup></script>
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
