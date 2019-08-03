const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: ["jquery", "./src/js/index.js"],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./static/[name].bundle.css"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader?-url"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        title: "Dead Matter | Quantum Integrity Software Inc.",
        template: "./src/index.html"
      },
      {
        title: "About | Quantum Integrity Software Inc.",
        template: "./src/about.html"
      }
    ),
    new CopyWebpackPlugin([
      { from: "src/assets/Robots.txt", to: "./" },
      { from: "./src/assets/img", to: "./static/img" }
    ]),
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== "production",
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: "90-100"
      }
    })
  ],
  resolve: {
    extensions: [".js", ".scss", ".css"]
  },
  devServer: {
    contentBase: "./dist"
  },
  output: {
    filename: "./js/[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
