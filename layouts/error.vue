<template>
  <div class="error-layout">
      <div class="error-content">
          <h1 class="error-title">Error 404</h1>
          <nuxt-link to="/">Back to main page</nuxt-link>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .error-layout {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .error-content {
        display: flex;
        flex-direction: column;
        align-content: center;
        padding-top: 4rem;
    }
    .error-title {
        color: rgb(165, 60, 60);
        margin-bottom: 1rem;
    }
</style>