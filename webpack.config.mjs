import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { Parser } from "webpack";

const __dirname = path.resolve();

const BASE_JS = "./src/client/js/";

const config = {
  entry: {

    // 프로퍼티명은 꼭 파일명이랑 같을 필요없다
    main: BASE_JS + "main.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    recorder: BASE_JS + "recorder.js",
    commentSection: BASE_JS + "commentSection.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename:
      "js/[name].js" /* [name] entry에 있는 이름을 가져감(변수설정) */,
    path: path.resolve(__dirname, "assets"),
    clean: true /* build 하기전에 clean */,
  },
  module: {
    rules: [
      {
        parser:{
          commonjs:false,
        }
      },
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};

export default config;