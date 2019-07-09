import  {fetchBuild} from ('./fetch-build')

/**
[
  {
    "commit": {
      "id": "167279302",
      "message": "Added eslint to dependencies",
      "committed_at": "2019-07-02T08:28:04.000Z",
      "sha": "b18f78c26bd8009579cf91b891aa39c334d49134"
    },
    "_id": "5d2440e7118bcf03bc488fa3",
    "number": 2,
    "state": "passed",
    "started_at": "2019-07-02T08:29:03.000Z",
    "finished_at": "2019-07-02T08:29:58.000Z",
    "duration": 140,
    "repo_id": "25171564",
    "__v": 0
  },
  {
    "commit": {
      "id": "167278820",
      "message": "Added travis ci and husky precommit testing",
      "committed_at": "2019-07-02T08:24:10.000Z",
      "sha": "7c7a1dab8193b8b7509427259d5e9ff1911d1296"
    },
    "_id": "5d2440e7118bcf03bc488fa4",
    "number": 1,
    "state": "failed",
    "started_at": "2019-07-02T08:24:59.000Z",
    "finished_at": "2019-07-02T08:25:51.000Z",
    "duration": 144,
    "repo_id": "25171564",
    "__v": 0
  }
]
* */



fetchBuild.fetchBuild()
console.log(fetchBuild.build)

let buildTime = [44, 55, 57, 56, 61, 58, 63, 60, 66]
let buildNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

function showStats(){

    var options = {
    chart: {
        height: 350,
        type: 'bar',
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'flat'	
        },
    },
    dataLabels: {
        enabled: false
    },
    series: [{
        name: 'Build Time',
        data: buildTime
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
        opacity: 1

    },

    tooltip: {
        y: {
            formatter: function (val) {
                return val + "Seconds"
            }
        }
    }
    }

    var chart = new ApexCharts(
        document.querySelector("#chart"),
        options
    );

    chart.render();
}



showStats()