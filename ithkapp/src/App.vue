<template>
  <!--<img alt="Vue logo" src="./assets/logo.png">
  <MainBody/>-->
  <div style="display: flex; flex-flow: row wrap; justify-content: center;">
    <NormalDiv title="hi" :options='["test","test2","test3"]' code="help"/>
    <NormalDiv title="hi" :options='["test","test2","test3"]' code="2"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="3"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="4"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="5"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="6"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="7"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="8"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="9"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="10"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="11"/>
    <NormalDiv title="aaa" :options='["test","test2","test3"]' code="12"/>
  </div>
  <h3>{{help.opt}}</h3>
</template>

<script>
import NormalDiv from './components/normaldiv.vue'

export default {
  name: 'App',
  components: {
    NormalDiv
  }
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
