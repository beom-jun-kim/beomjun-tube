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
        test: /\.js$/, /* js코드를 */
        use: {
          loader: "babel-loader", /* babel-loader라는 loader로 가공 */
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]], /* @babel/preset-env를 이용해서 */
          },
        },
      },
    ],
  },
};