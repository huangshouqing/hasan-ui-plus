<template>
  <div>

    <hButton @click='test'
      size='mini'>button</hButton>

    <hIcon name="add"
      size="32"></hIcon>
    <h-table :data="tableData"
      algin="right">
      <template v-slot="{ item }">
        <h-table-column label="真实姓名">{{item.name}}</h-table-column>
        <h-table-column label="出生日期">{{item.date}}</h-table-column>
        <h-table-column label="地址">
          <hButton size="mini">编辑</hButton>
          <h-popMessage>
            <template #title>确定要删除吗？删除后无法恢复</template>
            <hButton size="mini">删除</hButton>
          </h-popMessage>
        </h-table-column>
      </template>
    </h-table>
    <hPagination background
      :total="1000"
      :page-size="20"
      :page-count="11"></hPagination>
  </div>
</template>

<script>
import hButton from "../packages/button";
import hIcon from "../packages/icon/index.vue";
import hTable from "../packages/table";
import hTableColumn from "../packages/table-column";
import hPopMessage from "../packages/popmessage";
import hPagination from "../packages/pagination";
export default {
  name: "App",
  components: {
    hButton,
    hIcon,
    hTable,
    hTableColumn,
    hPopMessage,
    hPagination,
  },
  data() {
    return {
      value: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  methods: {
    test() {
      this.$hMessage({
        type: "success",
        theme: "plain",
        message: "这是一个警告",
        duration: 30000,
      });
      this.$hNotice({
        type: "warning",
        theme: "plain",
        message:
          "和开发者交流问题的细节关注并接收问题和回答的更新提醒参与内容的编辑和改进，让解决方法与时俱进",
        duration: 3000,
        autoclose: false,
        buttonClose: {
          buttonText: "关闭",
          isShow: true,
        },
      });
    },
  },
};
</script>

<style lang='scss'>
</style>
