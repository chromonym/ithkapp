<template>
  <div>
    <p>{{title}}</p>
    <select v-model="text" @change="this.$emit('send-message',text,code)">
    <option disabled selected>Select...</option>
      <option v-for="opt in options" :key="opt" :value="opt">{{opt}}</option>
    </select>
    <p>{{code}}</p>
  </div>
</template>

<script>
export default {
  name: 'NormalDiv',
  props: {
    options: Array,
    title: String,
    code: String
  },
  data() {
    return {
      text: "Select..."
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  float: left;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  flex-grow: 1;
  flex-basis: 20vw;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
