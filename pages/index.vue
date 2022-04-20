<template>
  <div>
    <Lists></Lists>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      
    }
  },
  async fetch({ app, $config,store }) {
    const getPref = await app.$axios.$get(
      'https://opendata.resas-portal.go.jp/api/v1/prefectures',
      { headers: { 'X-API-KEY': $config.apiKey } }
    )
    store.commit('setPref', getPref)
  },
  mounted(){
    console.log('fetch',this.$store.state.pref.result)
  }
}
</script>
