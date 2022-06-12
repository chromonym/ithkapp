<template>
  <!--<img alt="Vue logo" src="./assets/logo.png">
  <MainBody/>-->
  <div id="content">
  <h1>Ithkapp</h1>
  <div class="section"> <!-- Section 1: Root, etc. -->
    <OptionBox title="Root (Slot III)" code="root" @send-message="handleSendMessage" type="text"/>
    <OptionBox title="Stem" :options='["Stem 0","Stem 1","Stem 2", "Stem 3"]' code="stem" @send-message="handleSendMessage"/>
    <OptionBox title="Function" :options='{"STA":"Static (STA)","DYN":"Dynamic (DYN)"}' code="func" @send-message="handleSendMessage"/>
    <OptionBox title="Specification" :options='{"BSC":"Basic (BSC)","CTE":"Contential (CTE)","CSV":"Constitutive (CSV)","OBJ":"Objective (OBJ)"}' code="spec" @send-message="handleSendMessage"/>
    <OptionBox title="Version" :options='{"PRC":"Processual","CPT":"Completive"}' code="ver" @send-message="handleSendMessage"/>
  </div>
  <div class="section"> <!-- Section 2: Concatenation & Affixes-->
    <OptionBox title="Concatenation" :options='["None","Type 1","Type 2"]' code="concat" @send-message="handleSendMessage"/>
    <OptionBox title="Slot V Affixes" code="5afx" @send-message="handleSendMessage" type="affix"/>
    <OptionBox title="Slot VII Affixes" code="7afx" @send-message="handleSendMessage" type="affix"/>
  </div>
  <div class="section"> <!-- Section 3: Configuration -->
    <h2 style="width:100%;">Configuration</h2>
    <OptionBox title="Plexity" :options='{"U":"Uniplex","D":"Duplex","M":"Multiplex"}' code="plex" @send-message="handleSendMessage"/>
    <OptionBox title="Similarity" :options='{"S":"Similar","D":"Dissimilar","F":"Fuzzy"}' code="simil" @send-message="handleSendMessage"/>
    <OptionBox title="Connectedness" :options='{"S":"Separate","C":"Connected","F":"Fused"}' code="cctd" @send-message="handleSendMessage"/>
  </div>
  <div class="section"> <!-- Section 4: Slot VI -->
    <OptionBox title="Affiliation" :options='{"CSL":"Consolidative","ASO":"Associative","COA":"Coalescent","VAR":"Variative"}' code="affil" @send-message="handleSendMessage"/>
    <OptionBox title="Extension" :options='{"DEL":"Delimitive","PRX":"Proximal","ICP":"Inceptive","ATV":"Attentuative","GRA":"Graduative","DPL":"Depletive"}' code="ext" @send-message="handleSendMessage"/>
    <OptionBox title="Perspective" :options='{"M":"Monadic","G":"Agglomerative","N":"Nomic","A":"Abstract"}' code="persp" @send-message="handleSendMessage"/>
    <OptionBox title="Essence" :options='{"NRM":"Normal","RPV":"Representative"}' code="ess" @send-message="handleSendMessage"/>
  </div>
  <div class="section"> <!-- Section 5: Slot VIII -->
    <OptionBox title="Vₙ" :options='{"val":"Valence","pha":"Phase","eff":"Effect","lvl":"Level","asp":"Aspect"}' code="vn" @send-message="handleSendMessage"/>
    <OptionBox title="Valence" :options='{"MNO":"MNO","PRL":"PRL","CRO":"CRO","RCP":"RCP","CPL":"CPL","DUP":"DUP","DEM":"DEM","CNG":"CNG","PTI":"PTI"}' code="val" @send-message="handleSendMessage"/>
    <OptionBox title="Phase" :options='{"PCT":"PCT","ITR":"ITR","REP":"REP","ITM":"ITM","RCT":"RCT","FRE":"FRE","FRG":"FRG","VAC":"VAC","FLC":"FLC"}' code="pha" @send-message="handleSendMessage"/>
    <OptionBox title="Effect" :options='{"1:BEN":"1:BEN","2:BEN":"2:BEN","3:BEN":"3:BEN","SLF:BEN":"SLF:BEN","UNK":"UNK","SLF:DET":"SLF:DET","3:DET":"3:DET","2:DET":"2:DET","1:DET":"1:DET"}' code="eff" @send-message="handleSendMessage"/>
    <OptionBox title="Level" :options='{"MIN":"MIN","SBE":"SBE","IFR":"IFR","DFT":"DFT","EQU":"EQU","SUR":"SUR","SPL":"SPL","SPQ":"SPQ","MAX":"MAX"}' code="lvl" @send-message="handleSendMessage"/>
    <OptionBox title="Aspect" code="asp" @send-message="handleSendMessage"
    :options = '{"RTR":"Retrospective",
                "PRS":"Prospective",
                "HAB":"Habitual",
                "PRG":"Progressive",
                "IMM":"Imminent",
                "PCS":"Precessive",
                "REG":"Regulative",
                "SMM":"Summative",
                "ATP":"Anticipatory",
                "RSM":"Resumptive",
                "CSS":"Cessative",
                "PAU":"Pausal",
                "RGR":"Regressive",
                "PCL":"Preclusive",
                "CNT":"Continuative",
                "ICS":"Incessative",
                "EXP":"Experiential",
                "IRP":"Interruptive",
                "PMP":"Preemptive",
                "CLM":"Climactic",
                "DLT":"Dilatory",
                "TMP":"Temporary",
                "XPD":"Expenditive",
                "LIM":"Limitative",
                "EPD":"Expeditive",
                "PTC":"Protractive",
                "PPR":"Preparatory",
                "DCL":"Disclusive",
                "CCL":"Conclusive",
                "CUL":"Culminative",
                "IMD":"Intermediative",
                "TRD":"Tardative",
                "TNS":"Transitional",
                "ITC":"Intercommutative",
                "MTV":"Motive",
                "SQN":"Sequential"}'/>
    <!-- Note to self: add a v-if & v-else regarding the following two, based on slot X -->
    <OptionBox title="Mood" :options='{"FAC":"FAC","SUB":"SUB","ASM":"ASM","SPC":"SPC","COU":"COU","HYP":"HYP"}' code="mood" @send-message="handleSendMessage"/>
    <OptionBox title="Case-Scope" :options='{"CCN":"Natural","CCA":"Antecedent","CCS":"Subaltern","CCQ":"Qualifier","CCP":"Precedent","CCV":"Successive"}' code="casc" @send-message="handleSendMessage"/>
  </div>
  <div class="section"> <!-- Section 6: Case -->
    <OptionBox title="Case Category" :options='{"c0":"Transrelative","c1":"Appositive","c2":"Associative","c3":"Adverbial","c4":"Relational","c5":"Affinitive","c6":"Spatio-Temporal I","c7":"Spatio-Temporal II"}' code="ccat" @send-message="handleSendMessage"/>
    <!-- Note to self: I need to bugfix the fact that switching case category resets the selected case but doesn't update the variables -->
    <OptionBox v-if="this.ccat == 'c0'" title="Transrelative" :options='{"THM":"Thematic","INS":"Instrumental","ABS":"Absolutive","AFF":"Affective","STM":"Stimulative","EFF":"Effectuative","ERG":"Ergative","DAT":"Dative","IND":"Inducive"}' code="c" @send-message="handleSendMessage" />
    <OptionBox v-if="this.ccat == 'c1'" title="Appositive" :options='{"POS":"Possesive","PRP":"Proprietive","GEN":"Genitive","ATT":"Attributive","PDC":"Productive","ITP":"Interpretative","OGN":"Originative","IDP":"Interdependent","PAR":"Partitive"}' code="c" @send-message="handleSendMessage" />
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
      test: false,
      // the following variables correspond to things visible on-screen
      ithkword: ["a","b","c","","","","","",""], // ithkuil word, split into slots (0-8 = I-IX)
      grammaroptions: { // grammar options
        "root":"",
        "5afx":[],
        "7afx":[],
        "concat":"None",
        
      },
      gloss: "al.FA.bet", // gloss of word
      ipa: "eɪ bi: si:", // IPA transcription
      ccat: "c0"
    }
  },
  methods: {
    handleSendMessage(value,code) {
      console.log("From",code+":",value);
      if (code=="ccat") {
        this.ccat = value;
      }
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
</style>
