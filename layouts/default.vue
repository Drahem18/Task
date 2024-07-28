<template>
  <div class="main">
    <SideBar />

    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main {
  display: flex;
  width: 100%;
}
</style>
