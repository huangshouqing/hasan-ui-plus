<!--message  
使用方式
在组件中通过$vm.$message.[type](options)使用
属性：
type：类型
options{
message：提示文本，
duration：停留时长
},
-->

<template>
  <div ref="root">
    <transition appear
      appear-class="fade-enter"
      appear-to-class="fade-enter-to"
      appear-active-class="fade-enter-active"
      name="animate">
      <div class="message"
        :theme='theme'
        :class="type"
        v-if="data.show"
        :type="type">
        <hIcon v-if="type==='success'"
          name='check'
          size='16'></hIcon>
        <hIcon v-if="type==='warning'"
          name='warning'
          size='16'></hIcon>
        <hIcon v-if="type==='error'"
          name='error'
          size='16'></hIcon>
        <hIcon v-if="type==='info'"
          name='info'
          size='16'></hIcon>
        <span class="text">{{message}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import hIcon from "../icon/index.vue";
import { onMounted, ref, reactive } from "vue";
export default {
  name: "HMessage",
  components: {
    hIcon,
  },
  props: {
    theme: {
      type: String,
      default: "plain", // colour
    },
    //类型
    type: {
      type: String,
      default: "info",
      validator: (val) => ["info", "success", "warning", "error"].includes(val),
      //['info', 'success', 'warning', 'error'] 表示type只接收这四个字符串作为参数传入message组件
    },
    //提示文本
    message: {
      type: String,
      default: "",
    },
    //停留时长
    duration: {
      type: Number,
      default: 2000,
      //停留时长
    },
    remove: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },
  setup(props) {
    // eslint-disable-next-line no-unused-vars
    let timer = ref(null);
    const root = ref(null);
    const data = reactive({
      show: true,
    });
    //执行自动关闭
    const handleAutoClose = () => {
      timer = setTimeout(() => {
        close();
      }, props.duration);
    };

    // 关闭
    const close = () => {
      data.show = false;
      root.value && props.remove();
      clearTimeout(timer);
    };

    onMounted(() => {
      handleAutoClose();
    });

    return {
      root,
      data,
    };
  },
};
</script>

<style scoped lang='scss' >
.fade-enter-active {
  transition: all 0.2s ease;
  animation: fade-in-out 0.2s ease;
}

.fade-leave-active {
  transition: all 0.2s;
  animation: fade-in-out 0.2s reverse;
}

.animate-leave-active {
  opacity: 0;
  transition: all 0.2s;
  animation: fade-in-out 0.2s reverse;
}

// fade-in-out动画
@keyframes fade-in-out {
  0% {
    transform: translateY(-40px) translateX(-50%);
  }

  100% {
    transform: translateY(0px) translateX(-50%);
  }
}

.message {
  position: fixed;
  top: 20px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  min-width: 100px;
  padding: 10px 10px;
  &[theme="colour"] {
    background: #edf2fc;
    border: none;
    &[type="primary"] {
      background-color: #fdf6ec;
      // color: #e6a23c;
      color: $primary-color;
    }

    &[type="warning"] {
      background-color: #fdf6ec;
      // color: #e6a23c;
      color: $warn-color;
    }

    &[type="error"] {
      background-color: #fef0f0;
      // color: #f56c6c;
      color: $error-color;
    }

    &[type="success"] {
      background-color: #f0f9eb;
      // color: #67c23a;
      color: $success-color;
    }

    &[type="info"] {
      background-color: #edf2fc;
      // color: #909399;
      color: $disabled-color;
    }
  }
  background: #fff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 2px;
  z-index: 10000;
  display: flex;
  border: 2px solid #000;
  align-items: center;
  .icon {
    margin-right: 5px;
  }
}
</style>