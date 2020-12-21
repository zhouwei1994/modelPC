<template>
  <div>
    <!-- 头部 -->
    <header class="header">
    </header>
    <div class="standing"></div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    line: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scrollState: false,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
  },
  mounted() { },
  methods: {
    ...mapMutations(["emptyUserInfo"]),
    onPageJump(url) {
      this.$router.push(url);
    },
  },
};
</script>
<style lang="scss" scoped>
.standing {
  height: 120px;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
</style>
