<template lang="html">
    <div class="img-enlarge" :style="{width: contentWdith+'px', height: contentHeight+'px'}">
        <img class="mainimg" :src="imgSrc" :style="{width: imgWidth+'px', height: imgHeight+'px', left: contentleft+'px', top: contenttop+'px'}" alt="">
        <span v-show="show" style="position: absolute;" :style="{width: positionSize + 'px', height: positionSize + 'px', left: (positionX + contentleft)+'px', top: (positionY + contenttop)+'px'}" class="ks-imagezoom-lens"></span>
        <div v-show="show" class="enlargeimg" :style="{left: contentWdith+10+'px', top: 0, width: contentWdith+'px', height: contentHeight+'px'}">
            <img :src="imgSrc" :style="{left: -positionX*enlargeStep+'px', top: -positionY*enlargeStep+'px', width: imgWidth*enlargeStep + 'px', height: imgHeight*enlargeStep + 'px'}" alt="">
        </div>
        <div :style="{width: imgWidth+'px', height: imgHeight+'px', left: contentleft+'px', top: contenttop+'px'}" style="position: absolute; z-index: 2;" @mouseover="showEnlarge()" @mousemove="moveEnlarge($event)" @mouseout="hideEnlarge($event)"></div>
    </div>
</template>

<script>
const IMGWIDTH = 430;
const IMGHEIGHT = 430;
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      contentWdith: IMGWIDTH /*容器宽*/,
      contentHeight: IMGHEIGHT /*容器高*/,
      contentleft: "" /*范围起点*/,
      contenttop: "" /*范围起点*/,
      imgWidth: "" /*图片宽*/,
      imgHeight: "" /*图片高*/,
      imgSrc: "" /*图片链接*/,
      positionX: 0 /*蒙层相对坐标X*/,
      positionY: 0 /*蒙层相对坐标Y*/,
      positionSize: "" /*蒙层大小*/,
      enlargeStep: "" /*放大比例*/,
      show: false /*是否显示*/
    };
  },
  watch: {
    value(n, o) {
      this.imgSrc = n;
      this.page();
    }
  },
  mounted() {
    if (this.value) {
      this.imgSrc = this.value;
      this.page();
    }
  },
  methods: {
    page() {
      const _this = this;
      var newWidth, newHeight, posiSize, enlargeStep;
      var contentleft = 0,
        contenttop = 0;
      var img = new Image();
      img.src = this.imgSrc;
      img.onload = function() {
        if (img.width > img.height) {
          newWidth = IMGWIDTH;
          img.height = newWidth / img.width * img.height;
          img.width = newWidth;
          posiSize = img.height / 2;
          contenttop = (IMGHEIGHT - img.height) / 2;
          enlargeStep = IMGHEIGHT * 2 / img.height;
        } else {
          newHeight = IMGHEIGHT;
          img.width = newHeight / img.height * img.width;
          img.height = newHeight;
          posiSize = img.width / 2;
          contentleft = (IMGWIDTH - img.width) / 2;
          enlargeStep = IMGWIDTH * 2 / img.width;
        }
        _this.imgWidth = img.width;
        _this.imgHeight = img.height;
        _this.positionSize = posiSize;
        _this.contentleft = contentleft;
        _this.contenttop = contenttop;
        _this.enlargeStep = enlargeStep;
      };
    },
    showEnlarge: function() {
      this.show = true;
    },
    hideEnlarge: function(e) {
      this.show = false;
      this.positionX = 0;
      this.positionY = 0;
    },
    moveEnlarge: function(e) {
      if (e.offsetX > 0 && e.offsetX < this.positionSize / 2) {
        this.positionX = 0;
      } else if (e.offsetX >= this.imgWidth - this.positionSize / 2) {
        this.positionX = this.imgWidth - this.positionSize;
      } else {
        this.positionX = e.offsetX - this.positionSize / 2;
      }
      if (e.offsetY > 0 && e.offsetY < this.positionSize / 2) {
        this.positionY = 0;
      } else if (e.offsetY >= this.imgHeight - this.positionSize / 2) {
        this.positionY = this.imgHeight - this.positionSize;
      } else {
        this.positionY = e.offsetY - this.positionSize / 2;
      }
    }
  }
};
</script>

<style lang="scss">
.img-enlarge {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  .mainimg {
    position: relative;
    max-width: 100%;
    max-height: 100%;
  }
  cursor: move;
  .enlargeimg {
    position: absolute;
    overflow: hidden;
    img {
      max-width: none;
      max-height: none;
      position: absolute;
    }
  }
  .ks-imagezoom-lens {
    z-index: 1;
    font-size: 0;
    background-attachment: scroll;
    background-repeat: repeat;
    cursor: move;
    z-index: 1;
    position: absolute;
    overflow: hidden;
    background-position: 0 0;
    background-image: url(//img-tmdetail.alicdn.com/tps/i4/T12pdtXaldXXXXXXXX-2-2.png);
  }
}
</style>
