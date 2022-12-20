<template>
  <title>Ithkapp | {{ithkword}}</title>
  <!-- This program works with TNIL Morpho-Phonology v0.19 and Phonotaxis v0.5.4 -->
  <!-- HEADER -->
  <div class="tab" id="header">
    <h1 style="float: left; padding-left: 20px; font-size: 16px; padding-top:2px;">Ithkapp</h1>
    <span class="close" style="padding-left:10px;" @click="openModal('settings')" title="Settings"><i class="fa-solid fa-gear fa-xs"></i></span>
    <span class="close" style="padding-left: 10px; height: 38px;" :style="sentenceOpen ? 'background-color:rgb(179, 255, 230); color:#333;' : ''" @click="openNav(false)" title="Sentence Menu"><i class="fa-solid fa-align-right fa-xs"></i></span>
    <!-- V4 WORD TYPE DROPDOWNS -->
    <div class="dropdown" v-if="langVer == 4">
      <button :class="{active: !['normal','affRoot','refRoot','ref','refCS','free'].includes(wordType)}" @click="openDropdown('adjDD')" v-click-outside="event => closeDropdown('adjDD',event)">Adjunct ▼</button>
      <div class="dropdown-content hidden" id="adjDD">
        <span @click="switchWordType('affixjunct')" :class="{active: wordType == 'affixjunct'}">Affixual</span>
        <span @click="switchWordType('modular')" :class="{active: wordType == 'modular'}">Modular</span>
        <span @click="switchWordType('register')" :class="{active: wordType == 'register'}">Register</span>
        <span @click="switchWordType('suppletive')" :class="{active: wordType == 'suppletive'}">Suppletive</span>
        <span @click="switchWordType('mcs')" :class="{active: wordType == 'mcs'}">Mood/Case-Scope</span>
        <span @click="switchWordType('bias')" :class="{active: wordType == 'bias'}">Bias</span>
      </div>
    </div>
    <div class="dropdown" v-if="langVer == 4">
      <button :class="{active: ['normal','affRoot','refRoot','ref','refCS','free'].includes(wordType)}" @click="openDropdown('formDD')" v-click-outside="event => closeDropdown('formDD',event)">Formative ▼</button>
      <div class="dropdown-content hidden" id="formDD">
        <span @click="switchWordType('normal')" :class="{active: wordType == 'normal'}">Normal</span>
        <span @click="switchWordType('affRoot')" :class="{active: wordType == 'affRoot'}">Affix as Root</span>
        <span @click="switchWordType('refRoot')" :class="{active: wordType == 'refRoot'}">Personal-Referential Root</span>
        <span @click="switchWordType('ref')" :class="{active: wordType == 'ref'}">Single/Dual-Referential</span>
        <span @click="switchWordType('refCS')" :class="{active: wordType == 'refCS'}">Single Referential w/ Case-Stacking</span>
        <span @click="switchWordType('free')" :class="{active: wordType == 'free'}">Non-Ithkuil (Borrowed) Word</span>
      </div>
    </div>
    <!-- END V4 WORD TYPE DROPDOWNS -->
    <!-- V3 WORD TYPE DROPDOWNS -->
    <div class="dropdown" v-if="langVer == 3">
      <button :class="{active: ['aspect','affix','bias'].includes(wordType)}" @click="openDropdown('adj3')" v-click-outside="event => closeDropdown('adj3',event)">Adjunct ▼</button>
      <div class="dropdown-content hidden" id="adj3">
        <span @click="switchWordType('aspect')" :class="{active: wordType == 'aspect'}">Aspectual</span>
        <span @click="switchWordType('affix')" :class="{active: wordType == 'affix'}">Affixual</span>
        <span @click="switchWordType('bias')" :class="{active: wordType == 'bias'}">Bias</span>
      </div>
    </div>
    <div class="dropdown" v-if="langVer == 3">
      <button :class="{active: ['normal','ref'].includes(wordType)}" @click="openDropdown('form3')" v-click-outside="event => closeDropdown('form3',event)">Formative ▼</button>
      <div class="dropdown-content hidden" id="form3">
        <span @click="switchWordType('normal')" :class="{active: wordType == 'normal'}">Normal</span>
        <span @click="switchWordType('ref')" :class="{active: wordType == 'ref'}">Personal Reference</span>
      </div>
    </div>
    <!-- END V3 WORD TYPE DROPDOWNS -->
    <!-- add more word type dropdowns for more versions here, in REVERSE order -->
  </div>

  <!-- MAIN (contains word-creation options) -->
  <div id="content">

    <Ithkuil_v4 v-if="langVer == '4'" ref="4"
    @modal="openModal" @gEmit="(g) => gOptions = JSON.parse(JSON.stringify(g))"
    @ithkword="(w) => {ithkword = w[0]; ipa = w[1]; gloss = w[2]; fullGloss = w[3]; sentence[selectedWord] = JSON.parse(JSON.stringify([ithkword,gOptions,wordType,sentence[selectedWord][3]]));}"
    :listenModal="modalListen" :listenWordtype="wordType" :listenWord="gSOptions" :selectedWord="selectedWord" :sLength="sentence.length" :nextWord="this.sentence[selectedWord+1]"/>

    <Ithkuil_v3 v-if="langVer == '3'" ref="3"
    @modal="openModal" @gEmit="(g) => gOptions = JSON.parse(JSON.stringify(g))"
    @ithkword="(w) => {ithkword = w[0]; ipa = w[1]; gloss = w[2]; fullGloss = w[3]; sentence[selectedWord] = JSON.parse(JSON.stringify([ithkword,gOptions,wordType,sentence[selectedWord][3]]));}"
    :listenModal="modalListen" :listenWord="gSOptions" :listenWordtype="wordType"/>
    
  </div>
  <!-- END OF MAIN -->

  <!-- FOOTER (contains word, pronunciation, and gloss) -->
  <div id="footer">
    <p><span class="word"><b>{{ithkword}}</b></span><br/>
    <span class="smalltext">[{{ipa}}]<br/>
    <span :title="fullGloss">{{gloss}}</span></span></p>
  </div>

  <!-- MODALS (POPUPS) -->
  <div id="modal" class="modal" @click.self="closeModal()">
    <div id="modal-content">
      <div class="tab">
        <button v-for="tabcode in modalTabs" :key="tabcode" :class="{active: tabcode === modalID}" @click="closeModal(); openModal(tabcode);">{{this.$refs[langVer].gData[(isNaN(tabcode.slice(-1)) ? tabcode : tabcode.slice(0,-1))].title}}</button>
        <button v-if="modalID == 'share'" @click="notAvailableAlert('Sharing sentences via hyperlink')">Create Hyperlink</button>
        <button v-if="modalID == 'share'" @click="copytoCB(concatenateSentence(sentence))">Copy to Clipboard</button>
        <span class="close" @click="closeModal()">&times;</span>
      </div>
      <div :class="{hidden: modalID != 'settings'}" style="padding-left: 20px; padding-right: 20px; padding-bottom: 20px;">
        <h2 style="text-align:center">Settings</h2>
        <div v-for="section of Object.keys(settingsClone)" :key="section">
          <h3>{{section}}</h3>
          <span v-for="setOpt in Object.keys(settingsClone[section])" :key="setOpt">
            <label>{{settingsClone[section][setOpt][0]}}</label>
            <select v-if="settingsClone[section][setOpt].length > 2" v-model="this.$refs[langVer].settings[section][setOpt][1]" @change="this.$refs[langVer].handleSendMessage()"><option v-for="spOpt in settingsClone[section][setOpt][2]" :key="spOpt">{{spOpt}}</option></select>
            <input type="checkbox" v-else v-model="this.$refs[langVer].settings[section][setOpt][1]" @change="this.$refs[langVer].handleSendMessage()"/>
            <br/><br/>
          </span>
        </div>
        <a href="https://github.com/TheXXOs/ithkapp" target="_blank">This project on GitHub</a>
      </div>
      <div v-if="modalID != 'settings' && modalID != 'share'">
        <h2 style="text-align:center;">{{modalContent.title}}</h2>
        <p style="text-align:center;" v-html="modalContent.popupdesc"></p>
        <div v-if="modalContent.type == ''">
          <div v-if="['c','c1','c2'].includes(modalID)" class="tab">
            <button class="tablinks active" @click="changeClassTab('THM','PLM','Allcases')" id="Allcases">All</button>
            <button class="tablinks" @click="changeClassTab('THM','IND','Transrelative')" id="Transrelative">Transrelative</button>
            <button class="tablinks" @click="changeClassTab('POS','PAR','Appositive')" id="Appositive">Appositive</button>
            <button class="tablinks" @click="changeClassTab('APL','CSD','Associative')" id="Associative">Associative</button>
            <button class="tablinks" @click="changeClassTab('FUN','SIT','Adverbial')" id="Adverbial">Adverbial</button>
            <button class="tablinks" @click="changeClassTab('PRN','RLT','Relational')" id="Relational">Relational</button>
            <button class="tablinks" @click="changeClassTab('ACT','VOC','Affinitive')" id="Affinitive">Affinitive</button>
            <button class="tablinks" @click="changeClassTab('LOC','PLM','Spatio-Temporal')" id="Spatio-Temporal">Spatio-Temporal</button>
          </div>
          <div v-if="['c','c1','c2'].includes(modalID)">
            <div v-for="option in Object.keys(modalContent.options).slice(Object.keys(modalContent.options).indexOf(this.casePopupStart),Object.keys(modalContent.options).indexOf(this.casePopupEnd)+1)" v-bind:key="modalContent.options[option]">
              <div @click="updateFromModal(modalID,option)" class="modalOption" :class="{modalSelected: this.$refs[langVer].gOptions[modalID] == option}">
                <h3>{{modalContent.options[option].name}}{{option === option.toString().toUpperCase() && !["0","1","2","3","4","5","6","7","8","9"].includes(option.toString()) ? " ("+option+")" : ""}}</h3>
                <p v-html="modalContent.options[option].desc"></p>
              </div>
            </div>
          </div>
          <div v-else v-for="option in Object.keys(modalContent.options)" v-bind:key="modalContent.options[option]">
            <div @click="updateFromModal(modalID,option)" class="modalOption" :class="{modalSelected: this.$refs[langVer].gOptions[modalID] == option}" :style="modalContent.options[option].image ? 'min-height:170px;' : ''">
              <img v-if="modalContent.options[option].image" :src="modalContent.options[option].image" :alt="modalContent.options[option].name" style="float: right; height:150px; padding-top: 10px; padding-left: 10px; padding-bottom: 10px;"/>
              <h3>{{modalContent.options[option].name}}{{option === option.toString().toUpperCase() && !["0","1","2","3","4","5","6","7","8","9"].includes(option.toString()) ? " ("+option+")" : ""}}</h3>
              <p v-html="modalContent.options[option].desc"></p>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="modalID == 'share'">
        <br/>
        <br/>
        <p style="text-align:center">Your sentence:</p>
        <h1 style="text-align:center;">{{concatenateSentence(sentence)}}</h1>
        <br/>
        <br/>
      </div>
    </div>
    <button id="modalToTop" @click="scrollToTop" :class="{hidden: modalID == 'share'}">↑</button>
  </div>

  <!-- SIDEBAR (sentence constructor) -->
  <div id="sidebar">
    <div id="sHeader">
      <span class="close" @click="closeNav()" style="transform: translateY(-20px)">&times;</span>
      <h3 style="padding-left: 20px;">Sentence Menu</h3>
    </div>
    <div id="sContent">
      <div v-for="(word,index) in sentence" :key="index" class="sentWord noSelecting"
      :class="{active: selectedWord == index, deletable: deleteWordMode, dragging: draggedWord === index}"
      @click="switchWord(index)" @mouseover="hoverChange(index)" @mouseleave="hovering = null" @mousemove="beginDrag(index)" @touchstart="beginDrag(index)"> <!-- @touchmove.prevent -->
        <p><b>{{word[0]}}</b></p>
        <textarea placeholder="Description..." v-model="sentence[index][3]" @input="resizeTA" rows="1" class="ta"></textarea>
        <br/>
      </div>
    </div>
    <div id="sFooter">
      <input type="file" @change="uploadJSON" accept=".json" id="fimport" class="hidden"/>
      <button title="Add New Word" @click="this.sentence.push(JSON.parse(JSON.stringify([this.$refs[langVer].defaultWord, this.$refs[langVer].gDefault, 'normal', ''])))"><i class="fa-solid fa-plus fa-xl"></i></button>
      <button title="Save" @click="exportToJsonFile(sentence)"><i class="fa-solid fa-floppy-disk fa-xl"></i></button>
      <button title="Import" @click.self="openFileDialog()"><label id="filab" for="fimport"><i class="fa-solid fa-arrow-up-from-bracket fa-xl"></i></label></button>
      <button title="Export/Share" @click="openModal('share'); closeNav()"><i class="fa-solid fa-share-from-square fa-xl"></i></button>
      <button title="Delete Words" @click="deleteWordMode = !deleteWordMode" :class="{active: deleteWordMode}"><i :class="deleteWordMode ? 'fa-solid fa-check fa-xl' : 'fa-solid fa-trash-can fa-xl'"></i></button>
    </div>
  </div>
