<template>
  <div>
    <apexchart v-if="loaded" type="bar" :options="buildChartOptions" :series="buildSeries"></apexchart>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
  props: {
    response: {
      required: true
    }
  }
})
export default class BuildDurationChart extends Vue {
  @Prop({ default: "response" })
  response;
  loaded = false;
  chartColors = [];

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
      colors: [
        () => {
          if (this.chartColors[0] == "passed") {
            this.chartColors.shift();
            console.log(this.chartColors);
            return "#33cc33";
          } else {
            this.chartColors.shift();
            console.log(this.chartColors);
            return "#ff0000";
          }
        }
      ]
    }
  };
  buildSeries = [
    {
      name: "Build duration",
      data: []
    }
  ];

  async mounted() {
    if (this.response.data.length > 0) {
      await this.response.data.forEach(build => {
        this.buildSeries[0].data.push(build.duration);
        this.buildChartOptions.xaxis.categories.push(build.number);
        //if (build.state == "passed") {
        //this.buildChartOptions.fill.colors.push("#33cc33");
        this.chartColors.push(build.state);
        // } else {
        //this.buildChartOptions.fill.colors.push("#ff0000");
        //this.chartColors.push("#ff0000");
        //  }
      });
      console.log(this.chartColors);
      this.loaded = true;
    }
  }
}
</script>