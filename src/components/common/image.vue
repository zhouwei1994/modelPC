<template>
  <div class="tile_image">
    <img :src="imageSrc">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: "fill"
    }
  },
  created() {
    this.imageSrc = this.src;
    if (this.imageSrc) {
      this.imageView(this.imageSrc);
    }
  },
  data() {
    return {
      imageSrc: ""
    };
  },
  watch: {
    src(val) {
      this.imageSrc = val;
      if (val) {
        this.imageView(val);
      }
    }
  },
  methods: {
    imageView(src) {
      this.$nextTick(() => {
        const $el = this.$el;
        // 获取高宽比例
        var ratio = $el.clientWidth / $el.clientHeight;
        const aspectFit = this.mode == "fill" ? false : true;
        let imgEl = $el.children[0];
        let img = new Image();
        img.src = src;
        img.onload = function() {
          //获取图片高宽比例
          var imgRatio = img.width / img.height;
          if (
            (imgRatio > ratio && aspectFit) ||
            (imgRatio < ratio && !aspectFit)
          ) {
            imgEl.style.width = "100%";
          } else {
            imgEl.style.height = "100%";
          }
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tile_image {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 1rem;
  height: 1rem;
}
</style>
