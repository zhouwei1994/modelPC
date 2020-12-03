<template>
  <!-- 尾部 -->
  <footer class="footer content_center">
    
  </footer>
</template>
<script>
export default {
  data() {
    return {
      linkList: []
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.footer {
  background-color: #212328;
  padding: 40px 0;
  .page_center {
    display: flex;
    flex-direction: column;
  }
}
</style>
