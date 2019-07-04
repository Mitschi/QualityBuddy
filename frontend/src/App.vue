<template>
  <div id="app">
    <div class="small">
      <apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
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
      id : 'build-time-chart'
    },
    xaxis: {
      categories: []
    }
  }
  series = [{
    name: 'series-1',
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
        response.data.forEach(build => {
          this.series[0].data.push(build.duration)
          this.chartOptions.xaxis.categories.push(build.number)
        });
      })
      .catch((error) => console.log(error))
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
