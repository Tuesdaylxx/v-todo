<template>
  <div class="profile">
    <!-- 背景图 -->
    <div class="bg-wrap">
      <div class="bg" :style="{ backgroundImage: $store.state.theme.bg }"></div>
      <div class="mask"></div>
    </div>
    <!-- 头像 -->
    <div class="title">
      <img :src="$store.state.theme.bgSmall" alt="" />
      <h3>todoList</h3>
    </div>
    <!-- 主题切换 -->
    <profile-theme></profile-theme>
  </div>
</template>

<script>
import ProfileTheme from "./childComps/ProfileTheme.vue";
export default {
  name: "Profile",
  components: { ProfileTheme },
};
</script>

<style scoped>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -999;
}
.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -1;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title img {
  width: 80px;
  height: 80px;
  margin-top: 130px;
  border-radius: 50%;
  border: 2px solid #fff;
}
.title h3 {
  color: white;
  margin-top: 10px;
}
</style>
