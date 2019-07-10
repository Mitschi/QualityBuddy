<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />

    <div id="wrapper">
      <div class="content-area">
        <div class="container-fluid">
          <div class="main">
            <div class="row mt-4">
              <div class="col-md-5">
                <div class="box columnbox mt-4">
                  <apexchart type="bar" :options="buildChartOptions" :series="buildSeries"></apexchart>
                </div>
              </div>
              <div class="col-md-7">
                <div class="box mt-4">
                  <apexchart type="line" :options="stateChartOptions" :series="stateSeries"></apexchart>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-5">
                <div class="box radialbox mt-4">
                  <div id="circlechart"></div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="box mt-4">
                  <div class="mt-4">
                    <div id="progress1"></div>
                  </div>
                  <div class="mt-4">
                    <div id="progress2"></div>
                  </div>
                  <div class="mt-4">
                    <div id="progress3"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="float-right edit-on-codepen"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import dateformat from "dateformat";

@Component({
  components: {}
})
export default class App extends Vue {
  loaded = false;
  chartColors = [];
  response;
  date = [];
  result;
  buildPassed = [];
  buildFailed = [];

  buildChartOptions = {
    chart: {
      id: "build-time-chart",
      foreColor: "#fff"
    },
    xaxis: {
      categories: []
    },
    title: {
      text: "Build duration",
      align: "left",
      style: {
        fontSize: "12px"
      }
    },
    fill: {
      colors: []
    }
  };
  buildSeries = [
    {
      name: "Build duration",
      data: []
    }
  ];

  stateChartOptions = {
    chart: {
      id: "state-succes-chart",
      foreColor: "#fff"
    },
    xaxis: {
      categories: []
    },
    title: {
      text: "Build States",
      align: "left",
      style: {
        fontSize: "12px"
      }
    },
    fill: {
      colors: []
    }
  };

  stateSeries = [
    {
      name: "Build Fails",
      data: this.buildFailed,
      colors: ["#ff0000"]
    },
    {
      name: "Build Succes",
      data: this.buildPassed
    }
  ];

  async mounted() {
    await this.fetchData();
    this.loaded = true;
  }

  async fetchData() {
    await axios
      .get("http://localhost:3000/build/")
      .then(response => {
        if (response.data.length > 0) {
          response.data.forEach(build => {
            const buildDate = new Date(build.started_at);
            const formatedBuildDate = dateformat(buildDate, "yyyy-mm-dd");
            this.date.push({ date: formatedBuildDate, state: build.state });
            this.buildSeries[0].data.push(build.duration);
            this.buildChartOptions.xaxis.categories.push(build.number);
            if (build.state == "passed") {
              this.buildChartOptions.fill.colors.push("#33cc33");
            } else {
              this.buildChartOptions.fill.colors.push("#ff0000");
            }
          });
          this.buildChartOptions.fill.colors.shift();
        }
      })
      .catch(error => console.log(error));
    this.getData();
  }

  getData() {
    this.result = Object.values(
      this.date.reduce((r, o) => {
        r[o.date] = r[o.date] || { date: o.date, passed: 0, failed: 0 };
        if (o.state === "passed") {
          r[o.date].passed++;
        } else {
          r[o.date].failed++;
        }

        return r;
      }, {})
    );
    this.pushBuildStateData();
  }

  pushBuildStateData() {
    this.result.forEach(element => {
      this.stateChartOptions.xaxis.categories.push(element.date);
      this.buildPassed.push(element.passed);
      this.buildFailed.push(element.failed);
    });
  }
}
</script>

<style lang="scss">
body {
  background: #1b213b;
  color: #777;
  font-family: Arial, sans-serif;
  background-color: #1b213b !important;
}

.body-bg {
  background: #f3f4fa !important;
}

h1,
h2,
h3,
h4,
h5,
h6,
strong {
  font-weight: 600;
}

.box .apexcharts-xaxistooltip {
  background: #1b213b;
  color: #fff;
}

.content-area {
  max-width: 1280px;
  margin: 0 auto;
}

.box {
  background-color: #262d47;
  padding: 25px 25px;
  border-radius: 4px;
}

.columnbox {
  padding-right: 15px;
}
.radialbox {
  max-height: 333px;
  margin-bottom: 60px;
}

.apexcharts-legend-series tspan:nth-child(3) {
  font-weight: bold;
  font-size: 20px;
}

.edit-on-codepen {
  text-align: right;
  width: 100%;
  padding: 0 20px 40px;
  position: relative;
  top: -30px;
  cursor: pointer;
}

h1 {
  color: #fff;
}
</style>
