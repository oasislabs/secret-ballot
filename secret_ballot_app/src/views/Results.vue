<template>
  <v-container id="Results_Container" fill-height>
    <v-card
      id="Results_Card"
      flat
    >
      <v-card-title id="Results_Title" class="justify-center">
        Result
      </v-card-title>

      <v-card-text>
        <v-apex-chart
          align="center"
          width="250"
          type="pie"
          :options="chartOptions"
          :series="series"
        ></v-apex-chart>

        <div id="Results_Question" class="pb-4">
          <b>Question:</b> <br />
          What are you planning to build on Oasis?
        </div>

        <template v-for="(option, index) of chartOptions.labels">
          <div class="Results_Result Results_Even pl-5 pa-2 pt-1" v-if="(index + 1) % 2 === 0">
            <div class="Results_Number pr-4">#{{ index + 1 }}</div>
            <div class="Results_Option pt-2">{{ option }}</div>
            <div class="Results_Score pt-2 pr-5">{{ series[index] }}%</div>
          </div>
          <div class="Results_Result Results_Odd pl-5 pa-2 pt-1" v-else>
            <div class="Results_Number pr-4">#{{ index + 1 }}</div>
            <div class="Results_Option pt-2">{{ option }}</div>
            <div class="Results_Score pt-2 pr-5">{{ series[index] }}%</div>
          </div>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
let ballot = require('@/ballot.js');

export default {
  name: 'Results',
  data () {
    return {
      series: [38, 18, 16, 13, 9, 6],
      chartOptions: {
        legend: {
          show: false,
        },
        labels: [
          'Private Data Sharing',
          'A Wallet',
          'Medical records APP',
          'Defi / Credit scoring',
          'Supply chain APP',
          'Other',
        ],
        plotOptions: {
          pie: {
            dataLabels: {
              minAngleToShowLabel: 361,
            },
          },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 170,
            },
            legend: {
              show: false,
            },
          },
        }],
        tooltip: {
          fillSeriesColor: false,
          y: {
            formatter: (value) => {
              return `${value}%`;
            },
          },
        },
        theme: {
          monochrome: {
            enabled: true,
            color: '#ff4212',
            shadeIntensity: 0.9,
          },
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

.apexcharts-tooltip {
  background-color: $darkgray;
  color: $darkgray;
}

#Results_Card {
  background-color: $lightgray;

  display: block;
  margin-left: auto;
  margin-right: auto;
}

#Results_Container {
  position: relative;
  top: 5vh;

  overflow-y: scroll;
}

#Results_Question {
  font-family: Sul Sans;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #c3c9cd;

  mix-blend-mode: normal;
}

#Results_Title {
  font-family: Sul Sans;
  font-size: 28px;
  font-weight: bold;
  line-height: 33px;

  text-transform: uppercase;
  letter-spacing: 2px;

  color: #334857;
}

.Results_Even {
  background: linear-gradient(90deg, #fbfbfb 0%, #f5f7f8 52.59%, #fbfbfb 100%);
}

.Results_Number {
  float: left;

  font-family: Sul Sans;
  font-size: 28px;
  font-weight: bold;
  line-height: 33px;

  color: #334857;
}

.Results_Odd {
  background: white;
}

.Results_Option {
  float: left;

  font-family: Sul Sans;
  font-size: 16px;
  line-height: 19px;

  color: #334857;
}

.Results_Result {
  height: 56px;
  width: 480px;
}

.Results_Result:hover {
  box-shadow: 0px 0px 20px rgba(51, 72, 87, 0.2);
}

.Results_Result:hover .Results_Option {
  font-weight: bold;
}

.Results_Score {
  float: right;

  font-family: Sul Sans;
  font-size: 20px;
  font-weight: bold;
  line-height: 23px;

  color: #829aaa;
}
</style>
