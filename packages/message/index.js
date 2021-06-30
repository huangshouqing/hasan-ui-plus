import { createApp } from 'vue'
import hMessage from './message.vue'
let appList = []
const createMount = (Options) => {
  // 创建
  const app = createApp(hMessage, {
    ...Options
  });
  return app
}
const createParentNode = () => {
  appList.forEach(app => {
    app.unmount()
    app._container.remove()
  })
  appList = []
  const mountNode = document.createElement('div')
  mountNode.setAttribute('class', 'h-message')
  mountNode.setAttribute('data-message', Date.now() + Math.floor(Math.random() * 100))
  document.body.appendChild(mountNode)
}
const msg = (type, options) => {

  // 创建 newMessage 实例
  const app = createMount({
    type: type,
    ...options,
    remove () {
      app.unmount()
      app._container.remove()
    }
  })
  // 创建父节点
  createParentNode(app)
  appList.push(app)
  // 容器挂载
  app.mount('.h-message')
}
// 挂载到vue原型上，暴露四个方法
let $hMessage = function (options) {
  if (!options) return
  msg(options.type, options)
}
$hMessage.info = function (options) {
  if (!options) return
  msg('info', options)
};
$hMessage.success = function (options) {
  if (!options) return
  msg('success', options)
};
$hMessage.error = function (options) {
  if (!options) return
  msg('error', options)
};
$hMessage.warning = function (options) {
  if (!options) return
  msg('warning', options)
};
// 为组件提供 install 安装方法，供按需引入
hMessage.install = function (Vue) {
  // 全局注册
  Vue.component(hMessage.name, hMessage)

  Vue.config.globalProperties.$hMessage = $hMessage
}
hMessage.$hMessage = $hMessage
// 默认导出组件
export default hMessage