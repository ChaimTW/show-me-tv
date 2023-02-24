<template>
  <div class="app-container">
    <TheHeader></TheHeader>
    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import TheHeader from "./components/UI/TheHeader.vue";
</script>

<style>
*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Rubik", "Arial";
}

app-container {
  width: 100vh;
  height: 100vh;
}

.content-container {
  margin-top: 100px;
}

@media only screen and (max-width: 800px) {
  .content-container {
    margin-top: 20px;
    margin-bottom: 80px
  }
}
</style>
