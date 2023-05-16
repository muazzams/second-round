<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const rteCount = ref(0);
const kkCount = ref(0);

function changeRteCount(e: Event) {
  const valueString = (<HTMLInputElement>e.target).value;
  const regex = /^(?:[1-9]\d*|0)$/;

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
  const regex = /^(0|[1-9]\d*)$/;

  if (regex.test(valueString)) {
    let value = Number(valueString);
    kkCount.value = Math.max(value, 0);
  } else {
    kkCount.value = 1;
    kkCount.value = 0;
  }
}

function save() {
  console.log("saved");
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="display-flex">
    <div class="card">
      <span class="name">RTE</span>
      <div>
        <img src="../assets/rte.png" class="logo" alt="rte" />
      </div>
      <div class="display-flex">
        <button type="button" @click="rteCount > 0 ? rteCount-- : rteCount">
          -
        </button>
        <input
          type="text"
          class="input"
          :value="rteCount"
          @input="changeRteCount"
        />
        <button type="button" @click="rteCount++">+</button>
      </div>
    </div>
    <div class="card">
      <span class="name">KK</span>
      <div>
        <img src="../assets/kk.png" class="logo vue" alt="kk" />
      </div>
      <div class="display-flex">
        <button type="button" @click="kkCount > 0 ? kkCount-- : kkCount">
          -
        </button>
        <input
          type="text"
          class="input"
          :value="kkCount"
          @input="changeKKCount"
        />
        <button type="button" @click="kkCount++">+</button>
      </div>
    </div>
  </div>
  <button type="button" style="margin-top: 30px" @click="save()">KAYDET</button>
</template>

<style scoped>
.logo {
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
.read-the-docs {
  color: #888;
}
.display-flex {
  display: flex;
}
.name {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  transition: border-color 0.25s;
}

.input {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  width: 40px;
  text-align: center;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  transition: border-color 0.25s;
}
</style>
