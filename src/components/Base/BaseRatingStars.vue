<template>
  <div>
    <font-awesome-icon
      icon="fa-solid fa-question"
      v-if="rating === 'Unknown'"
    />
    <font-awesome-icon
      icon="fa-solid fa-star"
      :class="{ checked: props.rating > 9 }"
    />
    <font-awesome-icon
      icon="fa-solid fa-star"
      :class="{ checked: props.rating > 7 }"
    />
    <font-awesome-icon
      icon="fa-solid fa-star"
      :class="{ checked: props.rating > 5 }"
    />
    <font-awesome-icon
      icon="fa-solid fa-star"
      :class="{ checked: props.rating > 3 }"
    />
    <font-awesome-icon
      icon="fa-solid fa-star"
      :class="{ checked: props.rating > 0 }"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Props
const props = defineProps({
  rating: String,
});
</script>

<style scoped>
.checked {
  color: orange;
}
</style>