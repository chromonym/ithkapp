<template>
  <div class="optionbox" :class="OBclass">
    <p>{{title}}</p>
    <p class="error"></p>
    <!-- The following depends on which TYPE of grammar option this is: -->
    <!-- If it's a simple text entry: -->
    <input v-if="type=='text'" v-model="text" @input="this.$emit('send-message',text,code)" placeholder="Enter..." maxlength=4/>
    <!-- If it's a list of text entries: -->
    <div v-else-if="type=='affix'">
      <div v-for="(affix,index) in affixes" :key="affix"> <!-- For each affix/degree pair in the array "affixes", add a textbox and dropdown linked to each-->
        <input v-model="affixes[index][0]" @input="this.$emit('send-message',affixes,code)" placeholder="Enter..." maxlength=3/>
        <select v-model="affixes[index][1]" @input="this.$emit('send-message',affixes,code)" style="display:inline-block">
          <option v-for="num in Array(10).keys()" :key="num">{{num}}</option>
        </select>
      </div>
      <input type="button" value="Add" @click="affixes.push(['',0]); this.$emit('send-message',affixes,code)"/>
      <input type="button" value="Remove" @click="affixes.pop(); this.$emit('send-message',affixes,code)"/>
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
  name: 'OptionBox',
  props: {
    options: Array,
    title: String,
    code: String,
    type: String,
  },
  data() {
    return {
      text: "",
      option: "Select...",
      affixes: [["",0]],
      required: true
    }
  },
  computed: {
    OBclass() { // set class to error if the input is the default
      console.log(this.affixes.every(function (e) {return e[0] != ""}));
      return {
        error: this.required & this.option == "Select..." && this.text == "" && this.affixes.length != 0 && !this.affixes.every(function (e) {return e[0] != ""})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.optionbox {
  float: left;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  flex-grow: 1;
  flex-basis: 20vw;
}
.error {
  border-color: red;
  color: red;
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
