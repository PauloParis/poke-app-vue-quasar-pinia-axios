<template>
  <div>
    <q-card
      :class="`${
        $q.dark.isActive ? 'my-card-dark' : 'my-card-light'
      } q-ma-md no-shadow`"
    >
      <q-card-section>
        <ImagePoke :id="id"></ImagePoke>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="row justify-between items-center">
        <div class="col-8 text-h6">{{ name }}</div>
        <div class="column items-end text-h6">#{{ id }}</div>
      </q-card-section>
      <q-card-section class="no-padding">
        <div class="row justify-center">
          <RouterLink class="no-underline" :to="`/pokemon/${id}`"
            ><q-btn style="width: 210px" class="bg-primary text-white"
              >Ver Información</q-btn
            ></RouterLink
          >
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import ImagePoke from "src/components/ImagenPoke.vue";

const props = defineProps({
  name: String,
  id: Number,
});
</script>
