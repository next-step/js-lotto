const path = require("path");
// @ts-ignore
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = env => ({
  entry: env.entry,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
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
});