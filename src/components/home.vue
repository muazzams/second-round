<script setup lang="ts">
import { useToast } from "vue-toast-notification";
import api, { logout } from "../api";
import { ref } from "vue";

const rteCount = ref(0);
const kkCount = ref(0);
const invalidCount = ref(0);
const regex = /^(?:[1-9]\d*|0)$/;
let bulletBoxId = 0;
const toast = useToast();
const bulletBoxNumber = ref("SANDIK NO : ");
api.get("bullet-box/attendant").then((res) => {
  bulletBoxId = res.data?.id;
  bulletBoxNumber.value = "SANDIK NO : " + res.data?.bulletBoxNumber;
  rteCount.value = res.data?.rteCount;
  kkCount.value = res.data?.kkCount;
  invalidCount.value = res.data?.invalidCount;
});

function changeRteCount(e: Event) {
  const valueString = (<HTMLInputElement>e.target).value;

  if (regex.test(valueString)) {
    let value = Number(valueString);
    rteCount.value = Math.max(value, 0);
  } else {
    if (Number(valueString) > 0) {
      rteCount.value = Number(valueString);
    } else {
      rteCount.value = 1;
      rteCount.value = 0;
    }
  }
}

function changeKKCount(e: Event) {
  const valueString = (<HTMLInputElement>e.target).value;

  if (regex.test(valueString)) {
    let value = Number(valueString);
    kkCount.value = Math.max(value, 0);
  } else {
    if (Number(valueString) > 0) {
      kkCount.value = Number(valueString);
    } else {
      kkCount.value = 1;
      kkCount.value = 0;
    }
  }
}

function changeInvalidCount(e: Event) {
  const valueString = (<HTMLInputElement>e.target).value;

  if (regex.test(valueString)) {
    let value = Number(valueString);
    invalidCount.value = value;
  } else {
    if (Number(valueString) > 0) {
      invalidCount.value = Number(valueString);
    } else {
      invalidCount.value = 1;
      invalidCount.value = 0;
    }
  }
}

async function save() {
  api
    .patch("/bullet-box/" + bulletBoxId, {
      kkCount: kkCount.value,
      rteCount: rteCount.value,
      invalidCount: invalidCount.value,
    })
    .then((response) => {
      if (response?.status === 200) {
        toast.success("Basariyla kaydedildi", {
          position: "top",
        });
      }
    });
}
</script>

<template>
  <div
    class="w-full text-center p-10 flex flex-col items-center gap-10 dark:text-white"
  >
    <div>
      <h1 class="text-center font-bold text-lg">{{ bulletBoxNumber }}</h1>
    </div>

    <div class="flex gap-x-6">
      <div class="flex flex-col items-center gap-3">
        <div>
          <span>RTE</span>
        </div>
        <div>
          <img
            src="../assets/rte.webp"
            width="75"
            height="100"
            class="hover:shadow-2xl hover:shadow-orange-300"
            alt="rte"
          />
        </div>
        <div class="flex flex-col items-center gap-y-2">
          <div class="flex">
            <button
              class="rounded-lg p-2 border-2 w-12 text-center bg-[#f9f9f9] mr-1 dark:bg-slate-700 dark:border-cyan-700"
              type="button"
              @click="rteCount > 0 ? rteCount-- : rteCount"
            >
              -
            </button>
            <input
              type="text"
              class="rounded-lg p-2 border-2 w-16 text-center bg-[#f9f9f9] dark:bg-slate-700 dark:border-cyan-700"
              :value="rteCount"
              @input="changeRteCount"
            />
            <button
              class="rounded-lg p-2 border-2 w-12 text-center bg-[#f9f9f9] ml-1 dark:bg-slate-700 dark:border-cyan-700"
              type="button"
              @click="rteCount++"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center gap-3">
        <div>
          <span>KK</span>
        </div>
        <div>
          <img
            src="../assets/kk.webp"
            width="75"
            height="100"
            class="hover:shadow-2xl hover:shadow-red-900"
            alt="kk"
          />
        </div>
        <div class="flex flex-col items-center gap-y-2">
          <div class="flex">
            <button
              class="rounded-lg p-2 border-2 w-12 text-center bg-[#f9f9f9] mr-1 dark:bg-slate-700 dark:border-cyan-700"
              type="button"
              @click="kkCount > 0 ? kkCount-- : kkCount"
            >
              -
            </button>
            <input
              type="text"
              class="rounded-lg p-2 border-2 w-16 text-center bg-[#f9f9f9] dark:bg-slate-700 dark:border-cyan-700"
              :value="kkCount"
              @input="changeKKCount"
            />
            <button
              class="rounded-lg p-2 border-2 w-12 text-center bg-[#f9f9f9] ml-1 dark:bg-slate-700 dark:border-cyan-700"
              type="button"
              @click="kkCount++"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center gap-3 mt-10">
      <div>
        <span>Geçersiz</span>
      </div>
      <div class="flex items-center gap-x-2">
        <button
          class="rounded-lg p-2 border-2 w-12 text-center bg-[#f9f9f9] mr-1 dark:bg-slate-700 dark:border-cyan-700"
          type="button"
          @click="invalidCount > 0 ? invalidCount-- : invalidCount"
        >
          -
        </button>
        <input
          type="text"
          class="rounded-lg p-2 border-2 w-24 text-center bg-[#f9f9f9] dark:bg-slate-700 dark:border-cyan-700"
          :value="invalidCount"
          @input="changeInvalidCount"
        />
        <button
          class="rounded-lg p-2 border-2 w-12 text-center bg-[#f9f9f9] ml-1 dark:bg-slate-700 dark:border-cyan-700"
          type="button"
          @click="invalidCount++"
        >
          +
        </button>
      </div>
    </div>

    <div class="w-full flex justify-center gap-3">
      <button
        class="p-2 border-2 w-32 hover:bg-blue-400 font-bold py-2 px-4 rounded-lg bg-[#f9f9f9] dark:bg-slate-700 dark:hover:bg-slate-900 dark:border-cyan-700"
        type="button"
        @click="save()"
      >
        Kaydet
      </button>

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

<style scoped></style>
