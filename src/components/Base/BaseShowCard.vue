<template>
  <div class="card-container">
    <img :src="props.show.image.medium" alt="image" class="image" />
    <div class="middle">
      <h2 class="show-title">{{ props.show.name }}</h2>
      <p v-for="genre in props.show.genres" :key="genre">{{ genre }}</p>
      <div class="middle">
        <div class="link-icon">
          <router-link :to="'/details/' + props.show.id">
            <font-awesome-icon icon="fa-solid fa-circle-info" size="xl" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// Props
const props = defineProps({
  show: Object
})
</script>

<style scoped>
.card-container {
  position: relative;
  width: auto;  
}

.show-title {
  margin-bottom: 10px;
  font-size: 18px
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
  border-radius: 5px;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  height: 100%;
  width: 100%;
  padding: 15px 10px;
}

.card-container:hover .image {
  opacity: 0.3;
}

.card-container:hover .middle {
  opacity: 1;
}

.link-icon {
  font-size: 20px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.fa-circle-info {
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 40px;
}

.fa-circle-info:hover {
  color: rgba(255, 55, 70, 1);
}

@media only screen and (max-width: 800px) {
  .show-title {
    font-size: 15px
  }

  p {
    font-size: 13px
  }
}
</style>
