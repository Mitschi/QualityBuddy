<template>
  <div id="app"> 
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <div id="wrapper">
      <div class="content-area">
        <div class="container-fluid">
          <div class="main">
            <div class="row mt-4">
              <div class="col-md-5">
                
                  <div class="box columnbox mt-4">
                    <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
                  </div>
              </div>
              <div class="col-md-7">
                  <div class="box  mt-4">
                    <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
                  </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-5">
                  <div class="box radialbox mt-4">
                      <div id="circlechart"> </div>
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
              <div class="float-right edit-on-codepen">
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component({
  components: {
  },
})
export default class App extends Vue {
  chartData = []
  loaded = false

  chartOptions = {
    chart : {
      id : 'build-time-chart',
      foreColor: '#fff',
    },
    xaxis: {
      categories: []
    },
    title: {
      text: 'Build duration',
      align: 'left',
      style: {
        fontSize: '12px'
      }
    },
  }
  series = [{
    name: 'Build duration',
    data: []
  }]

  async mounted () {
    await this.fetchData()
    this.loaded = true
  }

  async fetchData() {
    axios
      .get('http://localhost:3000/build/')
      .then(response => {
        if(response.data.length > 0) {
          response.data.forEach(build => {
            this.series[0].data.push(build.duration)
            this.chartOptions.xaxis.categories.push(build.number)
          });
        }
      })
      .catch((error) => console.log(error))
  }
  
}
</script>

<style lang="scss">

body {
  background: #1B213B;
  color: #777;
  font-family:  Arial, sans-serif;
  background-color: #1b213b !important;
}

.body-bg {
  background: #F3F4FA !important;
}

h1, h2, h3, h4, h5, h6, strong {
  font-weight: 600;
}

.box .apexcharts-xaxistooltip {
  background: #1B213B;
  color: #fff;
}

.content-area {
  max-width: 1280px;
  margin: 0 auto;
}

.box {
  background-color: #262D47;
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
