<!--  -->
<template>
  <div class="menu-toggle">
    <a href="#menu"
      id="toggle"><span></span></a>
    <div id="menu">
      <ul>
        <li v-for='(item,index) in menu'
          :key="index">
          <router-link tag="a"
            :to="item.value"
            v-if="item.type==='router'">{{item.label}}</router-link>
          <a @click='handlerClick'
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
    function hasClass(elem, className) {
      return new RegExp(" " + className + " ").test(" " + elem.className + " ");
    }
    function toggleClass(elem, className) {
      var newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
      if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0) {
          newClass = newClass.replace(" " + className + " ", " ");
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, "");
      } else {
        elem.className += " " + className;
      }
    }
    onMounted(() => {
      var theToggle = document.getElementById("toggle");
      theToggle.onclick = function () {
        toggleClass(this, "on");
        return false;
      };
    });
    const handlerClick = () => {
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
    return {
      handlerClick,
    };
  },
};
</script>
<style lang='scss' scoped>
.menu-toggle {
}
/* Important styles */
#toggle {
  display: block;
  width: 20px;
  height: 60px;
  line-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

#toggle span:after,
#toggle span:before {
  content: "";
  position: absolute;
  left: 0;
  top: -9px;
}
#toggle span:after {
  top: 9px;
}
#toggle span {
  position: relative;
  display: block;
}

#toggle span,
#toggle span:after,
#toggle span:before {
  width: 100%;
  height: 2px;
  background-color: #888;
  transition: all 0.3s;
  backface-visibility: hidden;
  border-radius: 2px;
}

/* on activation */
#toggle.on span {
  background-color: transparent;
}
#toggle.on span:before {
  transform: rotate(45deg) translate(5px, 5px);
}
#toggle.on span:after {
  transform: rotate(-45deg) translate(7px, -8px);
}
#toggle.on + #menu {
  opacity: 1;
  visibility: visible;
}

/* menu appearance*/
#menu {
  position: absolute;
  right: 10px;
  color: #999;
  width: 200px;
  padding: 10px;
  font-family: "Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans",
    "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif;
  text-align: center;
  border-radius: 4px;
  background: white;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
  /* just for this demo */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s;
  z-index: 1;
}
#menu:after {
  position: absolute;
  top: -15px;
  right: 15px;
  content: "";
  display: block;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid white;
}
ul,
li,
li a {
  list-style: none;
  display: block;
  margin: 0;
  padding: 0;
  &.router-link-active {
    background: #000;
    color: #fff;
    font-weight: bold;
  }
}
li a {
  padding: 10px;
  color: #888;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  font-weight: bold;
}
li a:hover,
li a:focus {
  background: #000;
  color: #fff;
  font-weight: bold;
}

/* demo styles */
body {
  margin-top: 3em;
  background: #eee;
  color: #555;
  font-family: "Open Sans", "Segoe UI", Helvetica, Arial, sans-serif;
}
p,
p a {
  font-size: 12px;
  text-align: center;
  color: #888;
}
</style>