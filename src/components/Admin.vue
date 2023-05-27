<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import * as chartConfig from "./chartConfig.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "App",
  components: {
    Pie,
  },
  data() {
    return chartConfig;
  },
};
</script>
<template>
  <div
    class="w-full text-center p-10 flex flex-col items-center gap-10 dark:text-white"
  >
    <h1>Seçim Sonuçları</h1>
    <Pie :data="data" :options="options" />
  </div>
</template>
