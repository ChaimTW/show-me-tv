<template>
  <div class="app-container">
    <TheHeader></TheHeader>
    <div class="content-container">
        <router-view v-slot="slotProps">
          <transition name="route">
            <component :is="slotProps.Component"></component>
          </transition>
        </router-view>
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
  /* height: 100vh; */
}

.content-container {
  margin-top: 100px;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(15px)
}

.route-enter-active {
  transition: all 0.5s ease;
}

.route-enter-to {
  opacity: 1;
  transform: translateY(0px)
}

@media only screen and (max-width: 800px) {
  .content-container {
    margin-top: 20px;
    margin-bottom: 80px
  }
}
</style>
