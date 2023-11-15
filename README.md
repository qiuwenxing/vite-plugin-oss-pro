# vite-plugin-oss-pro

一个可以将打包好的资源文件上传到阿里云 OSS 并且修改代码中资源文件 CND 地址的 Vite 插件

传送门
[webpack版](https://github.com/qiuwenxing/webpack-plugin-oss-pro)

# Install 安装

```
npm i vite-plugin-oss-pro -D
```

# Options 配置参数

- cdnHost: 必传。上传后要替换的资源文件 CDN 域名 URL
- region: 必传。阿里云上传区域
- accessKeyId: 必传。阿里云的授权 accessKeyId
- accessKeySecret: 必传。阿里云的授权 accessKeySecret
- bucket: 必传。上传到哪个 bucket
- from: 必传。上传哪些文件，支持类似 gulp.src 的 glob 方法，如'./build/\*\*', 为 glob 字符串。默认./dist/assets/**
- dist: 上传到 oss 哪个目录下，默认为 oss 根目录。可作为路径前缀使用。
- timeout: oss 超时设置，默认为 30 秒(30000)
- overwrite: 是否覆盖 oss 同名文件。默认 true。
- verbose: 是否显示上传日志，默认为 true。
- deleteOrigin: 上传完成是否删除原文件，默认 false。
- deleteEmptyDir: 如果某个目录下的文件都上传过了，是否删除此目录。deleteOrigin 为 true 时候生效。默认 false。
- setOssPath: 自定义每个文件上传路径。接收参数为当前文件路径。不传，或者所传函数返回 false 则按默认方式上传。
- test: 测试，仅查看文件和上传路径，但是不执行上传操作。默认 false。
- quitWpOnError: 出错是否中断打包。默认 false。
- version: 版本号。默认为''。
- setVersion: 设置线上的版本号的方法。一般为 axios 请求方法，需同时配置 version。
- fileSuffix: 需要上传的文件后缀，默认['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'ico', 'bmp', 'webm', 'avi', 'mp4', 'mp3', 'flv', 'mov']
- assetsDirectory: 要上传的资源文件目录，默认assets
- outputDirectory: 项目打包后的目录，默认dist

## 注意: accessKeyId, accessKeySecret 很重要，注意保密!!!

### 使用示例

```javascript
// vite.config.js
import { defineConfig } from "vite";
import ViteOSSPluginPro from "vite-plugin-oss-pro";

const prod = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    // 打包时才加载插件
    prod &&
      ViteOSSPluginPro({
        cdnHost: "https://cdn.xxx.com",
        from: "./dist/assets/**", // 上传那个文件或文件夹
        dist: "/static", // 需要上传到oss上的给定文件目录
        region: "oss-xx-xx-1",
        accessKeyId: "xxxxxxxxxxxx",
        accessKeySecret: "xxxxxxxxxxxx",
        bucket: "xxxxxxxxx",
      }),
  ].filter(Boolean),
});
```
