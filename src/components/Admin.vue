<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import api, { logout } from "../api";
import { ref, computed } from "vue";

interface City {
  id: number;
  name: string;
  plate: string;
}

interface District {
  id: number;
  name: string;
  districtId: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);
const loaded = ref(false);

const kkCount = ref(0);
const rteCount = ref(0);
const invalidCount = ref(0);

const showChart = computed(() => {
  return kkCount.value !== 0 || rteCount.value !== 0;
});

const total = computed(() => {
  return kkCount.value + rteCount.value + invalidCount.value;
});

const kkCountPercent = computed(() => {
  return Number(((kkCount.value * 100) / total.value).toFixed(3));
});

const rteCountPercent = computed(() => {
  return Number(((rteCount.value * 100) / total.value).toFixed(3));
});

const invalidCountPercent = computed(() => {
  return Number(((invalidCount.value * 100) / total.value).toFixed(3));
});

const res = await api.get("bullet-box/all/count");
if (res.status === 200) {
  loaded.value = true;
  kkCount.value = res?.data?.kkCount;
  rteCount.value = res?.data?.rteCount;
  invalidCount.value = res?.data?.invalidCount;
}

const citiesResponse = await api.get("cities");
const cities = ref<City[]>(citiesResponse.data);
const districts = ref<District[]>();

const selectedCity = ref<City>();
const selectedDistrict = ref<District>();

const data = ref({
  labels: ["Kemal Kılıçdaroğlu", "Recep Tayyip Erdoğan", "Geçersiz"],
  datasets: [
    {
      backgroundColor: ["#FF5733", "#DFA921", "#2141DF"],
      data: [
        kkCountPercent.value,
        rteCountPercent.value,
        invalidCountPercent.value,
      ],
    },
  ],
});

const onCityChange = async () => {
  selectedDistrict.value = undefined;

  if (selectedCity.value) {
    console.log(selectedCity.value);
    const res = await api.get(`cities/${selectedCity.value.id}/districts`);
    districts.value = res.data;
  }
};

const options = {
  responsive: false,
  maintainAspectRatio: false,
};

async function search() {
  const res = await api.get("bullet-box/all/filter", {
    params: {
      cityId: selectedCity.value?.id,
      districtId: selectedDistrict.value?.id,
    },
  });

  kkCount.value = res.data.kkCount;
  rteCount.value = res.data.rteCount;
  invalidCount.value = res.data.invalidCount;

  data.value = {
    ...data.value,
    datasets: [
      {
        ...data.value.datasets[0],
        data: [
          kkCountPercent.value,
          rteCountPercent.value,
          invalidCountPercent.value,
        ],
      },
    ],
  };
}
</script>

<template>
  <div class="w-full text-center p-10 flex flex-col items-center gap-10">
    <h1>Seçim Sonuçları</h1>
    <Pie v-if="loaded && showChart" :data="data" :options="options" />

    <div v-else>Veri girisi yok.</div>

    <div>
      <span
        >Kk : {{ kkCount }} | Rte : {{ rteCount }} | Geçersiz :
        {{ invalidCount }}</span
      >
    </div>
    <div class="flex gap-x-6">
      <select
        class="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-800 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:border-blue-500 dark:focus:border-blue-300"
        v-on:change="onCityChange"
        v-model="selectedCity"
      >
        <option selected disabled :value="undefined">Il secin</option>
        <option v-for="city in cities" :value="city">
          {{ city.name }}
        </option>
      </select>

      <select
        class="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-800 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:border-blue-500 dark:focus:border-blue-300"
        v-model="selectedDistrict"
      >
        <option selected disabled :value="undefined">Ilce secin</option>

        <option v-for="district in districts" :value="district">
          {{ district.name }}
        </option>
      </select>
    </div>
    <div>
      <button
        class="p-2 border-2 w-72 hover:bg-red-400 font-bold py-2 px-4 rounded-lg bg-[#f9f9f9] dark:bg-slate-700 dark:hover:bg-slate-900 dark:border-cyan-700"
        type="button"
        @click="search()"
      >
        Ara
      </button>
    </div>

    <div>
      <button
        class="p-2 border-2 w-32 hover:bg-blue-400 font-bold py-2 px-4 rounded-lg bg-[#f9f9f9] dark:bg-slate-700 dark:hover:bg-slate-900 dark:border-cyan-700"
        type="button"
        @click="logout()"
      >
        Çıkış Yap
      </button>
    </div>
  </div>
</template>
