function plotdata(data, chart_type="ohlc")
{
  var dataPoints1 = [], dataPoints2 = [], dataPoints3 = [], dataPoints4 = [];
  var stockChart = new CanvasJS.StockChart("chartContainer",{
    theme: "light1",
    exportEnabled: true,
    title:{
      text:""
    },
    charts: [{
      toolTip: {
        shared: true
      },
      axisX: {
        lineThickness: 5,
        tickLength: 0,
        labelFormatter: function(e) {
          return "";
        }
      },zoomEnabled: true,
      axisY: {
        crosshair: {
          enabled: true,color:"black",
          snapToDataPoint: true,
         
        },
        prefix: "$"
      },
      legend: {
        verticalAlign: "top"
      },
      data: [{
        showInLegend: true,
        name: "Stock Price",
        yValueFormatString: "$#,###.##",
        type: chart_type,
        dataPoints : dataPoints1,
        risingColor: "green",
        fallingColor:"red",
      }]
    },{
      height: 100,
      toolTip: {
        shared: true
      },
      axisY: {
        prefix: "$",
        labelFormatter: addSymbols
      },
      legend: {
        verticalAlign: "top"
      },
      data: [{
        showInLegend: true,
        name: "Volume",
        yValueFormatString: "$#,###.##",
        dataPoints : dataPoints2,

      }]
    }],
    rangeSelector: {
      buttons: [{
        range: 1, 
        rangeType: "week",
        label: "W"
      },{            
        range: 2,
        rangeType: "month",
        label: "M"
      },{  range: 3,          
        rangeType: "month",
        label: "4M" //Change it to "All"
      },{            
        rangeType: "all",
        label: "All" //Change it to "All"
      }],
      inputFields: {
        startValue: new Date(2019, 01, 01),
        endValue: new Date(2019, 09, 01)
      }},

    navigator: {
      data: [{
        dataPoints: dataPoints3
      }],
      slider: {
        minimum: new Date(2021, 06, 01),
        maximum: new Date(2021, 08, 01)
      }
    }
  });
  console.log(data);
  for(var i = 0; i < data.length; i++){
    dataPoints1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)],color: data[i].open < data[i].close ? "green" : "red"});
    dataPoints2.push({x: new Date(data[i].date), y: Number(data[i].volume),color: data[i].open < data[i].close ? "green" : "red"});
    dataPoints3.push({x: new Date(data[i].date), y: Number(data[i].close)});
    dataPoints4.push({x: new Date(data[i].date), y: Number(data[i].open)});
  }
  stockChart.render();
  function addSymbols(e){
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if(order > suffixes.length - 1)
      order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }
}