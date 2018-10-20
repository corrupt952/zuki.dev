const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const resolve = (...paths) => path.resolve(path.join(__dirname, ...paths))

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    'index': './src/js/index.js'
  },
  output: {
    filename: '[name].js',
    path: resolve('static', 'assets')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: { url: false, minimize: true, sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style_override.css'
    })
  ]
}
