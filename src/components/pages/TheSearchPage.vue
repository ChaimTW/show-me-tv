<template>
  <div class="search-page-container">
    <div class="input-container">
      <input
        ref="searchInputRef"
        type="text"
        placeholder="Enter search term..."
        class="search-input"
        v-model="searchInput"
        @keyup="search"
      />
    </div>

    <transition>
      <BaseShowList
        :title="listTitle"
        :shows="shows"
        v-if="!loading"
      ></BaseShowList>
    </transition>
    <div class="spinner-container" v-if="loading">
      <pulse-loader color="rgb(255, 55, 70)"></pulse-loader>
    </div>
  </div>
</template>

<script setup>
import BaseShowList from "../Base/BaseShowList.vue";
import { searchShows } from "../../api/getShows";
import { ref, computed, onMounted } from "vue";

// Refs
const shows = ref([]);
const searchInput = ref("");
const timeout = ref(null);
const loading = ref(false);
const searchInputRef = ref(null);

// Computed
const listTitle = computed(() => {
  return shows.value.length > 0 ? "Results" : "";
});

// Methods
function search() {
  loading.value = true;
  clearTimeout(timeout.value);
  timeout.value = setTimeout(async () => {
    try {
      const searchResults = await searchShows(searchInput.value);
      const updatedList = searchResults.filter(show => show.show.image).map(show => show.show);
      shows.value = updatedList;
    } catch (error) {
      alert(error.message);
    } finally {
      loading.value = false;
    }
  }, 1000);
}

// Lifecycle hook
onMounted(() => {
  searchInputRef.value.focus();
});
</script>

<style scoped>
.search-page-container {
  color: white;
  height: 100%;
}

.input-container {
  padding: 56px 56px;
}

.search-input {
  width: 100%;
  padding: 12px;
  font-size: 22px;
  border-radius: 20px;
  background-color: black;
  color: white;
  border: 2px solid rgba(255, 55, 70, 0.6);
  outline: none !important;
}

.search-input:focus,
.search-input:hover {
  border: 2px solid rgba(255, 55, 70, 1);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-list-container {
  padding: 20px 0px;
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

@media only screen and (max-width: 800px) {
  .input-container {
    padding: 25px 25px;
  }
}
</style>
