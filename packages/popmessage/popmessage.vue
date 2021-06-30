<!-- 泡泡信息
events:
confirm 默认传boolean值为true
cancel 默认传boolean值为false
 -->
<template>
  <div class="popmessage">
    <hPopover trigger="click"
      ref="popover">
      <template #content>
        <div class="title">
          <slot name="icon">
            <i class="iconfont icon-zhengchang"></i>
          </slot>
          <span style="line-height:20px">
            <slot name="title">内容</slot>
          </span>
        </div>
        <div class="footer">
          <HButton size="mini"
            type='blue'
            @click="handleCancle">取消</HButton>
          <HButton size="mini"
            type='blue'
            @click="handleConfirm">确认</HButton>
        </div>
      </template>
      <!-- 默认插槽 -->
      <slot></slot>
    </hPopover>
  </div>
</template>

<script>
import hPopover from "../popover/popover.vue";
import HButton from "../buttons/index.vue";
export default {
  name: "hPopmessage",
  components: { hPopover, HButton },
  methods: {
    //点击确认
    handleConfirm() {
      this.$emit("confirm", true);
      this.close();
    },
    // 点击取消
    handleCancle() {
      this.$emit("cancel", false);
      this.close();
    },
    // 关闭popover
    close() {
      this.$refs.popover.close();
    },
  },
};
</script>
<style lang='scss' scoped>
.popmessage {
  display: inline-block;
  vertical-align: top;
}

.gulu-popover-content-wrapper {
  .title {
    font-size: 12px;
    max-width: 150px;

    .icon-zhengchang {
      height: 100%;
      font-size: 12px;
      color: #faad14;
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
  }
}

.button >>> .btn-normal,
.button >>> .btn-Hollow {
  font-size: 8px;
}
</style>