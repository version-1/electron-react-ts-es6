'use strict'

const path = require('path')
const paths = require('./paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
const host = process.env.HOST || '0.0.0.0'

const devServer = {
  hot: true,
  inline: true,
  compress: true,
  contentBase: paths.appPublic,
  watchContentBase: true,
  https: protocol === 'https',
  host,
  overlay: false
}

const defaultConf = env => {
  const production = env.NODE_ENV === 'development'
  const development = env.NODE_ENV === 'production'
  const mode = production ? 'production' : 'development'
  return {
    mode,
    devtool: production ? 'source-map' : development && 'cheap-module-source-map',
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: false,
            template: paths.appHtml
          },
          production
            ? {
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
                  minifyURLs: true
                }
              }
            : undefined
        )
      )
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        main: path.resolve(__dirname, '../src/main'),
        renderer: path.resolve(__dirname, '../src/renderer'),
        components: path.resolve(__dirname, '../src/renderer/components'),
        styles: path.resolve(__dirname, '../src/renderer/styles'),
        constants: path.resolve(__dirname, '../src/constants'),
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['babel-loader', 'ts-loader'],
          exclude: /node_modules/
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          exclude: /node_modules/,
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    devServer
  }
}

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = (env = {}) => {
  return [
    {
      name: 'main',
      ...defaultConf(env),
      entry: path.resolve(__dirname, '../src/main'),
      output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'main.js'
      },
      target: 'electron-main'
    },
    {
      // for renderer
      name: 'renderer',
      ...defaultConf(env),
      entry: path.resolve(__dirname, '../src/renderer'),
      output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'renderer.js'
      },
      target: 'web',
    }
  ]
}