</template>

<script>
import vClickOutside from "click-outside-vue3"

import Ithkuil_v4 from './qit4/4.vue'
import Ithkuil_v3 from './qit3/3.vue'

export default {
  name: 'App',
  components: {
    Ithkuil_v4,
    Ithkuil_v3, // THIS ONE FOR TESTING
},
  data() {
    return {
      langVer: "4",

      modalListen: [],
      wordType: "normal",
      modalContent: "",
      modalID: "",
      modalTabs: [],
      gOptions: {}, // grammar options,
      gSOptions: {},
      ithkword: "", // the calculated ithkuil word
      gloss: "", // gloss of word
      fullGloss: "", // full version of above
      ipa: "", // IPA transcription
      casePopupStart: "THM",
      casePopupEnd: "PLM",
      casePopupTitle: "Allcases",
      tabGroups: [["root","stem","spec"],["func","ver","ctxt"],["shcut","concat","rel"],["Vafx","VIIafx"],["plex","simil","cctd"],["affil","ext","persp","ess"],["vn","val","pha","eff","lvl","abslvl","asp"],["casc","c"],["mood","ill","vld"]],
      SRtabGroups: [["affRoot","arDegree"],["spec","func","ver","ctxt"],["shcut","concat","rel"],["Vafx","VIIafx"],["plex","simil","cctd"],["affil","ext","persp","ess"],["vn","val","pha","eff","lvl","abslvl","asp"],["casc","c"],["mood","ill","vld"]],
      REFtabGroups: [["ref","refEff","refPersp"],["spec","func","ver","ctxt"],["shcut","concat","rel"],["Vafx","VIIafx"],["plex","simil","cctd"],["affil","ext","persp","ess"],["vn","val","pha","eff","lvl","abslvl","asp"],["casc","c"],["mood","ill","vld"]],
      sentenceOpen: false,
      sentence: [], // things in this are of the form [word, grammarOptions, description]
      selectedWord: 0,
      deleteWordMode: false,
      oldScreenSize: 0,
      hovering: null,
      isMouseDown: false,
      draggedWord: null,
      settingsClone: {},
    }
  },
  methods: {
    notAvailableAlert(al) {
      alert(al + " is not available yet!");
    },
    openModal(code) {
      let tGroupFound = false;
      let tG = JSON.parse(JSON.stringify(this.$refs[this.langVer].tabGroups[this.wordType]));
      this.modalID = code;
      if (isNaN(code.charAt(code.length-1))) {
        this.modalContent = this.$refs[this.langVer].gData[code];
      } else {
        this.modalContent = this.$refs[this.langVer].gData[code.slice(0,-1)]
      }
      for (let i of tG) {
        if (i.includes(code)) {
          this.modalTabs = [...i];
          tGroupFound = true;
        }
      }
      if(!tGroupFound) {
        this.modalTabs = [];
      }
      document.getElementById("modal").style.display = "block";
      if(code === "c") { this.changeClassTab('THM','PLM','Allcases'); }
    },
    closeModal() {
      document.getElementById("modal").style.display = "none";
    },
    openDropdown(id) {
      document.getElementById(id).classList.toggle("hidden");
    },
    closeDropdown(id,event={},override=false) {
      if (override) {
        document.getElementById(id).classList.add("hidden");
      } else {
        try {
          if (event.path[1].id != id) {
            document.getElementById(id).classList.add("hidden");
          }
        } catch {
          //console.log("");
        }
      }
    },
    updateFromModal(reference,value) {
      this.modalListen = [reference,value];
    },
    scrollToTop() {
      document.getElementById('modal').scrollTo(0, 0);
    },
    changeClassTab(cStart,cEnd,cTitle) {
      this.casePopupStart = cStart;
      this.casePopupEnd = cEnd;
      this.casePopupTitle = cTitle;
      var tablinks = document.getElementsByClassName("tablinks");
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cTitle).className += " active";
    },
    switchWordType(type) {
      this.wordType = type;
      //this.calculateAdjunct(type);
      if (this.langVer == "4") {
        this.closeDropdown('adjDD',{},true);
        this.closeDropdown('formDD',{},true);
      } else if (this.langVer == "3") {
        this.closeDropdown('adj3',{},true);
        this.closeDropdown('form3',{},true);
      }
      //this.handleSendMessage(this.gOptions.root,"root");
    },
    concatenateSentence(sent) {
      let output = " "
      for (let i of sent) {
        output += i[0];
        if (["normal","affRoot","refRoot"].includes(i[2]) && i[1].concat != '0') {
          output += "-";
        } else {
          output += " ";
        }
      }
      if (output.charAt(output.length-1) == " ") {
        output = output.slice(0,-1);
      }
      return output;
    },
    resetWord(gO=null) {
      if (gO == null) {
        gO = this.$refs[this.langVer].gDefault;
      }
      this.gSOptions = JSON.parse(JSON.stringify(gO));
      /*for (var property in gO) {
        this.updateFromModal(property,JSON.parse(JSON.stringify(gO[property])));
      }*/
    },
    openNav(override=false) {
      this.gSOptions = JSON.parse(JSON.stringify(this.gOptions));
      if (window.innerWidth >= 650) {
        if (this.sentenceOpen && !override) {this.closeNav()}
        else {
          this.sentenceOpen = true;
          document.getElementById('sidebar').style.width = "250px";
          document.getElementById('sFooter').style.width = "250px";
          document.getElementById('content').style.marginRight = "250px";
          document.getElementById('header').style.marginRight = "250px";
          document.getElementById('footer').style.marginRight = "250px";
          document.getElementById('modal').style.marginRight = "250px";
          document.getElementById('modalToTop').style.right = "270px";
        }
      } else {
        if (override) {this.closeNav()}
        this.sentenceOpen = true;
        document.getElementById('sidebar').style.width = "100%";
        document.getElementById('sFooter').style.width = "100%";
      }
    },
    closeNav() {
      this.sentenceOpen = false;
      document.getElementById('sidebar').style.width = "0";
      document.getElementById('sFooter').style.width = "0";
      document.getElementById('content').style.marginRight = "0";
      document.getElementById('header').style.marginRight = "0";
      document.getElementById('footer').style.marginRight = "0";
      document.getElementById('modal').style.marginRight = "0";
      document.getElementById('modalToTop').style.right = "20px";
    },
    switchWord(index,override=false) { // use override=true to NOT delete a word, even if it's in delete mode
      if (this.deleteWordMode && !override) {
        if (confirm("Really delete "+this.sentence[index][0]+(this.sentence[index][3] ? " ("+this.sentence[index][3]+")" : "")+"?")) {
          this.sentence.splice(index,1);
          if (this.sentence.length == 0) {
            this.sentence.push([this.$refs[this.langVer].defaultWord,JSON.parse(JSON.stringify(this.$refs[this.langVer].gDefault)),"normal",""]);
          }
          if ((this.sentence.length <= this.selectedWord || index < this.selectedWord) && this.selectedWord != 0) {this.switchWord(this.selectedWord-1,true)}
          else {this.switchWord(this.selectedWord,true);}
        }
      } else {
        this.selectedWord = index;
        this.ithkword = this.sentence[index][0]
        //this.gOptions = JSON.parse(JSON.stringify(this.sentence[index][1]));
        this.wordType = this.sentence[index][2];
        //this.handleSendMessage(this.gOptions.root,"root");
        this.resetWord(this.sentence[index][1]);
      }
    },
    onScreenResize(){
      if (((this.oldScreenSize >= 650 && window.innerWidth < 650) || (this.oldScreenSize < 650 && window.innerWidth >= 650)) && this.sentenceOpen) {
        this.openNav(true);
      }
      this.oldScreenSize = window.innerWidth;
    },
    hoverChange(index){
      this.hovering = index;
      if (this.isMouseDown && this.draggedWord !== null && this.draggedWord !== this.hovering) {
        var sW = JSON.parse(JSON.stringify(this.sentence[this.draggedWord]));
        this.sentence.splice(this.draggedWord,1);
        this.sentence.splice(this.hovering,0,JSON.parse(JSON.stringify(sW)));
        if (this.selectedWord === this.draggedWord) {
          this.switchWord(this.hovering,true);
        } else if (this.selectedWord === this.hovering) {
          this.switchWord(this.draggedWord,true);
        }
        let j = document.getElementsByClassName("ta")[this.draggedWord].style.height;
        document.getElementsByClassName("ta")[this.draggedWord].style.height = document.getElementsByClassName("ta")[index].style.height;
        document.getElementsByClassName("ta")[index].style.height = j;
        //this.isMouseDown = false;
        this.draggedWord = index;
      }
    },
    onMouseDownF() {
      if (!this.deleteWordMode) {
        this.isMouseDown = true;
      }
    },
    onMouseUpF() {
      if (!this.deleteWordMode) {
        this.isMouseDown = false;
        this.draggedWord = null;
      }
    },
    beginDrag(index) {
      if (!this.deleteWordMode) {
        if (this.isMouseDown) {
          this.draggedWord = index;
        }
      } else {
        this.draggedWord = null;
      }
    },
    resizeTA(e) {
      e.target.style.height = "18px";
      e.target.style.height = e.target.scrollHeight + "px";
    },
    copytoCB(val) {
      try {
        navigator.clipboard.writeText(val).then(
          function() {
            alert("Copied to clipboard successfully");
          }, function() {
            alert("Could not copy to clipboard");
          }
        )
      } catch {
        alert("Could not copy to clipboard");
      }
    },
    setCookie(cname, cvalue, exdays) { // from w3schools
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie(cname) { // from w3schools
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    deleteCookie(name) { // from stackoverflow (https://stackoverflow.com/questions/10593013/delete-cookie-by-name)
      document.cookie = name +'=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    handleImportedWord(snt) {
      // snt is a list representative of the sentence, like this.sentence
      try {
        this.sentence = [];
        for (let wID in snt) {
          this.sentence.push([this.$refs[this.langVer].defaultWord,JSON.parse(JSON.stringify(this.$refs[this.langVer].gDefault)),"normal",""]);
          for (let gopt in snt[wID][1]) {
            if (Object.prototype.hasOwnProperty.call(this.gOptions, gopt)) {
              this.sentence[wID][1][gopt] = JSON.parse(JSON.stringify(snt[wID][1][gopt]));
            }
          }
          this.sentence[wID][0] = snt[wID][0]; // actual word
          this.sentence[wID][2] = snt[wID][2]; // word type
          this.sentence[wID][3] = snt[wID][3]; // user description
        }
      } catch {
        alert("Could not import correctly.");
      }
    },
    uploadJSON(event) {
      if (event.target.files.length > 0) {
        console.log(event.target.files);
        let reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.onload = () => {
          try {
            this.handleImportedWord(JSON.parse(reader.result));
            this.switchWord(0,true);
            document.getElementById("fimport").value = "";
          } catch {alert("Could not import correctly.");}
        }
      }
    },
    exportToJsonFile(jsonData) { // code is from https://www.codevoila.com/post/30/export-json-data-to-downloadable-file-using-javascript
      let dataStr = JSON.stringify(jsonData);
      let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      let exportFileDefaultName = 'sentence.json';
      let linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    },
    openFileDialog() {
      document.getElementById('filab').click();
    }
  },
  beforeMount() {
    //this.gSentenceOptions = JSON.parse(JSON.stringify(this.gDefault));
    /*let sCookie = this.getCookie("settings");
    let wCookie = this.getCookie("sentence");
    if (sCookie != "") {
      for (let i in JSON.parse(sCookie)) {
        this.settingRaw[i] = JSON.parse(sCookie)[i];
        if (this.settingRaw[i] != "h+" && this.settingRaw[i] != "dev") {
          this.ipaPreference[["a","e","ë","i","o","ö","u","ü","x","řř"][i]] = this.settingRaw[i].slice(1, -1);
        } else {
          if (this.settingRaw[i] == "dev") {
            this.ipaPreference["hl"] = "ɬ";
            this.ipaPreference["hr"] = "ɾ̥";
            this.ipaPreference["hm"] = "m̥";
            this.ipaPreference["hn"] = "n̥";
          } else {
            this.ipaPreference["hl"] = "hl";
            this.ipaPreference["hr"] = "hɾ";
            this.ipaPreference["hm"] = "hm";
            this.ipaPreference["hn"] = "hn";
          }
        }
      }
    }
    if (wCookie != "") {
      this.sentence = JSON.parse(wCookie);
    }*/
    this.sentence.unshift([this.ithkword,JSON.parse(JSON.stringify(this.gOptions)),"normal",""]);
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  created() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('v')) {
      if (urlParams.get('v') != "3") {
        this.langVer = "4";
      } else {
        this.langVer = urlParams.get('v');
      }
    }
    this.oldScreenSize = window.innerWidth;
    window.addEventListener("resize",this.onScreenResize);
    window.addEventListener("mousedown",this.onMouseDownF);
    window.addEventListener("mouseup",this.onMouseUpF);
    window.addEventListener("touchstart",this.onMouseDownF);
    window.addEventListener("touchend",this.onMouseUpF);
  },
  unmounted() {
    window.removeEventListener("resize",this.onScreenResize);
    window.removeEventListener("mousedown",this.onMouseUpF);
    window.removeEventListener("mouseup",this.onMouseDownF);
    window.removeEventListener("touchstart",this.onMouseUpF);
    window.removeEventListener("touchend",this.onMouseDownF);
  },
  mounted() {
    this.settingsClone = JSON.parse(JSON.stringify(this.$refs[this.langVer].settings));
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #363247;
  margin-top: 60px;
  background-color: #EDF3F5;
}
.word {
  font-size: 25px;
}
.smalltext {
  font-size: 13px;
  color: gray;
  font-family: Arial, sans-serif;
}
#header {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  /*width: 100%;*/
  overflow: visible;
  background-color: #EDF3F5;
  transition: margin-right 0.5s;
}
#content {
  position: absolute;
  top: 45px;
  left: 0px;
  bottom: 90px;
  right: 0px;
  overflow: auto;
  z-index: -10;
  transition: margin-right 0.5s;
}
#footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 95px;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: black;
  background-color: #EDF3F5;
  overflow: hidden;
  transition: margin-right 0.5s;
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
@media (max-width: 800px) {
  .section {
    flex-direction: column;
  }
}
.modal {
  display: none;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  transition: margin-right 0.5s;
}
#modal-content {
  background-color: white;
  margin: 15% auto;
  /*padding: 20px;*/
  border: 1px solid #888;
  width: 80%;
  text-align: left;
}
#modal-content p a {
  color: black;
  font-weight: bold;
}
#modal-content > div > p {
  padding-left: 20px;
  padding-right: 20px;
}
#modalToTop {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #218580;
  color: white;
  border-color: white;
  width: 50px;
  height: 50px;
  text-decoration: none;
  border-radius: 25px;
  text-align: center;
  font-size: 35px;
  transition: right 0.5s; /* this is here just in case it's possible to open the menu while a modal is open. it shouldn't be, but it might. */
}
.modalOption {
  border: 1px solid black;
  padding-left: 20px;
  padding-right: 20px;
}
.modalSelected {
  background-color: rgb(179, 255, 230)
}
.modalOption:hover,
.modalOption:focus {
  text-decoration: none;
  cursor: pointer;
}
.modalSelected:hover {
  cursor: auto;
}
.close {
  color: #aaa;
  float: right;
  padding-right: 10px;
  padding-top: 5px;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.tab {
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  background-color: #f1f1f1;
}
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
}
.tab button:hover {
  background-color: #ddd;
}
.tab button.active {
  background-color: rgb(179, 255, 230);
}
.tab button:active {
  background-color: rgb(174, 221, 205);
}
.hidden {
  display: none;
}
.noSelecting {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
a {
  color: #3B3575;
}
a:active {
  color: #98838F;
}
.dropdown {
  position: relative;
  float: right;
}
.dropdown-content {
  position: absolute;
  background-color: #EDF3F5;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 3;
  right: 0;
  top: 43px;
}
.dropdown-content span {
  color: black;
  padding: 12px 16px;
  display: block;
  cursor: pointer;
  z-index: 3;
}
.dropdown-content span:hover {
  background-color: #ddd;
}
.dropdown-content span.active {
  background-color: rgb(196, 255, 235);
}
#sidebar {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  background-color: #d8e2e6; /* #EDF3F5 */
  border-left: 1px solid rgb(189, 189, 189);
  overflow-x: hidden;
  transition: 0.5s;
}
.sentWord {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  border: 1px solid black;
  background-color: #afbdc2;
  max-width: 100%;
  padding: 0 10px;
  cursor: pointer;
  height: auto;
}
.sentWord.active {
  background-color: rgb(196, 255, 235);
}
.sentWord.deletable {
  color: #FF2C3E;
  border-color: #FF2C3E;
}
.sentWord.dragging {
  border-radius: 5px;
  opacity: 0.5;
  cursor: grabbing;
}
.sentWord.dragging textarea {
  cursor: grabbing;
}
.sentWord p {
  overflow-wrap: break-word;
  text-align: left;
  font-size: 20px;
}
.sentWord textarea {
  background-color: inherit;
  border: none;
  font-size: 16px;
  font-style: italic;
  width: 100%;
  left: 0;
  resize: vertical;
  transform: translate(-3px,-10px);
  cursor: auto;
  color: inherit;
}
#sContent {
  bottom: 50px;
  right: 0;
  top: 50px;
  width: inherit;
  overflow: auto;
  position: absolute;
}
#sFooter {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 0;
  height: 50px;
  border-top: 1px solid rgb(189, 189, 189);
  overflow: hidden;
  transition: width 0.5s;
}
#sFooter button {
  height: 40px;
  width: 40px;
  margin: 5px;
  background-color: #EDF3F5;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
}
#sFooter button:hover {
  background-color: #c7f3f1;
}
#sFooter button:active {
  background-color: #b8e2f0
}
#sFooter button.active {
  background-color: rgb(179, 255, 230);
}
#sFooter button label {
  cursor: pointer;
}
@media (max-width: 650px) {
  #sFooter {
    height: 20vw;
  }
  #sFooter button {
    height: 16vw;
    width: 16vw;
    margin: 2vw;
  }
  #sContent {
    bottom: 20vw;
  }
}
</style>