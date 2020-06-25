/* eslint-disable*/
const path = require('path');
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
  components: 'components/',
}

const PAGES_DIR = `${PATHS.src}/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
  externals: {
    paths: PATHS
  },

  entry: {
    'cards': path.resolve(PATHS.src, "cards.js"),
    'form-elements': path.resolve(PATHS.src, "form-elements.js"),
    'headers-and-footers': path.resolve(PATHS.src, "headers-and-footers.js"),
    'landing-page': path.resolve(PATHS.src, "landing-page.js"),
    'registration-page': path.resolve(PATHS.src, "registration-page.js"),
    'login-page': path.resolve(PATHS.src, "login-page.js"),
    'room-details-page': path.resolve(PATHS.src, "room-details-page.js"),
    'search-room-page': path.resolve(PATHS.src, "search-room-page.js"),
  },
  output: {
    filename: `${PATHS.assets}js/[name].[contenthash].js`,
    path: PATHS.dist,
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        },
        default: {
          name: 'common',
          test: /src/,
          chunks: 'all',
          minChunks: 3,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.pug$/,
      loader: 'pug-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /background-.*\.jpg/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: `${PATHS.assets}img`,
        publicPath: `../img`,
      }
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader',
      exclude: /background-.*\.jpg$/,
      options: {
        name: '[name].[ext]',
        outputPath: `${PATHS.assets}img`,
        publicPath: `${PATHS.assets}img`,
      }
    }, {
      test: /assets.*\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: `${PATHS.assets}fonts`,
        publicPath: `../fonts`,
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        },
      ]
    },
    // {
    //   test: /\.svg$/,
    //   loader: 'svg-sprite-loader',
    //   exclude: [/assets/, /node_modules/],
    //   options: {
    //     extract: true,
    //     spriteFilename: `icons.svg`,
    //     runtimeCompat: true,
    //   }
    // }
    ],

    noParse: /\/jquery\/dist\/jquery/
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash].css`,
    }),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`,
      insert: false,
      chunks: [page.replace(/\.pug/, ''), 'vendors', 'common'],
    })),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/components/card/img`, to: `${PATHS.assets}img/` },
    ]),
    // new SpriteLoaderPlugin({
    //   plainSprite: true
    // }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'md4',
      hashDigest: 'base64',
      hashDigestLength: 4
    })
  ]
}