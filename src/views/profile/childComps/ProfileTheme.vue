<template>
  <div class="theme">
    <h3 class="theme-title">主题颜色</h3>
    <van-icon
      name="success"
      :style="{ left: `${$store.state.theme.selectTheme}px` }"
    />
    <div class="theme-color">
      <div
        class="theme-color-item"
        v-for="(item, index) in themeColor"
        :key="index"
        @click="changeTheme(index)"
      >
        <div class="color" :style="{ background: item.color }"></div>
        <p>{{ item.label }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileTheme",
  components: {},
  data() {
    return {
      themeColor: [
        {
          color: "#bd8fdd",
          label: "紫色",
          bg: "url(" + require("@/assets/img/profile/purple.jpg") + ")",
          bgSmall: require("@/assets/img/profile/purple-small.jpg"),
          emptyImg: require("@/assets/img/home/empty-purple.svg"),
          selectTheme: 46,
        },
        {
          color: "#1dba95",
          label: "绿色",
          bg: "url(" + require("@/assets/img/profile/green.jpg") + ")",
          bgSmall: require("@/assets/img/profile/green-small.jpg"),
          emptyImg: require("@/assets/img/home/empty-green.svg"),
          selectTheme: 101,
        },
        {
          color: "#ef918f",
          label: "粉色",
          bg: "url(" + require("@/assets/img/profile/pink.jpg") + ")",
          bgSmall: require("@/assets/img/profile/pink-small.jpg"),
          emptyImg: require("@/assets/img/home/empty-pink.svg"),
          selectTheme: 156,
        },
        {
          color: "#4d90b2",
          label: "蓝色",
          bg: "url(" + require("@/assets/img/profile/blue.jpg") + ")",
          bgSmall: require("@/assets/img/profile/blue-small.jpg"),
          emptyImg: require("@/assets/img/home/empty-blue.svg"),
          selectTheme: 211,
        },
        {
          color: "#fca253",
          label: "橘色",
          bg: "url(" + require("@/assets/img/profile/orange.jpg") + ")",
          bgSmall: require("@/assets/img/profile/orange-small.jpg"),
          emptyImg: require("@/assets/img/home/empty-orange.svg"),
          selectTheme: 266,
        },
      ],
    };
  },
  methods: {
    // 切换主题
    changeTheme(index) {
      // 把当前主题提交到store
      const theme = {};
      theme.color = this.themeColor[index].color;
      theme.bg = this.themeColor[index].bg;
      theme.bgSmall = this.themeColor[index].bgSmall;
      theme.emptyImg = this.themeColor[index].emptyImg;
      theme.selectTheme = this.themeColor[index].selectTheme;

      this.$store.commit("changeTheme", theme);

      // 修改:root中--color-tint颜色
      document.documentElement.style.setProperty(
        "--color-tint",
        this.$store.state.theme.color
      );
      // 修改图表中颜色
      this.$bus.$emit("changeChartTheme", index);
    },
  },
};
</script>

<style scoped>
.theme {
  position: relative;
  width: 330px;
  height: 200px;
  margin: 50px auto;
  padding: 25px 20px;
  background: rgba(64, 64, 64, 0.55);
  border-radius: 20px;
}
h3 {
  font-weight: 400;
  color: rgb(255, 255, 255);
}
.theme-color {
  display: flex;
  justify-content: space-evenly;
  padding: 20px 0;
}
.theme-color-item .color {
  width: 40px;
  height: 90px;
  border-radius: 20px;
  border: 1px solid #fff;
}
.theme-color-item p {
  color: #ccc;
  font-size: 10px;
  text-align: center;
  margin-top: 8px;
}

.theme >>> .van-icon {
  position: absolute;
  top: 125px;
  color: white;
}
</style>
