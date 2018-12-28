const path = require('path');
const webpack = require('webpack');

process.noDeprecation = true;

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
  }, options.output),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
              ],
            },
          },
          'sass-loader',
          'import-glob-loader',
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                gifsicle: {
                  interlaced: true,
                },
                mozjpeg: {
                  progressive: true,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      'API_URL': JSON.stringify('https://api.openweathermap.org/data/2.5/'),
      'IMG_URL': JSON.stringify('http://openweathermap.org/img/w/'),
      'APP_ID': JSON.stringify('65ad8ff4f01a3fb6085b5da13db80328')
    }),
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    alias: {
      app: path.resolve(__dirname, '../app'),
    },
    extensions: [
      '.js',
      '.jsx',
      '.scss',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  target: 'web',
  performance: options.performance || {},
  optimization: {
    namedModules: true,
    splitChunks: {
      name: 'vendor',
      minChunks: 2,
    },
  },
});
