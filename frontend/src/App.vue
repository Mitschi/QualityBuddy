<template>
  <div id="app">
    <div class="small">
      <LineExample
      v-if="loaded"
      :chart-data="chartData"
      :options="options"/>
      <button @click="fetchData">Randomize</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LineExample from './components/LineChart.vue'
import axios from 'axios'

@Component({
  components: {
    LineExample
  },
})
export default class App extends Vue {
  chartData = []
  loaded = false
  async mounted () {
    await this.fetchData()
    this.loaded = true
  }

  async fetchData() {
    axios
      .get('http://localhost:3000/build/')
      .then(response => {
        response.data.forEach(build => {
          this.chartData.push(build.duration)
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
