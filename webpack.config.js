const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, argv) => {
  const isDevelopment = argv.mode !== 'production';

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    devServer: {
      port: 3000,
      hot: true,
    },
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              compact: !isDevelopment,
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(ttf|eot|woff|woff2|svg|png|ico|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '/build/',
              },
            },
          ],
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin({ template: './index.html' }), new MiniCssExtractPlugin()],
    performance: {
      hints: isDevelopment ? 'warning' : 'error',
    },
  };
};
