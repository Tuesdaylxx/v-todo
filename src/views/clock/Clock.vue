<template>
  <div class="clock">
    <h2>番茄时钟</h2>
    <!-- 环形进度条 -->
    <van-circle
      v-model="currentRate"
      size="210px"
      :rate="rate"
      :speed="100"
      :stroke-width="20"
      layer-color="rgba(255,255,255,.7)"
      :color="$store.state.theme.color"
      fill="rgba(255,255,255,.5)"
    />
    <div class="circle-fill"></div>
    <van-cell @click="showPopup">
      <!-- 倒计时 -->
      <van-count-down
        ref="countDown"
        :time="time"
        format="mm:ss"
        :auto-start="false"
        @finish="finish"
        @change="changeTime"
      />
    </van-cell>
    <!-- 自定义时间 -->
    <van-popup v-model="show"
      ><van-picker
        title="分钟"
        show-toolbar
        :columns="getColumns"
        @confirm="onConfirm"
        @cancel="onCancel"
        :default-index="25"
        :item-height="40"
        :visible-item-count="3"
    /></van-popup>
    <!-- 手动控制 -->
    <van-grid clickable class="control">
      <van-grid-item text="开始" icon="play-circle-o" @click="start" />
      <van-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
      <van-grid-item text="重置" icon="replay" @click="reset" />
    </van-grid>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Clock",
  components: {},
  data() {
    return {
      currentRate: 0,
      time: 25 * 60 * 1000,
      show: false,
      columns: [],
      rate: 0,
    };
  },
  computed: {
    getColumns() {
      for (let i = 0; i < 60; i++) {
        this.columns.push(i + 1);
      }
      return this.columns;
    },
  },
  methods: {
    //  自定义时间弹出层
    showPopup() {
      this.show = true;
    },
    changeTime(val) {
      // 当前总毫秒/设定总毫秒*100%=rate
      let totalMs =
        val.minutes * 60 * 1000 + val.seconds * 1000 + val.milliseconds;
      this.rate = ((totalMs / this.time) * 100).toFixed(2);
    },
    // 自定义时间
    onConfirm(value, index) {
      this.show = false;
      this.time = value * 60 * 1000;
    },

    onCancel() {
      this.show = false;
    },
    // 手动控制
    start() {
      this.$refs.countDown.start();
    },
    pause() {
      this.$refs.countDown.pause();
    },
    reset() {
      this.$refs.countDown.reset();
      this.rate = 0;
    },
    finish() {
      Toast("倒计时结束");
      // 将专注时间和日期存入store
      const time = this.time / 60 / 60 / 1000;
      this.$store.commit("getCountDown", time);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 20px;
  color: #000;
  font-weight: normal;
  font-size: 20px;
}
::v-deep .van-circle {
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
}

.circle-fill {
  position: absolute;
  top: 185px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  background-color: #fff;
  border-radius: 50%;
}
::v-deep .van-cell {
  background-color: transparent;
  padding: 0;
}
::v-deep .van-count-down {
  position: fixed;
  top: 220px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 50px;
  line-height: 50px;
  color: #666;
}
::v-deep .van-popup {
  width: 273px;
  height: 163px;
  border-radius: 20px;
}
::v-deep .van-picker__columns {
  height: 163px;
}
::v-deep .van-grid {
  margin-top: 200px;
  justify-content: center;
}
::v-deep .van-grid-item__content {
  background-color: transparent;
}
::v-deep .control .van-icon {
  color: var(--color-tint);
}
</style>
