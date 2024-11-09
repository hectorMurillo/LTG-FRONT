<template>
  <div class="content">
    <FadeTransition :duration="300" mode="out-in">
      <!-- your content here -->
      <router-view></router-view>
    </FadeTransition>
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';
export default {
  components: {
    FadeTransition
  }
};
</script>
<style></style>
