<template>
  <!--<img alt="Vue logo" src="./assets/logo.png">
  <MainBody/>-->
  <h1>Ithkapp</h1>
  <div style="display: flex; flex-flow: row wrap; justify-content: center;">
    <NormalDiv title="Concatenation" :options='["None","Type 1","Type 2"]' code="concat" @send-message="handleSendMessage"/>
    <NormalDiv title="Version" :options='{"PRC":"Processual","CPT":"Completive"}' code="ver" @send-message="handleSendMessage"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="3" @send-message="handleSendMessage"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="4" @send-message="handleSendMessage"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="5" @send-message="handleSendMessage"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="6" @send-message="handleSendMessage"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="7" @send-message="handleSendMessage"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="8" @send-message="handleSendMessage"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="9" @send-message="handleSendMessage"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="10" @send-message="handleSendMessage"/>
    <NormalDiv title="Slot V Affixes" code="5afx" @send-message="handleSendMessage" type="affix"/>
    <NormalDiv title="Root (Slot III)" code="root" @send-message="handleSendMessage" type="text"/>
  </div>
  <p>(Note: The affix slots & root slot will eventually be modified to be a definition-based selector)</p>
</template>

<script>
import NormalDiv from './components/normaldiv.vue'

export default {
  name: 'App',
  components: {
    NormalDiv
  },
  methods: {
    handleSendMessage(value,code) {
      console.log("From",code+":",value);
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
