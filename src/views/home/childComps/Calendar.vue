<template>
  <div class="calendar">
    <div class="calendar-icon">
      <van-icon name="calendar-o" v-if="isIconShow" @click="extendCalendar" />
      <van-icon name="arrow-up" v-else @click="shrinkCalendar" />
      <i class="reset" @click="resetDate"></i>
    </div>
    <van-calendar
      ref="calendar"
      :show-title="false"
      :poppable="false"
      :show-confirm="false"
      :min-date="minDate"
      :max-date="maxDate"
      :style="isExtend"
      :row-height="50"
      :show-mark="false"
      :formatter="formatter"
      @select="changeDate"
    />
  </div>
</template>

<script>
export default {
  name: "Calendar",
  components: {},

  data() {
    return {
      date: "",
      show: true,
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2023, 0, 1),
      isExtend: { height: "100px" },
      isIconShow: true,
    };
  },
  mounted() {
    // 刷新页面时，显示当前日期页面
    const date = new Date();
    this.changeDate(date);

    // 关闭日历
    document.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.shrinkCalendar();
      }
    });
  },
  methods: {
    // 展开关闭日历
    extendCalendar() {
      this.isExtend = { height: "340px" };
      this.isIconShow = false;
    },
    shrinkCalendar() {
      this.isExtend = { height: "100px" };
      this.isIconShow = true;
    },
    // 重置日期
    resetDate() {
      this.$refs.calendar.reset();
      const date = new Date();
      this.changeDate(date);
    },
    // 切换日程
    changeDate(val) {
      this.$store.commit("saveSelectTime", val);
      this.$store.dispatch("selectList");
    },
    // 日期格式
    formatter(day) {
      const calendarDate = day.date.toDateString();
      const now = new Date();

      // 遍历所有待办，筛选出有待办的日期
      this.$store.state.todoList.forEach((item) => {
        if (calendarDate == item.formatTime) {
          day.bottomInfo = "";
          day.className = "todo";
        }
      });

      return day;
    },
  },
};
</script>

<style scoped>
.calendar >>> .van-icon {
  position: absolute;
  top: 49px;
  right: 22px;
  color: white;
  font-size: 22px;
}

.calendar .reset {
  position: absolute;
  top: 49px;
  right: 53px;
  width: 23px;
  height: 23px;
  background: url("@/assets/img/home/reset.svg");
  background-size: 100%;
}
.calendar >>> .van-calendar {
  background-color: var(--color-tint);
  color: white;
}
.calendar >>> .van-calendar__header-subtitle {
  font-size: 30px;
  text-align: left;
  margin-bottom: 12px;
  margin-left: 15px;
}
.calendar >>> .van-calendar__header {
  box-shadow: none;
}

.calendar >>> .van-calendar__weekday {
  color: rgb(219, 219, 253);
}

.calendar >>> .van-calendar__selected-day {
  background-color: #fff;
  border-radius: 50%;
  color: var(--color-tint);
}

::v-deep .todo::before,
::v-deep .done::before {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  content: "";
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fa6861;
}
</style>
