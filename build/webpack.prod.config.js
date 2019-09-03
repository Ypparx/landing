const {
  config,
  mode,
  path,
  MiniCssExtractPlugin,
  CopyWebpackPlugin,
  HtmlWebpackPlugin,
  multiplesHtml,
  HWPConfig
} = require('./webpack.base.config');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = Object.assign({}, config, {
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new UglifyJsPlugin({
      parallel: true
    }),
    HWPConfig,
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/img/'),
        to: path.resolve(__dirname, '../dist/img/')
      },
      {
        from: path.resolve(__dirname, '../src/js/libs/'),
        to: path.resolve(__dirname, '../dist/libs/')
      },
      {
        from: path.resolve(__dirname, '../src/js/app.js'),
        to: path.resolve(__dirname, '../dist/')
      },
    ]),
  ].concat(multiplesHtml),
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
    ]
  },
});