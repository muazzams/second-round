<script setup lang="ts">
import FooterComponent from "./components/Footer.vue";
</script>

<template>
  <div class="w-full h-screen font-mono dark:bg-[#242424] dark:text-white">
    <router-view></router-view>
    <FooterComponent />
  </div>
</template>
