<template>
  <div id="app">
    <z-header></z-header>
    <router-view class="router-view"></router-view>
    <z-footer></z-footer>
    <loading v-model="loading"></loading>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
//头部
import zHeader from "@/components/header";
// 尾部
import zFooter from "@/components/footer";
//加载动画
import loading from "@/components/common/loading";
export default {
  components: {
    zHeader,
    zFooter,
    loading
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["loading"])
  },
  created() {
    this.setCacheData();
  },
  methods: {
    ...mapMutations(["setCacheData"])
  },
  mounted() {}
};
</script>
<style lang="scss">
@import "src/style/common";
@import "src/style/common";
@import "src/style/icon";
</style>

