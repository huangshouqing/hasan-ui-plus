import hNotice from './notice.vue'
import { createApp } from 'vue'
let appList = []
const createMount = (options) => {
  // 创建
  const app = createApp(hNotice, {
    theme: options.theme,
    type: options.type,
    message: options.message,
    autoclose: options.autoclose,
    duration: options.duration,
    buttonClose: {
      buttonText: (options.buttonClose && options.buttonClose.buttonText) ? options.buttonClose.buttonText : '',
      isShow: (options.buttonClose && options.buttonClose.isShow) ? options.buttonClose.isShow : false,
    },
    onClose: options.onClose
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
function msg (type, options) {

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
  app.mount('.h-notice')
}
let $hNotice = function (options) {
  if (!options) return
  msg(options.type, options)
}
$hNotice.info = function (options) {
  if (!options) return
  msg('info', options)
};
$hNotice.success = function (options) {
  if (!options) return
  msg('success', options)
};
$hNotice.error = function (options) {
  if (!options) return
  msg('error', options)
};
$hNotice.warning = function (options) {
  if (!options) return
  msg('warning', options)
};

hNotice.install = function (Vue) {
  // 全局注册
  Vue.component(hNotice.name, hNotice)

  Vue.config.globalProperties.$hNotice = $hNotice
}
export default hNotice