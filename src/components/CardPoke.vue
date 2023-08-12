<template>
  <RouterLink :to="`/pokemon/${id}`" class="no-underline">
    <div class="shadow q-ma-md" style="border-radius: 10px">
      <q-card
        :class="`${
          $q.dark.isActive ? 'my-card-dark' : 'my-card-light'
        } no-shadow q-card`"
      >
        <q-card-section>
          <ImagePoke :id="id"></ImagePoke>
        </q-card-section>
        <q-card-section class="row justify-between items-center">
          <div class="col-8 text-h6">{{ name }}</div>
          <div class="column items-end text-h6">#{{ id }}</div>
        </q-card-section>
      </q-card>
    </div>
  </RouterLink>
</template>

<script setup>
import ImagePoke from "src/components/ImagenPoke.vue";

const props = defineProps({
  name: String,
  id: Number,
});
</script>
