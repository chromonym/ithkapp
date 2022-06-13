<template>
  <!--<img alt="Vue logo" src="./assets/logo.png">
  <MainBody/>-->
  <div id="content">
    <h1>Ithkapp</h1>
    <div class="section"> <!-- Section 1: Root, etc. -->
      <OptionBox title="Root (Slot III)" code="root" @send-message="handleSendMessage" type="text" @modal="openModal" ref="root"/>
      <OptionBox title="Stem" :options='["Stem 0","Stem 1","Stem 2", "Stem 3"]' code="stem" @send-message="handleSendMessage"/>
      <OptionBox title="Function" :options='{"STA":"Static","DYN":"Dynamic"}' code="func" @send-message="handleSendMessage" @modal="openModal" ref="func"/>
      <OptionBox title="Specification" :options='{"BSC":"Basic","CTE":"Contential","CSV":"Constitutive","OBJ":"Objective"}' code="spec" @send-message="handleSendMessage"/>
      <OptionBox title="Version" :options='{"PRC":"Processual","CPT":"Completive"}' code="ver" @send-message="handleSendMessage"/>
    </div>
    <div class="section"> <!-- Section 2: Concatenation & Affixes-->
      <OptionBox title="Relation" :options='{"UNF/C":"Unframed + Case","UNF/K":"Unframed + IEV","FRM":"Framed + Case"}' code="rel" @send-message="handleSendMessage"/>
      <OptionBox title="Concatenation" :options='["None","Type 1","Type 2"]' code="concat" @send-message="handleSendMessage"/>
      <OptionBox title="Shortcutting" :options="['None','Yes']" code="shcut" @send-message="handleSendMessage"/>
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
      <OptionBox title="Valence" :options='{"MNO":"Monoactive","PRL":"Parallel","CRO":"Corollary","RCP":"Reciprocal","CPL":"Complementary","DUP":"Duplicative","DEM":"Demonstrative","CNG":"Contingent","PTI":"Participative"}' code="val" @send-message="handleSendMessage"/>
      <OptionBox title="Phase" :options='{"PCT":"Punctual","ITR":"Iterative","REP":"Repetitive","ITM":"Intermittent","RCT":"Recurrent","FRE":"Frequentative","FRG":"Fragmentative","VAC":"Vacillative","FLC":"Fluctuative"}' code="pha" @send-message="handleSendMessage"/>
      <OptionBox title="Effect" :options='{"1:BEN":"Beneficial","2:BEN":"Beneficial","3:BEN":"Beneficial","SLF:BEN":"Beneficial to Self","UNK":"Unknown","SLF:DET":"Detrimental to Self","3:DET":"Detrimental","2:DET":"Detrimental","1:DET":"Detrimental"}' code="eff" @send-message="handleSendMessage"/>
      <OptionBox title="Level" :options='{"MIN":"Minimal","SBE":"Subequative","IFR":"Inferior","DFT":"Deficient","EQU":"Equative","SUR":"Surpassive","SPL":"Superlative","SPQ":"Superequative","MAX":"Maximal"}' code="lvl" @send-message="handleSendMessage"/>
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
      <OptionBox v-if='this.grammaroptions.rel != "FRM"' title="Mood" :options='{"FAC":"Factual","SUB":"Subjunctive","ASM":"Assumptive","SPC":"Speculative","COU":"Counterfactive","HYP":"Hypothetical"}' code="mood" @send-message="handleSendMessage"/>
      <OptionBox v-else title="Case-Scope" :options='{"CCN":"Natural","CCA":"Antecedent","CCS":"Subaltern","CCQ":"Qualifier","CCP":"Precedent","CCV":"Successive"}' code="casc" @send-message="handleSendMessage"/>
    </div>
    <div class="section"> <!-- Section 6: Slot 9 -->
        <OptionBox v-if='this.grammaroptions.rel != "UNF/K"' title="Case Category" :options='{"c0":"Transrelative","c1":"Appositive","c2":"Associative","c3":"Adverbial","c4":"Relational","c5":"Affinitive","c6":"Spatio-Temporal I","c7":"Spatio-Temporal II"}' code="ccat" @send-message="handleSendMessage"/>
        <OptionBox v-if="this.grammaroptions.rel != 'UNF/K'" title="Case" code="c" @send-message="handleSendMessage"
        :options='this.grammaroptions.ccat == "c0" ? {"THM":"Thematic","INS":"Instrumental","ABS":"Absolutive","AFF":"Affective","STM":"Stimulative","EFF":"Effectuative","ERG":"Ergative","DAT":"Dative","IND":"Inducive"}:
        this.grammaroptions.ccat == "c1" ? {"POS":"Possesive","PRP":"Proprietive","GEN":"Genitive","ATT":"Attributive","PDC":"Productive","ITP":"Interpretative","OGN":"Originative","IDP":"Interdependent","PAR":"Partitive"} :
        this.grammaroptions.ccat == "c2" ? {"APL":"Applicative","PUR":"Purposive","TRA":"Transmissive","DFR":"Deferential","CRS":"Contrastive","TSP":"Transposive","CMM":"Commutative","CMP":"Comparative","CSD":"Considerative"} :
        this.grammaroptions.ccat == "c3" ? {"FUN":"Functive","TFM":"Transformative","CLA":"Classificative","RSL":"Resultative","CSM":"Consumptive","CON":"Concessive","AVR":"Aversive","CVS":"Conversive","SIT":"Situative"} :
        this.grammaroptions.ccat == "c4" ? {"PRN":"Pertinential","DSP":"Descriptive","COR":"Correlative","CPS":"Compositive","COM":"Comitative","UTL":"Utilitative","PRD":"Predicative","RLT":"Relative"} :
        this.grammaroptions.ccat == "c5" ? {"ACT":"Activative","ASI":"Assimilative","ESS":"Essive","TRM":"Terminative","SEL":"Selective","CFM":"Conformative","DEP":"Dependent","VOC":"Vocative"} :
        this.grammaroptions.ccat == "c6" ? {"LOC":"Locative","ATD":"Attendant","ALL":"Allative","ABL":"Ablative","ORI":"Orientative","IRL":"Interrelative","INV":"Intrative","NAV":"Navigative"} :
        this.grammaroptions.ccat == "c7" ? {"CNR":"Concursive","ASS":"Assessive","PER":"Periodic","PRO":"Prolapse","PCV":"Precursive","PCR":"Postcursive","ELP":"Elapsive","PLM":"Prolimitive"} : ["ERROR"]' />
        <!-- end of cases (if slot X != UNF/K), start of IEV (if slot X == UNF/K) -->
        <OptionBox v-if="this.grammaroptions.rel == 'UNF/K'" title="Illocution" :options='{"ASR":"Assertive","PFM":"Performative"}' code="ill" @send-message="handleSendMessage"/>
        <OptionBox v-if="this.grammaroptions.rel == 'UNF/K'" title="Expectation" :options='{"COG":"Cognitive","RSP":"Responsive","EXE":"Executive"}' code="exp" @send-message="handleSendMessage"/>
        <OptionBox v-if="this.grammaroptions.rel == 'UNF/K'" title="Validation" :options='{"OBS":"Observational","REC":"Recollective","PUP":"Purportive","RPR":"Reportive","IMA":"Imaginary","CVN":"Conventional","ITU":"Intuitive","INF":"Inferential"}' code="vld" @send-message="handleSendMessage" :disabled='this.grammaroptions.ill == "PFM"'/>
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
import grammardata from './grammardata.json'

export default {
  name: 'App',
  components: {
    OptionBox,
  },
  data() {
    return {
      test: false,
      gData: {},
      modalContent: "",
      grammaroptions: { // grammar options
        "root":"",
        "stem":0,
        "func":"STA",
        "spec":"BSC",
        "ver":"PRC",
        "concat":0,
        "shcut":0,
        "5afx":[],
        "7afx":[],
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
                    "concat","shcut","5afx","7afx",
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
      this.modalContent = grammardata[code].popuptest;
      document.getElementById("modal").style.display = "block";
    },
    closeModal() {
      document.getElementById("modal").style.display = "none";
    },
    calculateSlot1() {
      console.log("AAAAA");
    }
  },
  beforeCreate() {
    this.gData = grammardata;
    console.log(this.gData.stem.options);
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
