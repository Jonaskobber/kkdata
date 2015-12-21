var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    },
    {
        test: /\.scss$/,
        loader: 'style!css!sass'
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
}
