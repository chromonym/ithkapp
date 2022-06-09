<template>
  <!--<img alt="Vue logo" src="./assets/logo.png">
  <MainBody/>-->
  <div id="content">
  <h1>Ithkapp</h1>
  <div style="display: flex; flex-flow: row wrap; justify-content: center;">
    <OptionBox title="Concatenation" :options='["None","Type 1","Type 2"]' code="concat" @send-message="handleSendMessage"/>
    <OptionBox title="Version" :options='{"PRC":"Processual","CPT":"Completive"}' code="ver" @send-message="handleSendMessage"/>
    <OptionBox title="aaa" :options='["test","test2","test3"]' code="3" @send-message="handleSendMessage"/>
    <OptionBox title="aaa" :options='["test","test2","test3"]' code="4" @send-message="handleSendMessage"/>
    <OptionBox title="aaa" :options='["test","test2","test3"]' code="5" @send-message="handleSendMessage"/>
    <OptionBox title="aaa" :options='["test","test2","test3"]' code="6" @send-message="handleSendMessage"/>
    <OptionBox title="aaa" :options='["test","test2","test3"]' code="7" @send-message="handleSendMessage"/>
    <OptionBox title="aaa" :options='["test","test2","test3"]' code="8" @send-message="handleSendMessage"/>
    <OptionBox title="aaa" :options='["test","test2","test3"]' code="9" @send-message="handleSendMessage"/>
    <OptionBox title="aaa" :options='["test","test2","test3"]' code="10" @send-message="handleSendMessage"/>
    <OptionBox title="Slot V Affixes" code="5afx" @send-message="handleSendMessage" type="affix"/>
    <OptionBox title="Root (Slot III)" code="root" @send-message="handleSendMessage" type="text"/>
  </div>
  <!--(Note: The affix slots & root slot will eventually be modified to be a definition-based selector)-->
  </div>
  <div id="footer">
    <p>{{ithkword.join("")}} /{{ipa}}/</p>
    <p>{{gloss}}</p>
  </div>
</template>

<script>
import OptionBox from './components/optionbox.vue'

export default {
  name: 'App',
  components: {
    OptionBox,
  },
  data() {
    return {
      // the following variables correspond to things visible on-screen
      ithkword: ["a","b","c","","","","","",""], // ithkuil word, split into slots
      gloss: "al.FA.bet", // gloss of word
      ipa: "eɪ bi: si:" // IPA transcription
    }
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
#content {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 100px;
  right: 0px;
  overflow: auto;
}
#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100px;
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  background-color: white;
  overflow: hidden;
}
</style>
