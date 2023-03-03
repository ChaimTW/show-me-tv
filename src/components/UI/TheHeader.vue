<template>
  <div class="header-container">
    <div class="brand-name">
      <h2>ShowMeTv.</h2>
    </div>
    <div class="tabs-container">
      <router-link to="/">
        <div
          class="tab-option"
          @click="selectTab('home')"
          :class="selectedTab === 'home' ? 'nav-active' : ''"
        >
          <font-awesome-icon icon="fa-solid fa-house" size="lg" />

          <p>Home</p>
        </div>
      </router-link>
      <router-link to="/watchlist">
        <div
          class="tab-option"
          @click="selectTab('watchList')"
          :class="selectedTab === 'watchList' ? 'nav-active' : ''"
        >
          <font-awesome-icon icon="fa-solid fa-bookmark" size="lg" />

          <p>My Watchlist</p>
        </div>
      </router-link>
      <router-link to="/search">
        <div
          class="tab-option"
          @click="selectTab('search')"
          :class="selectedTab === 'search' ? 'nav-active' : ''"
        >
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="lg" />

          <p>Search</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

// Computed
const selectedTab = computed(() => {
  const route = useRoute();
  if (route.path == "/watchlist") {
    return "watchList";
  } else if (route.path == "/search") {
    return "search";
  } else {
    return "home";
  }
});

// Methods
function selectTab(tabName) {
  selectedTab.value = tabName;
}
</script>

<style scoped>
.header-container {
  height: 72px;
  background-color: rgb(17, 17, 17);
  top: 0px;
  width: 100%;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
  margin-bottom: 50px;
  position: fixed;
  z-index: 2;
  filter: drop-shadow(0px 3px 12px #000);
}

.brand-name {
  height: 100%;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  color: white;
}

.tabs-container {
  height: 100%;
  display: flex;
  width: 100%;
}

.tab-option {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  height: 100%;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  border-bottom: 2px solid rgba(255, 55, 70, 0);
}

.tab-option:hover {
  color: white;
}

p {
  font-size: 15px;
  margin-left: 10px;
}

.nav-active {
  border-bottom: 2px solid rgb(255, 55, 70);
  color: white;
}

a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none; /* no underline */
  display: flex;
}

a:hover {
  color: rgba(255, 255, 255, 1);
}

@media only screen and (max-width: 800px) {
  .brand-name {
    display: none;
  }
  p {
    display: none;
  }
  .header-container {
    margin-bottom: -1px;
    top: auto;
    bottom: 0px
  }

  a {
    width: 30%;
    justify-content: center;
    align-items: center;
  }

  .tabs-container {
    justify-content: space-between;
  }
}
</style>
