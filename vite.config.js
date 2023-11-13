import Inspect from "vite-plugin-inspect";
import ViteOSSPluginPro from "./src/index";

const prod = process.env.NODE_ENV === "production";

export default {
  plugins: [
    Inspect(),
    prod &&
      ViteOSSPluginPro({
        from: "./dist/assets/**", // 上传那个文件或文件夹  可以是字符串或数组
        dist: "/static", // 需要上传到oss上的给定文件目录
        region: "xxxx",
        accessKeyId: "xxxx",
        accessKeySecret: "xxxxxxx",
        bucket: "xxxxx",
        test: true,
        cdnUrl: "https://cdn.xxx.com",
      }),
  ],
};
