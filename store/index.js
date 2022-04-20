export const state = () => ({
  pref: [],
})

export const mutations = {
  setPref(state, prefecture) {
    state.pref = prefecture
  },
}

export const actions = {
  // async getPref({ commit, $config }) {
  //   await this.$axios
  //     .$get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
  //       headers: { 'X-API-KEY': '$config.apiKey' },
  //     })
  //     .then(async (res) => {
  //       console.log('res', res)
  //       await commit('setPref',res)
  //     })
  // },
}
