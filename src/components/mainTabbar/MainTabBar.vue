<template>
  <div class="tab-bar">
    <van-tabbar v-model="active">
      <van-tabbar-item @click="linkToHome" icon="home-o"></van-tabbar-item>
      <van-tabbar-item @click="linkToClock" icon="clock-o"></van-tabbar-item>
      <van-tabbar-item> </van-tabbar-item>
      <van-tabbar-item
        @click="linkToStatistics"
        icon="bar-chart-o"
      ></van-tabbar-item>
      <van-tabbar-item
        @click="linkToProfile"
        icon="user-circle-o"
      ></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "MainTabBar",
  components: {},
  data() {
    return {
      active: 0,
      path: "",
    };
  },
  methods: {
    linkToHome() {
      this.$router.replace("/home");
    },
    linkToClock() {
      this.$router.replace("/clock");
    },
    linkToStatistics() {
      this.$router.replace("/statistics");
      this.$bus.$emit("refreshYesterday");
      this.$bus.$emit("showChart");
    },
    linkToProfile() {
      this.$router.replace("/profile");
    },
  },
};
</script>

<style scoped>
.tab-bar >>> .van-tabbar {
  height: 55px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.tab-bar >>> .van-icon {
  color: rgb(203, 203, 203);
}
.tab-bar >>> .van-tabbar-item--active .van-icon {
  color: var(--color-tint);
}
</style>
