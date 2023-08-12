<template>
  <div class="progress-bar">
    <q-linear-progress
      rounded
      size="10px"
      :value="estadisticaBarra"
      :color="color"
      :track-color="track"
      class="q-mt-sm"
    />
  </div>
</template>

<script setup>
import { computed, watchEffect } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
watchEffect(() => $q.dark.isActive);

const props = defineProps({
  estadistica: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
  },
});
const estadisticaBarra = computed(() => {
  return props.estadistica / 200;
});

const track = computed(() => {
  return $q.dark.isActive ? `light-blue-1` : `blue-grey-6`;
});
</script>
