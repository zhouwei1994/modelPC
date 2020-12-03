<template>
  <div>
    <!-- 头部 -->
    <header class="header" :class="{ white: white || scrollState, line: line || scrollState }">
      <div class="header_center">
        
      </div>
    </header>
    <div v-if="white" class="standing"></div>
  </div>
</template>
<script>
export default {
  props: {
    white: {
      type: Boolean,
      default: false,
    },
    line: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scrollState: false,
      serviceList: [],
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onPageJump(url) {
      this.$router.push(url);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.standing {
  height: 100px;
}
</style>
