<template>
  <div class="col-12 col-md-6">
    <div class="row items-center justify-center">
      <q-card v-if="estadoImg" class="my-card-game q-ma-md bg-grey-13">
        <q-card-section class="row justify-center">
          <img
            :class="{ 'hidden-pokemon': estado != true }"
            style="height: 150px; width: 100%"
            :src="`${img}`"
          />
        </q-card-section>
        <q-card-section class="row justify-between items-center">
          <div v-if="estado == true" class="col-8 text-h6 text-dark">
            {{ randomElemento.name }}
          </div>
          <div v-if="estado == true" class="column items-end text-h6 text-dark">
            #{{ id }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="row justify-center q-mb-md">
      <div
        class="col-12 row justify-center"
        v-for="(name, index) in nombresAleatorios"
        :key="index"
      >
        <div
          :class="`row justify-center ${
            $q.dark.isActive ? 'efecto-name-dark' : 'efecto-name-light'
          } q-pa-xs q-mt-sm`"
          style="width: 300px; border-radius: 10px"
          @click="probando(name.name)"
        >
          {{ name.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePokemonStore } from "src/stores/poke-store.js";
import { watchEffect } from "vue";
import { useQuasar } from "quasar";
import { useNotify } from "src/composables/notifyHook";

const props = defineProps([
  "estado",
  "estadoImg",
  "img",
  "id",
  "nombresAleatorios",
  "randomElemento",
]);

const pokemonStore = usePokemonStore();

const $q = useQuasar();
const { successNotify, failNotify } = useNotify();

pokemonStore.getPokemons();

watchEffect(() => $q.dark.isActive);

const emit = defineEmits(["cambiarEstado"]);

const probando = (name) => {
  if (name == props.randomElemento.name) {
    emit("cambiarEstado", true);
    successNotify("Correcto", "right", "200");
  } else {
    emit("cambiarEstado", false);
    failNotify("Intentalo de nuevo", "right", "100");
  }
};
</script>
