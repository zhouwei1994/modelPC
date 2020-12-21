<template>
  <div>
    <!-- 遮罩层动画 -->
    <div class="mask" @click="onClose" v-if="currentValue"></div>
    <!-- 显示信息层 -->
    <div
      class="popup_box"
      :class="[type == 1000 ? 'popup_bottom' : 'popup_center']"
      :style="{ opacity: opacity, transform: transform }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //是否显示
    value: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    //点击遮罩层关闭弹窗
    hideOnBlur: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    //禁止页面滚动（H5生效）
    scroll: {
      type: Boolean,
      default: true,
    },
    // 类型
    //  1000 靠下
    //  2000 居中
    type: {
      type: String,
      default: function () {
        return "1000";
      },
    },
  },
  created() {
    if (this.value) {
      this.currentValue = this.value;
      this.setAnimation(this.value);
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
      this.setAnimation(val);
    },
    currentValue(val) {
      this.$emit("change", val);
      this.$emit("input", val);
    },
  },
  data() {
    return {
      // 传进来的值
      currentValue: false,
      opacity: 0,
      transform: "translateX(-50%) translateY(-50%) scale(0)",
    };
  },
  methods: {
    onTouchMove: function (event) {
      !this.scroll && event.preventDefault();
    },
    onClose() {
      if (this.hideOnBlur) {
        this.currentValue = false;
        this.setAnimation(false);
      }
    },
    setAnimation(val) {
      if (this.type == 1000) {
        if (val) {
          this.transform = "translateY(0%)";
          this.opacity = 1;
        } else {
          this.opacity = 0;
          this.transform = "translateY(100%)";
        }
      } else if (this.type == 2000) {
        if (val) {
          this.opacity = 1;
          this.transform = "translateX(-50%) translateY(-50%) scale(1)";
        } else {
          this.opacity = 0;
          this.transform = "translateX(-50%) translateY(-50%) scale(0)";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/*遮罩层*/
.mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.6s;
}

.popup_box {
  position: fixed;
  z-index: 1001;
  opacity: 0;
  font-size: 14px;
  transition: all 0.6s;
}

.popup_bottom {
  left: 0px;
  bottom: 0;
  min-width: 100%;
  transform: translateY(100%);
}

.popup_center {
  left: 50vw;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
