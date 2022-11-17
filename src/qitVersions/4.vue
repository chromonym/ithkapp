<template>
  <!-- I am very sorry in advance if this code is somewhat unreadable - XXOs -->
    <div>
    <!--<button @click="notAvailableAlert(ithkword)">Read word (for testing)</button>-->
    <h1>Ithkapp (hwirbuvie-ekţgyil)</h1>
    <p class="smalltext">Compatible with New Ithkuil Design Doc v1.0.1, Lexical Roots v0.5.1, VxCs Affixes v0.7.5, and Phonotaxis v0.5.4.
    <br/>Definitions are a combination of taken from <a target="_blank" href="http://ithkuil.net/index.htm">the official Ithkuil III site</a>, taken from <a target="_blank" href="http://www.ithkuil.net/New_Ithkuil_design_doc_v_1_0.pdf">official Ithkuil IV documentation</a>, and (occasionally) written by the creator of this site.
    <br/>All past and current forms of Ithkuil and all official documentation are by John Quijada.
    <br/>Click on a box's title to learn more about what it means.</p>
    <div class="section" :class="{hidden: ['suppletive','affixjunct','register','modular','mcs','bias','free'].includes(wordType)}"> <!-- Section 1: Root, etc. -->
      <!-- used only for affix-root adjuncts -->
      <OptionBox :json="gData.affRoot" :class="{hidden: wordType != 'affRoot'}" code="affRoot" @send-message="handleSendMessage" ref="affRoot" @modal="openModal" length="6" :whitelist="Object.keys(this.cData).concat(['ṭ','ŧ','ḍ','đ','ņ','ṇ','ŗ','ṛ','ł','ḷ','ż'])"/>
      <OptionBox :json="gData.arDegree" :class="{hidden: wordType != 'affRoot'}" code="arDegree" @send-message="handleSendMessage" ref="arDegree" @modal="openModal"/>
      <!-- used only for referential-related adjuncts -->
      <OptionBox :json="gData.ref" :class="{hidden: !['refRoot','ref','refCS'].includes(wordType)}" code="ref" @send-message="handleSendMessage" ref="ref" @modal="openModal"/>
      <OptionBox :json="gData.refEff" :class="{hidden: !['refRoot','ref','refCS'].includes(wordType)}" code="refEff" @send-message="handleSendMessage" ref="refEff" @modal="openModal"/>
      <OptionBox :json="gData.refPersp" :class="{hidden: !['refRoot','ref','refCS'].includes(wordType)}" code="refPersp" @send-message="handleSendMessage" ref="refPersp" @modal="openModal"/>
      <OptionBox :json="gData.c" :class="{hidden: wordType != 'ref' && wordType != 'refCS'}" code="c1" @send-message="handleSendMessage" ref="c1" @modal="openModal" />
      <!-- used in normal words and some others -->
      <OptionBox :json="gData.root" :class="{hidden: ['affRoot','refRoot','ref','refCS'].includes(wordType)}" code="root" @send-message="handleSendMessage" ref="root" @modal="openModal" length="6" :whitelist="Object.keys(this.cData).concat(['ṭ','ŧ','ḍ','đ','ņ','ṇ','ŗ','ṛ','ł','ḷ','ż'])"/> <!-- @modal="openModal", ref="code" for each of these -->
      <OptionBox :json="gData.stem" :class="{hidden: ['affRoot','refRoot','ref','refCS'].includes(wordType)}" code="stem" @send-message="handleSendMessage" ref="stem" @modal="openModal"/>
      <OptionBox :json="gData.spec" :class="{hidden: wordType == 'ref'}" code="spec" @send-message="handleSendMessage" ref="spec" @modal="openModal"/>
      <OptionBox :json="gData.func" :class="{hidden: wordType == 'ref' || wordType == 'refCS'}" code="func" @send-message="handleSendMessage" ref="func" @modal="openModal"/>
      <OptionBox :json="gData.ver" :class="{hidden: wordType == 'ref' || wordType == 'refCS'}" code="ver" @send-message="handleSendMessage" ref="ver" @modal="openModal"/>
    </div>
    <div class="section" :class="{hidden: ['suppletive','affixjunct','register','modular','ref','refCS','mcs','bias','free'].includes(wordType)}"> <!-- Section 2: Concatenation & Affixes-->
      <OptionBox :json="gData.shcut" code="shcut" @send-message="handleSendMessage" ref="shcut" @modal="openModal"/>
      <OptionBox :json="gData.concat" code="concat" @send-message="handleSendMessage" ref="concat" @modal="openModal"/>
      <OptionBox :json="gData.rel" code="rel" @send-message="handleSendMessage" ref="rel" @modal="openModal" :disabled="this.gOptions.concat != '0'"/>
      <OptionBox :json="gData.Vafx" code="Vafx" @send-message="handleSendMessage" type="affix" ref="Vafx" @modal="openModal" :whitelist="Object.keys(this.cData).concat(['ṭ','ŧ','ḍ','đ','ņ','ṇ','ŗ','ṛ','ł','ḷ','ż'])"/>
      <OptionBox :json="gData.VIIafx" code="VIIafx" @send-message="handleSendMessage" type="affix" ref="VIIafx" @modal="openModal" :whitelist="Object.keys(this.cData).concat(['ṭ','ŧ','ḍ','đ','ņ','ṇ','ŗ','ṛ','ł','ḷ','ż'])"/>
    </div>
    <div class="section" :class="{hidden: ['suppletive','affixjunct','register','modular','ref','refCS','mcs','bias','free'].includes(wordType)}"> <!-- Section 3: Configuration -->
      <h2 style="width:100%;">Configuration</h2>
      <OptionBox :json="gData.plex" code="plex" @send-message="handleSendMessage" ref="plex" @modal="openModal"/>
      <OptionBox :json="gData.simil" code="simil" @send-message="handleSendMessage" :disabled='["UPX","DPX"].includes(this.gOptions.plex)' ref="simil" @modal="openModal"/>
      <OptionBox :json="gData.cctd" code="cctd" @send-message="handleSendMessage" :disabled='["UPX","DPX"].includes(this.gOptions.plex)' ref="cctd" @modal="openModal"/>
    </div>
    <div class="section" :class="{hidden: ['suppletive','affixjunct','register','modular','ref','refCS','mcs','bias','free'].includes(wordType)}"> <!-- Section 4: Slot 6 -->
      <OptionBox :json="gData.affil" code="affil" @send-message="handleSendMessage" ref="affil" @modal="openModal"/>
      <OptionBox :json="gData.ext" code="ext" @send-message="handleSendMessage" ref="ext" @modal="openModal"/>
      <OptionBox :json="gData.persp" code="persp" @send-message="handleSendMessage" ref="persp" @modal="openModal"/>
      <OptionBox :json="gData.ess" code="ess" @send-message="handleSendMessage" ref="ess" @modal="openModal"/>
    </div>

    <!-- MODULAR ADJUNCT -->
    <div class="section" :class="{hidden: wordType != 'modular'}">
      <OptionBox :json="gData.modAppliesTo" code="modAppliesTo" @send-message="handleSendMessage" ref="modAppliesTo" @modal="openModal"/>
      <OptionBox :json="gData.modNumber" code="modNumber" @send-message="handleSendMessage" ref="modNumber" @modal="openModal"/>
      <OptionBox :json="gData.cn" code="cn" @send-message="handleSendMessage" ref="cn" @modal="openModal"/>
    </div>
    <div class="section" :class="{hidden: wordType != 'modular' || (wordType == 'modular' && !['2','3','4'].includes(gOptions.modNumber))}">
    <h2 style="width:100%;">Slot II</h2>
      <OptionBox :json="gData.vn" code="vn2" @send-message="handleSendMessage" ref="vn2" @modal="openModal"/>
      <OptionBox :json="gData.val" code="val2" @send-message="handleSendMessage" ref="val2" @modal="openModal" :class='{hidden: this.gOptions.vn2 != "val"}'/>
      <OptionBox :json="gData.pha" code="pha2" @send-message="handleSendMessage" ref="pha2" @modal="openModal" :class='{hidden: this.gOptions.vn2 != "pha"}'/>
      <OptionBox :json="gData.eff" code="eff2" @send-message="handleSendMessage" ref="eff2" @modal="openModal" :class='{hidden: this.gOptions.vn2 != "eff"}'/>
      <OptionBox :json="gData.lvl" code="lvl2" @send-message="handleSendMessage" ref="lvl2" @modal="openModal" :class='{hidden: this.gOptions.vn2 != "lvl"}'/>
      <OptionBox :json="gData.abslvl" code="abslvl2" @send-message="handleSendMessage" ref="abslvl2" @modal="openModal" :class='{hidden: this.gOptions.vn2 != "lvl"}'/>
      <OptionBox :json="gData.asp" code="asp2" @send-message="handleSendMessage" ref="asp2" @modal="openModal" :class='{hidden: this.gOptions.vn2 != "asp"}'/>
      <OptionBox :json="gData.mood" code="mood2" @send-message="handleSendMessage" ref="mood2" @modal="openModal" :class='{hidden: this.gOptions.cn != "mood"}'/>
      <OptionBox :json="gData.casc" code="casc2" @send-message="handleSendMessage" ref="casc2" @modal="openModal" :class='{hidden: this.gOptions.cn != "casc"}'/>
    </div>
    <div class="section" :class="{hidden: wordType != 'modular' || (wordType == 'modular' && !['3','4'].includes(gOptions.modNumber))}">
    <h2 style="width:100%;">Slot III</h2>
      <OptionBox :json="gData.vn" code="vn3" @send-message="handleSendMessage" ref="vn3" @modal="openModal"/>
      <OptionBox :json="gData.val" code="val3" @send-message="handleSendMessage" ref="val3" @modal="openModal" :class='{hidden: this.gOptions.vn3 != "val"}'/>
      <OptionBox :json="gData.pha" code="pha3" @send-message="handleSendMessage" ref="pha3" @modal="openModal" :class='{hidden: this.gOptions.vn3 != "pha"}'/>
      <OptionBox :json="gData.eff" code="eff3" @send-message="handleSendMessage" ref="eff3" @modal="openModal" :class='{hidden: this.gOptions.vn3 != "eff"}'/>
      <OptionBox :json="gData.lvl" code="lvl3" @send-message="handleSendMessage" ref="lvl3" @modal="openModal" :class='{hidden: this.gOptions.vn3 != "lvl"}'/>
      <OptionBox :json="gData.abslvl" code="abslvl3" @send-message="handleSendMessage" ref="abslvl3" @modal="openModal" :class='{hidden: this.gOptions.vn3 != "lvl"}'/>
      <OptionBox :json="gData.asp" code="asp3" @send-message="handleSendMessage" ref="asp3" @modal="openModal" :class='{hidden: this.gOptions.vn3 != "asp"}'/>
      <OptionBox :json="gData.mood" code="mood3" @send-message="handleSendMessage" ref="mood3" @modal="openModal" :class='{hidden: this.gOptions.cn != "mood"}'/>
      <OptionBox :json="gData.casc" code="casc3" @send-message="handleSendMessage" ref="casc3" @modal="openModal" :class='{hidden: this.gOptions.cn != "casc"}'/>
    </div>
    <div class="section" :class="{hidden: wordType != 'modular' || (wordType == 'modular' && gOptions.modNumber != '4')}">
    <h2 style="width:100%;">Slot IV</h2>
      <OptionBox :json="gData.vn" code="vn4" @send-message="handleSendMessage" ref="vn4" @modal="openModal"/>
      <OptionBox :json="gData.val" code="val4" @send-message="handleSendMessage" ref="val4" @modal="openModal" :class='{hidden: this.gOptions.vn4 != "val"}'/>
      <OptionBox :json="gData.pha" code="pha4" @send-message="handleSendMessage" ref="pha4" @modal="openModal" :class='{hidden: this.gOptions.vn4 != "pha"}'/>
      <OptionBox :json="gData.eff" code="eff4" @send-message="handleSendMessage" ref="eff4" @modal="openModal" :class='{hidden: this.gOptions.vn4 != "eff"}'/>
      <OptionBox :json="gData.lvl" code="lvl4" @send-message="handleSendMessage" ref="lvl4" @modal="openModal" :class='{hidden: this.gOptions.vn4 != "lvl"}'/>
      <OptionBox :json="gData.abslvl" code="abslvl4" @send-message="handleSendMessage" ref="abslvl4" @modal="openModal" :class='{hidden: this.gOptions.vn4 != "lvl"}'/>
      <OptionBox :json="gData.asp" code="asp4" @send-message="handleSendMessage" ref="asp4" @modal="openModal" :class='{hidden: this.gOptions.vn4 != "asp"}'/>
      <OptionBox :json="gData.mood" code="mood4" @send-message="handleSendMessage" ref="mood4" @modal="openModal" :class='{hidden: this.gOptions.cn != "mood"}'/>
      <OptionBox :json="gData.casc" code="casc4" @send-message="handleSendMessage" ref="casc4" @modal="openModal" :class='{hidden: this.gOptions.cn != "casc"}'/>
    </div>
    <!-- END OF MODULAR ADJUNCT -->

    <div class="section" :class="{hidden: ['suppletive','affixjunct','register','ref','refCS','mcs','bias','free'].includes(wordType)}"> <!-- Section 5: Slot 8a -->
      <h2 style="width:100%;" :class='{hidden: this.wordType != "modular" || this.gOptions.modNumber == "1"}'>Slot V</h2>
      <OptionBox :json="gData.vh" code="vh" @send-message="handleSendMessage" ref="vh" @modal="openModal" :class='{hidden: this.wordType != "modular"}' :disabled='this.gOptions.modNumber == "1"'/>
      <OptionBox :json="gData.modScope" code="modScope" @send-message="handleSendMessage" ref="modScope" @modal="openModal" :class='{hidden: this.wordType != "modular" || this.gOptions.modNumber == "1" || this.gOptions.vh == "vn"}'/>
      <OptionBox :json="gData.vn" code="vn" @send-message="handleSendMessage" ref="vn" @modal="openModal" :class='{hidden: this.wordType == "modular" && (this.gOptions.vh != "vn" || this.gOptions.modNumber == "1")}'/>
      <OptionBox :json="gData.val" code="val" @send-message="handleSendMessage" ref="val" @modal="openModal" :disabled='this.gOptions.vn != "val"' :class='{hidden: this.wordType == "modular" && (this.gOptions.vh != "vn" || this.gOptions.modNumber == "1")}'/>
      <OptionBox :json="gData.pha" code="pha" @send-message="handleSendMessage" ref="pha" @modal="openModal" :disabled='this.gOptions.vn != "pha"' :class='{hidden: this.wordType == "modular" && (this.gOptions.vh != "vn" || this.gOptions.modNumber == "1")}'/>
      <OptionBox :json="gData.eff" code="eff" @send-message="handleSendMessage" ref="eff" @modal="openModal" :disabled='this.gOptions.vn != "eff"' :class='{hidden: this.wordType == "modular" && (this.gOptions.vh != "vn" || this.gOptions.modNumber == "1")}'/>
      <OptionBox :json="gData.lvl" code="lvl" @send-message="handleSendMessage" ref="lvl" @modal="openModal" :disabled='this.gOptions.vn != "lvl"' :class='{hidden: this.wordType == "modular" && (this.gOptions.vh != "vn" || this.gOptions.modNumber == "1")}'/>
      <OptionBox :json="gData.abslvl" code="abslvl" @send-message="handleSendMessage" ref="abslvl" @modal="openModal" :disabled='this.gOptions.vn != "lvl"' :class='{hidden: this.wordType == "modular" && (this.gOptions.vh != "vn" || this.gOptions.modNumber == "1")}'/>
      <OptionBox :json="gData.asp" code="asp" @send-message="handleSendMessage" ref="asp" @modal="openModal" :disabled='(this.gOptions.vn != "asp" && this.wordType != "modular") || (this.wordType == "modular" && this.gOptions.modNumber != "1")' :class='{hidden: this.wordType == "modular" && this.gOptions.modNumber != "1"}'/>
    </div>
    <div class="section" :class="{hidden: ['affixjunct','register','modular','ref','refCS','bias','free'].includes(wordType)}"> <!-- Section 6: Slot 8b to 10 / Suppletive Adjunct / M/CS Adjunct -->
      <OptionBox :class="{hidden: wordType != 'suppletive'}" :json="gData.suppType" code="suppType" @send-message="handleSendMessage" ref="suppType" @modal="openModal"/>
      <OptionBox :class="{hidden: wordType != 'mcs'}" :json="gData.cn" code="cn2" @send-message="handleSendMessage" ref="cn2" @modal="openModal" />

      <OptionBox :class="{hidden: wordType == 'suppletive' || wordType == 'mcs'}" :json="gData.ctxt" code="ctxt" @send-message="handleSendMessage" ref="ctxt" @modal="openModal" :disabled="wordType == 'affRoot'"/>
      <OptionBox :class="{hidden: wordType == 'suppletive'}" :show='!cascOrMood && wordType!="mcs"' :json="gData.mood" code="mood" @send-message="handleSendMessage" ref="mood" @modal="openModal"/>
      <OptionBox :class="{hidden: wordType == 'suppletive'}" :show='cascOrMood && wordType!="mcs"' :json="gData.casc" code="casc" @send-message="handleSendMessage" ref="casc" @modal="openModal"/>
      <OptionBox :class="{hidden: wordType == 'mcs'}" :show="cascOrMood" :json="gData.c" code="c" @send-message="handleSendMessage" ref="c" @modal="openModal"/>
      <OptionBox :class="{hidden: wordType == 'suppletive' || wordType == 'mcs'}" :show="!cascOrMood" :json="gData.ill" code="ill" @send-message="handleSendMessage" ref="ill" @modal="openModal"/>
      <OptionBox :class="{hidden: wordType == 'suppletive' || wordType == 'mcs'}" :show="!cascOrMood" :json="gData.vld" code="vld" @send-message="handleSendMessage" :disabled='this.gOptions.ill != "ASR"' ref="vld" @modal="openModal"/>
    </div>

    <!-- AFFIXUAL ADJUNCT -->
    <div class="section" :class="{hidden: wordType != 'affixjunct'}">
      <OptionBox :json="gData.affixjunct" code="affixjunct" @send-message="handleSendMessage" ref="affixjunct" @modal="openModal" :reqAff="true" :whitelist="Object.keys(this.cData).concat(['ṭ','ŧ','ḍ','đ','ņ','ṇ','ŗ','ṛ','ł','ḷ','ż'])"/>
      <OptionBox :json="gData.initialAffScope" code="initialAffScope" @send-message="handleSendMessage" ref="initialAffScope" @modal="openModal"/>
      <OptionBox :json="gData.otherAffScope" code="otherAffScope" @send-message="handleSendMessage" ref="otherAffScope" @modal="openModal" :disabled='this.gOptions.affixjunct.length < 2'/>
      <OptionBox :json="gData.affScopeOf" code="affScopeOf" @send-message="handleSendMessage" ref="affScopeOf" @modal="openModal"/>
    </div>
    <!-- REGISTER ADJUNCT -->
    <div class="section" :class="{hidden: wordType != 'register'}">
      <OptionBox :json="gData.register" code="register" @send-message="handleSendMessage" ref="register" @modal="openModal"/>
      <OptionBox :json="gData.regStartOrEnd" code="regStartOrEnd" @send-message="handleSendMessage" ref="regStartOrEnd" @modal="openModal" :disabled='this.gOptions.register == "CAR"'/>
    </div>
    <!-- REFERENTIAL ADJUNCTS -->
    <div class="section" :class="{hidden: wordType != 'ref' && wordType != 'refCS'}">
      <OptionBox :json="gData.refAffix" :class="{hidden: wordType != 'refCS'}" code="refAffix" @send-message="handleSendMessage" ref="refAffix" @modal="openModal" :whitelist="Object.keys(this.cData).concat(['ṭ','ŧ','ḍ','đ','ņ','ṇ','ŗ','ṛ','ł','ḷ','ż'])"/>
      <OptionBox :json="gData.twoCs" code="twoCs" @send-message="handleSendMessage" ref="twoCs" @modal="openModal"/>
      <OptionBox :json="gData.twoRefs" :class="{hidden: wordType == 'refCS'}" code="twoRefs" @send-message="handleSendMessage" ref="twoRefs" @modal="openModal" :disabled="!this.gOptions.twoCs"/>
      <OptionBox :json="gData.ref" code="ref2" :class="{hidden: wordType == 'refCS'}" @send-message="handleSendMessage" ref="ref2" @modal="openModal" :disabled="!this.gOptions.twoRefs || !this.gOptions.twoCs"/>
      <OptionBox :json="gData.refEff" code="refEff2" :class="{hidden: wordType == 'refCS'}" @send-message="handleSendMessage" ref="refEff2" @modal="openModal" :disabled="!this.gOptions.twoRefs || !this.gOptions.twoCs"/>
      <OptionBox :json="gData.refPersp" code="refPersp2" :class="{hidden: wordType == 'refCS'}" @send-message="handleSendMessage" ref="refPersp2" @modal="openModal" :disabled="!this.gOptions.twoRefs || !this.gOptions.twoCs"/>
      <OptionBox :json="gData.c" code="c2" @send-message="handleSendMessage" ref="c2" @modal="openModal" :disabled="!this.gOptions.twoCs"/>
      <OptionBox :json="gData.ess" code="ess2" @send-message="handleSendMessage" ref="ess2" @modal="openModal"/>
    </div>
    <!-- BIAS ADJUNCT -->
    <div class="section" :class="{hidden: wordType != 'bias'}">
      <OptionBox :json="gData.bias" code="bias" @send-message="handleSendMessage" ref="bias" @modal="openModal"/>
    </div>
    <!-- BORROWED WORD -->
    <div class="section" :class="{hidden: wordType != 'free'}">
      <OptionBox :json="gData.freeType" code="freeType" ref="freeType" @send-message="handleSendMessage" @modal="openModal"/>
    </div>
    </div>
