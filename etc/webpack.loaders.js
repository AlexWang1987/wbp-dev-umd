/*eslint-disable*/
/*WEBPACK COMMON LOADERS*/
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  getJSLoader: function(cx, devMode) {
    return {
      test: /\.jsx?$/,
      include: [cx.__sourcedir, cx.__testdir],
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        presets: [
          require.resolve('babel-preset-env'),
          require.resolve('babel-preset-react'),
          require.resolve('babel-preset-stage-0')
        ],
        plugins: [
          "transform-runtime",
          "transform-decorators-legacy", [require.resolve('babel-plugin-import'), { "libraryName": "antd", "style": "css" }],
          require.resolve('react-hot-loader/babel')
        ]
      }
    }
  },

  getCSSLoader: function(cx, devMode) {
    return {
      test: /\.css$/,
      use: devMode ? 'style-loader!css-loader?minimize' : ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?minimize'
      })
    }
  },

  getLESS_SRCLoader: function(cx, devMode) {
    return {
      test: /\.less$/,
      // include: cx.__sourcedir,
      loader: devMode ? 'style-loader!css-loader?localIdentName=[local]_[hash:base64:5]&camelCase&modules&importLoaders=1&minimize!postcss-loader?parser=postcss-less' : ExtractTextPlugin.extract('style-loader', ['css-loader?camelCase&modules&importLoaders=1&minimize', 'postcss-loader?parser=postcss-less']),
    }
  },

  getLESSLoader: function(cx) {
    return {
      test: /\.less$/,
      // exclude: cx.__sourcedir,
      loader: ExtractTextPlugin.extract('style-loader', ['css-loader?importLoaders=1&minimize', 'less-loader']),
    }
  },

  getImgLoader: function(cx) {
    return {
      test: /\.(jpe?g|png|svg|gif)$/i,
      loader: 'url?prefix=img&limit=25000&name=[name].[ext]', //25k
      // include: cx.__sourcedir
    }
  },

  getFontLoader: function(cx) {
    return {
      test: /.otf$|\.ttf$|\.eot$|\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file',
      // include: cx.__sourcedir,
      query: {
        name: 'font/[name].[ext]'
      },
    }
  },

  getSCSS_SRCLoader: function(cx, devMode) {
    return {
      test: /\.scss$/,
      // include: cx.__sourcedir,
      loader: devMode ? 'style-loader!css-loader?localIdentName=[local]_[hash:base64:5]&camelCase&modules&importLoaders=1&minimize!postcss-loader?parser=postcss-scss' : ExtractTextPlugin.extract('style-loader', ['css-loader?camelCase&modules&importLoaders=1&minimize', 'postcss-loader?parser=postcss-scss']),
    }
  },

  getSCSSLoader: function(cx) {
    return {
      test: /\.scss$/,
      // exclude: cx.__sourcedir,
      loader: ExtractTextPlugin.extract('style-loader', ['css-loader?importLoaders=1&minimize', 'sass-loader']),
    }
  }

}