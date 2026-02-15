const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
require('dotenv').config();
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: "[name].js",        
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][hash][ext]',
        },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      __OPENWEATHER_API__: JSON.stringify(process.env.OpenWeatherAPI)
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/assets', to: 'assets' } 
      ],
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: { directory: path.join(__dirname, 'public') },
    port: 5000,
    hot: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
