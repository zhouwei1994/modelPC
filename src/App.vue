<template>
  <div>
    <router-view />
    <!-- 加载动画 -->
    <loading v-model="loading" />
  </div>
</template>

<script>
// 加载动画
import loading from "@/components/common/loading";

export default {
  name: 'App',
  components: {
    loading
  },
 
  created(){ 
    
  },
  mounted() {
    
  },
}
</script>

<style lang="scss">
@import "@/style/common.scss";
@import "@/style/reset.scss";
</style>
