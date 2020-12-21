<template>
  <div v-show="loading" class="loading_box">
    <div class="loading_mask"></div>
    <div class="loading_toast">
      <spinner type="android" />
      <p class="loading_content">{{ text || "加载中" }}</p>
    </div>
  </div>
</template>
<script>
import Spinner from "./spinner/index.vue";
import { mapState } from "vuex";
export default {
  components: {
    Spinner,
  },
  computed: {
    ...mapState(["loading"]),
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    text: String,
  },
};
</script>

<style lang="scss" scoped>
.loading_box .loading_mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*background: rgba(0,0,0,0.5);*/
  z-index: 5000;
}
.loading_box .loading_toast {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 110px;
  height: 110px;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  padding-top: 25px;
  box-sizing: border-box;
  font-size: 18px;
  z-index: 5001;
}
.loading_box .loading_toast .loading_content {
  color: #fff;
  margin-top: 15px;
  font-size: 16px;
}
</style>
