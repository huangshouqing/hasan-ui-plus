<!--notice  
使用方式
在组件中通过$vm.$notice.[type](options,callback)使用
属性：
type：类型
options{
 title：标题，
 message：提示文本，
 autoclose：自动关闭
 duration：停留时长
 buttonClose：是否按钮关闭
 onClose:手动关闭会调用该回调
},
-->


<template>
  <transition appear
    appear-class="appear-enter"
    appear-to-class="appear-enter-to"
    appear-active-class="appear-enter-active"
    name="animate">
    <div class="notice"
      :theme="theme"
      v-if="show">
      <span class="icon"
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
      </span>
      <div class="message">
        <p class="title"
          v-if="title">{{title}}</p>
        <div class="content"
          ref="content"
          :overflow="overflow">{{message}}</div>
      </div>
      <span @click="handleClose"
        v-if="buttonClose.isShow"
        class="closeButton">
        <hIcon name='close'
          size='14'></hIcon>
      </span>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import hIcon from "../icon/index.vue";
export default {
  name: "HNotice",
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
    title: {
      type: String,
      default: "通知",
    },
    //提示文本
    message: {
      type: String,
      default: "",
    },
    //自动关闭
    autoclose: {
      type: Boolean,
      default: true,
      //是否自动关闭
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
    //按钮关闭
    buttonClose: {
      type: Object,
      default() {
        return {
          buttonText: "关闭",
          isShow: true,
        };
      },
    },
    // 关闭的回调函数
    onClose: {
      type: Function,
    },
  },
  data() {
    return {
      show: true,
      overflow: false,
    };
  },
  mounted() {
    this.handleAutoClose();
    this.controlHidden();
  },
  methods: {
    //执行自动关闭
    handleAutoClose() {
      if (this.autoclose) {
        setTimeout(() => {
          this.close();
        }, this.duration);
      }
    },
    // 控制三点省略号的显示
    controlHidden() {
      this.$nextTick(() => {
        if (this.$refs.content.scrollHeight > this.$refs.content.offsetHeight) {
          this.overflow = true;
        }
      });
    },
    // 关闭
    close() {
      this.show = false;
      this.remove();
    },
    // 手动关闭
    handleClose() {
      this.close();
      if (this.onClose) {
        this.onClose();
      } else {
        console.warn("如需使用回调，请传入callback");
      }
    },
  },
};
</script>

<style scoped lang='scss' >
.appear-enter-active {
  transition: all 0.2s ease;
}

.appear-enter {
  opacity: 0;
  transform: translateX(100%);
}

.appear-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

.animate-leave-active {
  opacity: 0;
  transition: all 0.2s;
  animation: fade-in-out 0.2s reverse;
}

// fade-in-out动画
@keyframes fade-in-out {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0%);
  }
}

.notice {
  width: 300px;
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  text-align: center;
  padding: 10px 10px;
  background: #fff;
  border-radius: 4px;
  border: 2px solid #000;
  z-index: 10000;

  &[theme="colour"] {
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    .icon {
      &[type="primary"] {
        color: $primary-color;
      }

      &[type="warning"] {
        color: $warn-color;
      }

      &[type="error"] {
        color: $error-color;
      }

      &[type="success"] {
        color: $success-color;
      }

      &[type="info"] {
        color: $disabled-color;
      }
    }
  }

  .message {
    flex: 1;
    // min-height: 80px;
    max-height: 100px;
    text-align: left;
    padding: 0 10px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 14px;
      font-weight: bold;
      line-height: 20px;
    }
    .content {
      flex: 1;
      position: relative;
      line-height: 20px;
      max-height: 60px; // 最大高度为行高的整数倍，此处代表3行文本
      overflow: hidden;
    }

    .content[overflow="true"]::after {
      // 后伪元素
      content: "...";
      position: absolute;
      bottom: 0;
      right: 0;
      padding-left: 40px;
      background: -webkit-linear-gradient(left, transparent, #fff 55%);
      background: -o-linear-gradient(right, transparent, #fff 55%);
      background: -moz-linear-gradient(right, transparent, #fff 55%);
      background: linear-gradient(to right, transparent, #fff 55%);
    }
  }

  .closeButton {
    display: inline-block;
    width: 20px;
    cursor: pointer;
  }
}
</style>