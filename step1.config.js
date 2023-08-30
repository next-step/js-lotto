const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/step1-index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "step1-bundle.js",
    },
    resolve: {
        extensions: [".js", ".mjs"],
    },
    plugins: [new CleanWebpackPlugin()],
    devtool: "inline-source-map",
    target: "node",
};