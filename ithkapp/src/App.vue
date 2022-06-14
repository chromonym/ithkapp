<template>
  <!--<img alt="Vue logo" src="./assets/logo.png">
  <MainBody/>-->
  <div id="content">
    <h1>Ithkapp</h1>
    <div class="section"> <!-- Section 1: Root, etc. -->
      <NewOptionBox :json="gData.root" code="root" @send-message="handleSendMessage" type="text" @modal="openModal" ref="root"/>
      <!--<OptionBox title="Stem" :options='["Stem 0","Stem 1","Stem 2", "Stem 3"]' code="stem" @send-message="handleSendMessage"/>-->
      <NewOptionBox :json="gData.stem" code="stem" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.func" code="func" @send-message="handleSendMessage" @modal="openModal" ref="func"/>
      <NewOptionBox :json="gData.spec" code="spec" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.ver" code="ver" @send-message="handleSendMessage"/>
    </div>
    <div class="section"> <!-- Section 2: Concatenation & Affixes-->
      <NewOptionBox :json="gData.concat" code="concat" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.shcut" code="shcut" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.Vafx" code="Vafx" @send-message="handleSendMessage" type="affix"/>
      <NewOptionBox :json="gData.VIIafx" code="VIIafx" @send-message="handleSendMessage" type="affix"/>
    </div>
    <div class="section"> <!-- Section 3: Configuration -->
      <h2 style="width:100%;">Configuration</h2>
      <NewOptionBox :json="gData.plex" code="plex" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.simil" code="simil" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.cctd" code="cctd" @send-message="handleSendMessage"/>
    </div>
    <div class="section"> <!-- Section 4: Slot VI -->
      <NewOptionBox :json="gData.affil" code="affil" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.ext" code="ext" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.persp" code="persp" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.ess" code="ess" @send-message="handleSendMessage"/>
    </div>
    <div class="section"> <!-- Section 5: Slot VIII -->
      <NewOptionBox :json="gData.vn" code="vn" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.val" code="val" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.pha" code="pha" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.eff" code="eff" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.lvl" code="lvl" @send-message="handleSendMessage"/>
      <NewOptionBox :json="gData.asp" code="asp" @send-message="handleSendMessage"/>
      <NewOptionBox v-if='this.grammaroptions.rel != "FRM"' :json="gData.mood" code="mood" @send-message="handleSendMessage"/>
      <NewOptionBox v-else :json="gData.casc" code="casc" @send-message="handleSendMessage"/>
    </div>
    <div class="section"> <!-- Section 6: Slot 9 & 10 -->
      <NewOptionBox :json="gData.rel" code="rel" @send-message="handleSendMessage"/>
      <NewOptionBox v-if="this.grammaroptions.rel != 'UNF/K'" :json="gData.c" code="c" @send-message="handleSendMessage" />
      <NewOptionBox v-if="this.grammaroptions.rel == 'UNF/K'" :json="gData.ill" code="ill" @send-message="handleSendMessage"/>
      <NewOptionBox v-if="this.grammaroptions.rel == 'UNF/K'" :json="gData.exp" code="exp" @send-message="handleSendMessage"/>
      <NewOptionBox v-if="this.grammaroptions.rel == 'UNF/K'" :json="gData.vld" code="vld" @send-message="handleSendMessage" :disabled='this.grammaroptions.ill == "PFM"'/>
    </div>
    <p>Testing sections below:</p>
    <input type="checkbox" v-model="test"/>
    <div style="display: flex; flex-flow: row wrap; justify-content: center;">
      <OptionBox title="aaa" :options='["test","test2","test3"]' code="3" @send-message="handleSendMessage" disabled/>
      <OptionBox title="aaa" :options='["test","test2","test3"]' code="4" @send-message="handleSendMessage"/>
      <OptionBox title="aaa" :options='["test","test2","test3"]' code="5" @send-message="handleSendMessage"/>
      <OptionBox title="aaa" :options='["test","test2","test3"]' code="6" @send-message="handleSendMessage"/>
      <OptionBox title="aaa" :options='["test","test2","test3"]' code="7" @send-message="handleSendMessage"/>
      <OptionBox title="aaa" :options='["test","test2","test3"]' code="8" @send-message="handleSendMessage"/>
      <OptionBox title="aaa" :options='["test","test2","test3"]' code="9" @send-message="handleSendMessage" :disabled="test"/>
      <OptionBox title="aaa" :options='["test","test2","test3"]' code="10" @send-message="handleSendMessage"/>
    </div>
    <!--(Note: The affix slots & root slot will eventually be modified to be a definition-based selector)-->
  </div>
  <div id="footer">
    <p>{{ithkword.join("")}} /{{ipa}}/</p>
    <p>{{gloss}}</p>
  </div>
  <div id="modal" class="modal" @click.self="closeModal()">
    <div class="modal-content">
      <span class="close" @click="closeModal()">&times;</span>
      <p>Hi from {{modalContent}}</p>
    </div>
  </div>
</template>

<script>
import OptionBox from './components/optionbox.vue'
import NewOptionBox from './components/newoptionbox.vue'
import grammardata from './grammardata.json'

export default {
  name: 'App',
  components: {
    OptionBox,
    NewOptionBox,
  },
  data() {
    return {
      test: false,
      modalContent: "",
      gData: grammardata,
      grammaroptions: { // grammar options
        "root":"",
        "stem":0,
        "func":"STA",
        "spec":"BSC",
        "ver":"PRC",
        "concat":0,
        "shcut":0,
        "Vafx":[],
        "VIIafx":[],
        "plex":"U",
        "simil":"S",
        "cctd":"S",
        "affil":"CSL",
        "ext":"DEL",
        "persp":"M",
        "ess":"NRM",
        "vn":"val",
        "val":"MNO",
        "pha":"PCT",
        "eff":"1:BEN",
        "lvl":"MIN",
        "asp":"RTR",
        "mood":"FAC",
        "casc":"CCN",
        "rel": "UNF/C",
        "ccat":"c0",
        "c":"THM",
        "ill":"ASR",
        "exp":"COG",
        "vld":"OBS"
      },
      /*grammarlist: ["root","stem","func","spec","ver",
                    "concat","shcut","Vafx","VIIafx",
                    "plex","simil","cctd",
                    "affil","ext","persp","ess",
                    "vn","val","pha","eff","lvl","asp","mood","casc",
                    "ccat","c0","c1","c2","c3","c4","c5","c6","c7"],*/
      // the following variables correspond to things visible on-screen
      ithkword: ["a","b","c","","","","","",""], // ithkuil word, split into slots (0-8 = I-IX)
      gloss: "al.FA.bet", // gloss of word
      ipa: "eɪ bi: si:", // IPA transcription
    }
  },
  methods: {
    handleSendMessage(value,code) {
      console.log("From",code+":",value);
      this.grammaroptions[code] = value;
      console.log(this.grammaroptions);
    },
    openModal(code) {
      console.log("Modal opening for",code);
      this.modalContent = this.gData[code].popuptest;
      document.getElementById("modal").style.display = "block";
    },
    closeModal() {
      document.getElementById("modal").style.display = "none";
    },
    calculateSlot1() {
      console.log("AAAAA");
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
.section {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  border-style: solid;
  border-color: black;
  border-width: 2px;
  padding: 2px;
  margin: 10px;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
