/*
page 页面路径，同时是 vue 文件相对于 src 的路径
config 页面配置，即 page.json 的内容
*/

module.exports = [{
  path: '/pages/index/index',
  config: {
    navigationBarTitleText: 'How Long',
    usingComponents: {
      'van-loading': '/static/vant/loading/index',
      'van-transition': '/static/vant/transition/index',
      'van-icon': '/static/vant/icon/index',
      'van-button': '/static/vant/button/index',
      'van-cell': '/static/vant/cell/index',
      'van-cell-group': '/static/vant/cell-group/index',
      'van-popup': '/static/vant/popup/index',
      'van-dialog': '/static/vant/dialog/index',
      'van-field': '/static/vant/field/index',
      'van-stepper': '/static/vant/stepper/index',
      'van-switch': '/static/vant/switch/index',
      'van-notify': '/static/vant/notify/index'
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
  path: 'components/BaseBlock/index'
}
]
