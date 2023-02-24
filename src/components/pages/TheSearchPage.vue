<template>
  <div class="search-page-container">
    <div class="input-container">
      <input
        type="text"
        placeholder="Enter search term..."
        class="search-input"
        v-model="searchInput"
        @keyup="search"
      />
    </div>

    <BaseShowList
      title="Results"
      :shows="shows"
      v-if="!loading"
    ></BaseShowList>
    <div class="spinner-container" v-else>
      <pulse-loader color="rgba(255, 55, 70, 1)"></pulse-loader>
    </div>
  </div>
</template>

<script setup>
import BaseShowList from "../Base/BaseShowList.vue";
import { searchShows } from "../../api/getShows";
import { ref } from "vue";

// Refs
const shows = ref([]);
const searchInput = ref("");
const timeout = ref(null);
const loading = ref(false);

// Methods
function search() {
  loading.value = true
  clearTimeout(timeout.value);
  timeout.value = setTimeout(async function () {
    try {
      const searchResults = await searchShows(searchInput.value);
      let updatedList = [];
      for (const show of searchResults) {
        if (show.show.image) {
          updatedList.push(show.show);
        }
      }
      shows.value = updatedList;
    } catch (error) {
      alert(error.message);
    } finally {
      loading.value = false;
    }
  }, 1000);
}
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

@media only screen and (max-width: 800px) {
  .input-container {
    padding: 25px 25px;
  }
}
</style>
