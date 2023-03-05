<template>
  <div class="header-container">
    <div class="brand-name">
      <h2>ShowMeTv.</h2>
    </div>
    <div class="tabs-container">
      <router-link v-for="tab in tabs" :to="tab.path" :key="tab.name">
        <div
          class="tab-option"
          @click="selectTab(tab.name)"
          :class="selectedTab === tab.name ? 'nav-active' : ''"
        >
          <font-awesome-icon :icon="tab.icon" size="lg" />
          <p>{{ tab.label }}</p>
          <div class="nav-line" v-if="selectedTab === tab.name"></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import tabs from './headerTabs'

const selectedTab = computed(() => {
  const currentPath = useRoute().path;
  const tab = tabs.find((t) => t.path === currentPath);
  return tab ? tab.name : "home";
});

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
