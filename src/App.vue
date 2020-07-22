<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
/* 滚动条设置 */
// 总体宽度
html::-webkit-scrollbar {
  width: 10px;
}
// 轨道
html::-webkit-scrollbar-track {
  background-color: transparent;
}
// 滑块
html::-webkit-scrollbar-thumb {
  border-radius: 10%;
  background-color: rgba(144,147,153,.3);
}
// 总体宽度
.el-textarea__inner::-webkit-scrollbar {
  width: 10px;
}
// 轨道
.el-textarea__inner::-webkit-scrollbar-track {
  background-color: transparent;
}
// 滑块
.el-textarea__inner::-webkit-scrollbar-thumb {
  border-radius: 10%;
  background-color: rgba(144,147,153,.3);
}
html::-webkit-scrollbar {
  width: 10px;
}
// 轨道
html::-webkit-scrollbar-track {
  background-color: transparent;
}
// 滑块
html::-webkit-scrollbar-thumb {
  border-radius: 10%;
  background-color: rgba(144,147,153,.3);
}
/* 样式重置 */
#app {
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
