<template>
  <!--<img alt="Vue logo" src="./assets/logo.png">
  <MainBody/>-->
  <NormalDiv title="hi" :options='["test","test2","test3"]'/>
  <NormalDiv title="hi" :options='["test","test2","test3"]'/>
  <NormalDiv title="aaa" :options='["test","test2","test3"]'/>
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
