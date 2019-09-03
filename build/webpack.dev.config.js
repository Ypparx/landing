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

const webpack   = require('webpack');

module.exports = Object.assign({}, config, {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ].concat(multiplesHtml),
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    host: 'localhost',
    port: 8080,
    https: false,
    noInfo: false
  },
});