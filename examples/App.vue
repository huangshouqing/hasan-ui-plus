<template>
  <div>

    <hButton @click='test'
      size='mini'>button</hButton>

    <hIcon name="info"
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
  </div>
</template>

<script>
import hButton from "../packages/button";
import hIcon from "../packages/icon/index.vue";
import hTable from "../packages/table";
import hTableColumn from "../packages/table-column";
import hPopMessage from "../packages/popmessage";
export default {
  name: "App",
  components: {
    hButton,
    hIcon,
    hTable,
    hTableColumn,
    hPopMessage,
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
    test() {},
  },
};
</script>

<style lang='scss'>
</style>
