<script setup lang="ts">
import api from "../api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const router = useRouter();
const username = ref("");
const password = ref("");
const toast = useToast();

const onLogin = async () => {
  const response = await api.post("/auth/login", {
    username: username.value,
    password: password.value,
  });

  if (response?.status === 200) {
    await router.push({ path: "/" });
    toast.success("Giris Basarili", {
      position: "top",
    });
  }
};
</script>

<template>
  <div class="w-full text-center p-10 pt-20 flex flex-col items-center gap-6">
    <h1 class="text-center text-lg">Hosgeldiniz</h1>

    <input
      class="w-48 rounded-xl p-2 border-2 text-center dark:bg-slate-700 dark:border-cyan-700"
      type="text"
      name="username"
      placeholder="Username"
      v-model="username"
    />

    <input
      class="w-48 rounded-xl p-2 border-2 border-[#3498db] text-center dark:bg-slate-700 dark:border-cyan-700"
      type="password"
      name="password"
      placeholder="Password"
      v-model="password"
    />

    <button
      class="w-48 bg-slate-200 hover:bg-slate-300 py-2 px-4 rounded-xl text-center dark:bg-slate-500 dark:hover:bg-slate-700"
      type="button"
      :onclick="onLogin"
    >
      Giris Yap
    </button>
  </div>
</template>
