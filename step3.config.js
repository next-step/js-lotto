const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 9000,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  entry: './src/step3-index.ts',
  output: {
    filename: 'step3-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.mjs', '.css', '.ts'],
    alias: {
      '@step1': path.resolve(__dirname, './src/step1'),
      '@step3': path.resolve(__dirname, './src/step3'),
      '@src': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  devtool: 'inline-source-map',
};
