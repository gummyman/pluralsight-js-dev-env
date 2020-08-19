import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from "webpack-md5-hash";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    //Hash the files using MD5 so that their names change when the content changes
    new WebpackMd5Hash(),

    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments : true,
        collapseWhitespace : true,
        removeRedundantAttributes : true,
        useShortDoctype : true,
        removeEmptyAttributes : true,
        removeStyleLinkTypeAttributes : true,
        keepClosingSlash : true,
        minifyJS : true,
        minifyCSS : true,
        minifyURLs : true
      },
      trackJSToken : "ae63bf031ead4244acab5655f436346b"
    }),
    //Elimate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    //Minify JS
    new webpack.optimize.UglifyJsPlugin()

  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test:/\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
