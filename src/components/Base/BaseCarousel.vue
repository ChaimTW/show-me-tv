<template>
  <swiper
    :modules="modules"
    :space-between="50"
    :breakpoints="swiperOptions.breakpoints"
    navigation
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide
      v-for="show in props.shows"
      :key="show.id"
      class="swiper-slide"
    >
      <BaseShowCard :show="show"></BaseShowCard>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import BaseShowCard from "./BaseShowCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { ref, defineProps } from "vue";

// Props
const props = defineProps({
  shows: Array,
});

// Refs
const modules = ref([Navigation, Scrollbar, A11y]);
const swiperOptions = ref({
  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    480: {
      slidesPerView: 4,
      spaceBetween: 5,
    },
    640: {
      slidesPerView: 5,
      spaceBetween: 7,
    },
    820: {
      slidesPerView: 6,
      spaceBetween: 8,
    },
    1000: {
      slidesPerView: 7,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 8,
      spaceBetween: 10,
    },
    1600: {
      slidesPerView: 9,
      spaceBetween: 10,
    },
  },
});

// Methods
// function onSlideChange() {
//   console.log("TODO");
// }

function onSwiper() {
  console.log("TODO");
}
</script>

<style scoper>
.swiper-button-prev,
.swiper-button-next {
  color: rgb(255, 55, 70);
}
</style>
