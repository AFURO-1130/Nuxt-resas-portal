<template>
  <div>
    <LineChartGenerator
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
    <p>{{ chartData.datasets.data }}</p>
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
    }
  },
  created() {
    for (let i = 1960; i <= 2045; i += 5) {
      this.chartData.labels.push(i.toString(10))
    }
  },
  mounted() {
    this.chartData.datasets[0].data.push(89)
    console.log('people', this.$store.state.prefPeople.data[0].value)

    console.log(this.chartData.datasets[0].data)
    // console.log("hoge",this.chartData.datasets[0].data)
    // console.log('hoge1',this.$store.state.prefPeople.data[0].value)
    // for(let i= 0;i<18;i++){
    // console.log("hoge",this.chartData.datasets[i].value)

    // }
  },
}
</script>
