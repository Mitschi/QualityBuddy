<template>
  <div>
    <apexchart v-if="loaded" type="line" :options="temperaturChartOptions" :series="temperatureSeries"></apexchart>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import dateformat from "dateformat";

@Component({
  components: {},
  props: {
    result: {
      required: true
    }
  }
})
export default class BuildStateChart extends Vue {
  @Prop({ default: "result" })
  result;
 
     temperaturChartOptions = {
    chart: {
      id: "temperature-chart",
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

  temperatureSeries = [
    {
      name: "Temperature",
      data: []
    },
    {
        name: "Humidity",
        data: []
    },
    {
      name: "Build Fails",
      data: []
    }
  ];


}
 
</script>