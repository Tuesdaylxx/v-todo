<template>
  <div :id="id" :style="{ width: width, height: height }"></div>
</template>

<script>
// 按需引入Echart
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

export default {
  name: "Echarts",
  components: {},
  props: {
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    options: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    //   解决dom没渲染上 echarts获取dom的问题
    this.$nextTick(() => {
      setTimeout(() => {
        this.initChart();
      }, 20);
    });
  },

  beforeDestroy() {
    //  选中其它路由页面后，图表节点会删除，所以应该先销毁，再重新初始化
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.$nextTick(() => {
        this.chart.setOption(this.options);
        /* if (option) {
          this.chart.setOption(option);
        } else if (this.option) {
          this.chart.setOption(this.option);
        } */
      });
    },
  },
  watch: {
    options: {
      //   不论嵌套多深，只要改变就会调用
      handler(val) {
        if (this.chart) {
          this.chart.setOption(val);
        } else {
          this.initChart(val);
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
</style>
