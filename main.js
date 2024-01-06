import * as echarts from "echarts";

// Create the echarts instance
var myChart = echarts.init(document.getElementById("chart-bar"));

// Draw the chart
myChart.setOption({
  title: {
    text: 'Métricas por sector',
    textStyle: {color: 'rgba(255, 255, 255, 0.87)'}
  },
  tooltip: {},
  xAxis: {
    data: ['Sector A', 'Sector B', 'Sector C', 'Sector D', 'Sector E', 'Sector F']
  },
  yAxis: {},
  series: [
    {
      name: '',
      type: 'bar',
      data: [30, 40, 81, 100, 50, 61]
    }
  ]
});

// Create the echart instance
var dom = document.getElementById('chart-container');

// Draw the chart
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});

// Create the map and options
var option;
$.get('map_6_region.svg', function (svg) {
  echarts.registerMap('6region_svg', { svg: svg });
  option = {
    title : {
      text : 'Registro de los últimos eventos',
      textStyle: {color: 'rgba(255, 255, 255, 0.87)'}
    },
    tooltip: {},
    geo: {
      tooltip: {
        show: true
      },
      map: '6region_svg',
      roam: false
    },
    series: {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      symbolSize: function (params) {
        return (params[2] / 100) * 15 + 5;
      },
      itemStyle: {
        color: '#b02a02'
      },
      encode: {
        tooltip: 2
      },
      data: [
        [280, 280, 100],
        [80, 100, 30],
        [450, 350, 80],
        [500, 200, 61],
        [30, 250, 70],
        [120, 320, 81]
      ]
    }
  };
  myChart.setOption(option);
  myChart.getZr().on('click', function (params) {
    var pixelPoint = [params.offsetX, params.offsetY];
    var dataPoint = myChart.convertFromPixel({ geoIndex: 0 }, pixelPoint);
    console.log(dataPoint);
  });
});

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);