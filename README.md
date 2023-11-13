# vite-plugin-oss-plus

基于[vite-plugin-oss](https://github.com/jaelam0214/vite-plugin-oss)升级而来

增加替换代码中的资源文件引用地址为 CDN 地址，使用 `cdnUrl` 参数设置 CDN 的域名会自动替换资源路径

自动匹配 dist/assets 目录下匹配的文件后缀`['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'ico', 'bmp', 'webm', 'avi', 'mp4', 'mp3', 'flv', 'mov']`，可使用`fileSuffix`参数自定义其他后缀

# Install 安装

```
npm i vite-plugin-oss-plus -D
```

# Options 配置参数
- cdnUrl: 必传。上传后要替换的资源文件 CDN 域名 URL
- region: 必传。阿里云上传区域
- accessKeyId: 必传。阿里云的授权 accessKeyId
- accessKeySecret: 必传。阿里云的授权 accessKeySecret
- bucket: 必传。上传到哪个 bucket
- from: 必传。上传哪些文件，支持类似 gulp.src 的 glob 方法，如'./build/\*\*', 为 glob 字符串。
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

## 注意: accessKeyId, accessKeySecret 很重要，注意保密!!!

# Basic Exapmle 基本例子

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import ViteOSSPluginPlus from 'vite-plugin-oss-plus'

export default defineConfig({
  plugins: [
    ViteOSSPluginPlus({
      from: './dist/**', // 上传那个文件或文件夹
      dist: "/test",  // 需要上传到oss上的给定文件目录
      region: 'oss-xx-xx-1',
      accessKeyId: 'xxxxxxxxxxxx',
      accessKeySecret: 'xxxxxxxxxxxx',
      bucket: 'xxxxxxxxx',
      test: true, // 测试，可以在进行测试看上传路径是否正确, 打开后只会显示上传路径并不会真正上传。默认false
      // 因为文件标识符 "\"  和 "/" 的区别 不进行 setOssPath配置,上传的文件夹就会拼到文件名上, 丢失了文件目录,所以需要对setOssPath 配置。
      setOssPath: filePath => {
        let index = filePath.lastIndexOf("dist")
        let Path = filePath.substring(index + 4, filePath.length)
        return Path.replace(/\\/g, "/")
      },
      cdnUrl:'https://cdn.xxx.com',
    })
  ],
});
```

