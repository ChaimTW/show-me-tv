<template>
  <div class="watchlist-container">
    <BaseShowList :shows="shows" title="My Watchlist"></BaseShowList>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import BaseShowList from "../Base/BaseShowList.vue";

// Store
const store = useStore();

// Refs
const shows = ref([]);

// Lifecycle
onMounted(() => {
  shows.value = store.getters.getWatchList
});
</script>

<style scoped>
.watchlist-container {
  color: white;
  height: 100%;
}
</style>
