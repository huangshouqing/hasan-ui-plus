<template>
  <div>
    <input id="search-box"
      @focus='focus'
      @blur='blur'
      ref='input'
      type="text"
      class="search-box"
      autocomplete="off"
      @keydown.enter="keydown"
      :placeholder="placeholder"
      v-model="myValue" />
    <label for="search-box"><i class="el-icon-search search-icon"></i></label>
    <input type="submit"
      id="search-submit" />
  </div>
</template>

<script>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
  watch,
  ref,
} from "vue";
export default {
  name: "H-input",
  emits: ["search", "update:value", "focus", "blur", "keydown"],
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
  },
  setup(props) {
    const input = ref(null);
    const { proxy } = getCurrentInstance();
    const state = reactive({
      myValue: props.value,
    });
    watch(
      () => props.value,
      (newVal) => {
        state.myValue = newVal;
      }
    );
    watch(
      () => state.myValue,
      (newVal) => {
        proxy.$emit("update:value", newVal);
      }
    );
    onMounted(() => {
      input.value.addEventListener("touchstart", function () {}, true);
    });
    const focus = (el) => {
      proxy.$emit("blur", el);
    };
    const blur = (el) => {
      proxy.$emit("focus", el);
    };
    const keydown = (el) => {
      proxy.$emit("keydown", el);
    };
    return {
      input,
      focus,
      blur,
      keydown,
      ...toRefs(state),
    };
  },
};
</script>
<style lang='scss' scoped>
$tl: 0.6s; // transition length

body {
  margin: 5%;
}

.search-box {
  transition: width $tl, border-radius $tl, background $tl, box-shadow $tl;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background: rgb(235, 235, 235);
  & + label .search-icon {
    color: black;
    font-weight: bold;
    font-size: 20px;
    pointer-events: all;
  }
  &:hover {
    color: white;
    background: rgb(200, 200, 200);
    box-shadow: 0 0 0 5px rgb(61, 71, 82);
    & + label .search-icon {
      color: white;
    }
  }
  &:focus {
    transition: width $tl cubic-bezier(0, 1.22, 0.66, 1.39), border-radius $tl,
      background $tl;
    border: none;
    outline: none;
    box-shadow: none;
    padding-left: 15px;
    cursor: text;
    width: 300px;
    border-radius: auto;
    background: rgb(235, 235, 235);
    color: black;
    & + label .search-icon {
      color: black;
    }
  }
  &:not(:focus) {
    text-indent: -5000px;
  } // for more-graceful falling back (:not browsers likely support indent)
}

#search-submit {
  position: relative;
  left: -5000px;
}

.search-icon {
  position: relative;
  left: -30px;
  color: white;
  cursor: pointer;
}
</style>