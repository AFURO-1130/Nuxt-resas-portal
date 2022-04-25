<template>
  <div>
    <Header></Header>
    <h4>都道府県</h4>
    <div v-for="pref in prefecture.result" :key="pref.prefCode" class="checkbox">
      <label>{{ pref.prefName }}</label>
      <input
        v-model="isSelected"
        type="checkbox"
        :value="pref.prefName"
        @change="getPopulations(pref.prefCode, pref.prefName)"
      />
      <!-- <p>{{ text }}</p> -->
      <!-- <pre>都道府県{{ isSelected }}</pre> -->
      <!-- <pre>{{ prefecture }}</pre> -->
      <!-- <p>{{datacollection}}</p> -->
    </div>
    <LineChart :chart-data="datacollection"></LineChart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prefecture: [],
      isSelected: [],
      prefCode: [],
      text: '',
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
        console.log('res', res)
        this.prefecture = res
      })
  },
  methods: {
    push(prefCode) {
      this.text = prefCode
      console.log(prefCode)
    },
    async getPopulations(prefCode, prefName) {
      await this.$axios
        .$get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
          { headers: { 'X-API-KEY': this.$config.apiKey } }
        )
        .then((res) => {
          console.log('populations', res.result, prefName)

          // console.log(
          //   'find',
          //   res.result.data
          //     .find(({ label }) => label === '総人口')
          //     .data.map(({ year }) => year)
          // )
          this.fillData(res.result, prefName)
        })
    },
    fillData(population, prefName) {
      console.log('population', population, prefName)
      // console.log(
      //   'find_value',
      //   population.data
      //     .find(({ label }) => label === '総人口')
      //     .data.map(({ value }) => value)
      // )
      // console.log(
      //   'find_people',
      //   population.data
      //     .find(({ label }) => label === '総人口')
      //     .data.map(({ value }) => value)
      // )
      population.data
        .find(({ label }) => label === '総人口')
        .data.map((peple, i) => ({
          hoge: console.log('peple0000', peple.value),
        }))
      this.datacollection = {
        labels: population.data
          .find(({ label }) => label === '総人口')
          .data.map(({ year }) => year),
        datasets: population.data
          .find(({ label }) => label === '総人口')
          .data.map(( people, i ) => [
            {
              label: this.isSelected[i],
              data: console.log('people',people),
            },
          ]),
      }
      console.log(this.datacollection)
    },
  },
}
</script>

<style scoped>
.checkbox{
  display: inline-flex;
  justify-content: center;
  width: 7rem;
}
</style>
