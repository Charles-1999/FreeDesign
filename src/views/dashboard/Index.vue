<template>
  <div class="dashboard">
    <div class="header-container">
      <div class="calendar-container container">
        <div class="date-container">
          <div class="date">
            <span class="day">{{ date.getDate() }}</span>
            <span>/{{ date.getMonth() + 1 }} {{ date.getFullYear() }}</span>
          </div>
        </div>
        <div class="notice-container">
          <div class="notice">
            <fd-icon name='icon-tongzhi' />
            <el-link class="content">【系统通知】全新版本发布，更多功能开发迭代中...</el-link>
          </div>
          <div class="notice">
            <fd-icon name='icon-tongzhi' />
            <el-link class="content">【系统通知】您上周数据报表已更新，点击查看。</el-link>
          </div>
          <div class="notice">
            <fd-icon name='icon-tongzhi' />
            <el-link class="content">【模板更新】本周热门模板新鲜出炉🔥</el-link>
          </div>
        </div>
      </div>
      <div class="user-container container">
        <div class="title">
          <img :src="require('../../assets/images/user-1.png')">
          个人免费版
        </div>
        <div class="wrapper">
          <div class="content">
            <div class="text">开通会员，全平台模板和素材免费使用。</div>
            <el-link :underline="true">更多权益</el-link>
          </div>
          <el-button type="primary">开通会员</el-button>
        </div>
        <div class="score-container">
          <div class="score-wrapper">
            累计积分<span class="score">100</span>分
          </div>
          <div class="btn">攒积分</div>
        </div>
      </div>
    </div>

    <div class="data-container container">
      <div class="title">数据总览</div>
      <div class="overview">
        <div class="data-item">
          <div class="item-value">10</div>
          <div class="item-label">累计作品数</div>
        </div>
        <div class="data-item">
          <div class="item-value">8</div>
          <div class="item-label">当前发布数</div>
        </div>
        <div class="data-item">
          <div class="item-value">144</div>
          <div class="item-label">累计浏览量</div>
        </div>
        <div class="data-item">
          <div class="item-value">16</div>
          <div class="item-label">累计转发量</div>
        </div>
      </div>
    </div>

    <div class="data-container container">
      <div class="title">周报数据</div>
      <div class="chart-container__2">
        <Chart :option="pvChartOpt" />
        <Chart :option="uvChartOpt" />
      </div>
      <div class="chart-container">
        <Chart :option="chartOpt" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from './Chart.vue';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';

export default {
  name: 'Dashboard',

  components: { Chart },

  data() {
    return {
      date: new Date(),

      pvData: [30, 27, 20, 10, 15, 20, 22],
      uvData: [3, 2, 1, 1, 2, 1, 2],

      pvChartOpt: {},
      uvChartOpt: {},
      chartOpt: {}
    };
  },

  mounted() {
    this.getChartOption();
    this.getPVChartOption();
    this.getUVChartOption();
  },

  methods: {
    getPVChartOption() {
      const today = new Date();
      // x轴的日期列表
      const xAxisData = new Array(7)
        .fill('')
        .map((_, idx) => {
          return format(subDays(today, idx + 1).getTime(), 'MM-dd');
        });

      const data = [];
      this.pvData.map((val, idx) => {
        data[idx] = idx === 0 ? val : val + data[idx - 1];
        return data[idx];
      });

      const options = {
        _title: {
          text: '近7天总浏览次数'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data,
            type: 'line'
          }
        ]
      };

      this.pvChartOpt = options;
    },

    getUVChartOption() {
      const today = new Date();
      // x轴的日期列表
      const xAxisData = new Array(7)
        .fill('')
        .map((_, idx) => {
          return format(subDays(today, idx + 1).getTime(), 'MM-dd');
        });

      const data = [];
      this.uvData.map((val, idx) => {
        data[idx] = idx === 0 ? val : val + data[idx - 1];
        return data[idx];
      });

      const options = {
        _title: {
          text: '近7天总浏览人数'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data,
            type: 'line'
          }
        ]
      };

      this.uvChartOpt = options;
    },

    getChartOption() {
      const today = new Date();
      // x轴的日期列表
      const xAxisData = new Array(7)
        .fill('')
        .map((_, idx) => {
          return format(subDays(today, idx + 1).getTime(), 'MM-dd');
        });

      // 每个日期的柱子
      const seriesList = [{
        label: '浏览量',
        data: this.pvData
      }, {
        label: '浏览用户量',
        data: this.uvData
      }, {
        label: '转发量',
        data: [5, 1, 1, 0, 0, 0, 9]
      }];

      const option = {
        _title: {
          text: '近7天作品详情数据'
        },
        legend: {
          data: seriesList.map(_ => _.label)
        },
        grid: {
          top: 40
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: seriesList
          .map((item, idx) => ({
            type: 'bar',
            name: item.label,
            barMaxWidth: 50,
            data: item.data
          }))
      };

      this.chartOpt = option;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
}

.header-container {
  display: flex;
  justify-content: center;

  .calendar-container {
    flex: 1;
    margin-right: 30px;

    .date-container {
      padding-bottom: 10px;
      font-family: tencent;
      font-size: 18px;
      border-bottom: 1px solid @color-shadow;

      .day {
        font-size: 35px;
        color: @primary-color;
        margin-right: 5px;
      }
    }
  }

  .notice-container {
    margin-top: 10px;
    .notice {
      font-size: 15px;
      margin-top: 8px;

      &:first-child {
        margin-top: 0;
      }
    }
  }

  .user-container {
    width: 400px;
    background-image: url('../../assets/images/bg-user-1.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .title {
      display: flex;
      align-items: center;
      font-family: tencent;
      color: @primary-color;
      font-size: 18px;

      img {
        width: 50px;
        height: 30px;
        object-fit: cover;
      }
    }

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;

      .text {
        font-weight: 500;
        color: @primary-color;
      }

      ::v-deep.el-button {
        background: linear-gradient(-90deg, #1312B3, #0C8CEF);
        border: 0;
      }
    }

    .score-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 3px 3px 3px 20px;
      border-radius: 8px;
      background-color: hsla(0, 0%, 100%, .39);

      .score {
        margin: 0 5px;
        color: @primary-color;
      }

      .btn {
        padding: 5px 20px;
        border-radius: 8px;
        background-color: #fff;
        color: @primary-color;
        font-size: 13px;
        cursor: pointer;
      }
    }
  }
}

.data-container {
  margin-top: 30px;

  .title {
    font-family: tencent;
    font-size: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid @color-shadow;
  }

  .overview {
    display: flex;
    align-items: center;
    justify-content: center;

    .data-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 200px;
      margin: 20px 40px;
      font-family: tencent;

      .item-value {
        margin-bottom: 10px;
        font-size: 40px;
        color: @primary-color;
      }

      .item-label {
        font-size: 16px;
      }
    }
  }

  [class^='chart-container'] {
    margin: 30px 0;
  }

  .chart-container__2 {
    display: flex;

    .chart {
      flex: 1;
      width: 0;
    }

    .chart:first-child {
      margin-right: 40px;
    }
  }
}
</style>
