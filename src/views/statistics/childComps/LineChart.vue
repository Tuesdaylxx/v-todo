<template>
  <echarts
    :id="id"
    :options="options"
    width="100%"
    height="250px"
    @click="test"
  />
</template>

<script>
import * as echarts from "echarts/core";

import Echarts from "./Echarts.vue";

export default {
  name: "LineChart",
  components: { Echarts },
  props: {
    id: {
      type: String,
      default: "chart",
    },
    xAxisData: {
      type: Array,
      default() {
        return [];
      },
    },
    seriesData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      color: ["#bd8fdd", "#1dba95", "#ef918f", "#4d90b2", "#fca253"],
      options: {
        xAxis: {
          type: "category",
          data: [],
          boundaryGap: false,
          axisLine: {
            show: false,
          },
          axisTick: { show: false },
        },
        yAxis: {
          type: "value",
          show: false,
        },
        animation: false,
        series: [
          {
            symbol: "none",
            data: [],
            type: "line",
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgb(227, 235, 255)" },
                { offset: 1, color: "#fff" },
              ]),
            },
          },
        ],
      },
    };
  },
  mounted() {
    //   获取数据
    this.$nextTick(() => {
      setTimeout(() => {
        this.options.xAxis.data = this.xAxisData;
        this.options.series[0].data = this.seriesData;
        this.$bus.$on("changeChartTheme", (index) => {
          /*  this.options.series[0].areaStyle.color.colorStops[0].color =
            this.color[index];
          console.log(
            this.options.series[0].areaStyle.color.colorStops[0].color
          );
          console.log(this.options.series[0].areaStyle.color); */
        });
      }, 10);
    });
    // 更改主题色
  },
  methods: {
    test() {
      console.log(123);
    },
  },
};
</script>

<style scoped>
</style>
