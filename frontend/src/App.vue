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
                  <BuildDurationChart v-if="loaded" :response="response" />
                </div>
              </div>
              <div class="col-md-7">
                <div class="box mt-4">
                  <BuildStateChart v-if="loaded" :response="response" />
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
import Client from "pg";
import Pool from "pg";

import BuildDurationChart from "./components/BuildDurationChart.vue";
import BuildStateChart from "./components/BuildStateChart.vue";

@Component({
  components: {
    BuildDurationChart,
    BuildStateChart
  }
})
export default class App extends Vue {
  loaded = false;
  response;
  result;

  async mounted() {
    await this.fetchData();
    this.loaded = true;
  }

  async fetchData() {
    await axios
      .get("http://localhost:3000/build/")
      .then(response => {
        this.response = response;
      })
      .catch(error => console.log(error));
  }

  async getTemperature() {
    const { Client } = require("pg");
    const R = require("ramda");

    const client = new Client({
      user: "postgres",
      host: "localhost",
      database: "temperatur",
      password: "123456",
      port: 5432
    });
    client.connect();

    client
      .query("SELECT * from temperatur")
      .then(res => {
       this.result = res.rows;
      })
      .finally(() => client.end());
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
