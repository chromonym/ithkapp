<template>
  <div id="normaldiv">
    <p>{{title}}</p>
    <!-- The following depends on which TYPE of grammar option this is: -->
    <!-- If it's a simple text entry: -->
    <input v-if="type=='text'" v-model="text" @input="this.$emit('send-message',text,code)" placeholder="Enter..." maxlength=4/>
    <!-- If it's a list of text entries: -->
    <div v-else-if="type=='affix'">
      <div v-for="([ax,lvl],index) in affixes" :key="ax">
        <input v-model.lazy="affixes[index][0]" @input="this.$emit('send-message',affixes,code)"/>
        <p>{{lvl}}</p>
      </div>
    </div>
    <!-- Otherwise, assume it's a dropdown list: -->
    <select v-else v-model="option" @change="this.$emit('send-message',option,code)">
      <option disabled selected>Select...</option>
      <option v-for="(opt, short) in options" :key="opt" :value="short">{{opt}}</option>
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
    code: String,
    type: String
  },
  data() {
    return {
      text: "",
      option: "Select...",
      affixes: [["this",0],["",0],["",0]]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#normaldiv {
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
