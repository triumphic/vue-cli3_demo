const { name, title } = require('./package.json') // 项目信息
const target = 'http://192.168.100.236:9910' // 需要代理请求的nginx地址
module.exports = {
  publicPath: `/${name}`, // 相对路径
  outputDir: name, // 打包名称
  assetsDir: 'static', // 静态目录
  lintOnSave: false, // 关闭lint代码
  productionSourceMap: false, // 生产环境是否开启sourceMap
  parallel: require('os').cpus().length > 1, // 启用多核打包
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('html').tap(args => {
      args[0].title = title // 修改标题
      return args
    })
    // 使用svg组件
    config.performance.set('hints', false)
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  // 配置跨域
  devServer: {
    proxy: {
      '/api': {
        target, // 开发环境
        pathRewrite: {
          '^/api': `` // 开发环境
        }
      }
    }
  }
}
