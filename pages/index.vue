<template>
  <div class="header">
    <TopContent />
    <Bar />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "sidebar",
  middleware: ["user-auth"],
});
</script>

<style scoped lang="scss">
.header {
  background-color: #fcfcfd;
  padding: 30px;
  width: 100%;
}
</style>
