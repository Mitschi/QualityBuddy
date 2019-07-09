

let build
buildNumber = []
buildTime = []
chartColors = []
stateDays = []


function fetchBuild(){
    axios.get("http://localhost:3000/build")
    .then((response) => {
      build = response.data
      collectStats()
    })
}




function collectStats(){
    let lastDay
    let counter = 0
    build.forEach(element => {
        buildNumber.splice(0, 0, element['number'])
        buildTime.splice(0, 0, element['duration'])
        
        const date = new Date(element.started_at)
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDay()
        
        stateDays.push(day)
        if(element['state'] == "passed"){
            chartColors.splice(0, 0, "#00ff00")
        }else{
            chartColors.splice(0, 0, "#ff0000")
        } 
        
    });
    console.log(stateDays)
}



function showStats(){
 


    var build_stats_options = {
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'flat',
            },
        },
        dataLabels: {
            enabled: false,
        },
        series: [{
            name: 'Build Time',
            data: buildTime,
        }],
        xaxis: {
            categories: buildNumber,
            title: {
                text: 'Build Number',
                style: {
                    color: undefined,
                    fontSize: '19px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    cssClass: 'apexcharts-yaxis-title',
                },
            }
        },
        yaxis: {
            title: {
                text: 'Build Time [s]',
                style: {
                    color: undefined,
                    fontSize: '19px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    cssClass: 'apexcharts-yaxis-title',
                },
            }
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            style: {
                fontSize: '12px',
                fontFamily: undefined,
              },
              marker: {
                show: false,
            },
            y: {
                formatter: function (val) {
                    return val + "Seconds"
                }
                
            }
        },
        fill: {
            colors: [function() {
            if(chartColors[0] == "#00ff00") {
                chartColors.splice(0, 1)
                return '#00ff00'
            } else{
                chartColors.splice(0, 1)
                return '#ff0000'
                }
                }]
        }
    }
  
   
    var build_stats = new ApexCharts(
        document.querySelector("#chart"),
        build_stats_options
    );
    build_stats.render()
   
    var build_succes_chart_options = {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            series: [{
              name: "Succes",
              data:  [1, 3, 55]
            },
            {
                name: "Fails",
                data: [2, 123, 123 ]
              }],
            title: {
              text: 'Product Trends by Month',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
            type: 'datetime',
              categories: stateDays
            }
          }
      var build_succes_chart = new ApexCharts(
        document.querySelector("#chart1"),
        build_succes_chart_options
      );
  
      build_succes_chart.render();
  
      
  

    
}

fetchBuild()

showStats()
