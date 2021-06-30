<!--  -->
<template>
  <div class="menu-icon">
    <span class="menu-icon__line menu-icon__line-left"></span>
    <span class="menu-icon__line"></span>
    <span class="menu-icon__line menu-icon__line-right"></span>
  </div>

  <div class="nav">
    <div class="nav__content">
      <ul class="nav__list">
        <li class="nav__list-item"
          v-for='(item,index) in menu'
          :key="index">
          <router-link tag="a"
            @click='toggle'
            :to="item.value"
            v-if="item.type==='router'">{{item.label}}</router-link>
          <a @click='logOut'
            v-else>{{item.label}}</a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import { onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
export default {
  props: {
    menu: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    let { proxy } = getCurrentInstance();
    const router = useRouter();
    let body;
    // eslint-disable-next-line no-unused-vars
    let menuItems;
    let menu;
    const init = () => {
      body = document.querySelector("body");
      menu = document.querySelector(".menu-icon");
      menuItems = document.querySelectorAll(".nav__list-item");
      applyListeners();
    };
    const applyListeners = () => {
      menu.addEventListener("click", () => toggleClass(body, "nav-active"));
    };
    const toggleClass = (element, stringClass) => {
      if (element.classList.contains(stringClass))
        element.classList.remove(stringClass);
      else element.classList.add(stringClass);
    };
    const logOut = () => {
      proxy
        .$confirm("是否退出系统?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          proxy.$axios.get("api/user/exit").then((res) => {
            res = res.data;
            if (res.code === 0) {
              router.push("/login");
            }
          });
        })
        .catch(() => {
          proxy.$hMessage({
            type: "warning",
            message: "已取消退出",
            duration: 3 * 1000,
          });
        });
    };
    const toggle = () => {
      setTimeout(() => {
        toggleClass(body, "nav-active");
      }, 300);
    };
    onMounted(() => {
      init();
    });
    return {
      toggle,
      logOut,
    };
  },
};
</script>
<style lang='scss' scoped>
$background--color: #1e2023;
$icon--color: #1e2023;
$font--color: #000000;
$font--color--active: #000000;
$font--primary: "Fira Sans", sans-serif;
$transition--length: 0.8;

//default state
.menu-icon {
  $size: 30px;
  height: $size;
  width: $size;
  position: fixed;
  z-index: 2;
  right: 50px;
  top: 30px;
  cursor: pointer;
  &__line {
    height: 2px;
    width: $size;
    display: block;
    background-color: $font--color;
    margin-bottom: 4px;
    transition: transform 0.2s ease, background-color 0.5s ease;
  }
  &__line-left {
    width: $size / 2;
  }
  &__line-right {
    width: $size / 2;
    float: right;
  }
}

.nav {
  visibility: hidden;
  $width: 100vw;
  $height: 100vh;
  $font--size--calc: calc(2vw + 10px);
  $transition--easing: cubic-bezier(0.77, 0, 0.175, 1);
  position: fixed;
  z-index: -1;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  pointer-events: none;
  &:before,
  &:after {
    content: "";
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background: rgba(#eaeaea, 0.2);
    z-index: -1;
    // transition: transform $transition--easing $transition--length + s;
    transform: translateX(0%) translateY(-100%);
  }
  &:after {
    background: rgba(#ffffff, 1);
    transition-delay: 0s;
  }
  &:before {
    transition-delay: 0.1s;
  }
  &__content {
    position: fixed;
    top: 50%;
    transform: translate(0%, -50%);
    width: 100%;
    text-align: center;
    font-size: $font--size--calc;
    font-weight: 200;
    cursor: pointer;
    pointer-events: all;
  }
  &__list-item {
    position: relative;
    display: inline-block;
    transition-delay: $transition--length + s;
    opacity: 0;
    transform: translate(0%, 100%);
    transition: opacity 0.2s ease, transform 0.3s ease;
    margin-right: 25px;
    color: #000;
    &:before {
      content: "";
      position: absolute;
      background: $font--color--active;
      width: 20px;
      height: 1px;
      top: 100%;
      transform: translate(0%, 0%);
      transition: all 0.3s ease;
      z-index: -1;
    }
    &:hover {
      &:before {
        width: 100%;
      }
    }
    a {
      color: #000;
      &.router-link-active {
        background: #000;
        color: #fff;
        font-weight: bold;
      }
    }
  }
}

//active state
body.nav-active {
  $menu--items--count: 4;
  .menu-icon {
    &__line {
      background-color: #000;
      transform: translateX(0px) rotate(-45deg);
    }
    &__line-left {
      transform: translateX(1px) rotate(45deg);
    }
    &__line-right {
      transform: translateX(-2px) rotate(45deg);
    }
  }
  .nav {
    visibility: visible;
    &:before,
    &:after {
      transform: translateX(0%) translateY(0%);
    }
    &:after {
      transition-delay: 0.1s;
    }
    &:before {
      transition-delay: 0s;
    }
    &__list-item {
      opacity: 1;
      transform: translateX(0%);
      transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
      @for $i from 0 through $menu--items--count {
        &:nth-child(#{$i}) {
          transition-delay: $transition--length * $i / 8 + 0.5 + s;
        }
      }
    }
  }
}
</style>