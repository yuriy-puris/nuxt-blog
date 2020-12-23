<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <AppPost
        v-for="(post, index) in 3"
        :key="index"
      />
    </el-col>
  </el-row>
</template>

<script>
import AppPost from '@/components/main/Post';

export default {
  head: {
    title: 'Main'
  },
  components: {
    AppPost
  }
}
</script>

<style>

</style>
