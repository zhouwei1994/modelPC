<template>
  <div>
    <router-view />
    <!-- 加载动画 -->
    <z-loading v-model="loading" />
  </div>
</template>

<script>
// 加载动画
import zLoading from "@/components/common/loading";
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    zLoading,
  },
  computed: {
    ...mapState(["loading"]),
  },
  created() {
    this.setCacheData();
  },
  methods: {
    ...mapMutations(["setCacheData"]),
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "@/styles/reset.scss";
@import "@/styles/common.scss";
@import "@/styles/form_input.scss";
</style>
