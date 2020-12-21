const path = require("path");
const Webpack = require("webpack");
module.exports = {
    // 部署时的URL
    publicPath: "/rongpaiPC/",
    // publicPath: "/",
    // 生产环境构建文件的目录名
    outputDir: "dist",
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: "static",
    runtimeCompiler: true,
    // configureWebpack(config) {
    //     return {
    //         resolve: {
    //             alias: {
    //                 "@": path.join(__dirname, "src")
    //             },
    //         },
    //     };
    // },
    css: {
        requireModuleExtension: true,
        sourceMap: true,
        loaderOptions: {
            scss: {
                // scss-loader 10.0 该怎么写
                additionalData: `@import "@/styles/mixin.scss";`, // scss-loader 9.0
                // prependData: `@import "@/styles/variable.scss";`, // scss-loader 8.0
                // data: `@import "@/styles/variable.scss";`, // scss-loader 7.0
            }
        }
    }
}