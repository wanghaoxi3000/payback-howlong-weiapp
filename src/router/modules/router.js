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
      'van-notify': '/static/vant/notify/index'
    }
  }
},
{
  path: 'pages/cardform/index',
  config: {
    navigationBarTitleText: '管理',
    usingComponents: {
      'van-cell-group': '/static/vant/cell-group/index',
      'van-cell': '/static/vant/cell/index',
      'van-field': '/static/vant/field/index',
      'van-switch-cell': '/static/vant/switch-cell/index',
      'van-button': '/static/vant/button/index',
      'van-notify': '/static/vant/notify/index'
    }
  }
},

{
  path: 'pages/counter'
},
{
  path: 'pages/log/logs',
  config: {
    navigationBarTitleText: '查看启动日志'
  }
},

// 公共组件
{
  path: 'components/BaseBlock/index'
}
]
