<template>
  <div>
    <img style="height: 120px; width: 100%" :src="`${img}`" />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  id: Number,
});

const img = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.id}.svg`
);
</script>
