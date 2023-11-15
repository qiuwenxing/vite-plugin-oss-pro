import Inspect from "vite-plugin-inspect";
import ViteOSSPluginPro from "./src/index";

const prod = process.env.NODE_ENV === "production";

export default {
  plugins: [
    Inspect(),
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
};
