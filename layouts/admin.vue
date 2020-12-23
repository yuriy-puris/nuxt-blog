<template>
  <div class="admin-layout-wrapper">
      <el-container :style="{height: '100%'}">
            <el-aside>
                <AppAside />
            </el-aside>
            <el-main>
                <nuxt />
            </el-main>
        </el-container>
  </div>
</template>

<script>
import AppAside from '@/components/admin/Aside';

export default {
    components: {
        AppAside
    }
}
</script>

<style lang="scss" scoped>
    .admin-layout-wrapper {
        width: 100%;
        height: 100vh;
    }
</style>