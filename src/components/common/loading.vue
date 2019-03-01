<template>
  <div class="loading_box" v-show="value > 0">
    <div class="loading_mask"></div>
    <div class="loading_toast">
      <spinner type="android"></spinner>
      <p class="loading_content">{{ text || '加载中' }}</p>
    </div>
  </div>
</template>
<script>
import Spinner from "./spinner/index.vue";
export default {
  components: {
    Spinner
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    text: String
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
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
