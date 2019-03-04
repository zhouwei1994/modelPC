<template>
  <div ref="editor"></div>
</template>
<script>
import E from "./wangEditor";
import qiniuUpload from "./../qiniu.js";
export default {
  name: "editor",
  data() {
    return {};
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods: {},
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.$emit("input", html);
    };
    editor.customConfig.height = 500;
    // 自定义菜单配置
    editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      //'emoticon',  // 表情
      "image", // 插入图片
      "table", // 表格
      "video", // 插入视频
      //'code',  // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    //自定义上传
    editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      qiniuUpload(files).then(res => {
        // 上传代码返回结果之后，将图片插入到编辑器中
        insert(res);
      });
    };
    editor.create();
    editor.customConfig.customUploadVideo = function(files, insert) {
      qiniuUpload(files).then(res => {
        // 上传代码返回结果之后，将视频插入到编辑器中
        console.log(res);
        editor.cmd.do(
          "insertHTML",
          '<video src="' +
            res +
            '" controls="controls" style="min-width:300px;min-height:300px;"></video>'
        );
      });
    };
    if (this.value) {
      editor.cmd.do("insertHTML", this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.editor {
  width: 100%;
}
</style>
