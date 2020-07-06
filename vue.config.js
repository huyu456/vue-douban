const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      }
    }
  },
  // process.env.NODE_ENV === 'production' ? './' :
  publicPath: '/',
  assetsDir: 'static', // 打包后放置静态资源的文件夹
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('base', resolve('src/base'))
      .set('common', resolve('src/common'))
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
  },
  devServer: {
    proxy: {
      '/v2': {
        target: 'http://api.douban.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/v2': '/v2'
        }
      },
      '/douban_search': {
        target: 'https://m.douban.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/douban_search': '/j'
        }
      },
      '/api': {
        target: 'http://47.96.184.59:8090',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
