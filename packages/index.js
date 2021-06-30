const packVersion = '0.0.1-alpha.2'
const r = ['color: #fff', 'border-top-left-radius:3px', 'border-bottom-left-radius:3px', 'background-color: #564b4f', 'padding: 5px'].join(';');
const i = ['color: #fff', 'border-top-right-radius:3px', 'border-bottom-right-radius:3px', 'background-color: #4fc08d', 'padding: 5px'].join(';');
console.log('%chasan-ui-plus-Version %c'.concat(packVersion), r, i);
import './static/style/common.scss'
import hButton from "./button/index.js";
import hMessage from "./message/index.js";
import hNotice from "./notice/index.js";
import hPopmessage from './popmessage/index.js'
import hPopover from './popover/index.js'
import hTable from './table/index.js'
import hIcon from './icon/index.js'
const components = { hButton, hMessage, hNotice, hPopmessage, hPopover, hTable, hIcon };
const install = function (Vue) {
  if (install.installed) return;
  Object.keys(components).forEach(index => {
    Vue.use(components[index])
  });
};
export {
  hButton, hMessage, hNotice, hPopmessage, hPopover, hTable, hIcon
}
export default {
  install,
  ...components,
};