const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = require("./base.config")({
  mode: "production",
  entry: [
    path.join(process.cwd(), "src/index.js")
  ],
  output: {
    filename: "assets/js/[name].[chunkhash].js",
    chunkFilename: "assets/js/[name].[chunkhash].chunk.js"
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, "build"), {
      root: process.cwd()
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/style.[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
      hast: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: false
    }),
    new CopyWebpackPlugin([
      {
        from: "assets",
        to: "assets",
        ignore: ["scss/**/*"]
      }
    ]),
    new WebpackMd5Hash()
  ],

  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },
});
