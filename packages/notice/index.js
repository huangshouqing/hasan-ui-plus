import hNotice from './notice.vue'
import { createApp } from 'vue'
let appList = []
const createMount = (options, callBack) => {
  // 创建
  const app = createApp(hNotice, {
    type: options.type,
    message: options.message,
    autoclose: options.autoclose,
    duration: options.duration,
    buttonClose: {
      buttonText: options.buttonClose.buttonText,
      isShow: options.buttonClose.isShow,
      callback: callBack
    }
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
  mountNode.setAttribute('class', 'h-notice')
  mountNode.setAttribute('data-notice', Date.now() + Math.floor(Math.random() * 100))
  document.body.appendChild(mountNode)
}
function msg (type, options, callBack) {
  // 创建父节点
  createParentNode(app)
  // 创建 newMessage 实例
  const app = createMount({
    type: type,
    ...options,
    remove () {
      app.unmount()
      app._container.remove()
    }
  }, callBack)
  appList.push(app)
  // 容器挂载
  app.mount('.h-notice')
}
let $hNotice = function (options, callBack) {
  if (!options) return
  msg(options.type, options, callBack)
}
$hNotice.info = function (options, callBack) {
  if (!options) return
  msg('info', options, callBack)
};
$hNotice.success = function (options, callBack) {
  if (!options) return
  msg('success', options, callBack)
};
$hNotice.error = function (options, callBack) {
  if (!options) return
  msg('error', options, callBack)
};
$hNotice.warning = function (options, callBack) {
  if (!options) return
  msg('warning', options, callBack)
};

hNotice.install = function (Vue) {
  // 全局注册
  Vue.component(hNotice.name, hNotice)

  Vue.config.globalProperties.$hNotice = $hNotice
}
export default hNotice