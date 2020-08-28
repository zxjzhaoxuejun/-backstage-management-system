'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const { NODE_ENV, VUE_APP_BASE_API } = process.env

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port
// const { VUE_APP_GATEWAY_PRODUCT, VUE_APP_GATEWAY_CATEGORY, VUE_APP_GATEWAY_SHOPIFY, VUE_APP_BASE_API } = process.env
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: './',
  outputDir: 'admin-vue',
  assetsDir: 'static-myyshop',
  lintOnSave: NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    disableHostCheck: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    watchOptions: {
      poll: true
    },
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // [`${process.env.VUE_APP_BASE_API}/myyshop-order`]: {
      //   target: 'http://192.168.132.70:8001/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_BASE_API + '/myyshop-order']: ''
      //   }
      // },
      [VUE_APP_BASE_API]: {
        target: 'http://api.xyy51.cn', // 网关服务器
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          ['^' + VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }

}
