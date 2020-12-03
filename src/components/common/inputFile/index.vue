<template>
  <input type="file" @change="uploadFile($event)" :multiple="length > 1" :accept="accept" />
</template>
<script>
import qiniuUpload from "./qiniu.js";
export default {
  data() {
    return {
      fileUrl: []
    };
  },
  props: {
    //当前值
    value: {
      default: ""
    },
    //上传数量
    length: {
      default: 1
    },
    //获取文件其他信息
    otherData: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    //文件类型
    accept: {
      type: String,
      default: function() {
        return "image/gif,image/jp2,image/jpeg,image/png";
      }
    }
  },
  created() {
    if (this.value) {
      this.fileUrl = this.value;
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.fileUrl = val;
      }
    }
  },
  methods: {
    uploadFile(event) {
      const _this = this;
      //文件数据体
      var files = event.target.files;
      qiniuUpload(files, this).then(res => {
        if (_this.length > 1) {
          _this.fileUrl = _this.fileUrl.concat(res);
        } else {
          _this.fileUrl = res[0];
        }
        _this.$emit("input", _this.fileUrl);
      });
    }
  },
  mounted() {
    const _this = this;
  }
};
</script>
