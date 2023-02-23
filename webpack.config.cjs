const path = require("path");

module.exports = {
  entry: "./src/client/js/main.cjs",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"),
  },
  // watch: true,
  // watchOptions: {
  // ignored: /node_modules/,
  // aggregateTimeout: 5000,
  // poll: 1000,
  // },
  module: {
    rules: [
      {
        test: /\.js$/ /* js코드를 */,
        use: {
          loader: "babel-loader" /* babel-loader로 가공 */,
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
            ] /* 얘를 이용해서 */,
          },
        },
      },
      {
        test: /\.scss$/,

        // 작업 역순으로 선언 : webpack은 뒤에서부터 시작하기 때문
        // 1. 일반 css로 변환
        // 2. 그 코드를 css-loader한테 전달
        // 3. 브라우저에 노출
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
