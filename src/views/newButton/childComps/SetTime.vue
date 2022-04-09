<template>
  <div class="set-time">
    <div class="data-title">
      <span>月</span>
      <span>日</span>
      <span>时</span>
      <span>分</span>
    </div>
    <div class="date-time">
      <!-- 选择年月日小时 -->
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        :visible-item-count="3"
        :item-height="30"
        :show-toolbar="false"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SetTime",
  components: {},

  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
    };
  },
  watch: {
    // 监听值的变化，val是当前值
    // 当点击保存时，将此时间传递给父组件，然后父组件再保存到store
    currentDate(val) {
      this.$bus.$emit("getSelectDate", val);
    },
  },
};
</script>

<style scoped>
.data-title {
  margin-left: 60px;
  margin-top: 5px;
}
.data-title span {
  margin-right: 50px;
}
.date-time {
  margin: 0 auto;
  padding: 0 30px;
}
.date-time >>> .van-picker-column:nth-child(1) {
  display: none;
}
.date-time >>> .van-picker-column__item {
  color: rgb(185, 185, 185);
}
.date-time >>> .van-picker-column__item--selected {
  font-size: 25px;
  color: rgb(75, 75, 75);
}
</style>
