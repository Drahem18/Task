<template>
  <div class="container">
    <div class="bg">
      <div class="circle"></div>
    </div>
    <div class="login">
      <SignIn />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "none",
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;

  .bg {
    width: 47%;
    background-image: $loginColor;
    display: flex;
    justify-content: center;
    align-items: center;

    .circle {
      width: 80%;
      height: 80%;
      background: linear-gradient(
        179.94deg,
        rgba(255, 255, 255, 0.06) -5.48%,
        rgba(255, 255, 255, 0) 96.9%
      );
      border-radius: 50%;
    }
  }

  .login {
    width: 53%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
