<template>
  <i class="icon material-icons"
    :style="iconSize"
    v-bind="$attrs">{{ name }}</i>
</template>

<script>
import "material-design-icons/iconfont/material-icons.css";
import "../static/fonts/iconfont.scss";

export default {
  props: {
    name: { type: String, default: "" },
    size: { type: [String, Number], default: 14 },
  },
  computed: {
    iconSize() {
      const { size } = this;

      return {
        fontSize: `${size}px`,
      };
    },
  },
};
</script>
<style lang="scss">
.icon {
  user-select: none;
  vertical-align: middle;
}
</style>
