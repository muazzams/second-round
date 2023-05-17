<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

const onLogin = async () => {
  const response = await fetch("http://localhost:8080/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    await router.push({ path: "/" });
  } else {
    console.log("login failed");
  }
};
</script>

<template>
  <div class="box">
    <h2>Giris Yap</h2>
    <input
      type="text"
      name="username"
      placeholder="Username"
      v-model="username"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      v-model="password"
    />
    <button type="button" :onclick="onLogin">Login</button>
  </div>
</template>

<style scoped>
body {
  margin: 0px;
  padding: 0px;
  font-family: sans-serif;
  background: #34495e;
}
.box {
  width: 300px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #191919;
  text-align: center;
}
.box h1 {
  color: white;
  text-transform: uppercase;
  font-weight: 500;
}
.box input[type="text"],
.box input[type="password"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 24px;
}
.box input[type="text"]:focus,
.box input[type="password"]:focus {
  width: 280px;
  border-color: #2ecc71;
}

.box input[type="submit"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 24px;
  cursor: pointer;
}
.box input[type="submit"]:hover {
  background: #2ecc71;
}
</style>
