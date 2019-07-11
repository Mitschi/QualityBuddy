<template>
  <div>
    <apexchart v-if="loaded" type="line" :options="stateChartOptions" :series="stateSeries"></apexchart>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import dateformat from "dateformat";

@Component({
  components: {},
  props: {
    response: {
      required: true
    }
  }
})
export default class BuildStateChart extends Vue {
  @Prop({ default: "response" })
  response;
  loaded = false;
  buildPassed = [];
  buildFailed = [];
  date = [];
  result;

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
      data: this.buildFailed
    },
    {
      name: "Build Succes",
      data: this.buildPassed
    }
  ];

  async mounted() {
    if (this.response.data.length > 0) {
      await this.response.data.forEach(build => {
        const buildDate = new Date(build.started_at);
        const formatedBuildDate = dateformat(buildDate, "yyyy-mm-dd");
        this.date.push({ date: formatedBuildDate, state: build.state });
      });
      this.getData();
    }
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
    this.loaded = true;
  }
}
</script>