</template>

<script>
import OptionBox from '../components/optionbox.vue'
import grammardata from '../grammardata.json'
import consdata from '../consdata.json'

export default {
    name: "Ithkuil_v4",
    components: {
        OptionBox,    
    },
    props: { // basically all of these are listeners
        listenModal: Array, // listener for updateModal - is an array of [reference,value]
        listenWordtype: String, // listener for switchWordType - is the word type
        listenWord: Object, // listener for handleSendMessage - is gOptions
        selectedWord: Number,
        sLength: Number,
        nextWord: Array,
    },
    watch: {
        // listen for variables
        listenModal(arr) {
            this.updateFromModal(arr[0],arr[1]);
        },
        listenWordtype(str) {
            this.switchWordType(str);
        },
        listenWord(obj) {
            this.gOptions = JSON.parse(JSON.stringify(obj));
            for (var property in obj) {
                this.updateFromModal(property,JSON.parse(JSON.stringify(obj[property])));
            }
            this.handleSendMessage(obj.root, "root"); // recalculate the word
        },
        // emit variables
        ithkword(word) {
            this.$emit("ithkword",[word,this.ipa,this.gloss,this.fullGloss]);
            this.$emit("gEmit",this.gOptions);
        },
        ipa(ipa) {
            this.$emit("ithkword",[this.ithkword,ipa,this.gloss,this.fullGloss]);
        },
        gloss(gloss) {
            this.$emit("ithkword",[this.ithkword,this.ipa,gloss,this.fullGloss]);
        },
        fullGloss(gloss) {
            this.$emit("ithkword",[this.ithkword,this.ipa,this.gloss,gloss]);
        }
    },
    data() {
        return {
            defaultWord: "aal",
            settings: {
              "IPA": {
                "a": ["Pronunciation of ⟨a⟩: ","[a]",["[a]","[ɑ]"]],
                "e": ["Pronunciation of ⟨e⟩: ","[ɛ]",["[ɛ]","[e]"]],
                "ë": ["Pronunciation of ⟨ë⟩: ","[ɤ]",["[ɤ]","[ʌ]","[ə]"]],
                "i": ["Pronunciation of ⟨i⟩: ","[i]",["[i]","[ɪ]"]],
                "o": ["Pronunciation of ⟨o⟩: ","[ɔ]",["[ɔ]","[o]"]],
                "ö": ["Pronunciation of ⟨ö⟩: ","[œ]",["[œ]","[ø]"]],
                "u": ["Pronunciation of ⟨u⟩: ","[ʊ]",["[ʊ]","[u]"]],
                "ü": ["Pronunciation of ⟨ü⟩: ","[ʉ]",["[ʉ]","[y]"]],
                "x": ["Pronunciation of ⟨x⟩: ","[x]",["[x]","[χ]"]],
                "rr": ["Pronunciation of ⟨řř⟩: ","[ʁː]",["[ʁː]","[ʀ]"]],
                "hx": ["Pronunciation of ⟨hl⟩, ⟨hr⟩, ⟨hm⟩, ⟨hn⟩, ⟨hň⟩: ","Devoiced",["Devoiced","As written"]],
              },
              "Miscellaneous": {
                "ej": ["Calculate External Juncture? ",true]
              }
            },
            wordType: "normal",
            gData: grammardata,
            cData: consdata,
            gDefault: { // default grammar options
                // NORMAL WORD OPTIONS
                "root":"",
                "stem":"s1",
                "func":"STA",
                "spec":"BSC",
                "ctxt":"EXS",
                "ver":"PRC",
                "concat":"0",
                "shcut":"0",
                "Vafx":[],
                "VIIafx":[],
                "plex":"UPX",
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
                "abslvl": false,
                "asp":"RTR",
                "mood":"FAC",
                "casc":"CCN",
                "rel": "UNF/C",
                "c":"THM",
                "ill":"ASR",
                "vld":"OBS",
                // SUPPLETIVE ADJUNCT OPTION
                "suppType": "hl",
                // ROOT-AFFIX ADJUNCT OPTIONS
                "affRoot": "",
                "arDegree": 0,
                // AFFIX ADJUNCT OPTIONS
                "affixjunct": [],
                "initialAffScope": "VDom",
                "otherAffScope": "VDom",
                "affScopeOf": "default",
                // REGISTER ADJUNCT OPTIONS
                "register": "DSV",
                "regStartOrEnd": "0",
                // MODULAR ADJUNCT OPTIONS
                "vn2":"val",
                "val2":"MNO",
                "pha2":"PCT",
                "eff2":"1:BEN",
                "lvl2":"MIN",
                "abslvl2": false,
                "asp2":"RTR",
                "mood2":"FAC",
                "casc2":"CCN",
                "vn3":"val",
                "val3":"MNO",
                "pha3":"PCT",
                "eff3":"1:BEN",
                "lvl3":"MIN",
                "abslvl3": false,
                "asp3":"RTR",
                "mood3":"FAC",
                "casc3":"CCN",
                "vn4":"val",
                "val4":"MNO",
                "pha4":"PCT",
                "eff4":"1:BEN",
                "lvl4":"MIN",
                "abslvl4": false,
                "asp4":"RTR",
                "mood4":"FAC",
                "casc4":"CCN",
                "cn": "mood",
                "modAppliesTo":"all",
                "modNumber": "1",
                "vh": "vn",
                "modScope": "a",
                // PERSONAL-REFERENCE ADJUNCT OPTIONS
                "ref": "1M",
                "refEff": "NEU",
                "refPersp": "M",
                "ref2": "1M",
                "refEff2": "NEU",
                "refPersp2": "M",
                "ess2": "NRM",
                "c1": "THM",
                "c2": "THM",
                "twoRefs": false,
                "twoCs": false,
                "refAffix": [],
                // MOOD/CASE-SCOPE ADJUNCTS
                "cn2": "mood",
                // BIAS ADJUNCTS
                "bias": "ACC",
                // BORROWED WORD
                "freeType": "",
            },
            gOptions: {}, // grammar options,
            sVowels: [ // the "Standard Vowel-Form Sequence" as an array
                ["a","ai","ia","ao"],
                ["ä","au","ie","aö"],
                ["e","ei","io","eo"],
                ["i","eu","iö","eö"],
                ["ëi","ëu","eë","oë"],
                ["ö","ou","uö","öe"],
                ["o","oi","uo","oe"],
                ["ü","iu","ue","öa"],
                ["u","ui","ua","oa"],
                ["ae","ea","üo","üö"]
            ],
            ipaLookup: { // n, x, r, rr, řř, hl, hr, hm, hn (ph, th, kh, ch, čh)
                "p":"p",
                "b":"b",
                "m":"m",
                "f":"f",
                "v":"v",
                "w":"w",
                "t":"t",
                "d":"d",
                "ţ":"θ",
                "ḑ":"ð",
                "s":"s",
                "z":"z",
                "c":"ts",
                "ẓ":"dz",
                "š":"ʃ",
                "ž":"ʒ",
                "č":"tʃ",
                "j":"dʒ",
                "ç":"ç",
                "y":"j",
                "k":"k",
                "g":"g",
                "ň":"ŋ",
                "ř":"ʁ",
                "'":"ʔ",
                "h":"h",
                "ļ":"ɬ",
                "l":"l",
                // everything else has a reliance on the surrounding letters
            },
            shortcutting: false,
            shcuttypeA: 0,
            shcuttypeB: 0,
            slotVIIshortcut: false,
            sDip: ["ai","ei","ëi","oi","ui","au","eu","ëu","ou","iu"], // permissible diphthongs
            sAccent: {"a":"á","e":"é","i":"í","ì":"í","o":"ó","u":"ú","ä":"â","ë":"ê","ö":"ô","ü":"û"}, // how to accent vowels
            slots: ["","","","","","","","","","",""], // ithkuil word, split into slots (0-6 = I-VII, 7-8 = VIII, 9 = IX, 10 = ungeminated VI)
            cut: [false,false,false], // cut vowels - slots 2, 9, and 8a
            ithkword: "", // the calculated ithkuil word
            gloss: "", // gloss of word
            fullGloss: "", // full version of above
            ipa: "", // IPA transcription
            cascOrMood: false, // false if case scope, true if mood.
            eightSix: false, // true if slot 8 has been moved to slot 6
            allographs: {
              "cczz":"čč",
              "yc":"čč",
              "xxy":"çç",
              "ccs":"çç",
              "ddt":"ḑḑ",
              "hxll":"ļļ",
              "wwnn":"ňň",
              "yn":"ňň",
              "wrr":"řř",
              "yr":"řř",
              "ssz":"šš",
              "tts":"ţţ",
              "ttd":"ţţ",
              "wtt":"ţţ",
              "zzs":"žž",
              "ddz":"ẓẓ",
              "dzz":"ẓẓ",
              "cz":"č",
              "xy":"ç",
              "cs":"ç",
              "dt":"ḑ",
              "hxl":"ļ",
              "wn":"ň",
              "wr":"ř",
              "sz":"š",
              "ts":"ţ",
              "td":"ţ",
              "wt":"ţ",
              "zs":"ž",
              "dz":"ẓ",
              "aaqqq":"â'",
              "eeqqq":"ê'",
              "ooqqq":"ô'",
              "uuqqq":"û'",
              "aqqq":"ä'",
              "eqqq":"ë'",
              "oqqq":"ö'",
              "uqqq":"ü'",
              "qq":"'",
              "aaq":"â",
              "ooq":"ô",
              "eeq":"ê",
              "uuq":"û",
              "aq":"ä",
              "eq":"ë",
              "uq":"ü",
              "oq":"ö",
              "aa":"á",
              "ee":"é",
              "ii":"í",
              "oo":"ó",
              "uu":"ú",
              "ṭ":"ţ",
              "ŧ":"ţ",
              "ḍ":"ḑ", // yes these are different characters
              "đ":"ḑ",
              "ņ":"ň",
              "ṇ":"ň",
              "ŗ":"ř",
              "ṛ":"ř",
              "ł":"ļ",
              "ḷ":"ļ", // these are also different
              "ż":"ẓ",
              "ı":"i",
            },
        }
    },
    methods: {
        async handleSendMessage(value="",code="") { // what happens when an <OptionBox> updates its value
            this.cut = [false,false,false]; // reset this.cut
            if (code) {
              await (()=>{ // apparently this being SPECIFICALLY await is important to making sure the Slot V and VII affixes work???
              })();
              //(()=>{
                var outval = JSON.parse(JSON.stringify(value));
                if (this.gData[code].type == "text") {
                  for (let key in this.allographs) { 
                    outval = outval.replaceAll(key,this.allographs[key]);
                  }
                } else if (this.gData[code].type == "affix") {
                  for (let afx in outval) {
                    for (let key in this.allographs)
                    outval[afx][0] = outval[afx][0].replaceAll(key,this.allographs[key]);
                  }
                } else {
                  outval = value;
                }
                this.gOptions[code] = outval;
              //})();
            }
            if (this.wordType == 'normal' || this.wordType == 'affRoot' || this.wordType == 'refRoot'){
                //if (code == "root") {this.slots[2] = value.toLowerCase()} // this is essentially this.calculateSlot3(), because slot 3 is just the root
                this.calculateWord();
                this.IPAcalcs();
                this.glossCalcs();
                this.cascOrMood = (this.gOptions.rel == 'UNF/K' && this.gOptions.concat == '0');
            } else {
                this.gloss = "";
                this.fullGloss = "";
                this.cascOrMood = false;
                this.calculateAdjunct(this.wordType);
                this.IPAcalcs();
                // need to figure out how to gloss adjuncts/
            }
        },
        notAvailableAlert(al) {
            alert(al + " is not available yet!");
        },
        openModal(code) {
            this.$emit("modal",code);
        },
        updateFromModal(reference,value) {
            this.$refs[reference].updateValue(value);
        },
    switchWordType(type) {
      this.wordType = type;
      this.calculateAdjunct(type);
      //this.closeDropdown('adjDD',{},true);
      //this.closeDropdown('formDD',{},true);
      this.handleSendMessage(this.gOptions.root,"root");
    },
    calculateAdjunct(type) {
      var output = "";

      if (type == "suppletive") {
        this.calculateSlot9();
        this.slot9gStop();
        this.ithkword = this.gOptions.suppType + this.slots[9]
        this.gloss = {"hl":"[CAR]","hm":"[QUO]","hn":"[NAM]","hň":"[PHR]"}[this.gOptions.suppType]+(this.gOptions.c == "THM" ? "" : "-"+this.gOptions.c);
        this.fullGloss = {"hl":"[CAR]","hm":"[QUO]","hn":"[NAM]","hň":"[PHR]"}[this.gOptions.suppType]+"-"+this.gOptions.c+"\\NRM";

      } else if (type == "affixjunct") {
        var afxjunctV = {"VDom":"a","VSub":"u","VIIDom":"e","VIISub":"i","formative":"o","adjacent":"ö","same":"ai"};
        var afxjunctC = {"VDom":"h","VSub":"'h","VIIDom":"'hl","VIISub":"'hr","formative":"hw","adjacent":"'hw"};
        try {
          this.gloss = "'" + this.gOptions.affixjunct[0][0] + "'/" + this.gOptions.affixjunct[0][1] + (this.gOptions.affixjunct[0][1] != "CA" ? {1:"₁",2:"₂",3:"₃",4:"₄"}[this.gOptions.affixjunct[0][2]] : "");
          this.fullGloss = this.gloss;
          this.gloss += (this.gOptions.initialAffScope == "VDom" ? "" : "-{"+this.gOptions.initialAffScope+"}");
          this.fullGloss += "-{"+this.gOptions.initialAffScope+"}";
        } catch {
          this.gloss = "";
          this.fullGloss = "";
        }
        if (this.gOptions.affixjunct.length < 1) {
          this.ithkword = "";
          this.gloss = "";
          this.fullGloss = "";
        } else if (this.gOptions.affixjunct.length == 1) {
          var finalvowel = afxjunctV[this.gOptions.initialAffScope];
          var ll = this.gOptions.affixjunct[0];
          if (ll[1] != "CA") {
            if (finalvowel == "a" && this.allowedAtEnd(ll[0]) && (this.gOptions.affScopeOf == "conc" || (this.sVowels[(ll[1]+9)%10][ll[2]-1].length > 1 && !this.sDip.includes(this.sVowels[(ll[1]+9)%10][ll[2]-1])))) {
              // if: the final vowel can be dropped (is a), the final consonants can be at the end,
              // and either the word can be one syllable long OR the other vowel cluster is two syllables,
              finalvowel = ""; // then drop the final vowel.
            }
          } else {
            if (finalvowel == "a" && this.allowedAtEnd(ll[0]) && (this.gOptions.affScopeOf == "conc" || ("üö".length > 1 && !this.sDip.includes("üö")))) {
              // same as above, but if CA
              finalvowel = "";
            }
          }
          if (ll[1] != "CA") {
            this.ithkword = this.sVowels[(ll[1]+9)%10][ll[2]-1]+ll[0]+finalvowel;
          } else {
            this.ithkword = "üö"+ll[0]+finalvowel;
          }
        } else {
          var out = "";
          var lll = this.gOptions.affixjunct[0]
          if (!this.allowedAtStart(lll[0])) {
            out += "ë";
          }
          if (lll[1] != "CA") {
            out += lll[0] + this.sVowels[(lll[1]+9)%10][lll[2]-1];
          } else {
            out += lll[0] + "üö";
          }
          out += afxjunctC[this.gOptions.initialAffScope];
          for (var k of this.gOptions.affixjunct.slice(1)) {
            if (k[1] != "CA") {
              out += this.sVowels[(k[1]+9)%10][k[2]-1];
            } else {
              out += "üö";
            }
            out += k[0];
          }
          out += afxjunctV[this.gOptions.otherAffScope];
          out = this.recalcVowels(out);
          this.ithkword = out;
          for (let i of this.gOptions.affixjunct.slice(1)) {
            this.gloss += "-'" + i[0] + "'/" + i[1] + (i[1] != "CA" ? {1:"₁",2:"₂",3:"₃",4:"₄"}[i[2]] : "");
            this.fullGloss += "-'" + i[0] + "'/" + i[1] + (i[1] != "CA" ? {1:"₁",2:"₂",3:"₃",4:"₄"}[i[2]] : "");
          }
          this.gloss += (this.gOptions.otherAffScope == "same" ? "" : "-{" + this.gOptions.otherAffScope + "}");
          this.fullGloss += "-{" + this.gOptions.otherAffScope + "}"
        }
        if (this.gOptions.affixjunct.length > 0) {
          this.gloss += (this.gOptions.affScopeOf == "conc" ? "{concat.}" : "");
          this.fullGloss += (this.gOptions.affScopeOf == "conc" ? "{concat.}" : "");
          this.ithkword = this.markStress(["conc","default"].indexOf(this.gOptions.affScopeOf),this.ithkword);
        }

      } else if (type=="register") {
        var ph = {"DSV":["a","ai"],"PNT":["e","ei"],"SPF":["i","iu"],"EXM":["o","oi"],"CGT":["ö","üo"],"MTH":["u","ui"],"CAR":["ü","ü"],}
        this.ithkword = "h" + ph[this.gOptions.register][this.gOptions.regStartOrEnd];
        this.gloss = this.gOptions.register + (this.gOptions.regStartOrEnd == "1" || this.gOptions.register == "CAR" ? "_END" : "");
        this.fullGloss = this.gloss;

      } else if (type=="modular") {
        output += {"all":"","parent":"w","concat.":"y"}[this.gOptions.modAppliesTo];
        this.gloss = this.gOptions.modAppliesTo != "all" ? "{"+this.gOptions.modAppliesTo+"}-" : "";
        if (["2","3","4"].includes(this.gOptions.modNumber)) {
          output += this.calculateSlot8a("2");
          output += this.calculateSlot8b("2",this.gOptions.cn);
          this.gloss += (this.gOptions[this.gOptions.vn2+"2"] != "MNO" ? this.gOptions[this.gOptions.vn2+"2"] + (this.gOptions.vn2 == "lvl" ? (this.gOptions.abslvl2 ? "a" : "r") : "") : "");
          this.gloss += (this.gOptions[this.gOptions.vn2+"2"] != "MNO" && this.gOptions[this.gOptions.cn+"2"] != "FAC" && this.gOptions[this.gOptions.cn+"2"] != "CCN" ? "." : "");
          this.gloss += (this.gOptions[this.gOptions.cn+"2"] != "FAC" && this.gOptions[this.gOptions.cn+"2"] != "CCN" ? this.gOptions[this.gOptions.cn+"2"] : "")
          this.fullGloss += this.gOptions[this.gOptions.vn2+"2"] + (this.gOptions.vn2 == "lvl" ? (this.gOptions.abslvl2 ? "a" : "r") : "") + "." + this.gOptions[this.gOptions.cn+"2"];
        } if (["3","4"].includes(this.gOptions.modNumber)) {
          output += this.calculateSlot8a("3");
          output += this.calculateSlot8b("3",this.gOptions.cn);
          this.gloss += (this.gOptions[this.gOptions.vn3+"3"] != "MNO" || this.gOptions[this.gOptions.cn+"3"] != "FAC" && this.gOptions[this.gOptions.cn+"3"] != "CCN" ? "-" : "");
          this.gloss += (this.gOptions[this.gOptions.vn3+"3"] != "MNO" ? this.gOptions[this.gOptions.vn3+"3"] + (this.gOptions.vn3 == "lvl" ? (this.gOptions.abslvl3 ? "a" : "r") : "") : "");
          this.gloss += (this.gOptions[this.gOptions.vn3+"3"] != "MNO" && this.gOptions[this.gOptions.cn+"3"] != "FAC" && this.gOptions[this.gOptions.cn+"3"] != "CCN" ? "." : "");
          this.gloss += (this.gOptions[this.gOptions.cn+"3"] != "FAC" && this.gOptions[this.gOptions.cn+"3"] != "CCN" ? this.gOptions[this.gOptions.cn+"3"] : "")
          this.fullGloss += "-" + this.gOptions[this.gOptions.vn3+"3"] + (this.gOptions.vn3 == "lvl" ? (this.gOptions.abslvl3 ? "a" : "r") : "") + "." + this.gOptions[this.gOptions.cn+"3"];
        } if (this.gOptions.modNumber == "4") {
          output += this.calculateSlot8a("4");
          output += this.calculateSlot8b("4",this.gOptions.cn);
          this.gloss += (this.gOptions[this.gOptions.vn4+"4"] != "MNO" || this.gOptions[this.gOptions.cn+"4"] != "FAC" && this.gOptions[this.gOptions.cn+"4"] != "CCN" ? "-" : "");
          this.gloss += (this.gOptions[this.gOptions.vn4+"4"] != "MNO" ? this.gOptions[this.gOptions.vn4+"4"] + (this.gOptions.vn4 == "lvl" ? (this.gOptions.abslvl4 ? "a" : "r") : "") : "");
          this.gloss += (this.gOptions[this.gOptions.vn4+"4"] != "MNO" && this.gOptions[this.gOptions.cn+"4"] != "FAC" && this.gOptions[this.gOptions.cn+"4"] != "CCN" ? "." : "");
          this.gloss += (this.gOptions[this.gOptions.cn+"4"] != "FAC" && this.gOptions[this.gOptions.cn+"4"] != "CCN" ? this.gOptions[this.gOptions.cn+"4"] : "")
          this.fullGloss += "-" + this.gOptions[this.gOptions.vn4+"4"] + (this.gOptions.vn4 == "lvl" ? (this.gOptions.abslvl4 ? "a" : "r") : "") + "." + this.gOptions[this.gOptions.cn+"4"];
        }
        output = this.recalcVowels(output);
        if (this.gOptions.modNumber == "1") {
          output += this.calculateSlot8a("","asp");
          this.gloss += this.gOptions.asp;
          this.fullGloss += this.gOptions.asp;
        } else if (this.gOptions.vh == "vn") {
          output += this.calculateSlot8a();
          this.gloss += (this.gOptions[this.gOptions.vn] != "MNO" ? "-" + this.gOptions[this.gOptions.vn] + (this.gOptions.vn == "lvl" ? (this.gOptions.abslvl ? "a" : "r") : "") : "");
          this.fullGloss += "-" + this.gOptions[this.gOptions.vn] + (this.gOptions.vn == "lvl" ? (this.gOptions.abslvl ? "a" : "r") : "");
        } else {
          output += this.gOptions.modScope;
          output = this.markStress(0,output);
          this.gloss += "-{"+{"a":"form.","e":"mood","i":"under adj.","o":"over adj.","u":"under adj."}[this.gOptions.modScope]+"}"
          this.fullGloss += "-{"+{"a":"form.","e":"mood","i":"under adj.","o":"over adj.","u":"under adj."}[this.gOptions.modScope]+"}"
        }
        this.ithkword = output;

      } else if (type=="ref") {
        var refA = this.calculateReference(this.gOptions.ref,this.gOptions.refEff,this.gOptions.refPersp);
        output += this.allowedAtStart(refA) && !(!this.gOptions.twoCs && this.gOptions.ess2 == "RPV") ? "" : "ë";
        output += refA;
        this.calculateSlot9("1");
        this.slot9gStop();
        output += this.slots[9];
        let gla = this.refGloss(this.gOptions.ref,this.gOptions.refEff,this.gOptions.refPersp);
        this.gloss = gla[0];
        this.fullGloss = gla[1];
        this.gloss += this.gOptions.c1 == "THM" && !this.gOptions.twoCs ? "" : "-" + this.gOptions.c1;
        this.fullGloss += "-" + this.gOptions.c1;
        if (this.gOptions.twoCs) {
          output += "w";
          this.calculateSlot9("2");
          this.slot9gStop();
          output += this.slots[9];
          this.gloss += "-" + this.gOptions.c2;
          this.fullGloss += "-" + this.gOptions.c2;
          if (this.gOptions.twoRefs) {
            var refB = this.calculateReference(this.gOptions.ref2,this.gOptions.refEff2,this.gOptions.refPersp2);
            output += refB
            output += this.allowedAtEnd(refB) ? "": "ë";
            let glb = this.refGloss(this.gOptions.ref2,this.gOptions.refEff2,this.gOptions.refPersp2);
            this.gloss += "-" + glb[0];
            this.fullGloss += "-" + glb[1];
          }
        }
        if (!["a","á","ä","â","e","ë","é","ê","i","í","o","ö","ó","ô","u","ü","ú","û"].includes(output.charAt(output.length - 1)) && this.calculateEJ) {
            output += "ë"; // checking for external juncture violation
        }
        output = this.recalcVowels(output);
        if (this.gOptions.ess2 == "RPV") {
          output = this.markStress(0,output);
          this.gloss += "\\RPV";
          this.fullGloss += "\\RPV";
        } else {
          this.fullGloss += "\\NRM";
        }
        this.ithkword = output;

      } else if (type=="refCS") {
        var Aref = this.calculateReference(this.gOptions.ref,this.gOptions.refEff,this.gOptions.refPersp);
        output += this.allowedAtStart(Aref) ? "" : "ë";
        output += Aref
        this.calculateSlot9("1");
        this.slot9gStop();
        output += this.slots[9];
        output += {"BSC":"x","CTE":"xt","CSV":"xp","OBJ":"xx"}[this.gOptions.spec];
        let gla = this.refGloss(this.gOptions.ref,this.gOptions.refEff,this.gOptions.refPersp);
        this.gloss = gla[0];
        this.gloss += (this.gOptions.c1 == "THM" && !this.gOptions.twoCs ? "" : "-" + this.gOptions.c1);
        this.gloss += (this.gOptions.spec == "BSC" ? "" : "-" + this.gOptions.spec);
        this.fullGloss = gla[1] + "-" + this.gOptions.c1 + "-" + this.gOptions.spec;
        for (var q in this.gOptions.refAffix) {
          var p = Object.assign({},this.gOptions.refAffix[q]);
          if (p[1] != "CA") {
            output += this.sVowels[(p[1]+9)%10][p[2]-1];
          } else {
            output += "üö";
          }
          output += p[0];
          this.gloss += "-'" + p[0] + "'/" + p[1] + (p[1] != "CA" ? {1:"₁",2:"₂",3:"₃",4:"₄"}[p[2]] : "");
          this.fullGloss += "-'" + p[0] + "'/" + p[1] + (p[1] != "CA" ? {1:"₁",2:"₂",3:"₃",4:"₄"}[p[2]] : "");
        }
        if (this.gOptions.twoCs) {
          this.calculateSlot9("2");
          this.slot9gStop();
          output += this.slots[9] == "a" ? "üa" : this.slots[9];
          this.gloss += "-" + this.gOptions.c2;
          this.fullGloss += "-" + this.gOptions.c2;
        } else if(this.gOptions.refAffix.length == 0 && !this.gOptions.twoCs && this.gOptions.ess2 == "RPV") {
          output += "a";
        } else if (this.gOptions.refAffix.length > 0) {
          if (!this.allowedAtEnd(this.gOptions.refAffix[this.gOptions.refAffix.length-1][0])) {
            output += "a";
          }
        }
        if (!["a","á","ä","â","e","ë","é","ê","i","í","o","ö","ó","ô","u","ü","ú","û"].includes(output.charAt(output.length - 1)) && this.calculateEJ) {
            output += "a"; // checking for external juncture violation
        }
        output = this.recalcVowels(output);
        if (this.gOptions.ess2 == "RPV") {
          output = this.markStress(0,output);
          this.gloss += "\\RPV";
          this.fullGloss += "\\RPV";
        } else {
          this.fullGloss += "\\NRM";
        }
        this.ithkword = output;

      } else if (type=="mcs") {
        output += "hr";
        if (this.gOptions.cn2 == "mood") {
          output += {"FAC":"a","SUB":"e","ASM":"i","SPC":"o","COU":"ö","HYP":"u"}[this.gOptions.mood];
          this.gloss = this.gOptions.mood;
        } else {
          output += {"CCN":"ai","CCA":"ei","CCS":"iu","CCQ":"oi","CCP":"üö","CCV":"ui"}[this.gOptions.casc];
          this.gloss = this.gOptions.casc;
        }
        this.fullGloss = this.gloss;
        this.ithkword = output;

      } else if (type=="bias") {
        this.ithkword = this.gData.bias.options[this.gOptions.bias].word;
        this.gloss = this.gOptions.bias; // these aren't the same as irburučpozwa's glossing, but I think this is better.
        this.fullGloss = this.gOptions.bias;

      } else if (type=="free") {
        this.ithkword = this.gOptions.freeType;

      } else { // incorrect input = normal word
        this.calculateWord();
        this.glossCalcs();
      }
      this.IPAcalcs();
    },
    calculateReference(ref,refEff,refPersp) {
      /* "ref": "1m",
        "refEff": "NEU",
        "refPersp": "M", */
      var ph = {"1M": {"NEU":"l","BEN":"r","DET":"ř"},
                "2M": {"NEU":"s","BEN":"š","DET":"ž"},
                "2P": {"NEU":"n","BEN":"t","DET":"d"},
                "MA": {"NEU":"m","BEN":"p","DET":"b"},
                "PA": {"NEU":"ň","BEN":"k","DET":"g"},
                "MI": {"NEU":"z","BEN":"ţ","DET":"ḑ"},
                "PI": {"NEU":"ẓ","BEN":"f","DET":"v"},
                "MX": {"NEU":"c","BEN":"č","DET":"j"},
                "RDP":{"NEU":"th","BEN":"ph","DET":"kh"},
                "OBV":{"NEU":"ll","BEN":"rr","DET":"řř"},
                "PVS":{"NEU":"mm","BEN":"nn","DET":"ňň"}};
      var output = ph[ref][refEff];
      var pph = [];
      if (refPersp == "A") {
        if (!this.consAllowed(output+"w")) {output += "y"}
        else {output += "w"}
      } else if (refPersp == "G" || refPersp == "N") {
        if (refPersp == "G") {pph = ["v","tļ"]}
        else {pph = ["ç","x"]}
        // first, check for the first combination allowed at the end of a word, in case of shortcutting
        if (this.allowedAtEnd(pph[0]+output)) {output = pph[0] + output}
        else if (this.allowedAtEnd(pph[1]+output)) {output = pph[1] + output}
        else if (this.allowedAtEnd(output+pph[0])) {output += pph[0]}
        else if (this.allowedAtEnd(output+pph[1])) {output += pph[1]}
        // then just check for the first viable combination
        else if (this.consAllowed(output+pph[0])) {output += pph[0]}
        else if (this.consAllowed(output+pph[1])) {output += pph[1]}
        else if (this.consAllowed(pph[0]+output)) {output = output + pph[0]}
        else {output = output + pph[1]}
      }
      return output;
    },
    calculateWord() {
      // this order is specifically because slots 4 and 6 can influence slots 1 through 5 due to shortcutting.
      // additionally, what slot 2 shows can influence what slot 7 shows
      this.calculateSlot3();
      this.calculateSlot4();
      this.calculateSlot6();
      this.shortcutCalcs(); // this is because slots 1, 2 and 5 are dependant in a very specific way on what 4 and 6 are, IF shortcuts are enabled.
      this.calculateSlot1();
      this.calculateSlot2();
      this.calculateSlot5();
      this.calculateSlot7();
      this.slots[7] = this.calculateSlot8a();
      this.slots[8] = this.calculateSlot8b();
      this.calculateSlot9();
      this.finalCalcs();
    },
    calculateSlot1() { // sctype = "", "w", "y" here
      if (this.shortcutting) {
      this.slots[0] = [["", "w", "y"],
                      ["h","hl","hm"],
                      ["hw","hr","hn"]][this.gOptions.concat][this.shcuttypeA];
      } else {
        this.slots[0] = ["","h","hw"][this.gOptions.concat];
      }
    },
    calculateSlot2() { // sctype = 0 through 4 here
      var ph = {"s1":{"PRC":0,"CPT":1},
                "s2":{"PRC":2,"CPT":3},
                "s0":{"CPT":5,"PRC":6}, // standard vowel form 5 (4 here) is skipped, and everything after that is reversed
                "s3":{"CPT":7,"PRC":8}};
      var phh = {"PRC":{"STA":"ëi","DYN":"eë"},
                 "CPT":{"STA":"ëu","DYN":"oë"}};
      var pph = {"PRC":"ae","CPT":"ea"};
      if (this.wordType == "normal") {
        if (!this.shortcutting){
          var lastVII;
          var vowelColumn = 0;
          if (this.gOptions.shcut != "2") {
            if (this.gOptions.VIIafx.length > 0) {
              lastVII = [...this.gOptions.VIIafx[this.gOptions.VIIafx.length-1]];
            } else {
              lastVII = ["no",0,0];
            }
            if (lastVII[0] === "r" && lastVII[1] === 4 && lastVII[2] === 1){
              vowelColumn = 1;
              this.slotVIIshortcut = true;
            } else if (lastVII[0] === "t" && lastVII[1] === 4 && lastVII[2] === 1) {
              vowelColumn = 2;
              this.slotVIIshortcut = true;
            } else if (lastVII[0] === "t" && lastVII[1] === 5 && lastVII[2] === 1) {
              vowelColumn = 3;
              this.slotVIIshortcut = true;
            } else {
              this.slotVIIshortcut = false;
            }
          }
          this.slots[1] = this.sVowels[ph[this.gOptions.stem][this.gOptions.ver]][vowelColumn];
        } else {
          this.slotVIIshortcut = false;
          this.slots[1] = this.sVowels[ph[this.gOptions.stem][this.gOptions.ver]][this.shcuttypeB];
        }
      } else if (this.wordType == "affRoot") {
        this.slots[1] = phh[this.gOptions.ver][this.gOptions.func];
      } else if (this.wordType == "refRoot") {
        this.slots[1] = pph[this.gOptions.ver];
      }
      if (this.gOptions.Vafx.length >= 2) {
        this.slots[1] = this.insertGStop(this.slots[1]);
      }
    },
    calculateSlot3() {
      if (this.wordType == 'normal') {
        this.slots[2] = this.gOptions.root.toLowerCase();
      } else if (this.wordType == "affRoot") {
        this.slots[2] = this.gOptions.affRoot.toLowerCase();
      } else if (this.wordType == "refRoot") {
        this.slots[2] = this.calculateReference(this.gOptions.ref,this.gOptions.refEff,this.gOptions.refPersp);
      }
    },
    calculateSlot4() {
      var ph = {"STA":{"BSC":0,"CTE":1,"CSV":2,"OBJ":3},
                "DYN":{"OBJ":5,"CSV":6,"CTE":7,"BSC":8}}; // again, svf 5 is skipped
      var phh = ["EXS","FNC","RPS","AMG"];
      var pph = ["BSC","CTE","CSV","OBJ"];
      if (this.wordType == "normal" || this.wordType == "refRoot"){
        this.slots[3] = this.sVowels[ph[this.gOptions.func][this.gOptions.spec]][phh.indexOf(this.gOptions.ctxt)];
      } else if (this.wordType == "affRoot") {
        this.slots[3] = this.sVowels[this.gOptions.arDegree][pph.indexOf(this.gOptions.spec)];
      }
    },
    calculateSlot5() {
      // I have no idea if it was the Object.assign() or the async/await in handleSendMessage(), but it works and I'm not questioning it.
      var out="";
      for (var j in this.gOptions.Vafx) {
        var i = Object.assign({},this.gOptions.Vafx[j]);
        if (this.shortcutting) {
          if (j == (this.gOptions.Vafx.length-1)) {
            if (i[1] != "CA") {
              out += this.insertGStop(this.sVowels[(i[1]+9)%10][i[2]-1]); // if it's the last slot 5 and slot 6 has been dropped, insert a glottal stop into the vowel
            } else {
              out += this.insertGStop("üö");
            }
          } else {
            if (i[1] != "CA") {
              out += this.sVowels[(i[1]+9)%10][i[2]-1];
            } else {
              out += "üö";
            }
          }
          out += i[0];
        } else {
          out += i[0];
          if (i[1] != "CA") {
            out += this.sVowels[(i[1]+9)%10][i[2]-1];
          } else {
            out += "üö";
          }
        }
      }
      this.slots[4] = out;
    },
    calculateSlot6() {
      // step 1: get normal states for each option
      var AFFIL = {"CSL":"","ASO":"l","COA":"r","VAR":"ř"}[this.gOptions.affil];
      var CONF = (this.gOptions.plex === "UPX") ? "" : (this.gOptions.plex === "DPX") ? "s" : // the most hideous (but comparatively tame compared to ithkuil iii) table as an object
                 ({"M":{"S":{"S":"t","C":"k","F":"p"}, "D":{"S":"ţ","C":"f","F":"ç"}, "F":{"S":"z","C":"ž","F":"ẓ"}},
                   "D":{"S":{"S":"c","C":"ks","F":"ps"}, "D":{"S":"ţs","C":"fs","F":"š"}, "F":{"S":"č","C":"kš","F":"pš"}}})[this.gOptions.plex][this.gOptions.simil][this.gOptions.cctd];
      var EXT = ((CONF === "") ? {"DEL":"","PRX":"d","ICP":"g","ATV":"b","GRA":"gz","DPL":"bz"}
                               : {"DEL":"","PRX":"t","ICP":"k","ATV":"p","GRA":"g","DPL":"b"})[this.gOptions.ext]; // use a different value if preceded by a nonzero configuration (CONF)
      var PSPESS = {"NRM":{"M":"","G":"r","N":"w","A":"y"},"RPV":{"M":"l","G":"ř","N":"m","A":"n"}}[this.gOptions.ess][this.gOptions.persp];
      // step 2: check anything regarding different characters if different slots
      if (["t","k","p"].includes(EXT) && CONF != "" && AFFIL != "" && ["m","n"].includes(PSPESS)) {
        PSPESS = {"m":"h","n":"ç"}[PSPESS];
      }
      if (CONF === "" && EXT === "" && PSPESS === "" && AFFIL != ""){ // if affiliation is the only one with a value AND isn't also empty
        if (AFFIL == "l") { AFFIL = "nļ" }
        else if (AFFIL == "ř") {AFFIL = "ň"}
        else { AFFIL += "ļ" }
      } else if (AFFIL === "" && CONF === "" && EXT === "") { // if perspective + essence is the only one with a value (incl. empty)
        if (PSPESS === ""){PSPESS = "l"}
        else if (PSPESS === "l"){PSPESS = "tļ"}
        else if (PSPESS === "w"){PSPESS = "v"}
        else if (PSPESS === "y"){PSPESS = "j"}
      }
      var out = AFFIL+CONF+EXT+PSPESS
      // step 3: applying allomorphic substitutions
      var ph1 = {"pp":"mp","tt":"nt","kk":"nk","ll":"pļ","pb":"mb","kg":"ng","çy":"nd","rr":"ns","rř":"nš","řř":"ňš","řr":"ňs"}//,"ngn":"ňn","ff":"vw","ţţ":"ḑy"};
      for (var key1 in ph1) {
        out = out.replace(key1,ph1[key1]);
      }
      var ph2 = {"gm":"x","gn":"ň"}
      for (var key2 in ph2) {
        out = out.charAt(0) + out.slice(1).replace(key2,ph2[key2]);
      }
      out = out.replace("ngn","ňn");
      out = out.charAt(0) + out.slice(1).replace("çx","xw");
      // unsure how to do [C]bm --> [C]f / [C]v and [C]bn --> [C]ţ / [C]ḑ, because it's based on voicedness I think
      out = out.replace("ff","vw").replace("ţţ","ḑy");
      this.slots[10] = out;
      // step 4: apply gemination (apply nine rules) IF slot V contains affixes
      if (Object.keys(this.gOptions.Vafx).length != 0) {
        // 1-8. are in geminate()
        var oldOut = out;
        out = this.geminate(out);
        // 9. For forms beginning with l-, r- or ř-, apply one of the above eight rules as if the l-, r- or ř- were not present;
        // if the resulting form including the initial l-, r- or ř- is not phonotactically permissible or is euphonically awkward,
        // geminate the l-, r- or ř- instead.
        if (out == oldOut && ["l","r","ř"].includes(out.charAt(0))) {
          out = out.charAt(0) + this.geminate(out.slice(1));
        }
      }
      // finally: output
      this.slots[5] = out;
    },
    geminate(out) {
      //var rulesApplied = [false,false,false,false,false,false,false,false,false];
      var ph = {"pt":"bbḑ","pk":"bbv","kt":"ggḑ","kp":"ggv","tk":"ḑvv","tp":"ddv"};
      var phh = {"pm":"vmm","pn":"vvn","bm":"bžžm","bn":"bžžn","km":"xxm","kn":"xxn","gm":"gžžm","gn":"gžžn","tm":"ḑḑm","tn":"ḑḑn","dm":"jjm","dn":"jjn"};
      if (out.length === 1) {
        // 1. for forms consisting of a single consonant, geminate it.
        out += out
      }
      else if (out === "tļ") {
        // 2. the standalone form tļ becomes ttļ.
        out = "ttļ";
      }
      else if (['t','k','p','d','g','b'].includes(out.charAt(0)) && ['l','r','ř','w','y'].includes(out.charAt(1))) {
        // 3. for forms beginning with a stop followed by a liquid or approximant, geminate the stop.
        out = out.charAt(0) + out;
      }
      else if (out.includes('s') || out.includes('š') || out.includes('z') || out.includes('ž') || out.includes('ç') || out.includes('c') || out.includes('č')) {
        // 4. for forms containing a sibilant fricative or affricative in any position, geminate it.
        out = out.replace("s","ss").replace("š","šš").replace("z","zz").replace("ž","žž").replace("ç","çç").replace('c',"cc").replace("č","čč");
      }
      else if (["f","ţ","v","ḑ","n","m","ň"].includes(out.charAt(0))) {
        // 5. for forms beginning with either a non-sibilant fricative or a nasal, geminate it unless previous rule No. 4 applies.
        out = out.charAt(0) + out;
      }
      else if (["t","k","p"].includes(out.charAt(0)) && ["s","š","f","ţ","ç"].includes(out.charAt(1))) {
        // 6. for forms beginning with a voiceless stop followed by a fricative, geminate the fricative.
        out = out.charAt(0) + out.charAt(1) + out.slice(1);
      }
      else if (Object.prototype.hasOwnProperty.call(ph, out.slice(-2))) {
        // 7. For forms ending in two stops, for which the previous six rules are inapplicable, use the substitutions in ph.
        out = out.slice(0,-2) + ph[out.slice(-2)];
      }
      else if (Object.prototype.hasOwnProperty.call(phh, out.slice(-2))) {
        // 8. For forms ending in a stop plus nasal for which the previous seven rules are inapplicable, use the substitutions in phh.
        out = out.slice(0,-2) + phh[out.slice(-2)];
      }
      return out;
    },
    calculateSlot7() {
      // I have no idea if it was the Object.assign() or the async/await in handleSendMessage(), but it works and I'm not questioning it.
      var out="";
      if (this.slotVIIshortcut && !this.shortcutting && this.gOptions.shcut != "2") {
        for (var j in this.gOptions.VIIafx.slice(0,-1)) {
          var i = Object.assign({},this.gOptions.VIIafx[j]);
          if (i[1] != "CA") {
            out += this.sVowels[(i[1]+9)%10][i[2]-1];
          } else {
            out += "üö";
          }
          out += i[0];
        }
      } else {
        for (var k in this.gOptions.VIIafx) {
          var l = Object.assign({},this.gOptions.VIIafx[k]);
          if (l[1] != "CA") {
            out += this.sVowels[(l[1]+9)%10][l[2]-1];
          } else {
            out += "üö";
          }
          out += l[0];
        }
      }
      this.slots[6] = out;
    },
    calculateSlot8a(num="",override="") {
      var vn;
      if (override != "") {vn = override}
      else {vn = this.gOptions["vn"+num]}
      if (vn === "asp") {
        // aspect
        var pph = [["RTR","PRS","HAB","PRG","IMM","PCS","REG","SMM","ATP"],
                  ["RSM","CSS","PAU","RGR","PCL","CNT","ICS","EXP","IRP"],
                  ["PMP","CLM","DLT","TMP","XPD","LIM","EPD","PTC","PPR"],
                  ["DCL","CCL","CUL","IMD","TRD","TNS","ITC","MTV","SQN"]];
        for (var i in pph) {
          if (pph[i].includes(this.gOptions["asp"+num])) {
            return this.sVowels[pph[i].indexOf(this.gOptions["asp"+num])][i];
          }
        }
      } else {
        // not aspect
        var ph = ["val","pha","eff","lvl"];
        var phh = {"val":["MNO","PRL","CRO","RCP","CPL","DUP","DEM","CNG","PTI"],
                   "pha":["PCT","ITR","REP","ITM","RCT","FRE","FRG","VAC","FLC"],
                   "eff":["1:BEN","2:BEN","3:BEN","SLF:BEN","UNK","SLF:DET","3:DET","2:DET","1:DET"],
                   "lvl":["MIN","SBE","IFR","DFT","EQU","SUR","SPL","SPQ","MAX"]};
        let out = this.sVowels[phh[this.gOptions["vn"+num]].indexOf(this.gOptions[this.gOptions["vn"+num]+num])][ph.indexOf(this.gOptions["vn"+num])];
        if (this.gOptions["vn"+num] == "lvl" && this.gOptions["abslvl"+num]) {
          out = out[0]+"y"+out[1];
        }
        return out;
      }
    },
    calculateSlot8b(num="",ca="") {
      var ph = [];
      var phh = [];
      if (this.gOptions["vn"+num] === "asp") { ph = ["w","hw","hrw","hmw","hnw","hňw"]; }
      else { ph = ["h","hl","hr","hm","hn","hň"]; }
      if (this.wordType == "modular" ? ca == "casc" : (this.gOptions.rel != "UNF/K" || this.gOptions.concat != "0")) {
        phh = ["CCN","CCA","CCS","CCQ","CCP","CCV"];
        return ph[phh.indexOf(this.gOptions["casc"+num])]
      } else {
        phh = ["FAC","SUB","ASM","SPC","COU","HYP"];
        return ph[phh.indexOf(this.gOptions["mood"+num])];
      }
    },
    calculateSlot9(num="") {
      //"rel","c","ill","vld"
      var ph = [["THM","INS","ABS","AFF","STM","EFF","ERG","DAT","IND"],
                ["POS","PRP","GEN","ATT","PDC","ITP","OGN","IDP","PAR"],
                ["APL","PUR","TRA","DFR","CRS","TSP","CMM","CMP","CSD"],
                ["FUN","TFM","CLA","RSL","CSM","CON","AVR","CVS","SIT"]];
      var phh = [["PRN","DSP","COR","CPS","COM","UTL","PRD","n/a","RLT"],
                 ["ACT","ASI","ESS","TRM","SEL","CFM","DEP","n/a","VOC"],
                 ["LOC","ATD","ALL","ABL","ORI","IRL","INV","n/a","NAV"],
                 ["CNR","ASS","PER","PRO","PCV","PCR","ELP","n/a","PLM"]];
      var pph = ["OBS","REC","PUP","RPR","USP","IMA","CVN","ITU","INF"];
      var pphh = ["DIR","DEC","IRG","VRF","n/a","ADM","POT","HOR","CNJ"];
      var cfound = false;
      if (this.gOptions.rel !== "UNF/K" || this.gOptions.concat != '0' || ["suppletive","ref"].includes(this.wordType)) {
        for (var i in ph) {
          if (ph[i].includes(this.gOptions["c"+num])) {
            this.slots[9] = this.sVowels[ph[i].indexOf(this.gOptions["c"+num])][i];
            cfound = true;
          }
        }
        if (!cfound) {
          for (var j in phh) {
            if (phh[j].includes(this.gOptions["c"+num])) {
              this.slots[9] = this.sVowels[phh[j].indexOf(this.gOptions["c"+num])][j] + "'";
            }
          }
        }
      } else {
        // if the word is a verb
        if (this.gOptions.ill == "ASR") {
          this.slots[9] = this.sVowels[pph.indexOf(this.gOptions.vld)][0]
        } else {
          this.slots[9] = this.sVowels[pphh.indexOf(this.gOptions.ill)][1];
        }
      }
    },
    shortcutCalcs() {
      // SHORTCUTTING!
      //(() => {
      if ((this.gOptions.shcut == "1" && this.slots[3] == "a" && ["l","d","r","tļ","v","j","ř","dl"].includes(this.slots[10]) && this.wordType == "normal")
       || (this.wordType == "refRoot" && this.gOptions.shcut == "1" && this.slots[3] == "a" && ["l","d"].includes(this.slots[10]))) {
        //l = ., d = PRX, r = G, tļ = RPV, v = N, j = A, ř = G.RPV, dl = PRX.RPV
        // if the word is a reference-root, only default and PRX can be shown
        var ph = {"l":[1,0], "d":[2,0],
                  "r":[1,1],"tļ":[2,1],
                  "v":[1,2], "j":[2,2],
                  "ř":[1,3],"dl":[2,3]};
        try {
          this.shortcutting = true;
          this.shcuttypeA = ph[this.slots[10]][0];
          this.shcuttypeB = ph[this.slots[10]][1];
          this.slots[3] = "";
          this.slots[5] = "";
        } catch {
          this.shortcutting = false;
          this.calculateSlot4();
          this.calculateSlot6();
        }
      } else {
        this.shortcutting = false;
      }//})();
    },
    insertGStop(vowels,endOfWord=false) { // inserting a glottal stop given a set of vowels
      if (vowels.length === 1 || this.sDip.includes(vowels)) {
        if (!endOfWord) {
          return vowels+"'";
        } else if (vowels.length === 1) {
          return vowels+"'"+vowels;
        } else {
          return vowels.charAt(0)+"'"+vowels.charAt(1);
        }
      } else {
        return vowels.charAt(0)+"'"+vowels.charAt(1);
      }
    },
    getCons(...tags) { // takes an unlimited number of lists of properties that a consonant can have, and returns all consonants for which all of at least one bracket is true
    var outp = [];
    for (var i in this.cData) {
      for (var j in tags) {
        if (tags[j].every(element => {return this.cData[i].includes(element)}) && !outp.includes(i)) {
          outp.push(i);
        }
      }
    }
    return outp;
    },
    removeDuplicate(strin){
        var out = "";
        var prevChar = "";
        for (var char of strin) {
            if (char != prevChar) {
                out += char;
                prevChar = char;
            }
        }
        return out;
    },
    slot9gStop() {
      if (this.slots[9].charAt(this.slots[9].length-1) === "'") {
        if (this.gOptions.concat == '0' || ["suppletive","ref","refCS"].includes(this.wordType)) {
          this.slots[9] = this.slots[9].slice(0,-1);
          this.slots[9] = this.insertGStop(this.slots[9],true);
        } else {
          this.slots[9] = this.slots[9].slice(0,-1);
        }
      }
    },
    allowedAtStart(consonants) {
      if (this.consAllowed(consonants)) {
        var nogem = this.removeDuplicate(consonants);
        if (nogem.length === 1) {
          //monocons. root
          if (nogem !== "ļ"){ // not ļ
            return true;
          }
        } else if (nogem.length === 2) {
          //bicons. root - this is VERY difficult to test and MAY have some errors, but I'm pretty confident that it shouldn't.
          var ra = nogem.charAt(0);
          var rb = nogem.charAt(1);
          if ((this.getCons(["stop"]).includes(ra) && ["r","l","ř","w","y"].includes(rb)) || // 3.2.0 - first char is... stops
              (["p","k"].includes(ra) && ["s","š"].includes(rb)) ||
              (["b","g"].includes(ra) && ["z","ž"].includes(rb)) ||
              (ra === "p" && ["f","ţ","ç","x","h","ļ"].includes(rb)) ||
              (ra === "b" && ["v","ḑ"].includes(rb)) ||
              (ra === "t" && ["f","v","ţ","ḑ","ç","x","h","ļ"].includes(rb)) ||
              (ra === "d" && rb == "v") ||
              (ra === "k" && ["f","ţ","ç","x","h"].includes(rb)) ||
              (ra === "g" && ["v","ḑ"].includes(rb)) ||
              (["s","š"].includes(ra) && this.getCons(["stop","unvoiced"],["fric","nonsibil","unvoiced"],["affric","unvoiced"]).includes(rb)) || // 3.2.1 - sibilant fricatives
              (["z","ž"].includes(ra) && this.getCons(["stop","voiced"],["fric","nonsibil","voiced"],["affric","voiced"]).includes(rb)) ||
              (["s","z","š","ž"].includes(ra) && ["m","n","ň","r","l","w","y","ř","v"].includes(rb)) ||
              (["c","č"].includes(ra) && this.getCons(["fric","nonsibil","unvoiced"],["stop","unvoiced"]).includes(rb)) || // 3.2.2 - sibilant affricatives
              (["c","č"].includes(ra) && rb === "h") ||
              (["ẓ","j"].includes(ra) && this.getCons(["fric","nonsibil","voiced"],["stop","voiced"]).includes(rb)) ||
              (["c","ẓ","č","j"].includes(ra) && ["r","l","m","n","ň","w","v"]) ||
              (ra === "x" && ["p","t","c","č","m","n","l","r","w"].includes(rb)) || // 3.2.3 - x
              (ra === "ç" && ["p","t","c","č","k","m","n","ň","l","r","ř"].includes(rb)) || // 3.2.4 - ç
              (["f","ţ"].includes(ra) && this.getCons(["stop","unvoiced"],["affric","unvoiced"]).includes(rb)) || // 3.2.5 - f, v, ţ, ḑ
              (["v","ḑ"].includes(ra) && this.getCons(["stop","voiced"],["affric","voiced"]).includes(rb)) ||
              (["f","v","ţ","ḑ"].includes(ra) && ["r","l","w","y","ř","m","n","ň"].includes(rb)) ||
              (ra === "ļ" && this.getCons(["stop","unvoiced"],["affric","unvoiced"],["nasal"]).includes(rb)) || // 3.2.6 - ļ
              (ra === "ļ" && ["w","y"].includes(rb)) ||
              (ra === "h" && ["l","r","m","n","w"].includes(rb)) || // 3.2.7 - h
              (["m","n"].includes(ra) && ["l","r","w","y","ř"].includes(rb)) || // 3.2.8 - nasals
              (ra === "ň" && ["l","r","w"].includes(rb)) ||
              (["l","r"].includes(ra) && ["w","y"].includes(rb)) // 3.2.9 - liquids
          ){
            return true; // if ANY of the huge above if statement is true, return true
          }
        } else if (nogem.length === 3) {
          //tricons. root
          var da = nogem.charAt(0);
          var db = nogem.charAt(1);
          var dc = nogem.charAt(2);
          var dab = da + db;
          if (
            // 3.3.0 - stop, sibil, anything permissible as of 3.2.2
            (["ps","pš","ks","kš"].includes(dab) && this.getCons(["stop","unvoiced"],["fric","nonsibil","unvoiced"],["affric","unvoiced"]).includes(dc)) ||
            (["bz","bž","gz","gž"].includes(dab) && this.getCons(["stop","voiced"],["fric","nonsibil","voiced"],["affric","voiced"]).includes(dc)) ||
            (["ps","pš","ks","kš","bz","bž","gz","gž"].includes(dab) && ["m","n","ň","r","l","w","y","ř","v"].includes(dc)) ||
            // 3.3.1 - stop, l/r, w/y
            (["p","b","t","d","k","g"].includes(da) && ["l","r"].includes(db) && ["w","y"].includes(dc)) ||
            // 3.3.2 - voiceless stop, ç, m/n/ň
            (["p","t","k"].includes(da) && db === "ç" && ["m","n","ň"].includes(dc)) ||
            // 3.3.3 - p/k, f/ţ, y/w  OR  p/t, ļ, w/y
            (["p","k"].includes(da) && ["f","t"].includes(db) && ["y","w"].includes(dc)) ||
            (["p","t"].includes(db) && db === "ļ" && ["w","y"].includes(dc)) ||
            // 3.3.4 - sibil fric, stop, approx/liq.  OR  sibil, nasal, w/y based on 3.2.8
            (["s","š","ç"].includes(da) && ["p","t","k"].includes(db) && ["r","l","w","y","ř"].includes(dc)) ||
            (["z","ž"].includes(da) && ["b","d","g"].includes(db) && ["r","l","w","y","ř"].includes(dc)) ||
            (["s","z","š","ž","ç"].includes(da) && ["m","n"].includes(db) && ["w","y"].includes(dc)) ||
            (["s","z","š","ž","ç"].includes(da) && db === "ň" && dc === "w") ||
            // 3.3.5 - hlw, hrw, hmw, hnw, hmy, hny
            (["hlw","hrw","hmw","hnw","hmy","hny"].includes(nogem)) ||
            // 3.3.6 - sibil affric, stop, liquid/approx  OR  sibil affric, nasal, w/y based on 3.2.8
            (["c","č"].includes(da) && ["p","t","k"].includes(db) && ["r","l","w","y","ř"].includes(dc)) ||
            (["ẓ","j"].includes(da) && ["b","d","g"].includes(db) && ["r","l","w","y","ř"].includes(dc)) ||
            (["c","ẓ","č","j"].includes(da) && ["m","n"].includes(db) && ["w","y"].includes(dc)) ||
            (["c","ẓ","č","j"].includes(da) && db === "ň" && dc === "w") ||
            // 3.3.7 - flw, ţlw, fly, ţly
            (["flw","ţly","fly","ţly"].includes(nogem)) ||
            // 3.3.8 - xp/xt, l/r/w/y  OR  xm/xn, w/y  OR  xc/xč, w
            (["xp","xt"].includes(dab) && ["l","r","w","y"].includes(dc)) ||
            (["xm","xn"].includes(dab) && ["w","y"].includes(dc)) ||
            (["xc","xč"].includes(dab) && dc === "w")
          ) {
            return true;
          }
        } else if (nogem.length === 4) {
          // tetracons. roots
          var qa = nogem.charAt(0);
          var qb = nogem.charAt(1);
          var qc = nogem.charAt(2);
          var qd = nogem.charAt(3);
          if (
            // 3.4.1 - tri-cons ending in a stop, liq/approx WHICH MEANS p/b/k/g, s/z/š/ž, stop, affric/stop
            (["p","k"].includes(qa) && ["s","š"].includes(qb) && ["p","t","k"].includes(qc) && ["r","l","w","y","ř"].includes(qd)) ||
            (["b","g"].includes(qa) && ["z","ž"].includes(qb) && ["b","d","g"].includes(qc) && ["r","l","w","y","ř"].includes(qd)) ||
            // 3.4.2 - sibil, stop, ly
            (["s","š","ç","c","č"].includes(qa) && ["p","t","k"].includes(qb) && qc === "l" && qd === "y") ||
            (["z","ž","ẓ","j"].includes(qa) && ["b","d","g"].includes(qb) && qc === "l" && qd === "y")
          ) {
            return true;
          }
        }
        return false; // if NOTHING above triggered a return true, retirn false.
      } else {
        return false;
      }
    },
    allowedAtEnd(lastCons) {
      if (this.consAllowed(lastCons)) {
        var nogem2 = this.removeDuplicate(lastCons);
        if (nogem2.length == 1) {
          //monocons.
          if (nogem2 !== "w" && nogem2 !== "y" && nogem2 !== "'") { // 4.1 any consonant except -w or -y
            return true;
          }
        } else if (nogem2.length == 2) {
          //bicons.
          var eba = nogem2.charAt(0);
          var ebb = nogem2.charAt(1);
          if (
            (["p","t","k"].includes(eba) && ["f","ţ","s","š","ç","x","h","ļ"].includes(ebb)) || // 4.2.1 - stop, fricative
            (["b","d","g"].includes(eba) && ["v","ḑ","z","ž"].includes(ebb)) ||
            (["k","p"].includes(eba) && ebb === "t") || // 4.2.2 - non-dental stop, dental stop
            (["g","b"].includes(eba) && ebb === "d") ||
            (["s","š"].includes(eba) && ["p","t","k"].includes(ebb)) || // 4.2.3 - sibilant fric, stop
            (["z","ž"].includes(eba) && ["b","d","g"].includes(ebb)) ||
            (["c","č"].includes(eba) && ["t","k"].includes(ebb)) || // 4.2.4 - sibilant affric, nonlabial stop
            (["ẓ","j"].includes(eba) && ["d","g"].includes(ebb)) ||
            (eba === "f" && ["t","k","s","š","ç"].includes(ebb)) || // 4.2.5 - f/v, nonlabial stop/sibilant fric
            (eba === "v" && ["d","g","z","ž"].includes(ebb)) ||
            (eba === "ţ" && ["t","k"].includes(ebb)) || // 4.2.6 - ţ/ḑ, nonlabial stop
            (eba === "ḑ" && ["d","g"].includes(ebb)) ||
            (["ļ","x"].includes(eba) && ["p","t","k"].includes(ebb)) || // 4.2.7 - ļ/x, voiceless stop
            (["m","n"].includes(eba) && ["p","b","t","d","k","g","f","v","ţ","ḑ","s","z","š","ž","ç","x","h","ļ"].includes(ebb)) || // 4.2.8 - m/n, stop/fric
            (eba === "ň" && ["t","d","f","v","ţ","ḑ","s","z","š","ž","ç","h"]) || // 4.2.9 - ň, dental stop/fric (NOT ļ/x)
            (eba === "r" && ebb !== "w" && ebb !== "y" && ebb !== "'") || // 4.2.10 - r, anything except w/y/'
            (eba === "l" && !(["'","w","y","r","ň"].includes(ebb))) || // 4.2.11 - l, anything except w/y/r/ň/'
            (eba === ebb && !(["p","t","k","b","d","g","'"].includes(eba))) // 4.2.12 - any geminated consonant except stops
          ){
            return true;
          }
        } else if (nogem2.length == 3) {
          // tricons.
          var eca = nogem2.charAt(0);
          var ecb = nogem2.charAt(1);
          var ecc = nogem2.charAt(2);
          if (
            (ecb === "p" && ((["r","ř","l"].includes(eca) && ["t","k","f","ţ","x","s","š","h","ļ","ç"].includes(ecc))
                        || (["m","ň"].includes(eca) && ["h","ļ","ç"].includes(ecc))
                        || (["s","š","ç"].includes(eca) && ["f","ţ","s","š","ļ","ç"].includes(ecc)))) ||
            (ecb === "t" && ((["l","r","ř"].includes(eca) && ["k","f","x","h","ļ","ç"].includes(ecc))
                        || (eca === "n" && ["k","f","x","h"].includes(ecc))
                        || (["m","ň","s","š","ç"].includes(eca) && ["h","ļ","ç"].includes(ecc)))) ||
            (ecb === "k" && ((["l","r","ř"].includes(eca) && ["t","f","ţ","s","š","h","ç"].includes(ecc))
                        || (["n","f","ţ","l"].includes(eca) && ["h","ç"].includes(ecc))
                        || (eca === "m" && ["f","ţ","h","ç"].includes(ecc))
                        || (["s","š","ç"].includes(eca) && ["f","ţ","s","š","h","ç"].includes(ecc)))) ||
            (ecb === "b" && ((["r","ř"].includes(eca) && ["d","g","v","ḑ","z","ž"].includes(ecc))
                        || (eca === "l" && ["v","ḑ","z","ž"].includes(ecc)))) ||
            (ecb === "d" && (["r","ř"].includes(eca) && ["b","g","v"].includes(ecc))) ||
            (ecb === "g" && ((["r","ř"].includes(eca) && ["b","d","v","ḑ","z","ž"].includes(ecc))
                        || (eca === "l" && ["v","ḑ","z","ž"].includes(ecc)))) ||
            (ecb === "f" && ((["l","r","ř","m","ň"].includes(eca) && ["t","k","f","s","š"].includes(ecc))
                        || (["p","t","k"].includes(eca) && ["k","f"].includes(ecc))
                        || (eca === "f" && ["t","k","s","š"].includes(ecc)))) ||
            (ecb === "ţ" && ((["p","k","r","l","ř","m","n","ň"].includes(eca) && ["t","k","ţ"].includes(ecc))
                        || (eca === "ţ" && ["t","k"].includes(ecc)))) ||
            (ecb === "x" && ((["r","l","ř"].includes(eca) && ["t","x"].includes(ecc))
                        || (["p","t","f","s","š","n","m"].includes(eca) && ecc === "x")
                        || (eca === "x" && ecc === "t"))) ||
            (ecb === "ļ" && ((["p","t","r","ř","m","n","ň"].includes(eca) && ["t","k","ļ"].includes(ecc))
                        || (["ļ","l"].includes(eca) && ["t","k"].includes(ecc)))) ||
            (ecb === "s" && ((["r","l","ř","m","n","ň","p","k","f"].includes(eca) && ["p","t","k","f","ţ","x","s"].includes(ecc))
                        || (eca === "ţ" && ["p","t","k","s"].includes(ecc))
                        || (eca === "s" && ["p","t","k","f","ţ","x"].includes(ecc)))) ||
            (ecb === "š" && ((["r","l","ř","m","n","ň","p","k","f"].includes(eca) && ["p","t","k","f","ţ","x","š"].includes(ecc))
                        || (eca === "ţ" && ["p","t","k","š"].includes(ecc))
                        || (eca === "š" && ["p","t","k","f","ţ","x"].includes(ecc)))) ||
            (ecb === "v" && ((["r","ř","l"].includes(eca) && ["v","z","ž"].includes(ecc))
                        || (["b","g","m","ň"].includes(eca) && ecc === "v")
                        || (eca === "v" && ["z","ž"].includes(ecc)))) ||
            (ecb === "ḑ" && (["b","g","r","ř","l","n","m","ň"].includes(eca) && ecc === "ḑ")) ||
            (ecb === "z" && ((["r","ř","l","n","m","ň"].includes(eca) && ["b","d","g","z"].includes(ecc))
                        || (["b","g","v"].includes(eca) && ecc === "z")
                        || (eca === "z" && ["b","d","g"].includes(ecc)))) ||
            (ecb === "ž" && ((["r","ř","l","n","m","ň"].includes(eca) && ["b","d","g","ž"].includes(ecc))
                        || (["b","g","v"].includes(eca) && ecc === "ž")
                        || (eca === "ž" && ["b","d","g"].includes(ecc)))) ||
            (ecb === "c" && (["r","ř","l"].includes(eca) && ["t","k","c","h"].includes(ecc))) ||
            (ecb === "č" && (["r","ř","l"].includes(eca) && ["t","k","č","h"].includes(ecc))) ||
            (ecb === "ẓ" && (["r","ř","l"].includes(eca) && ["d","g","ẓ"].includes(ecc))) ||
            (ecb === "j" && (["r","ř","l"].includes(eca) && ["d","g","j"].includes(ecc))) ||
            (ecb === "m" && ((["r","l","ř"].includes(eca) && ["p","t","k","b","d","f","ţ","x","s","š","v","ḑ","z","ž","m","ļ","ç"].includes(ecc))
                        || (eca === "m" && ["p","t","k","b","d","f","ţ","x","s","š","v","ḑ","z","ž","ļ","ç"].includes(ecc)))) ||
            (ecb === "n" && ((["r","ř"].includes(eca) && ["t","k","d","g","f","ţ","x","s","š","v","ḑ","z","ž","n","ļ","ç"].includes(ecc))
                        || (eca === "l" && ["t","k","d","g","ţ","s","š","z","ž","ļ","ç"].includes(ecc))
                        || (eca === "n" && ["t","k","d","g","f","ţ","x","s","š","v","ḑ","z","ž","ļ","ç"].includes(ecc)))) ||
            (ecb === "l" && (eca === "l" && ["p","t","k","b","d","g","f","ţ","x","s","š","v","ḑ","z","ž","c","č","ẓ","j","m","n","ň","ç"].includes(ecc))) ||
            (["r","ř"].includes(ecb) && (["r","ř"].includes(eca) && ["p","t","k","b","d","g","f","ţ","x","s","š","v","ḑ","z","ž","c","č","ẓ","j","m","n","ň","l","ļ","ç"].includes(ecc))) ||
            (ecb === "ç" && ((["p","t","k","m","n","ň","r","l","ř"].includes(eca) && ["t","k","ç"].includes(ecc))
                        || (eca === "ç" && ["t","k"].includes(ecc))))
          ) {
            return true;
          }
        } else if (nogem2.length == 4) {
          // tetracons. & pentacons.
          var eda = nogem2.charAt(0);
          var edb = nogem2.charAt(1);
          var edc = nogem2.charAt(2);
          var edbc = edb + edc;
          var edd = nogem2.charAt(3);
          if (((["l","r","ř"].includes(eda) && (["tç","pf","fs","fš"].includes(edbc) || (["k","p"].includes(edb) && ["s","š","ţ","ç"].includes(edc)))) ||
          (eda === "r" && ((["n","ň","m"].includes(edb) && ["s","š","ţ","ç"].includes(edc)) || (["ň","m"].includes(edb) && edc === "f"))))
          && ["t","k"].includes(edd)) {
            return true;
          }
        }
        return false; // if NOTHING above triggered a return true, retirn false.
      } else {
        return false;
      }
    },
    consAllowed(conson) {
      for (var i in conson.slice(0,-1)) {
        let a = conson.charAt(i);
        let b = conson.charAt(i+1);
        let c = conson.charAt(i+2);
        if ((a != 'ʔ' && conson.split("ʔ").length >= 2) || conson.split("ʔ").length >= 3) {
          // 2.1 No glottal stops immediately after any consonant
          return false;
        } else if (["t","d"].includes(a) && ["s","z","š","ž","c","ẓ","č","j","ţ","ḑ"].includes(b)) {
          // 2.2 no t/d followed by sibilant or same-location fricative
          return false;
        } else if (["k","g"].includes(a) && ["x","ň"].includes(b)) {
          // 2.3 no k/g followed by ň/x
          return false;
        } else if (["kg","gk","td","dt","pb","bp"].includes(a+b)) {
          // 2.4 no homologous stop pairings
          return false;
        } else if (["fv","vf","ţḑ","ḑţ","cẓ","ẓc","čj","jč","čc","jc","čẓ","jẓ"].includes(a+b)) {
          // 2.5 no homologous fricatives or affricatives, no "čc", "jc", "čẓ", "jẓ"
          return false;
        } else if (["šc","šẓ","žc","žẓ","sẓ"].includes(a+b)) {
          // 2.6-7 none of the above
          return false;
        } else if (a != b && ["s","š","z","ž"].includes(a) && ["s","š","z","ž"].includes(b)) {
          // 2.8 aside from gemination, no s/š/z/š followed by another one
          return false;
        } else if (["c","ẓ","č","j"].includes(a) && ["s","š","z","ž"].includes(b)) {
          // 2.9 Conjunction of a sibilant affricate followed by a sibilant fricative is prohibited
          return false;
        } else if (a == "ç" && ["s","z","š","ž","ẓ","j","ļ","h"].includes(b)) {
          // 2.10a ç cannot be followed by...
          return false;
        } else if (b == "ç" && ["c","ẓ","č","j","ļ","h","x"].includes(a)) {
          // 2.10b ç cannot be preceded by...
          return false;
        } else if (a == "n" && ["c","č","ẓ","j"].includes(b)) {
          // 2.11 no n followed by similar-location affricatives
          return false;
        } else if (a == "m" && ["b","p"].includes(b) && ["f","v","ţ","ḑ","t","d","s","z","š","ž"].includes(c)) {
          // 2.12 & 2.13a no m followed by bilabial stop followed by anything in a similar location
          return false;
        } else if (a == "n" && ["k","g"].includes(b) && ["s","z","š","ž"].includes(c)) {
          // 2.13b no n followed by k/g followed by sibilants
          return false;
        } else if (a == "n" && ["p","b"].includes(b)) {
          // 2.14 no n followed by p/b
          return false;
        } else if (a == "n" && ["f","v"].includes(b) && c != "") {
          // 2.15 nf & nv must be followed by a vowel (i.e. be at the end of the cons phrase)
          return false;
        } else if (a == "ň" && ["g","k","x","y"].includes(b)) {
          // 2.16 ň cannot occur before g, k, x, or y (as either n assimilates to it or it is too similar to n)
          return false;
        } else if (a == "x" && ["s","z","š","ž","ç","g","ļ","ň","y","h","ř"].includes(b)) {
          // 2.17 x cannot occur before any of the above
          return false;
        } else if (a == "ļ" && ["s","z","š","ž","h","ç"].includes(b)) {
          // 2.18a ļ cannot occur before any sibilant fricative, h, or ç
          return false;
        } else if (b == "ļ" && ["b","d","g","h","ç"].includes(a)) {
          // 2.18b ļ cannot occur after any voiced stop, h, or ç
          return false;
        } else if (c == "" && b == "h" && ["ļ","x","ç"].includes(a)) {
          // 2.19 if h is the last letter in a conjunct, then it cannot be preceded by ļ, x, or ç
          return false;
        } else if (b == "ř" && ["r","h"].includes(a)) {
          // 2.20 r and h cannot be followed by ř
          return false;
        } else if (a+b == "řr") {
          // 2.21 ř cannot be followed by r
          return false;
        } else if (["w","y"].includes(a) && b != "") {
          // 2.22 w and y can only appear as the end of a conjunct
          return false;
        }
      }
      return true; // if nothing not-allowed was detected above, then return true.
    },

    markStress(stressType,thisword) {
      var wordVowels = thisword.match(/(?:ai|ei|ëi|oi|ui|au|eu|ëu|ou|iu|[aeiouäëöü])/gi);
      if (stressType === 0 && wordVowels.length > 1) { // if ultimate stress (and not single-syllable word, because that's already assumed to be ultimate)
        for (let i = thisword.length-1; i >= 0; i--) {
          if (["a","e","i","o","u","ä","ë","ö","ü"].includes(thisword.charAt(i))) {
            if (this.sDip.includes(thisword.charAt(i-1) + thisword.charAt(i))) {
              thisword = thisword.substring(0, i-1) + this.sAccent[thisword.charAt(i-1)] + thisword.substring(i);
            } else {
              thisword = thisword.substring(0, i) + this.sAccent[thisword.charAt(i)] + thisword.substring(i+1);
            }
            break;
          }
        }
      } else if (stressType === 2) { // if antepenultimate stress
        var counter = 0;
        for (let i = thisword.length-1; i >= 0; i--) {
          if (["a","e","i","o","u","ä","ë","ö","ü"].includes(thisword.charAt(i))) {
            if (counter == 2) {
              if (this.sDip.includes(thisword.charAt(i-1) + thisword.charAt(i))) {
                thisword = thisword.substring(0, i-1) + this.sAccent[thisword.charAt(i-1)] + thisword.substring(i);
              } else {
                thisword = thisword.substring(0, i) + this.sAccent[thisword.charAt(i)] + thisword.substring(i+1);
              }
              break;
            } else if (!this.sDip.includes(thisword.charAt(i-1) + thisword.charAt(i))) {
              counter++
            }
          }
        }
      } // penultimate stress is unmarked, so I don't have to do anything
      return thisword;
    },

    recalcVowels(word) { // replace series 3 vowel forms if necessary
      return word.replaceAll("yia","yuä").replaceAll("yie","yuë").replaceAll("yio","yüä").replaceAll("yiö","yüë").replaceAll("wuö","wöë").replaceAll("wuo","wöä").replaceAll("wue","wië").replaceAll("wua","wiä");
    },

    finalCalcs() {
      // Step 1: Glottal Stop Insertion in Slot 9
      var slot9saved = "";
      slot9saved = this.slots[9];
      this.slot9gStop();

      if (this.gOptions.shcut != "2") {
        // Step 2: Remove unnecessary vowels at the start - the logic is dependant on the length of the root, so that's what I've done.
        if (this.slots[0] === "" && this.slots[1] === "a" && !this.slotVIIshortcut) {
          if (this.allowedAtStart(this.slots[2])) {
            this.slots[1] = "";
            this.cut[0] = true; // slot 2 removed
          }
        }

        // Step 3: Remove unnecessary vowels at the end
        if (this.slots[7] === "a" && this.gOptions.vn != "asp" && this.slots[5] === "l" && this.slots[8] != "h") {
          this.slots[10] = this.slots[8];
          this.slots[5] = this.slots[8];
          this.slots[8] = "";
          this.eightSix = true;
        } else {
          this.eightSix = false;
        }
        if (this.slots[7] === "a" && (this.slots[8] === "h" || this.slots[8] === "")) {
          this.slots[7] = "";
          this.slots[8] = "";
          this.cut[2] = true; // slot 8a removed
          if (this.slots[9] === "a") { // here i have to check that the consonant before this is allowed at the end of a word
            var lastCons;
            var shortenSlot8 = true;
            if (this.gOptions.VIIafx.length == 0 && this.gOptions.Vafx.length == 0 && this.shortcutting) { // if slots 5 & 7 are empty and there's shortcutting,
              if (this.gOptions.c == "PRN" && (this.sDip.includes(this.slots[1]) || Object.keys(this.sAccent).includes(this.slots[1]))) { // with the edge case of if the case is Pertinental
                shortenSlot8 = false; // then don't drop the last consonant so there's two syllables
              } else { // otherwise,
                lastCons = this.slots[2]; // the last consonant is the root.
              }
            } else if (this.gOptions.VIIafx.length == 0 && this.shortcutting) { // if that but slot 5 is filled,
              shortenSlot8 = false; // don't remove slot 8, because 5 must have a glottal stop at the end which is not permitted.
            } else if (this.gOptions.VIIafx.length == 0) { // if that but no shortcutting,
              lastCons = this.slots[5]; // then the last consonant is slot 6.
            } else { // otherwise,
              lastCons = this.gOptions.VIIafx[this.gOptions.VIIafx.length-1][0]; // the last consonant is slot 7's last affix.
            }
            if (shortenSlot8) {
              if (this.allowedAtEnd(lastCons)) {
                this.slots[9] = "";
                this.cut[1] = true; // slot 9 removed
              }
            }
          }
        }
      }

      // Step 4: Join everything together
      (() => {this.ithkword = this.slots.slice(0,-1).join("")})();
      this.ithkword = this.recalcVowels(this.ithkword); // recalculate series 3 vowels

      // Step 5: Apply Slot 10 (stress) & calculate External Juncture
      // Penultimate stress is unmarked, others are marked with a diacritic; a -> á, ä -> â.
      var wordVowels = this.ithkword.match(/(?:ai|ei|ëi|oi|ui|au|eu|ëu|ou|iu|[aeiouäëöü])/gi);
      var stressType = 0;
      // 5a: converting meaning to where the stress should be [0 = ult, 1 = penult, 2 = antepenult]
      if (this.gOptions.concat != '0') { // if it's a concatenated word
        if (slot9saved.charAt(slot9saved.length-1) === "'") { //if you'd normally add a glottal stop into slot 9
          stressType = 0; // ultimate stress
        } else if (this.cut[2] && this.cut[1] && this.gOptions.c == "THM" && this.gOptions.concat != '0' && this.gOptions.VIIafx.length == 0 && this.shortcutting && (this.sDip.includes(this.slots[1]) || Object.keys(this.sAccent).includes(this.slots[1]))) {
          stressType = 0; // if it can be monosyllabic, make it
        } else {
          stressType = 1; // penultimate stress
        }
      } else {
        stressType = ["UNF/K","UNF/C","FRM"].indexOf(this.gOptions.rel); // stress is reliant on relation, otherwise
      }
      // 5b: making sure the word can actually take the required stress
      while (wordVowels.length <= stressType) { // i.e. stress 0 needs 1 vowel, stress 1 needs 2 vowels, stress 2 needs 3 vowels
        var cutVal = this.cut[1] == true ? 1 : this.cut[0] == true ? 0 : this.cut[2] == true ? 2 : null; //this.cut.indexOf(true);
        var ph = [1,9,7];
        if (ph[cutVal] === 7) {this.slots[8] = "h"}
        this.slots[ph[cutVal]] = "a";
        this.cut[cutVal] = false;
        (() => {this.ithkword = this.slots.slice(0,-1).join("")})(); // recalculate ithkword because slots have updated
        wordVowels = this.ithkword.match(/(?:ai|ei|ëi|oi|ui|au|eu|ëu|ou|iu|[aeiouäëöü])/gi); // recalculate wordVowels because ithkword has updated
      }
      if (this.cut[1] && this.calculateEJ) {
          // if slot 9 isn't already filled* and the first letter of the next word is a consonant and the user is okay with doing this
          // (*not strictly necessary to check for but better safe than sorry)
          this.ithkword += "a";
          // add an a at the end
      }
      // 5c: marking the stress
      this.ithkword = this.markStress(stressType, this.ithkword);
    },
    glossCalcs() {
      this.gloss = "";
      this.fullGloss = "";
      // glosses are of the form (T#-)S#(.CPT)(.S7cut)-"root"(-SLOT 4)(-SLOT 5.1)(-SLOT 5.2)(-SLOT 6)(-SLOT 7.1)(-SLOT 7.2)(-SLOT 8)(-SLOT 9)\SLOT 10,
      // unless there's a shortcut in which case slot 6 will be moved to slot 2
      // Slot 1
      if (this.gOptions.concat != '0') {
        this.gloss += "T" + this.gOptions.concat + "-";
        this.fullGloss += "T" + this.gOptions.concat + "-";
      }
      // Slot 2
      if (this.wordType == "normal") {
        this.gloss += "S" + this.gOptions.stem.charAt(1);
          if (this.gOptions.ver === "CPT") {
            this.gloss += ".CPT"
          }
          this.fullGloss += "S" + this.gOptions.stem.charAt(1) + "." + this.gOptions.ver;
      } else if (this.wordType == "refRoot") {
        this.gloss += (this.gOptions.ver == "CPT" ? "CPT-" : "");
        this.fullGloss += this.gOptions.ver + "-";
      } else if (this.wordType == "affRoot") {
        this.gloss += (this.gOptions.ver == "CPT" ? "CPT" : "");
        this.gloss += (this.gOptions.ver == "CPT" && this.gOptions.func == "DYN" ? "." : "");
        this.gloss += (this.gOptions.func == "DYN" ? "DYN" : "");
        this.gloss += (this.gOptions.ver == "CPT" || this.gOptions.func == "DYN" ? "-" : "");
        this.fullGloss += this.gOptions.ver + "." + this.gOptions.func + "-";
      }
      if (this.shortcutting) {
        var configgCode = (this.gOptions.plex+this.gOptions.simil+this.gOptions.cctd).slice(0,3);
        if (this.wordType == "normal") {this.fullGloss += "."}
        this.fullGloss += this.gOptions.affil+"."+configgCode+"."+this.gOptions.ext+"."+this.gOptions.persp+"."+this.gOptions.ess;
        var s2c = [];
        if (this.gOptions.affil != "CSL") {s2c.push(this.gOptions.affil)}
        if (configgCode != "UPX") {s2c.push(configgCode)}
        if (this.gOptions.ext != "DEL") {s2c.push(this.gOptions.ext)}
        if (this.gOptions.persp != "M") {s2c.push(this.gOptions.persp)}
        if (this.gOptions.ess != "NRM") {s2c.push(this.gOptions.ess)}
        if (s2c.length > 0 && this.wordType == "normal") {this.gloss += "." + s2c.join(".")}
        else if (s2c.length > 0) {this.gloss += s2c.join(".") + "-"}
        if (this.wordType == "refRoot") {this.fullGloss += "-"}
      } else if (this.slotVIIshortcut) {
        let viaf = this.gOptions.VIIafx[this.gOptions.VIIafx.length - 1];
        if (viaf[0] == "r" && viaf[1] == "4") {
          this.gloss += ".'relative negation'";
          this.fullGloss += ".'relative negation'";
        } else if (viaf[0] == "t" && viaf[1] == "4") {
          this.gloss += ".'previously mentioned'";
          this.fullGloss += ".'previously mentioned'";
        } else if (viaf[0] == "t" && viaf[1] == "5") {
          this.gloss += ".'[+head]'";
          this.fullGloss += ".'[+head]'";
        }
      }
      // Slot 3
      if (this.wordType == "normal") {
        this.gloss += '-"' + this.gOptions.root.toLowerCase() + '"'; // will be changed if/when community database integration is added - the glossbot actually uses BOLD for unidentified roots
        this.fullGloss += '-"' + this.gOptions.root.toLowerCase() + '"';
      } else if (this.wordType == "affRoot") {
        this.gloss += '"' + this.gOptions.affRoot.toLowerCase() + '"';
        this.fullGloss += '"' + this.gOptions.affRoot.toLowerCase() + '"';
      } else if (this.wordType == "refRoot") {
        let gla = this.refGloss(this.gOptions.ref,this.gOptions.refEff,this.gOptions.refPersp);
        this.gloss += gla[0];
        this.fullGloss += gla[1];
      }
      // Slot 4
      if (this.wordType != "affRoot") {
        var s4c = [];
        if (this.gOptions.func != "STA") {s4c.push(this.gOptions.func)}
        if (this.gOptions.spec != "BSC") {s4c.push(this.gOptions.spec)}
        if (this.gOptions.ctxt != "EXS") {s4c.push(this.gOptions.ctxt)}
        if (s4c.length > 0) {this.gloss += "-" + s4c.join(".")}
        this.fullGloss += "-"+this.gOptions.func+"."+this.gOptions.spec+"."+this.gOptions.ctxt;
      } else {
        this.gloss += "-D" + (this.gOptions.arDegree+1).toString().slice((this.gOptions.arDegree+1).toString().length - 1);
        if (this.gOptions.spec != "BSC") {this.gloss += "." + this.gOptions.spec}
        this.fullGloss += "-D" + (this.gOptions.arDegree+1).toString().slice((this.gOptions.arDegree+1).toString().length - 1)+"."+this.gOptions.spec;
      }
      // Slot 5
      for (var i in this.gOptions.Vafx) {
        let affx = this.gOptions.Vafx[i];
        this.gloss += "-'" + affx[0] + "'/" + affx[1] + (affx[1] != "CA" ? {1:"₁",2:"₂",3:"₃",4:"₄"}[affx[2]] : ""); // will be changed if/when community database integration is added - the glossbot actually uses BOLD for unidentified roots
        this.fullGloss += "-'" + affx[0] + "'/" + affx[1] + (affx[1] != "CA" ? {1:"₁",2:"₂",3:"₃",4:"₄"}[affx[2]] : "");
      }
      // Slot 6
      if (!this.shortcutting) {
        var configCode = (this.gOptions.plex+this.gOptions.simil+this.gOptions.cctd).slice(0,3);
        if (!this.eightSix) {
          this.fullGloss += "-"+this.gOptions.affil+"."+configCode+"."+this.gOptions.ext+"."+this.gOptions.persp+"."+this.gOptions.ess;
          var s6c = [];
          if (this.gOptions.affil != "CSL") {s6c.push(this.gOptions.affil)}
          if (configCode != "UPX") {s6c.push(configCode)}
          if (this.gOptions.ext != "DEL") {s6c.push(this.gOptions.ext)}
          if (this.gOptions.persp != "M") {s6c.push(this.gOptions.persp)}
          if (this.gOptions.ess != "NRM") {s6c.push(this.gOptions.ess)}
          if (s6c.length > 0) {this.gloss += "-" + s6c.join(".")}
          else if (this.gOptions.Vafx.length > 0) {
            this.gloss += "-{Ca}";
          }
        } else { // if slot 8 has moved to slot 6, move the gloss here too
          this.gloss += "-"+this.gOptions.casc; // it is only possible with a non-default case-scope, so there's no need to check for that here
          this.fullGloss += "-"+this.gOptions.affil+"."+configCode+"."+this.gOptions.ext+"."+this.gOptions.persp+"."+this.gOptions.ess;
          this.fullGloss += "." + this.gOptions[this.gOptions.vn] + (this.gOptions.vn == "lvl" ? (this.gOptions.abslvl ? "a" : "r") : "") + "." + ((this.gOptions.rel === "UNF/K" && this.gOptions.concat == "0") ? this.gOptions.mood : this.gOptions.casc);
        }
      } else if (this.gOptions.Vafx.length > 0) {
        this.gloss += "-{Ca}";
        this.fullGloss += "-{Ca}";
      }
      // Slot 7
      if (this.slotVIIshortcut) {
        for (var j in this.gOptions.VIIafx.slice(0,-1)) {
          let affx = this.gOptions.VIIafx[j];
          this.gloss += "-'" + affx[0] + "'/" + affx[1] + (affx[1] != "CA" ? {1:"₁",2:"₂",3:"₃",4:"₄"}[affx[2]] : ""); // will be changed if/when community database integration is added - the glossbot actually uses BOLD for unidentified roots
          this.fullGloss += "-'" + affx[0] + "'/" + affx[1] + (affx[1] != "CA" ? {1:"₁",2:"₂",3:"₃",4:"₄"}[affx[2]] : "");
        }
      } else {
        for (var k in this.gOptions.VIIafx) {
          let affx = this.gOptions.VIIafx[k];
          this.gloss += "-'" + affx[0] + "'/" + affx[1] + (affx[1] != "CA" ? {1:"₁",2:"₂",3:"₃",4:"₄"}[affx[2]] : ""); // will be changed if/when community database integration is added - the glossbot actually uses BOLD for unidentified roots
          this.fullGloss += "-'" + affx[0] + "'/" + affx[1] + (affx[1] != "CA" ? {1:"₁",2:"₂",3:"₃",4:"₄"}[affx[2]] : "");
        }
      }
      // Slot 8
      if (!this.eightSix) {
      var s8c = [];
        if (this.gOptions[this.gOptions.vn] !== "MNO") {s8c.push(this.gOptions[this.gOptions.vn] + (this.gOptions.vn == "lvl" ? (this.gOptions.abslvl ? "a" : "r") : ""))}
        if (this.gOptions.mood !== "FAC" && this.gOptions.rel === "UNF/K" && this.gOptions.concat == "0") {s8c.push(this.gOptions.mood)}
        if (this.gOptions.casc !== "CCN" && (this.gOptions.rel !== "UNF/K" || this.gOptions.concat != "0")) {s8c.push(this.gOptions.casc)}
        if (s8c.length > 0) {this.gloss += "-" + s8c.join(".")}
        this.fullGloss += "-" + this.gOptions[this.gOptions.vn] + (this.gOptions.vn == "lvl" ? (this.gOptions.abslvl ? "a" : "r") : "") + "." + ((this.gOptions.rel === "UNF/K" && this.gOptions.concat == "0") ? this.gOptions.mood : this.gOptions.casc)
      }
      // Slot 9
      if (this.gOptions.rel === "UNF/K" && this.gOptions.concat == "0") {
        //IEV
        var s9c = [];
        this.fullGloss += "-"+this.gOptions.ill;
        if (this.gOptions.ill === "ASR") {this.fullGloss+="."+this.gOptions.vld}
        if (this.gOptions.ill !== "ASR") {s9c.push(this.gOptions.ill)}
        if (this.gOptions.ill === "ASR") {s9c.push(this.gOptions.vld)}
        if (s9c.length > 0) {this.gloss += "-" + s9c.join(".")}
      } else {
        //case
        if (this.gOptions.c !== "THM") {this.gloss += "-"+this.gOptions.c}
        this.fullGloss += "-"+this.gOptions.c;
      }
      // Slot 10
      if (this.gOptions.concat == '0') {
        this.fullGloss += "\\" + this.gOptions.rel.split("/")[0];
        if (this.gOptions.rel.split("/")[0] !== "UNF") {this.gloss += "\\" + this.gOptions.rel.split("/")[0]}
      }
      if (this.gOptions.shcut == "2") {
        let ph = this.gloss;
        this.gloss = this.fullGloss;
        this.fullGloss = ph;
      }
    },
    refGloss(ref,refEff,refPersp) {
      var output = "";
      var fullPut = ""
      output += refPersp == "M" ? "" : "[";
      fullPut += refPersp == "M" ? "" : "[";
      output += ref;
      output += refEff == "NEU" ? "" : "."+refEff;
      fullPut += ref + "." + refEff;
      output += refPersp == "M" ? "" : "+"+refPersp+"]";
      fullPut += refPersp == "M" ? "" : "+"+refPersp+"]";
      return [output,fullPut];
    },
    IPAcalcs() {
      // Calculate the IPA pronunciation of the Ithkuil word
      this.ipa = "";
      var skipnext = false;
      if (Object.keys(this.sAccent).includes(this.ithkword.charAt(0)) || Object.values(this.sAccent).includes(this.ithkword.charAt(0))) {
        this.ipa += "ʔ";
      }
      for (var i in this.ithkword.split("")) {
        if (!skipnext) {
          let prevchar = this.ithkword.charAt(parseInt(i)-1);
          let char = this.ithkword.charAt(parseInt(i));
          let nextchar = this.ithkword.charAt(parseInt(i)+1);
          if (Object.values(this.sAccent).includes(char)) {
            this.ipa += "ˈ";
          }
          if (char == " ") {
            this.ipa += " "
          }
          else if (char === "n") {
            if (["k","g","x"].includes(nextchar)) {this.ipa += "ŋ";}
            else {this.ipa += "n"}
          } else if (char === "r" && nextchar !== "r") {
            if (!(Object.keys(this.sAccent).includes(nextchar) || Object.values(this.sAccent).includes(nextchar))) {this.ipa += "ɹ"}
            else {this.ipa += "ɾ"}
          } else if (char === "x") {
            this.ipa += this.settings["IPA"][char][1].slice(1, -1); // this should be the user's choice between [x] and [χ], which is why it has its own else if
            if (char == nextchar) {
              this.ipa += "ː"
              skipnext = true;
            }
          } else if ("rr" === char+nextchar) {
            this.ipa += "r"
            skipnext = true;
          } else if ("řř" === char+nextchar) {
            this.ipa += this.settings["IPA"][char+nextchar][1].slice(1, -1) // again, this is the user's choice between [ʁ:] and [ʀ], which is why it also has its own else if
            skipnext = true;
          } else if (["hl","hr","hm","hn","hň"].includes(char+nextchar)) {
            if (this.settings["IPA"]["hx"][1] == "Devoiced") {
              this.ipa += {"hl":"ɬ","hr":"ɾ̥","hm":"m̥","hn":"n̥","hň":"ŋ̊"}[char+nextchar];
            } else {
              this.ipa += {"hl":"hl","hr":"hɾ","hm":"hm","hn":"hn","hň":"hŋ"}[char+nextchar];
            }
            skipnext = true;
          } else if (["ph","th","kh","ch","čh"].includes(char+nextchar) && (this.ithkword.charAt(parseInt(i)+2) === "" || Object.keys(this.sAccent).includes(this.ithkword.charAt(parseInt(i)+2)) || Object.values(this.sAccent).includes(this.ithkword.charAt(parseInt(i)+2)))) {
            // syllable-initial or word-final
            this.ipa += this.ipaLookup[char];
            this.ipa += "ʰ";
            skipnext = true;
          } else if (char === nextchar && Object.keys(this.ipaLookup).includes(char)) { // if geminated
            this.ipa += this.ipaLookup[char];
            this.ipa += "ː";
            skipnext = true;
          } else if (Object.keys(this.sAccent).includes(char) || Object.values(this.sAccent).includes(char)) { // if vowel
            var vwl;
            if (Object.values(this.sAccent).includes(char)) {vwl = Object.keys(this.sAccent).find(e => this.sAccent[e] == char)}
            else {vwl = char}
            if (vwl === nextchar || vwl === Object.keys(this.sAccent).find(e => this.sAccent[e] == nextchar)) { // if geminated vowel
              this.ipa += this.settings["IPA"][vwl][1].slice(1, -1);
              this.ipa += "ː";
              skipnext = true;
            } else if (["ä","ë"].includes(vwl)) {
                this.ipa += this.settings["IPA"][vwl][1].slice(1, -1);
            } else if (vwl === "a") {
                if (Object.keys(this.sAccent).includes(prevchar) || Object.values(this.sAccent).includes(prevchar)) {this.ipa += "ɑ"}
                else {this.ipa += this.settings["IPA"][vwl][1].slice(1, -1)}
            } else if (vwl === "e") {
                if (Object.keys(this.sAccent).includes(nextchar) || Object.values(this.sAccent).includes(nextchar)) {this.ipa += "e"}
                else {this.ipa += this.settings["IPA"][vwl][1].slice(1, -1)}
            } else if (vwl === "i") {
                if (Object.keys(this.sAccent).includes(nextchar) || Object.values(this.sAccent).includes(nextchar)) {this.ipa += "i"}
                else if (nextchar == "y" || prevchar == "y") {this.ipa += "ɪ"}
                else {this.ipa += this.settings["IPA"][vwl][1].slice(1, -1)}
            } else if (vwl === "o") {
                if (Object.keys(this.sAccent).includes(nextchar) || Object.values(this.sAccent).includes(nextchar)) {this.ipa += "o"}
                else {this.ipa += this.settings["IPA"][vwl][1].slice(1, -1)}
            } else if (vwl === "ö") {
                if (Object.keys(this.sAccent).includes(nextchar) || Object.values(this.sAccent).includes(nextchar)) {this.ipa += "ø"}
                else {this.ipa += this.settings["IPA"][vwl][1].slice(1, -1)}
            } else if (vwl === "u") {
                if (Object.keys(this.sAccent).includes(nextchar) || Object.values(this.sAccent).includes(nextchar)) {this.ipa += "u"}
                else if (nextchar == "w" || prevchar == "w") {this.ipa += "ʊ"}
                else {this.ipa += this.settings["IPA"][vwl][1].slice(1, -1)}
            } else if (vwl === "ü") {
                if (nextchar == "w" || prevchar == "w" || nextchar == "y" || prevchar == "y") {this.ipa += "ʉ"}
                else {this.ipa += this.settings["IPA"][vwl][1].slice(1, -1)}
            }
          } else if (Object.keys(this.ipaLookup).includes(char)) {
            this.ipa += this.ipaLookup[char];
          } else {
            this.ipa += "-";
          }
        } else {
          skipnext = false;
        }
      }
    },
    resetWord(gO=null) {
      if (gO == null) {
        gO = this.gDefault;
      }
      this.gOptions = JSON.parse(JSON.stringify(gO));
      for (var property in gO) {
        this.updateFromModal(property,JSON.parse(JSON.stringify(gO[property])));
      }
    },

    },
    beforeMount() {
        this.gOptions = JSON.parse(JSON.stringify(this.gDefault));
        this.handleSendMessage();
        //this.sentence.unshift([this.ithkword,JSON.parse(JSON.stringify(this.gOptions)),"normal",""]);
    },
    computed: {
      calculateEJ() {
        return (this.$props.selectedWord != this.$props.sLength - 1) && this.settings["Miscellaneous"].ej[1] && Object.keys(this.cData).includes(this.$props.nextWord[0].charAt(0));
      }
    }
}
</script>