<template>
  <div> 
    <div class="back-button">
      <div class="previous" @click="goBack">&laquo; Back</div>
    </div>
    <div class="show-details-container" v-if="!loading">
      <div class="img-wrapper">
        <img :src="show?.image?.original" alt="" />
      </div>

      <div class="information-container">
        <div class="meta-information">
          <div class="star-wrapper">
            <BaseRatingStars :rating="rating" />
          </div>
        </div>
        <h2>{{ show.name }}</h2>
        <p><strong>Genre:</strong> {{ genresString }}</p>
        <p><strong>Rating:</strong> {{ rating }}</p>
        <p><strong>Language:</strong> {{ show?.language }}</p>
        <p><strong>Average runtime:</strong> {{ averageRuntime }}</p>
        <p><strong>Network:</strong> {{ network }}</p>
        <br />
        <p v-html="show?.summary"></p>
        <div class="actions">
          <button
            @click="addToWatchList"
            :class="{ hidden: showInWatchList == true, addButton: true }"
          >
            + Add to watch list
          </button>
          <button
            @click="removeFromWatchList"
            :class="{ hidden: showInWatchList == false, add: true }"
          >
            - Remove from list
          </button>
          <a :href="officialSite" target="_blank">
            <button>Visit website</button>
          </a>
        </div>
      </div>
    </div>
    <div class="spinner-container" v-if="loading">
      <pulse-loader color="rgb(255, 55, 70)"></pulse-loader>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import BaseRatingStars from '../Base/BaseRatingStars.vue'
import { getShow } from "../../api/getShows";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// Store
const store = useStore();

// Router
const router = useRouter();

// Props
const props = defineProps({
  showId: String,
});

// Refs
const show = ref({});
const genres = ref([]);
const rating = ref("Unknown");
const officialSite = ref("Unknown");
const averageRuntime = ref(0);
const network = ref("Unknown");
const loading = ref(false);

// Computed
const showInWatchList = computed(() => {
  return store.getters.getWatchList.some((show) => {
    return show.id === parseInt(props.showId);
  });
});

const genresString = computed(() => {
  return genres.value.length === 0 ? "Unknown" : genres.value.join(" | ");
});

// Methods
async function loadShow() {
  loading.value = true;
  try {
    const data = await getShow(props.showId);
    show.value = data;
    genres.value = data.genres;

    data.rating.average != null
      ? (rating.value = data.rating.average)
      : (rating.value = "Unknown");
    data.officialSite != null
      ? (officialSite.value = data.officialSite)
      : (officialSite.value = "/");
    data.averageRuntime != null
      ? (averageRuntime.value = data.averageRuntime)
      : (averageRuntime.value = "Unknown");
    data.network != null
      ? (network.value = data.network.name)
      : (network.value = "Unknown");
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

function addToWatchList() {
  store.dispatch("addToWatchList", show.value);
}

function removeFromWatchList() {
  store.dispatch("removeFromWatchList", show.value);
}

function goBack() {
  router.options.history.state.back != null ? router.back() : router.push("/");
}

// Lifecycle
onMounted(async () => {
  loadShow();
});
</script>

<style scoped>
.show-details-container {
  color: white;
  display: flex;
  margin: 0px 50px;
  max-width: 100vw;
  padding-top: 20px;
}

.img-wrapper {
  width: 322px;
}

img {
  width: 280px;
  height: auto;
  margin-right: 50px;
  border-radius: 10px;
  filter: drop-shadow(0px 5px 10px rgba(255, 255, 255, 0.3));
}

.information-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.star-wrapper {
  direction: rtl;
  margin-bottom: 20px;
  font-size: 25px;
}
.star-wrapper a {
  font-size: 20px;
  color: #fff;
  text-decoration: none;
  transition: all 0.5s;
  margin: 4px;
}

.actions {
  display: flex;
  margin-top: 20px;
}

button {
  padding: 8px 14px;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.9);
  margin-right: 20px;
  margin-bottom: 20px;
  border: 2px solid rgba(255, 55, 70, 0);
}

button:hover {
  color: white;
  background-color: rgb(255, 55, 70);
}

.hidden {
  display: none;
}

.addButton {
  background-color: rgba(255, 55, 70, 0.7);
  color: white;
  border: 2px solid rgba(255, 55, 70, 1);
}

.addButton:hover {
  background-color: rgba(255, 55, 70, 1);
  color: white;
}

.spinner-container {
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.previous {
  background-color: #f1f1f1;
  color: black;
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 3px;
  margin-left: 52px;
  cursor: pointer;
  font-size: 14px;
}

.previous:hover {
  background-color: #ddd;
  color: black;
}

@media screen and (max-width: 600px) {
  img {
    width: 272px;
    margin-right: 0px;
    align-self: center;
  }

  .previous {
    margin-left: 30px;
  }

  .show-details-container {
    flex-direction: column;
    margin: 0px 30px;
  }

  .star-wrapper {
    margin-top: 30px;
  }

  button {
    padding: 10px;
  }
}
</style>
