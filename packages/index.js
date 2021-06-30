const packVersion = '0.0.1-alpha.7'
const r = ['color: #fff', 'border-top-left-radius:3px', 'border-bottom-left-radius:3px', 'background-color: #564b4f', 'padding: 5px'].join(';');
const i = ['color: #fff', 'border-top-right-radius:3px', 'border-bottom-right-radius:3px', 'background-color: #4fc08d', 'padding: 5px'].join(';');
console.log('%chasan-ui-plus-Version %c'.concat(packVersion), r, i);
import './static/style/common.scss'
import HButton from "./button/index.js";
import HSearch from './search/index.js'
import hHMessage from "./message/index.js";
import HNotice from "./notice/index.js";
import HPopmessage from './popmessage/index.js'
import HPopover from './popover/index.js'
import HTable from './table/index.js'
import HTableColumn from './table-column/index.js'
import HIcon from './icon/index.js'
const components = { HButton, HSearch, hHMessage, HNotice, HPopmessage, HPopover, HTable, HTableColumn, HIcon };
const install = function (Vue) {
  if (install.installed) return;
  Object.keys(components).forEach(index => {
    Vue.use(components[index])
  });
};
export {
  HButton, HSearch, hHMessage, HNotice, HPopmessage, HPopover, HTable, HTableColumn, HIcon
}
export default {
  install,
  ...components,
};