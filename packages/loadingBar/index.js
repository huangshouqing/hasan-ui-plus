class LoadingBar {
  constructor() {
    this.loading = null;
    /*记录当前宽度*/
    this.width = 0;
    /*页面里LoadingBar div*/
    this.oLoadDiv = false;
  }
  /*初始化*/
  init () {
    this.over()
    this.creatStyle();
    this.creatLoadDiv();
  }
  /*创建style*/
  creatStyle () {
    var nod = document.createElement("style"),
      str =
        "#LoadingBar{transition:all 1s;-moz-transition:all 1s;-webkit-transition:all 1s;-o-transition:all 1s;background-color:#f90;height: 3px;width:0; position: fixed;top: 0;z-index: 99999;left: 0;font-size: 0;z-index:9999999;_position:absolute;_top:expression(eval(document.documentElement.scrollTop));}.animation_paused{-webkit-animation-play-state:paused;-moz-animation-play-state:paused;-ms-animation-play-state:paused;animation-play-state:paused;};";
    nod.type = "text/css";
    //ie下
    nod.styleSheet ? (nod.styleSheet.cssText = str) : (nod.innerHTML = str);
    document.getElementsByTagName("head")[0].appendChild(nod);
  }
  /*创建load条*/
  creatLoadDiv () {
    var div = document.createElement("div");
    div.id = "LoadingBar";
    document.body.appendChild(div);
    this.oLoadDiv = document.getElementById("LoadingBar");
  }
  /*页面加载完毕*/
  over () {
    this.oLoadDiv && this.oLoadDiv.remove()
    this.loading && clearInterval(this.loading);
    this.loading = null
  }
  /*开始*/
  setWidth (w) {
    var oLoadDiv = this.oLoadDiv,
      width = Number(w) || 100;
    /*防止后面写入的width小于前面写入的width*/
    width < this.width ? (width = this.width) : (this.width = width);
    oLoadDiv.className = "animation_paused";
    oLoadDiv.style.width = width + "%";
    oLoadDiv.className = "";

    if (width === 100) {
      this.over();
    }
  }
  loadingStart () {
    this.init()
    let flag = 1;
    this.loading && clearInterval(this.loading);
    this.loading = setInterval(() => {
      flag++;
      if (flag > 99) {
        return
      }
      this.setWidth(flag);
    }, 100);
  }
  lodingEnd () {
    this.setWidth(100);
    setTimeout(() => {
      this.over()
    }, 1000);
  }
}
export default LoadingBar