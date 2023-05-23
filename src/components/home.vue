<script setup lang="ts">
import { useToast } from "vue-toast-notification";
import api, { logout } from "../api";
import { ref } from "vue";
//width height ver
//webp e donustur
const rteCount = ref(0);
const kkCount = ref(0);
const invalidCount = ref(0);
const regex = /^(?:[1-9]\d*|0)$/;
let bulletBoxId = 0;
let submitButtonDisable = false;
const toast = useToast();
const bulletBoxNumber = ref("SANDIK NO : ");
api
  .get("bullet-box/attendant")
  .then((res) => {
    bulletBoxId = res.data.id;
    bulletBoxNumber.value = "SANDIK NO : " + res.data.bulletBoxNumber;
    rteCount.value = res.data.rteCount;
    kkCount.value = res.data.kkCount;
    invalidCount.value = res.data.invalidCount;
  })
  .catch((error) => {
    console.log("error");
    submitButtonDisable = true;
  });

function changeRteCount(e: Event) {
  const valueString = (<HTMLInputElement>e.target).value;

  if (regex.test(valueString)) {
    let value = Number(valueString);
    rteCount.value = Math.max(value, 0);
  } else {
    rteCount.value = 1;
    rteCount.value = 0;
  }
}

function changeKKCount(e: Event) {
  const valueString = (<HTMLInputElement>e.target).value;

  if (regex.test(valueString)) {
    let value = Number(valueString);
    kkCount.value = Math.max(value, 0);
  } else {
    kkCount.value = 1;
    kkCount.value = 0;
  }
}

function changeInvalidCount(e: Event) {
  const valueString = (<HTMLInputElement>e.target).value;

  if (regex.test(valueString)) {
    let value = Number(valueString);
    invalidCount.value = Math.max(value, 0);
  } else {
    invalidCount.value = 1;
    invalidCount.value = 0;
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
      toast.success("Basariyla kaydedildi", {
        position: "top",
      });
    });
}
</script>

<template>
  <div class="w-full text-center p-10 flex flex-col items-center gap-10">
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
            class=""
            alt="rte"
          />
        </div>
        <div class="flex flex-col items-center gap-y-2">
          <div class="flex">
            <button
              class="rounded-lg p-2 border-2 border-black w-12 text-center bg-[#f9f9f9] mr-1"
              type="button"
              @click="rteCount > 0 ? rteCount-- : rteCount"
            >
              -
            </button>
            <input
              type="text"
              class="rounded-lg p-2 border-2 border-black w-16 text-center bg-[#f9f9f9]"
              :value="rteCount"
              @input="changeRteCount"
            />
            <button
              class="rounded-lg p-2 border-2 border-black w-12 text-center bg-[#f9f9f9] ml-1"
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
            class=""
            alt="kk"
          />
        </div>
        <div class="flex flex-col items-center gap-y-2">
          <div class="flex">
            <button
              class="rounded-lg p-2 border-2 border-black w-12 text-center bg-[#f9f9f9] mr-1"
              type="button"
              @click="kkCount > 0 ? kkCount-- : kkCount"
            >
              -
            </button>
            <input
              type="text"
              class="rounded-lg p-2 border-2 border-black w-16 text-center bg-[#f9f9f9]"
              :value="kkCount"
              @input="changeKKCount"
            />
            <button
              class="rounded-lg p-2 border-2 border-black w-12 text-center bg-[#f9f9f9] ml-1"
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
          class="rounded-lg p-2 border-2 border-black w-12 text-center bg-[#f9f9f9] mr-1"
          type="button"
          @click="invalidCount > 0 ? invalidCount-- : invalidCount"
        >
          -
        </button>
        <input
          type="text"
          class="rounded-lg p-2 border-2 border-black w-24 text-center bg-[#f9f9f9]"
          :value="invalidCount"
          @input="changeInvalidCount"
        />
        <button
          class="rounded-lg p-2 border-2 border-black w-12 text-center bg-[#f9f9f9] ml-1"
          type="button"
          @click="invalidCount++"
        >
          +
        </button>
      </div>
    </div>

    <div class="w-full flex justify-center gap-3">
      <button
        class="p-2 border-2 border-black w-32 hover:bg-blue-400 text-black font-bold py-2 px-4 rounded-lg bg-[#f9f9f9]"
        type="button"
        :disabled="submitButtonDisable"
        @click="save()"
      >
        Kaydet
      </button>

      <button
        class="p-2 border-2 border-black w-32 hover:bg-blue-400 text-black font-bold py-2 px-4 rounded-lg bg-[#f9f9f9]"
        type="button"
        @click="logout()"
      >
        Çıkış Yap
      </button>
    </div>
  </div>
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #f6d050aa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #ed0909aa);
}

.logo.invalid:hover {
  filter: drop-shadow(0 0 2em #817f7faa);
}
.read-the-docs {
  color: #888;
}
.display-flex {
  display: flex;
}
.justify-content-space-between {
  justify-content: space-between;
}
.name {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  transition: border-color 0.25s;
}

.input {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  width: 30px;
  text-align: center;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  transition: border-color 0.25s;
}
.buttons {
  margin-top: 30px;
} */
</style>
