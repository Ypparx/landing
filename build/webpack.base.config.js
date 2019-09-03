const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// get next after --mode arg from argv - value of mode
const mode = process.argv[process.argv.indexOf('--mode') + 1];

// Pug place config
const HWPConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../src/index.pug'),
  inject: false,
  minify: mode === 'production',
  filename: 'index.html'
});
// List of pages to resolve
const htmlPages = ['index', 'landing'];
const multiplesHtml = htmlPages.map(function(entryName) {
  return new HtmlWebpackPlugin({
    filename: entryName + '.html',
    template: path.resolve(__dirname, `../src/${entryName}.pug`),
    inject: false,
  });
});

config = {
  mode: 'development',
  entry: [
    './src/js/main.js',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.less', '.pug'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: mode !== 'production' }
          },
          'postcss-loader',
          'less-loader'
        ],
      },
      {
        test: /\.pug$/,
        use: [
          'raw-loader',
          'pug-plain-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]'
          }
        }
      }
    ]
  }
};

module.exports = {
  config,
  mode,
  path,
  MiniCssExtractPlugin,
  CopyWebpackPlugin,
  HtmlWebpackPlugin,
  multiplesHtml,
  HWPConfig
};