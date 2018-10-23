/*
page 页面路径，同时是 vue 文件相对于 src 的路径
config 页面配置，即 page.json 的内容
*/

module.exports = [
  {
    path: '/pages/index/index',
    config: {
      navigationBarTitleText: 'How Long',
      usingComponents: {
        'van-loading': '/static/vant/loading/index',
        'van-transition': '/static/vant/transition/index',
        'van-icon': '/static/vant/icon/index',
        'van-button': '/static/vant/button/index',
        'van-cell': '/static/vant/cell/index',
        'van-cell-group': '/static/vant/cell-group/index'
      }
    }
  }, {
    path: 'pages/counter'
  }, {
    path: 'pages/log/logs',
    config: {
      navigationBarTitleText: '查看启动日志'
    }
  },

  {
    path: 'components/BaseBlock/index',
    config: {
      usingComponents: {
        'van-icon': '/static/vant/icon/index'
      }
    }
  }
]
