<template>
  <div class="chart">
    <div
      class="title"
      v-if="option._title">
      {{ option._title.text }}
      <!-- tips标签 -->
      <el-popover
        placement="top"
        trigger="hover"
        v-if="option._title.tips">
        <template slot="reference">
          <i class="el-icon-question" />
        </template>
        <template slot="default">
          <div v-html="option._title.tips" />
        </template>
      </el-popover>
    </div>

    <slot name="top" />

    <!-- echart -->
    <div
      class="mainchart"
      ref="mainchart" />
  </div>
</template>

<script>
import theme from './chartTheme.json';
import echarts from './echartImport';

export default {
  name: 'Chart',

  props: {
    // 图表配置
    option: {
      type: Object,
      default: () => ({})
    }
  },

  watch: {
    /**
       * @param {object} option option
       * @return {void}
       */
    option(option) {
      const myChart = echarts.getInstanceByDom(this.$refs.mainchart);

      const { xLabel, seriesData } = option;

      const options = {
        ...option,

        // 网格（内边距）
        grid: {
          y: 20,
          y2: 40,
          ...option.grid
        },

        xAxis: {
          type: 'category',
          data: xLabel,

          ...option.xAxis
        },

        yAxis: {
          type: 'value',
          // Y轴刻度最小间隔
          minInterval: 1,

          ...option.yAxis
        },

        series: [{
          data: seriesData,
          type: 'bar',
          // 柱子最大宽度
          barMaxWidth: 50,
          itemStyle: {
          },
          label: {
            show: true,
            position: 'top'
          }
        }],

        tooltip: {

          ...option.tooltip
        }
      };

      options.series = option.series || options.series;

      myChart.setOption(options);
    }
  },

  /**
     * @return {void}
     */
  mounted() {
    echarts.registerTheme('customed', theme);
    const mychart = echarts.init(this.$refs.mainchart, 'customed');

    window.addEventListener('resize', () => {
      mychart.resize();
    });
  }
};
</script>

<style lang="less" scoped>
  .chart {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 340px;

    .title {
      font-size: 16px;
      color: #3e3e3e;
      line-height: 30px;
      font-weight: 500;
    }

    .mainchart {
      width: 100%;
      height: 300px;
    }
  }
</style>
