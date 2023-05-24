<script setup lang="ts">
import FooterComponent from "./components/Footer.vue";
</script>

<template>
  <div class="w-full font-mono">
    <router-view></router-view>
    <FooterComponent />
  </div>
</template>
