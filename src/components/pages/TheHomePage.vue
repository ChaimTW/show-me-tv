<template>
  <Transition>
  <div class="homepage-container" v-if="!loading">
    <BaseShowList
      v-for="genre in allGenres"
      :key="genre"
      :title="genre"
      :shows="getShowsByGenre(genre)"
    ></BaseShowList>
  </div>
  </Transition>
  <div class="spinner-container" v-if="loading">
    <pulse-loader color="rgb(255, 55, 70)"></pulse-loader>
  </div>
</template>

<script setup>
import BaseShowList from "../Base/BaseShowList.vue";
import { getShows } from "../../api/getShows";
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";

// Store
const store = useStore();
const getShowsByGenre = store.getters.getShowsByGenre;
const shouldUpdateShows = store.getters.shouldUpdateShows

// Refs
const shows = ref([]);
const loading = ref(false);

// Computed
const allGenres = computed(() => {
  return store.getters.getAllGenres;
});

// Methods
async function loadShows() {
  loading.value = true;

  const updateShowsStore = shouldUpdateShows(new Date().getTime())
  
  if (store.state.shows.length > 0 && !updateShowsStore) {
    shows.value = store.state.shows;
  } else {
    try {
      const showsList = await getShows(1);
      shows.value = showsList;
      store.dispatch("updateShows", showsList);
    } catch (error) {
      alert(error.message);
      loading.value = false;
      return;
    }
  }
  loading.value = false;
}


// Lifecycle
onMounted(async () => {
  loadShows();
});
</script>

<style scoped>
.homepage-container {
  color: white;
  height: 100%;
}

.spinner-container {
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(15px)
}
</style>
