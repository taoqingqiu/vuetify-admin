<template>
  <v-card flat>
    <v-card-text style="height: 350px" ref="chartContainer">
      <v-skeleton-loader v-if="loading" type="image,image" max-height="300px" />
    </v-card-text>
  </v-card>
</template>
<script>
import * as echarts from "echarts";
import { getScatterChartData } from "@/api/dashboard";

export default {
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    setTimeout(this.drawChart, 500);
  },
  methods: {
    async drawChart() {
      const chartData = (await getScatterChartData()).result;
      const chartDom = this.$refs.chartContainer;
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          title: {
            text: "Scatter",
          },
          xAxis: {},
          yAxis: {},
          tooltip: {
            show: true,
          },
          series: [
            {
              symbolSize: 20,
              data: chartData,
              type: "scatter",
            },
          ],
        };

        option && myChart.setOption(option);
      }
      this.loading = false;
    },
  },
};
</script>
