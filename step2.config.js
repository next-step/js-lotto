const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("base.config");

module.exports = {
  ...baseConfig,
  devServer: {
    port: 9000,
  },
  entry: "./src/step2-index.js",
  output: {
    filename: "step2-bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    ...baseConfig.plugins,
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};