<template>
  <div class="show-details-container" v-if="!loading">
    <div class="img-wrapper">
      <img :src="imageUrl" alt="" />
    </div>
    
    <div class="information-container">
      <div class="meta-information">
        <div class="star-wrapper">
          <font-awesome-icon
            icon="fa-solid fa-question"
            v-if="rating === 'Unknown'"
          />
          <font-awesome-icon
            icon="fa-solid fa-star"
            :class="{ checked: rating > 9 }"
          />
          <font-awesome-icon
            icon="fa-solid fa-star"
            :class="{ checked: rating > 7 }"
          />
          <font-awesome-icon
            icon="fa-solid fa-star"
            :class="{ checked: rating > 5 }"
          />
          <font-awesome-icon
            icon="fa-solid fa-star"
            :class="{ checked: rating > 3 }"
          />
          <font-awesome-icon icon="fa-solid fa-star" class="checked" />
        </div>
      </div>
      <p><strong>Genre:</strong> {{ genresString }}</p>
      <p><strong>Rating:</strong> {{ rating }}</p>
      <p><strong>Language:</strong> {{ language }}</p>
      <p><strong>Average runtime:</strong> {{ averageRuntime }}</p>
      <p><strong>Network:</strong> {{ network }}</p>
      <br />
      <p v-html="showSummary"></p>
      <div class="actions">
        <button
          @click="addToWatchList"
          :class="{ hidden: showInWatchList == true, addButton: true }"
        >
          <strong>+ Add to watch list</strong>
        </button>
        <button
          @click="removeFromWatchList"
          :class="{ 
            hidden: showInWatchList == false,
            add: true
           }"
        >
          <strong>- Remove from list</strong>
        </button>
        <a :href="officialSite" target="_blank"
          ><button><strong>Visit website</strong></button></a
        >
      </div>
    </div>
  </div>
  <div class="spinner-container" v-else>
    <pulse-loader color="rgb(255, 55, 70)"></pulse-loader>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import { getShow } from "../../api/getShows";
import { useStore } from "vuex";

// Store
const store = useStore();

// Props
const props = defineProps({
  showId: String,
});

// Refs
const show = ref({});
const imageUrl = ref("Unknown");
const showSummary = ref("Unknown");
const genres = ref([]);
const rating = ref("Unknown");
const officialSite = ref("Unknown");
const language = ref("Unknown");
const averageRuntime = ref(0);
const network = ref("Unknown");
const loading = ref(false);

// Computed
const showInWatchList = computed(() => {
  let foundShow = store.getters.getWatchList.find((show) => {
    return show.id === parseInt(props.showId);
  });
  if(foundShow) {
    return true;
  } else {
    return false
  }
});

const genresString = computed(() => {
  let tempString = "";
  if (genres.value.length > 0) {
    for (const genre of genres.value) {
      if (genre === genres.value[genres.value.length - 1]) {
        tempString += " " + genre;
      } else {
        tempString += " " + genre + " |";
      }
    }
  } else {
    tempString = "Unknown";
  }
  return tempString;
});

// Methods
async function loadShow() {
  loading.value = true;
  try {
    const data = await getShow(props.showId);
    show.value = data;
    imageUrl.value = data.image.original;
    showSummary.value = data.summary;
    genres.value = data.genres;

    if (data.rating.average != null) {
      rating.value = data.rating.average;
    } else {
      rating.value = "Unknown";
    }

    if (data.officialSite != null) {
      officialSite.value = data.officialSite;
    } else {
      officialSite.value = "/";
    }

    language.value = data.language;

    if (data.averageRuntime != null) {
      averageRuntime.value = data.averageRuntime;
    } else {
      averageRuntime.value = "Unknown";
    }

    if (data.network != null) {
      network.value = data.network.name;
    } else {
      network.value = "Unknown";
    }
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

// Lifecycle
onMounted(async () => {
  loadShow()
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

img {
  height: 400px;
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
  padding: 15px;
  border-radius: 25px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.6);
  margin-right: 20px;
  margin-bottom: 20px;
  border: 2px solid rgba(255, 55, 70, 0);
}

button:hover {
  color: white;
  background-color: rgb(255, 55, 70);
}

.checked {
  color: orange;
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
  color: white
}

.spinner-container {
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 600px) {
  img {
    width: 272px;
    margin-right: 0px;
    align-self: center;
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
