import TableColumn from './index.vue'
TableColumn.install = function (Vue) {
  Vue.component(TableColumn.name, TableColumn)
}
export default TableColumn