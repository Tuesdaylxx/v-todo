<template>
  <div id="app">
    <router-view />

    <!-- tabbar模块-路由分配 -->
    <main-tab-bar></main-tab-bar>
    <!-- 新建待办 -->
    <new-button></new-button>
  </div>
</template>

<script>
import MainTabBar from "@/components/mainTabbar/MainTabBar.vue";
import NewButton from "@/views/newButton/newButton.vue";

export default {
  name: "App",
  components: {
    MainTabBar,
    NewButton,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
