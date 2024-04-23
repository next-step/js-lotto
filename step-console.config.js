const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/step-console-index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "step-console-bundle.js",
  },
  resolve: {
    extensions: [".js", ".mjs"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  devtool: "inline-source-map",
  target: "node",
};
