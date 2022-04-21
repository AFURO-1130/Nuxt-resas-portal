<template>
  <div>
    <ul v-for="prefList in prefLists" :key="prefList.id">
      <li>{{ prefList.prefName }}</li>
      <input
        type="checkbox"
        @click="pushPrefCode(prefList.prefCode, prefList.prefName)"
      />
    </ul>
    <LineChartGenerator
    v-if="loaded"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)
export default {
  name: 'LineChart',
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loaded:false,
      chartData: {
        labels: [],
        datasets: [
          // // チェックボックスをクリックするたび、下記のオブジェクトを増やしていくようにする
          {
            label: '',
            backgroundColor: '#f87979',
            data: [],
          },
          // {
          //   label: '滋賀県',
          //   backgroundColor: '#f87979',
          //   data: [9, 3, 10, 10, 9, 8, 4]
          // }
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      prefLists: [],
      prefPeople: [],
    }
  },
  created() {
    for (let i = 1960; i <= 2045; i += 5) {
      this.chartData.labels.push(i.toString(10))
    }
  },
  //  async mounted () {

  //   this.loaded = false

  //   try {
  //     const { userlist } = await fetch('/api/userlist')
  //     this.chartdata = userlist

  //     this.loaded = true
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }
  mounted() {
    this.prefLists = this.$store.state.pref.result
    console.log('jijij',this.$store.state.prefPeople)

    // this.chartData.datasets[0].data.push(this.$store.state.prefPeople.data[0].value)
  },
  methods: {
    async pushPrefCode(prefCode, prefName) {
      this.loaded = false
      console.log(prefCode, prefName)
      await this.$axios
        .$get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
          { headers: { 'X-API-KEY': this.$config.apiKey } }
        )
        .then((res) => {
          // data[i]にしてforを回す
          this.$store.commit('setPrefPeople', res.result.data[0])
          console.log('総人口', res.result.data[0])
          console.log(typeof res.result.data[0])
          console.log('県名', prefName)
          console.log('people', this.$store.state.prefPeople.data[0].value)
          for(let i=0;i<18;i++){
            this.chartData.datasets[0].data.push(this.$store.state.prefPeople.data[i].value)
          }
          console.log(this.chartData.datasets[0].data)
          this.loaded = true
        })
    },
  },
}
</script>

<style></style>
