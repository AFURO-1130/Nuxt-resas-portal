<template>
   <div>
     <div v-for="prefecture in prefectures.result" :key="prefecture.prefCode">
        <!-- <Checkbox v-model="prefectures" :prefectureCode="prefecture.prefCode" @hoge="hoge1">{{prefecture.prefName}}</Checkbox> -->
        <!-- <LineChart :chart-data="datacollection"></LineChart> -->
        <input type="checkbox" @click="fillData()">Randomize</input>
        <p>prefecture::::{{ prefecture }}</p>
        <!-- <p>{{populations}}</p> -->
     </div>
   </div>
</template>

<script>
export default {
  data() {
    return {
      datacollection: null,
      prefectures:[],
      populations:[]
    }
  },
 mounted() {
    this.fillData()
    // await this.$axios.$get('https://opendata.resas-portal.go.jp/api/v1/prefectures',{headers:{'X-API-KEY':this.$config.apiKey}}).then((res)=>{console.log('res',res)
    // this.prefectures = res
    // })
  },
  methods: {
   async hoge1(prefCode,boolean){
      await this.$axios.$get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,{headers:{'X-API-KEY':this.$config.apiKey}}).then((res)=>{console.log('res',res)
    this.populations = res.result.data
    console.log(this.populations)

    })
    } ,
    fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
     },
     getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
  },

}
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
