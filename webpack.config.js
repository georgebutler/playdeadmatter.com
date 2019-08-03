const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

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
    new HtmlWebpackPlugin({
      title: "Dead Matter | Quantum Integrity Software Inc.",
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([{ from: "./src/assets/img", to: "./static/img" }]),
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== "production",
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: "80-90"
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
