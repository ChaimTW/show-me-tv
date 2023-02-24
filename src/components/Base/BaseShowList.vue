<template>
  <section class="base-list-container">
    <h2>{{ props.title }}</h2>
    <ul>
      <BaseCarousel 
        :shows="props.shows"
      />
    </ul>
  </section>
</template>

<script setup>
import BaseCarousel from './BaseCarousel.vue'
import { defineProps } from 'vue'

// Props
const props = defineProps({
  title: String,
  shows: Array
})
</script>

<style scoped>
.base-list-container {
  height: 100%;
}
section {
  padding-bottom: 25px;
}

h2 {
  padding-left: 56px
}

ul{
  padding-top: 20px;
  display: flex;
  height: 100%;
  margin: 0px 40px
}



li {
  list-style-type: none;
  width: 202px;
  padding-left: 9px;
  padding-right: 9px;
}

.swiper {
  width: 100%;
  height: 100%
}

@media only screen and (max-width: 600px) {
  ul{
  padding-top: 20px;
  display: flex;
  height: 100%;
  margin: 0px 20px
}

h2 {
  padding-left: 20px;
  font-size: 20px
}
}
</style>