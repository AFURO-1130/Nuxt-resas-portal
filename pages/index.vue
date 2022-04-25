<template>
  <div>
    <Header></Header>
    <h4>都道府県</h4>
    <div
      v-for="pref in prefecture.result"
      :key="pref.prefCode"
      class="checkbox"
    >
      <label>{{ pref.prefName }}</label>
      <input
        v-model="isSelected"
        type="checkbox"
        :value="pref.prefName"
        @change="getPopulations(pref.prefCode, pref.prefName)"
      />
    </div>
    <LineChart
      :chart-data="datacollection"
      :chart-options="chartOptions"
    ></LineChart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prefecture: [],
      isSelected: [],
      populations: [],
      datacollection: { labels: [], datasets: [] },
    }
  },
  async mounted() {
    await this.$axios
      .$get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': this.$config.apiKey },
      })
      .then((res) => {
        this.prefecture = res
      })
  },
  methods: {
    async getPopulations(prefCode, prefName) {
      await this.$axios
        .$get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
          { headers: { 'X-API-KEY': this.$config.apiKey } }
        )
        .then((res) => {
          this.chartData(res.result, prefName)
        })
    },
    chartData(population, prefName) {
      this.datacollection = {
        labels: population.data
          .find(({ label }) => label === '総人口')
          .data.map(({ year }) => year),
        datasets: [
          {
            label: prefName,
            data: population.data
              .find(({ label }) => label === '総人口')
              .data.map(({ value }) => value),
            fill: false,
          },
        ],
      }
    },
  },
}
</script>

<style>
html {
  font-size: 16px;
  margin: 0;
}
body {
  margin: 0;
}
</style>
<style scoped>
.checkbox {
  display: inline-flex;
  justify-content: center;
  width: 7rem;
}
</style>
