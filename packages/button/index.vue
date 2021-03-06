<!-- buttons -->
<template>
  <div class="panel"
    :class="type"
    @click="buttonClick">
    <button :disabled="disabled?true:false"
      :round="round"
      :size="size">
      <slot></slot>
    </button>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
  name: "HButton",
  props: {
    // 按钮类型
    type: {
      type: String,
      default: "",
      // pink blue borderless bw
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 控制圆角
    round: {
      type: Boolean,
      default: false,
    },
    //尺寸
    size: {
      type: String,
      default: "normal",
    },
  },
  emits: ["click"],
  setup(props) {
    const { proxy } = getCurrentInstance();
    const buttonClick = (el) => {
      if (props.disabled) {
        el.stopPropagation();
        el.preventDefault();
        return;
      }
      proxy.$emit("click");
    };
    return {
      buttonClick,
    };
  },
};
</script>
<style lang='scss' scoped>
body {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAFfKj/FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRF4OXp8PX50NXZBLxR6QAAAEhJREFUeNpiYGJgYGACCCAGMAAIIDiDCSCAGLAAgABCEcbBBAggGIORQhogwNCcwIjddKgQI6ojUbkgWSYMo+BCjKiOR9PLBAAchAAxHFDBbwAAAABJRU5ErkJggg==");
}
* {
  box-sizing: border-box;
}
h1 {
  text-align: center;
  font-family: comfortaa;
  font-weight: 900;
  font-size: 3em;
  color: #fff;
  text-shadow: 0em 0.05em 0 rgba(0, 0, 0, 0.35);
}
button {
  color: #454545;
  background: transparent;
  border-width: 2px;
  border-style: solid;
  border-color: #454545;
  position: relative;
  margin: 0.3em;
  display: inline-block;
  transition: all 0.3s ease-in-out;
  text-align: center;
  font-family: comfortaa;
  font-weight: bold;
  cursor: pointer;
  &[size="normal"] {
    padding: 10px 20px;

    &[round="true"] {
      border-radius: 20px;
    }
  }

  &[size="medium"] {
    padding: 9px 15px;

    &[round="true"] {
      border-radius: 20px;
    }
  }

  &[size="small"] {
    padding: 7px 15px;

    &[round="true"] {
      border-radius: 17px;
    }
  }

  &[size="mini"] {
    padding: 3px 7px;

    &[round="true"] {
      border-radius: 15px;
    }
  }
}
button:before,
button:after {
  content: "";
  display: block;
  position: absolute;
  border-color: #454545;
  box-sizing: border-box;
  border-style: solid;
  width: 1em;
  height: 1em;
  transition: all 0.3s ease-in-out;
}
button:before {
  top: -6px;
  left: -6px;
  border-width: 2px 0 0 2px;
  z-index: 5;
}
button:after {
  bottom: -6px;
  right: -6px;
  border-width: 0 2px 2px 0;
}
button:hover:before,
button:hover:after {
  width: calc(100% + 12px);
  height: calc(100% + 12px);
  border-color: #fff;
}
button:hover {
  color: #353535;
  background-color: #fff;
  border-color: #fff;
}
.panel {
  display: inline-block;
  text-align: center;
  position: relative;
  cursor: pointer;
  /* 设置禁用状态 */
  // &[disabled] {
  //   pointer-events: none;
  // }
  button[disabled] {
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.5;
  }
}

.pink button {
  color: #eb1777;
  border-color: #eb1777;
}
.pink button:before,
.pink button:after {
  border-color: #eb1777;
}
.pink button:hover:before,
.pink button:hover:after {
  border-color: #eb1777;
}
.pink button:hover {
  color: #fff;
  background-color: #eb1777;
  border-color: #eb1777;
}
.pink .panel {
  max-width: 960px;
  text-align: center;
  position: relative;
  margin: auto;
}

.blue button {
  color: #3bb4e5;
  border-color: #3bb4e5;
}
.blue button:before,
.blue button:after {
  border-color: #3bb4e5;
}
.blue button:hover:before,
.blue button:hover:after {
  width: calc(100% + 12px);
  height: calc(100% + 12px);
  border-color: #3bb4e5;
  transform: rotateY(180deg);
}
.blue button:hover {
  color: #3bb4e5;
  background-color: transparent;
  border-color: #3bb4e5;
}
.blue .panel {
  max-width: 960px;
  text-align: center;
  position: relative;
  margin: auto;
}

.borderless button {
  border-color: rgba(0, 0, 0, 0);
  color: #999;
}
.borderless button:hover {
  border-color: #353535;
  background-color: transparent;
  color: #353535;
}
.borderless button:before,
.borderless button:after {
  border-color: transparent;
}
.borderless button:hover:before,
.borderless button:hover:after {
  width: calc(100% + 12px);
  height: calc(100% + 12px);
  border-color: #353535;
}

.bw button {
  color: #fff;
  border-color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1) inset;
}
.bw button:before,
.bw button:after {
  border-color: #fff;
}
.bw button:hover:before,
.bw button:hover:after {
  width: calc(100% + 12px);
  height: calc(100% + 12px);
  border-color: #353535;
}
.bw button:hover {
  color: #fff;
  background-color: #353535;
  border-color: #353535;
}
.blue .panel {
  max-width: 960px;
  text-align: center;
  position: relative;
  margin: auto;
}
</style>