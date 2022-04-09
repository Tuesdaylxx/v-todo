<template>
  <div class="statistics">
    <h2>数据统计</h2>
    <!-- 昨日数据 -->
    <div class="yesterday">
      <div class="dayDone">
        <div class="top-info">昨日完成待办</div>
        <div class="count">
          <span>{{ yesterdayDone }}</span>
          项
        </div>
      </div>
      <div class="dayRate">
        <div class="top-info">昨日完成率</div>
        <div class="count">
          <span>{{ yesterdayRate }}</span> %
        </div>
      </div>
    </div>

    <!-- 本周数据 -->
    <div class="week">
      <h4>一周事件统计</h4>
      <p>
        本周共完成 <span> {{ weekDone != 0 ? weekDone : 25 }} </span> 项事项
      </p>
      <chart class="chart"></chart>
    </div>
    <!-- 累计数据 -->
    <div class="total">
      <div class="totalDone">
        <div class="count">
          <span>{{ totalDone }}</span
          >项
        </div>
        <div class="bottom-info">累计完成待办</div>
      </div>
      <div class="totalTime">
        <div class="count">
          <span>{{ totalRate }}</span
          >%
        </div>
        <div class="bottom-info">累计完成率</div>
      </div>
      <div class="totalTime">
        <div class="count">
          <span>{{ countDown }}</span
          >h
        </div>
        <div class="bottom-info">累计专注时常</div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "./childComps/Chart.vue";

import { refreshYesterday } from "@/common/utils";

export default {
  name: "Statistics",
  data() {
    return {
      weekDone: 0,
    };
  },
  components: { Chart },
  watch: {
    isChange() {
      let yesterdayList = refreshYesterday(this.$store.state.todoList);
      this.$store.commit("getYesterdayList", yesterdayList);
    },
  },
  mounted() {
    this.$bus.$on("getWeekDone", (weekDone) => {
      this.weekDone = weekDone.reduce((prevValue, n) => {
        return prevValue + n;
      });
      console.log(this.weekDone);
    });
  },
  computed: {
    isChange() {
      return this.$store.state.todoList;
    },
    yesterdayDone() {
      return this.$store.getters.totalDone != 0
        ? this.$store.getters.yesterdayDone
        : 8;
    },
    yesterdayRate() {
      return this.$store.getters.totalRate != 0
        ? this.$store.getters.yesterdayRate
        : 65;
    },
    totalDone() {
      return this.$store.getters.totalDone != 0
        ? this.$store.getters.totalDone
        : 126;
    },
    totalRate() {
      return this.$store.getters.totalRate != 0
        ? this.$store.getters.totalRate
        : 85;
    },
    countDown() {
      return this.$store.state.countDown.toFixed(1) != 0
        ? this.$store.state.countDown.toFixed(1)
        : 75;
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

.yesterday {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 20px;
}
.yesterday > div {
  display: flex;
  flex-direction: column;
  width: 48%;
  padding: 15px;
  border-radius: 18px;
}
.dayDone {
  background-color: rgb(255, 234, 218);
}
.dayRate {
  background-color: rgb(222, 222, 255);
}
.yesterday .count span {
  font-size: 32px;
  color: rgb(29, 29, 29);
}
.yesterday .top-info {
  margin-bottom: 15px;
}
.week {
  height: 320px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  border-radius: 18px;
  padding: 10px 0;
  margin: 0 20px;
}
.week h4 {
  font-weight: normal;
  margin: 15px 15px 10px;
}

.week p {
  margin-left: 15px;
  color: #ccc;
  font-size: 12px;
}
.week p span {
  font-size: 24px;
  color: var(--color-tint);
}
.week .chart {
  margin: 0 auto;
}
.total {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 15px 0;
  margin: 15px 20px;
  font-size: 12px;
  color: rgb(166, 166, 166);
  border-radius: 18px;
  background-color: rgb(246, 255, 247);
}

.total > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.total .count span {
  display: inline-block;
  margin: 5px;
  color: var(--color-tint);
  font-size: 24px;
}
.chart {
  margin: 0 20px;
}
</style>
