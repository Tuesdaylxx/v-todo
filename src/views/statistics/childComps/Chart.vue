<template>
  <div class="chart">
    <line-chart id="myChart" :xAxisData="xAxisData" :seriesData="seriesData" />
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";

export default {
  name: "Chart",
  components: { LineChart },
  data() {
    return {
      active: 0,
      xAxisData: [],
      seriesData: [3, 4, 3, 6, 4, 6, 5],
    };
  },
  mounted() {
    //获取最近七天的时间
    function getBeforeDate(n) {
      let d = new Date();
      let year = d.getFullYear();
      let mon = d.getMonth() + 1;
      let day = d.getDate();
      if (day <= n) {
        if (mon > 1) {
          mon = mon - 1;
        } else {
          year = year - 1;
          mon = 12;
        }
      }
      d.setDate(d.getDate() + n); //很重要，+n取得是前一天的时间
      year = d.getFullYear();
      mon = d.getMonth() + 1;
      day = d.getDate();
      return { year, mon, day };
    }
    for (var i = 0; i > -7; i--) {
      let { year, mon, day } = getBeforeDate(i);
      // 将日期传入数据
      let date = mon + "/" + day;
      this.xAxisData.unshift(date);

      // 将完成项数传入数据
      let done = this.$store.state.todoList.filter((item) => {
        let date1 = new Date(item.time);
        let y = date1.getFullYear();
        let m = date1.getMonth() + 1;
        let d = date1.getDate();
        return year == y && mon == m && day == d && item.done == true;
      });

      let number = this.$store.state.todoList.find((item) => {
        return item.done == true;
      });
      if (number) {
        this.seriesData.unshift(done.length);
        this.$bus.$emit("getWeekDone", this.seriesData);
      }
    }
  },
};
</script>

<style scoped>
</style>
