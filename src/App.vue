<script setup lang="ts">
import FooterComponent from "./components/Footer.vue";
import { Suspense } from "vue";
</script>

<template>
  <div class="w-full dark:bg-[#242424]">
    <Suspense> <router-view></router-view> </Suspense>
    <FooterComponent />
  </div>
</template>
