import * as echarts from 'echarts/core';

import {
  GridComponent, TooltipComponent, LegendComponent, TitleComponent,
  DataZoomComponent, DataZoomSliderComponent
} from 'echarts/components';

import {
  BarChart, PieChart, LineChart
} from 'echarts/charts';

import {
  CanvasRenderer
} from 'echarts/renderers';

// init echart
echarts.use(
  [GridComponent, BarChart, LineChart,
    PieChart, CanvasRenderer, TooltipComponent, LegendComponent, TitleComponent,
    DataZoomComponent, DataZoomSliderComponent]
);

export default echarts;
