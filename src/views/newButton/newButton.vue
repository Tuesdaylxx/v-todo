<template>
  <div class="new-button">
    <!-- 新建按钮 -->
    <van-cell @click="showPopup">
      <van-icon name="plus" />
    </van-cell>
    <div class="bg-button"></div>
    <!-- 新建文本框 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '75%' }">
      <new-list />
    </van-popup>
  </div>
</template>

<script>
import NewList from "./childComps/NewList.vue";
export default {
  name: "newButton",
  components: { NewList },
  data() {
    return {
      // 弹出层特效
      show: false,
    };
  },
  mounted() {
    // 添加完内容关闭弹窗
    this.$bus.$on("showPopup", () => {
      this.show = false;
    });
    // 编辑页面时打开弹窗
    this.$bus.$on("goEdit", (index) => {
      this.show = true;
    });
  },
  methods: {
    // 弹出层
    showPopup() {
      this.show = true;
      // 初始化弹窗
      this.$bus.$emit("initPopup");
    },
  },
};
</script>

<style scoped>
.bg-button,
.new-button >>> .van-cell {
  position: fixed;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  border-radius: 50%;
}

.new-button >>> .van-cell {
  width: 45px;
  height: 45px;
  margin-bottom: 40px;
  padding: 0;
  background-color: var(--color-tint-orange);
  font-size: 18px;
  z-index: 99;
  box-shadow: 0px 4px 5px 0px rgb(100 100 100 / 38%);
}
.new-button >>> .van-cell .van-icon {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  color: rgb(255, 255, 255);
  line-height: 45px;
  text-align: center;
  z-index: 999;
}
.bg-button {
  z-index: 9;
  width: 80px;
  height: 40px;
  background-color: var(--color-background);
  margin-bottom: 25px;
  border-radius: 0 0 50px 50px;
}
.new-button >>> .van-popup {
  padding: 10px 20px 10px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
}
</style>
