<template>
  <div>
    <ul v-for="prefList in prefLists" :key="prefList.id">
      <li>{{ prefList.prefName }}</li>
      <input  type="checkbox" @click="push(prefList.prefCode,prefList.prefName)" />
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prefLists: [],
    }
  },
  mounted() {
    this.prefLists = this.$store.state.pref.result
  },
  methods:{
    push(code,name){
      console.log(code,name)
    }
  }
}
</script>

<style></style>
