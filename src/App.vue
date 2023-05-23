<script setup lang="ts">
import FooterComponent from "./components/Footer.vue";
</script>

<template>
  <div class="w-full h-screen">
    <router-view></router-view>
    <FooterComponent />
  </div>
</template>
