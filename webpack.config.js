const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {

    // 프로퍼티명은 꼭 파일명이랑 같을 필요는 없다
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js"
  },
  mode: "development",
  watch: true, /* 해석 된 파일의 변경 사항을 계속 감시 */
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js", /* [name] entry에 있는 이름을 가져간다(변수설정) */
    path: path.resolve(__dirname, "assets"),
    clean: true, /* build 하기전에 clean */
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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


