<template>
  <v-card>
    <v-card-text style="height: 350px" ref="chartContainer">
      <v-skeleton-loader v-if="loading" type="image,image" max-height="300px" />
    </v-card-text>
  </v-card>
</template>
<script>
import * as echarts from 'echarts';
import { getPieChartData } from '../../api/dashboard';

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
      const chartDom = this.$refs.chartContainer;
      if (chartDom) {
        const chartData = (await getPieChartData()).data;
        const myChart = echarts.init(chartDom);
        const option = {
          title: {
            text: 'Pie',
            left: 'left',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'horizentl',
            bottom: 'bottom',
          },
          series: [
            {
              name: 'Items',
              type: 'pie',
              radius: '50%',
              data: chartData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
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
