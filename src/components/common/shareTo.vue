<template>
  <div class="shareToBox">
    <div>
      <div class="arrow"></div>
      <div class="shareList" @click="onQqSpace">
        <i class="icon">&#xe61d;</i>
        <span>QQ空间</span>
      </div>
      <div class="shareList" @click="onQqFriends">
        <i class="icon">&#xe752;</i>
        <span>QQ好友</span>
      </div>
      <div class="shareList" @click="onWeibo">
        <i class="icon">&#xe65b;</i>
        <span>新浪微博</span>
      </div>
      <div class="shareList">
        <i class="icon">&#xe626;</i>
        <span>微信扫一扫</span>
      </div>
      <div class="shareCanvas" ref="shareCanvas"></div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {};
  },
  props: {
    value: {
      type: Object,
      default: function () {
        return {
          title: "",
          url: "",
          imgUrl: "",
          msg: "",
        };
      },
    },
  },
  methods: {
    //QQ空间分享
    onQqSpace() {
      // 标题
      var title = this.value.title || "标题";
      // 图片
      var imgUrl =
        this.value.imgUrl ||
        "http://p5idrgkxe.bkt.clouddn.com/file/upload/201804/16/25cacd68c1ad48e48c1a7083af76f6b4";
      // 链接
      var url = this.value.url || window.location.href;
      //简介
      var msg = this.value.msg || "不知道说点什么，快点进来看看吧！";
      window.open(
        "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
          url +
          "?sharesource=qzone&title=" +
          title +
          "&pics=" +
          imgUrl +
          "&summary=" +
          msg
      );
    },
    //QQ好友分享
    onQqFriends() {
      console.log(this.value.imgUrl);
      // 标题
      var title = this.value.title || "标题";
      // 图片
      var imgUrl =
        this.value.imgUrl ||
        "http://p5idrgkxe.bkt.clouddn.com/file/upload/201804/16/25cacd68c1ad48e48c1a7083af76f6b4";
      // 链接
      var url = this.value.url || window.location.href;
      //简介
      var msg = this.value.msg || "不知道说点什么，快点进来看看吧！";
      window.open(
        "http://connect.qq.com/widget/shareqq/index.html?url=" +
          url +
          "?sharesource=qzone&title=" +
          title +
          "&pics=" +
          imgUrl +
          "&summary=" +
          msg +
          "&desc="
      );
    },
    //新浪微博分享
    onWeibo() {
      // 标题
      var title = this.value.title || "标题";
      // 图片
      var imgUrl =
        this.value.imgUrl ||
        "http://p5idrgkxe.bkt.clouddn.com/file/upload/201804/16/25cacd68c1ad48e48c1a7083af76f6b4";
      // 链接
      var url = this.value.url || window.location.href;
      window.open(
        "http://service.weibo.com/share/share.php?url=" +
          url +
          "?sharesource=weibo&title=" +
          title +
          "&pic=" +
          imgUrl +
          "&appkey=2706825840"
      );
    },
    //微信二维码扫一扫
    onWeChat() {
      // 链接
      var url = this.value.url || window.location.href;
      var shareCanvas = this.$refs.shareCanvas;
      new QRCode(shareCanvas, {
        text: url,
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
      });
    },
  },
  mounted() {
    this.onWeChat();
  },
};
</script>
<style lang="scss">
@import "../../style/mixin";
.shareTo {
  position: relative;
  &:hover > div.shareToBox {
    display: block;
  }
  > div.shareToBox {
    position: absolute !important;
    top: calc(100%);
    left: 50% !important;
    transform: translateX(-50%) !important;
    padding-top: 20px;
    display: none;
    z-index: 3;
    > div {
      min-width: 142px !important;
      height: initial !important;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.09);
      border: 0 !important;
      padding: 16px 26px;
      cursor: initial;
      background-color: #fff !important;
      position: relative;
      > .arrow {
        position: absolute;
        top: -12px;
        left: 50%;
        content: "";
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-right: 12px solid transparent;
        border-bottom: 12px solid #eee;
        border-left: 12px solid transparent;
        &::before {
          position: absolute;
          top: 1px;
          left: 50%;
          content: "";
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-right: 12px solid transparent;
          border-bottom: 11px solid #fff;
          border-left: 12px solid transparent;
        }
      }
      > .shareList {
        display: flex;
        padding: 10px 0px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:nth-child(2) {
          i {
            color: #facc00;
          }
        }
        &:nth-child(3) {
          i {
            color: #3389ff;
          }
        }
        &:nth-child(4) {
          i {
            color: #f67f37;
          }
        }
        &:nth-child(5) {
          i {
            color: #80d642;
          }
        }
        > i {
          font-size: 28px;
          margin-right: 10px;
        }
        > span {
          font-size: 14px;
          color: #999999;
          white-space: nowrap;
        }
      }
      > .shareCanvas {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>