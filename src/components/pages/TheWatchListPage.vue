<template>
  <div class="watchlist-container">
    <BaseShowList :shows="shows" :title="listTitle"></BaseShowList>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import BaseShowList from "../Base/BaseShowList.vue";

// Store
const store = useStore();

// Refs
const shows = computed(() =>{
  return store.getters.getWatchList;
})

// Computed
const listTitle = computed(() => {
  return shows?.value.length > 0 ? "My Watchlist" : "Watchlist empty..."
})
</script>

<style scoped>
.watchlist-container {
  color: white;
  height: 100%;
}
</style>
