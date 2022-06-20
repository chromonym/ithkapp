<template>
  <!-- This program works with TNIL Morpho-Phonology v0.19 and Phonotaxis v0.5.4 -->
  <div id="content">
    <h1>Ithkapp</h1>
    <p class="smalltext">That's a placeholder name.<br/>Compatible with TNIL Morpho-Phonology v0.19 and Phonotaxis v0.5.4</p>
    <div class="section"> <!-- Section 1: Root, etc. -->
      <OptionBox :json="gData.root" code="root" @send-message="handleSendMessage" type="text" ref="root" @modal="openModal"/> <!-- @modal="openModal", ref="code" for each of these -->
      <OptionBox :json="gData.stem" code="stem" @send-message="handleSendMessage" ref="stem" @modal="openModal"/>
      <OptionBox :json="gData.spec" code="spec" @send-message="handleSendMessage" ref="spec" @modal="openModal"/>
      <OptionBox :json="gData.func" code="func" @send-message="handleSendMessage" ref="func" @modal="openModal"/>
      <OptionBox :json="gData.ver" code="ver" @send-message="handleSendMessage" ref="ver" @modal="openModal"/>
    </div>
    <div class="section"> <!-- Section 2: Concatenation & Affixes-->
      <OptionBox :json="gData.rel" code="rel" @send-message="handleSendMessage" ref="rel" @modal="openModal"/>
      <OptionBox :json="gData.shcut" code="shcut" @send-message="handleSendMessage" ref="shcut" @modal="openModal"/>
      <OptionBox :json="gData.concat" code="concat" @send-message="handleSendMessage" ref="concat" @modal="openModal"/>
      <OptionBox :json="gData.Vafx" code="Vafx" @send-message="handleSendMessage" type="affix" ref="Vafx" @modal="openModal"/>
      <OptionBox :json="gData.VIIafx" code="VIIafx" @send-message="handleSendMessage" type="affix" ref="VIIafx" @modal="openModal"/>
    </div>
    <div class="section"> <!-- Section 3: Configuration -->
      <h2 style="width:100%;">Configuration</h2>
      <OptionBox :json="gData.plex" code="plex" @send-message="handleSendMessage" ref="plex" @modal="openModal"/>
      <OptionBox :json="gData.simil" code="simil" @send-message="handleSendMessage" :disabled='["UPX","DPX"].includes(this.gOptions.plex)' ref="simil" @modal="openModal"/>
      <OptionBox :json="gData.cctd" code="cctd" @send-message="handleSendMessage" :disabled='["UPX","DPX"].includes(this.gOptions.plex)' ref="cctd" @modal="openModal"/>
    </div>
    <div class="section"> <!-- Section 4: Slot 6 -->
      <OptionBox :json="gData.affil" code="affil" @send-message="handleSendMessage" ref="affil" @modal="openModal"/>
      <OptionBox :json="gData.ext" code="ext" @send-message="handleSendMessage" ref="ext" @modal="openModal"/>
      <OptionBox :json="gData.persp" code="persp" @send-message="handleSendMessage" ref="persp" @modal="openModal"/>
      <OptionBox :json="gData.ess" code="ess" @send-message="handleSendMessage" ref="ess" @modal="openModal"/>
    </div>
    <div class="section"> <!-- Section 5: Slot 8a -->
      <OptionBox :json="gData.vn" code="vn" @send-message="handleSendMessage" ref="vn" @modal="openModal"/>
      <OptionBox :json="gData.val" code="val" @send-message="handleSendMessage" ref="val" @modal="openModal"/>
      <OptionBox :json="gData.pha" code="pha" @send-message="handleSendMessage" ref="pha" @modal="openModal"/>
      <OptionBox :json="gData.eff" code="eff" @send-message="handleSendMessage" ref="eff" @modal="openModal"/>
      <OptionBox :json="gData.lvl" code="lvl" @send-message="handleSendMessage" ref="lvl" @modal="openModal"/>
      <OptionBox :json="gData.asp" code="asp" @send-message="handleSendMessage" ref="asp" @modal="openModal"/>
    </div>
    <div class="section"> <!-- Section 6: Slot 8b to 10 -->
      <OptionBox :json="gData.ctxt" code="ctxt" @send-message="handleSendMessage" ref="ctxt" @modal="openModal"/>
      <OptionBox v-if='this.gOptions.rel == "UNF/K"' :json="gData.mood" code="mood" @send-message="handleSendMessage" ref="mood" @modal="openModal"/>
      <OptionBox v-else :json="gData.casc" code="casc" @send-message="handleSendMessage" ref="casc" @modal="openModal"/>
      <OptionBox v-if="this.gOptions.rel != 'UNF/K'" :json="gData.c" code="c" @send-message="handleSendMessage" ref="c" @modal="openModal"/>
      <OptionBox v-if="this.gOptions.rel == 'UNF/K'" :json="gData.ill" code="ill" @send-message="handleSendMessage" ref="ill" @modal="openModal"/>
      <OptionBox v-if="this.gOptions.rel == 'UNF/K'" :json="gData.exp" code="exp" @send-message="handleSendMessage" ref="exp" @modal="openModal"/>
      <OptionBox v-if="this.gOptions.rel == 'UNF/K'" :json="gData.vld" code="vld" @send-message="handleSendMessage" :disabled='this.gOptions.ill == "PFM"' ref="vld" @modal="openModal"/>
    </div>
    <!--(Note: The affix slots & root slot will eventually be modified to be a definition-based selector)-->
  </div>
  <div id="footer">
    <p><span class="word"><b>{{ithkword}}</b></span><br/>
    <span class="smalltext">[{{ipa}}]<br/>
    <span :title="fullGloss">{{gloss}}</span></span></p>
  </div>
  <div id="modal" class="modal" @click.self="closeModal()">
    <div id="modal-content">
      <span class="close" @click="closeModal()">&times;</span>
      <h2 style="text-align:center;">{{modalContent.title}}</h2>
      <p style="text-align:center;">{{modalContent.popuptest}}</p>
      <div v-if="modalContent.type == ''">
        <div v-for="option in Object.keys(modalContent.options)" v-bind:key="modalContent.options[option]">
          <h2 style="text-align:center;" v-if='modalID === "c" && ["THM","POS","APL","FUN","PRN","ACT","LOC"].includes(option)'>{{{"THM":"Transrelative","POS":"Appositive","APL":"Associative","FUN":"Adverbial","PRN":"Relational","ACT":"Affinitive","LOC":"Spatio-Temporal"}[option]}} Cases</h2>
          <div @click="updateFromModal(modalID,option)" class="modalOption" :class="{modalSelected: gOptions[modalID] == option}">
            <h3>{{modalContent.options[option].name}} ({{option}})</h3>
            <p v-html="modalContent.options[option].desc"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OptionBox from './components/optionbox.vue'
import grammardata from './grammardata.json'
import consdata from './consdata.json'

export default {
  name: 'App',
  components: {
    OptionBox,
  },
  data() {
    return {
      modalContent: "",
      modalID: "",
      gData: grammardata,
      cData: consdata,
      gOptions: { // grammar options
        "root":"",
        "stem":"s1",
        "func":"STA",
        "spec":"BSC",
        "ctxt":"EXS",
        "ver":"PRC",
        "concat":0,
        "shcut":0,
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
        "asp":"RTR",
        "mood":"FAC",
        "casc":"CCN",
        "rel": "UNF/C",
        "c":"THM",
        "ill":"ASR",
        "exp":"COG",
        "vld":"OBS"
      },
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
        ["ae","ea","äi"] // yes, this one is shorter
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
        "ļ":"ɮ",
        "l":"l",
        // everything else has a reliance on the surrounding letters
      },
      ipaPreference: { // because with most vowels the user will eventually be able to choose which pronunciation they want
        "a": "a", // [a] or [ɑ]
        "ä": "æ", // only [æ]
        "e": "ɛ", // [ɛ] or [e]
        "ë": "ɤ", // [ɤ] or [ʌ] or [ə]
        "i": "i", // [i] or [ɪ]
        "ì":"iː", // only [iː]
        "o": "ɔ", // [ɔ] or [o]
        "ö": "œ", // [œ] or [ø]
        "u": "ʊ", // [ʊ] or [u]
        "ü": "ʉ"  // [ʉ] or [y]
      },
      shortcutting: false,
      shcuttypeA: 0,
      shcuttypeB: 0,
      slotVIIshortcut: false,
      sDip: ["ai","äi","ei","ëi","oi","öi","ui","au","eu","ëu","ou","iu"], // permissible diphthongs
      sAccent: {"a":"á","e":"é","i":"í","ì":"í","o":"ó","u":"ú","ä":"â","ë":"ê","ö":"ô","ü":"û"}, // how to accent vowels
      slots: ["","","","","","","","","","",""], // ithkuil word, split into slots (0-6 = I-VII, 7-8 = VIII, 9 = IX, 10 = ungeminated VI)
      cut: [false,false,false], // cut vowels - slots 2, 9, and 8a
      ithkword: "", // the calculated ithkuil word
      gloss: "", // gloss of word
      fullGloss: "", // full version of above
      ipa: "", // IPA transcription
    }
  },
  methods: {
    async handleSendMessage(value,code) { // what happens when an <OptionBox> updates its value
      console.log("Recieved "+value+" from "+code);
      await (()=>{ // apparently this being SPECIFICALLY await is important to making sure the Slot V and VII affixes work???
        if (code === "rel" && (value == "UNF/K" || this.gOptions.rel == "UNF/K")) {
          this.gOptions.c = "THM"; // quick fix to match the fact that the OptionBoxes for these reset but the values don't
          this.gOptions.ill = "ASR";
          this.gOptions.exp = "COG";
          this.gOptions.vld = "OBS";
          this.gOptions.casc = "CCN";
          this.gOptions.mood = "FAC";
        }
        this.cut = [false,false,false]; // reset this.cut
      })();
      (()=>{this.gOptions[code] = value})();
      if (code == "root") {this.slots[2] = value.toLowerCase()} // this is essentially this.calculateSlot3(), because slot 3 is just the root
      this.calculateWord();
      this.IPAcalcs();
      this.glossCalcs();
    },
    openModal(code) {
      console.log("Modal opening for",code);
      this.modalContent = this.gData[code];
      this.modalID = code;
      document.getElementById("modal").style.display = "block";
    },
    closeModal() {
      document.getElementById("modal").style.display = "none";
    },
    updateFromModal(reference,value) {
      this.$refs[reference].updateValue(value);
    },
    calculateWord() {
      // this order is specifically because slots 4 and 6 can influence slots 1 through 5 due to shortcutting.
      // additionally, what slot 2 shows can influence what slot 7 shows
      this.calculateSlot4();
      this.calculateSlot6();
      this.shortcutCalcs(); // this is because slots 1, 2 and 5 are dependant in a very specific way on what 4 and 6 are, IF shortcuts are enabled.
      this.calculateSlot1();
      this.calculateSlot2();
      this.calculateSlot5();
      this.calculateSlot7();
      this.calculateSlot8a();
      this.calculateSlot8b();
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
      if (!this.shortcutting){
        var lastVII;
        var vowelColumn = 0;
        if (this.gOptions.shcut === 0) {
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
      if (this.gOptions.Vafx.length >= 2) {
        this.slots[1] = this.insertGStop(this.slots[1]);
      }
    },
    calculateSlot4() {
      var ph = {"STA":{"BSC":0,"CTE":1,"CSV":2,"OBJ":3},
                "DYN":{"OBJ":5,"CSV":6,"CTE":7,"BSC":8}}; // again, svf 5 is skipped
      var phh = ["EXS","FNC","RPS","AMG"];
      this.slots[3] = this.sVowels[ph[this.gOptions.func][this.gOptions.spec]][phh.findIndex(x => x == this.gOptions.ctxt)];
    },
    calculateSlot5() {
      // I have no idea if it was the Object.assign() or the async/await in handleSendMessage(), but it works and I'm not questioning it.
      var out="";
      for (var j in this.gOptions.Vafx) {
        var i = Object.assign({},this.gOptions.Vafx[j]);
        if (this.shortcutting) {
          if (j == (this.gOptions.Vafx.length-1)) {
            out += this.insertGStop(this.sVowels[(i[1]+9)%10][i[2]-1]); // if it's the last slot 5 and slot 6 has been dropped, insert a glottal stop into the vowel
          } else {
            out += this.sVowels[(i[1]+9)%10][i[2]-1];
          }
          out += i[0];
        } else {
          out += i[0];
          out += this.sVowels[(i[1]+9)%10][i[2]-1];
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
        AFFIL += "ļ"
      } else if (AFFIL === "" && CONF === "" && EXT === "") { // if perspective + essence is the only one with a value (incl. empty)
        if (PSPESS === ""){PSPESS = "l"}
        else if (PSPESS === "l"){PSPESS = "tļ"}
        else if (PSPESS === "w"){PSPESS = "v"}
        else if (PSPESS === "y"){PSPESS = "j"}
      }
      var out = AFFIL+CONF+EXT+PSPESS
      // step 3: applying allomorphic substitutions
      var ph1 = {"pp":"mp","tt":"nt","kk":"nk","ll":"pļ","pb":"mb","kg":"ng","çy":"nd","rr":"ns","rř":"nš","řř":"ňš"}//,"ngn":"ňn","ff":"vw","ţţ":"ḑy"};
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
        var rulesApplied = [false,false,false,false,false,false,false,false,false];
        if (out.length === 1) {
          // 1. for forms consisting of a single consonant, geminate it.
          rulesApplied[0] = true;
          out += out
        }
        if (out === "tļ") {
          // 2. the standalone form tļ becomes ttļ.
          rulesApplied[1] = true;
          out = "ttļ";
        }
        if (['t','k','p','d','g','b'].includes(out.charAt(0)) && ['l','r','ř','w','y'].includes(out.charAt(0))) {
          // 3. for forms beginning with a stop followed by a liquid or approximant, geminate the stop.
          rulesApplied[2] = true;
          out = out.charAt(0) + out;
        }
        if (!rulesApplied[0] && (out.includes('s') || out.includes('š') || out.includes('z') || out.includes('ž') || out.includes('ç') || out.includes('c') || out.includes('č'))) {
          // 4. for forms containing a sibilant fricative or affricative in any position, geminate it.
          rulesApplied[3] = true;
          out = out.replace("s","ss").replace("š","šš").replace("z","zz").replace("ž","žž").replace("ç","çç").replace('c',"cc").replace("č","čč");
        }
        if (!rulesApplied[4] && (["f","ţ","v","ḑ","n","m","ň"].includes(out.charAt(0)))) {
          // 5. for forms beginning with either a non-sibilant fricative or a nasal, geminate it unless previous rule No. 4 applies.
          rulesApplied[4] = true;
          out = out.charAt(0) + out;
        }
        if (["t","k","p"].includes(out.charAt(0)) && ["s","š","f","ţ","ç"].includes(out.charAt(1))) {
          // 6. for forms beginning with a voiceless stop followed by a fricative, geminate the fricative.
          rulesApplied[5] = true;
          out = out.charAt(0) + out.charAt(1) + out.slice(1);
        }
        var ph = {"pt":"bbḑ","pk":"bbv","kt":"ggḑ","kp":"ggv","tk":"ḑvv","tp":"ddv"};
        if (rulesApplied.every(v => v === false) && Object.prototype.hasOwnProperty.call(ph, out.slice(-2))) {
          // 7. For forms ending in two stops, for which the previous six rules are inapplicable, use the substitutions in ph.
          rulesApplied[6] = true;
          out = out.slice(0,-2) + ph[out.slice(-2)];
        }
        var phh = {"pm":"vmm","pn":"vvn","bm":"bžžm","bn":"bžžn","km":"xxm","kn":"xxn","gm":"gžžm","gn":"gžžn","tm":"ḑḑm","tn":"ḑḑn","dm":"jjm","dn":"jjn"};
        if (rulesApplied.every(v => v === false) && Object.prototype.hasOwnProperty.call(phh, out.slice(-2))) {
          // 8. For forms ending in a stop plus nasal for which the previous seven rules are inapplicable, use the substitutions in phh.
          rulesApplied[7] = true;
          out = out.slice(0,-2) + phh[out.slice(-2)];
        }
        // 9. (not yet coded) For forms beginning with l-, r- or ř-, apply one of the above eight rules as if the l-, r- or ř- were not present;
        // if the resulting form including the initial l-, r- or ř- is not phonotactically permissible or is euphonically awkward,
        // geminate the l-, r- or ř- instead.
      }
      // finally: output
      this.slots[5] = out;
    },
    calculateSlot7() {
      // I have no idea if it was the Object.assign() or the async/await in handleSendMessage(), but it works and I'm not questioning it.
      var out="";
      if (this.slotVIIshortcut) {
        for (var j in this.gOptions.VIIafx.slice(0,-1)) {
          var i = Object.assign({},this.gOptions.VIIafx[j]);
          out += this.sVowels[(i[1]+9)%10][i[2]-1];
          out += i[0];
        }
      } else {
        for (var k in this.gOptions.VIIafx) {
          var l = Object.assign({},this.gOptions.VIIafx[k]);
          out += this.sVowels[(l[1]+9)%10][l[2]-1];
          out += l[0];
        }
      }
      this.slots[6] = out;
    },
    calculateSlot8a() {
      if (this.gOptions.vn === "asp") {
        // aspect
        var pph = [["RTR","PRS","HAB","PRG","IMM","PCS","REG","SMM","ATP"],
                  ["RSM","CSS","PAU","RGR","PCL","CNT","ICS","EXP","IRP"],
                  ["PMP","CLM","DLT","TMP","XPD","LIM","EPD","PTC","PPR"],
                  ["DCL","CCL","CUL","IMD","TRD","TNS","ITC","MTV","SQN"]];
        for (var i in pph) {
          if (pph[i].includes(this.gOptions.asp)) {
            this.slots[7] = this.sVowels[pph[i].findIndex(x => x === this.gOptions.asp)][i];
          }
        }
      } else {
        // not aspect
        var ph = ["val","pha","eff","lvl"];
        var phh = {"val":["MNO","PRL","CRO","RCP","CPL","DUP","DEM","CNG","PTI"],
                   "pha":["PCT","ITR","REP","ITM","RCT","FRE","FRG","VAC","FLC"],
                   "eff":["1:BEN","2:BEN","3:BEN","SLF:BEN","UNK","SLF:DET","3:DET","2:DET","1:DET"],
                   "lvl":["MIN","SBE","IFR","DFT","EQU","SUR","SPL","SPQ","MAX"]};
        this.slots[7] = this.sVowels[phh[this.gOptions.vn].findIndex(x => x === this.gOptions[this.gOptions.vn])][ph.findIndex(x => x == this.gOptions.vn)];
      }
    },
    calculateSlot8b() {
      var ph = [];
      var phh = [];
      if (this.gOptions.vn === "asp") { ph = ["w","hw","hlw","hly","hnw","hny"]; }
      else { ph = ["h","hl","hr","hm","hn","hň"]; }
      if (this.gOptions.rel != "UNF/K") {
        phh = ["CCN","CCA","CCS","CCQ","CCP","CCV"];
        this.slots[8] = ph[phh.findIndex(x => x === this.gOptions.casc)]
      }
      else {
        phh = ["FAC","SUB","ASM","SPC","COU","HYP"];
        this.slots[8] = ph[phh.findIndex(x => x === this.gOptions.mood)];
      }
    },
    calculateSlot9() {
      //"rel","c","ill","exp","vld"
      var ph = [["THM","INS","ABS","AFF","STM","EFF","ERG","DAT","IND"],
                ["POS","PRP","GEN","ATT","PDC","ITP","OGN","IDP","PAR"],
                ["APL","PUR","TRA","DFR","CRS","TSP","CMM","CMP","CSD"],
                ["FUN","TFM","CLA","RSL","CSM","CON","AVR","CVS","SIT"]];
      var phh = [["PRN","DSP","COR","CPS","COM","UTL","PRD","n/a","RLT"],
                 ["ACT","ASI","ESS","TRM","SEL","CFM","DEP","n/a","VOC"],
                 ["LOC","ATD","ALL","ABL","ORI","IRL","INV","n/a","NAV"],
                 ["CNR","ASS","PER","PRO","PCV","PCR","ELP","n/a","PLM"]];
      var pph = ["OBS","REC","PUP","RPR","n/a","IMA","CVN","ITU","INF"];
      var pphh = ["COG","RSP","EXE"];
      var pphnum = 0;
      var cfound = false;
      if (this.gOptions.rel !== "UNF/K") {
        for (var i in ph) {
          if (ph[i].includes(this.gOptions.c)) {
            this.slots[9] = this.sVowels[ph[i].findIndex(x => x === this.gOptions.c)][i];
            cfound = true;
          }
        }
        if (!cfound) {
          for (var j in phh) {
            if (phh[j].includes(this.gOptions.c)) {
              this.slots[9] = this.sVowels[phh[j].findIndex(x => x === this.gOptions.c)][j] + "'";
            }
          }
        }
      } else {
        if (this.gOptions.ill == "PFM") {
          pphnum = 4;
        } else {
          pphnum = pph.findIndex(x => x === this.gOptions.vld);
        }
        this.slots[9] = this.sVowels[pphnum][pphh.findIndex(x => x === this.gOptions.exp)];
      }
    },
    shortcutCalcs() {
      // SHORTCUTTING!
      (() => {
      if (this.gOptions.shcut === 1 && this.slots[3] == "a" && [["l","d","r","tļ","v","j","ř","dl"].includes(this.slots[10])]) {
        //l = ., d = PRX, r = G, tļ = RPV, v = N, j = A, ř = G.RPV, dl = PRX.RPV
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
      }})();
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
    removeDuplicate(strin){ // Code by shivanisinghss2110 @ https://www.geeksforgeeks.org/javascript-program-to-remove-duplicates-from-a-given-string/
      // Used as index in the modified string
      var index = 0;
      var n = strin.length;
      var str = strin.split("");
      // Traverse through all characters
      for (var i = 0; i < n; i++) {
        // Check if str[i] is present before it
        var j;
        for (j = 0; j < i; j++) {
          if (str[i] == str[j]) {
            break;
          }
        }
        // If not present, then add it to result.
        if (j == i) {
          str[index++] = str[i];
        }
      }
      return str.join("").slice(str, index);
    },
    
    finalCalcs() {
      var slot9saved = "";
      // Step 1: Glottal Stop Insertion in Slot 9
      if (this.slots[9].charAt(this.slots[9].length-1) === "'") {
        if (this.gOptions.concat === 0) {
          this.slots[9] = this.slots[9].slice(0,-1);
          this.slots[9] = this.insertGStop(this.slots[9],true);
        } else {
          slot9saved = this.slots[9];
          this.slots[9] = this.slots[9].slice(0,-1);
        }
      }
      
      if (this.gOptions.shcut !== 2) {
        // Step 2: Remove unnecessary vowels at the start - the logic is dependant on the length of the root, so that's what I've done.
        if (this.slots[0] === "" && this.slots[1] === "a") {
          var nogem = this.removeDuplicate(this.slots[2]);
          if (this.slots[2].length === 1) {
            //monocons. root
            if (this.slots[2] !== "ļ"){ // not ļ
              this.slots[1] = "";
              this.cut[0] = true; // slot 2 removed
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
                (["f","v","ţ","ḑ"] && ["r","l","w","y","ř","m","n","ň"].includes(rb)) ||
                (ra === "ļ" && this.getCons(["stop","unvoiced"],["affric","unvoiced"],["nasal"]).includes(rb)) || // 3.2.6 - ļ
                (ra === "ļ" && ["w","y"].includes(rb)) ||
                (ra === "h" && ["l","r","m","n","w"].includes(rb)) || // 3.2.7 - h
                (["m","n"].includes(ra) && ["l","r","w","y","ř"].includes(rb)) || // 3.2.8 - nasals
                (ra === "ň" && ["l","r","w"].includes(rb)) ||
                (["l","r"].includes(ra) && ["w","y"].includes(rb)) // 3.2.9 - liquids
            ){
              this.slots[1] = ""; // if ANY of the huge above if statement is true, you can drop the second slot
              this.cut[0] = true; // slot 2 removed
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
              this.slots[1] = "";
              this.cut[0] = true; // slot 2 removed
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
              this.slots[1] = "";
              this.cut[0] = true; // slot 2 removed
            }
          }
        }

        // Step 3: Remove unnecessary vowels at the end
        if (this.slots[7] === "a" && this.slots[8] === "h") {
          this.slots[7] = "";
          this.slots[8] = "";
          this.cut[2] = true; // slot 8a removed
          if (this.slots[9] === "a") { // here i have to check that the consonant before this is allowed at the end of a word
            var lastCons;
            var shortenSlot8 = true;
            if (this.gOptions.VIIafx.length == 0 && this.gOptions.Vafx.length == 0 && this.shortcutting) { // if slots 5 & 7 are empty and there's shortcutting,
              lastCons = this.slots[2]; // then the last consonant is the root.
            } else if (this.gOptions.VIIafx.length == 0 && this.shortcutting) { // if that but slot 5 is filled,
              shortenSlot8 = false; // don't remove slot 8, because 5 must have a glottal stop at the end which is not permitted.
            } else if (this.gOptions.VIIafx.length == 0) { // if that but no shortcutting,
              lastCons = this.slots[5]; // then the last consonant is slot 6.
            } else { // otherwise,
              lastCons = this.gOptions.VIIafx[this.gOptions.VIIafx.length-1][0]; // the last consonant is slot 7's last affix.
            }
            if (shortenSlot8) {
              var nogem2 = this.removeDuplicate(lastCons);
              if (lastCons.length == 1) {
                //monocons.
                if (lastCons !== "w" && lastCons !== "y" && lastCons !== "'") { // 4.1 any consonant except -w or -y
                  this.slots[9] = "";
                  this.cut[1] = true; // slot 9 removed
                }
              } else if (lastCons.length == 2) {
                //bicons.
                var eba = lastCons.charAt(0);
                var ebb = lastCons.charAt(1);
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
                  this.slots[9] = "";
                  this.cut[1] = true; // slot 9 removed
                }
              } else if (lastCons.length == 3) {
                // tricons.
                var eca = lastCons.charAt(0);
                var ecb = lastCons.charAt(1);
                var ecc = lastCons.charAt(2);
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
                  this.slots[9] = "";
                  this.cut[1] = true; // slot 9 removed
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
                  this.slots[9] = "";
                  this.cut[1] = true; // slot 9 removed
                }
              }
            }
          }
        }
      }

      // Step 4: Join everything together
      (() => {this.ithkword = this.slots.slice(0,-1).join("")})();

      // Step 5: Apply Slot 10 (stress)
      // Penultimate stress is unmarked, others are marked with a diacritic; a -> á, ä -> â.
      var wordVowels = this.ithkword.match(/(?:ai|äi|ei|ëi|oi|öi|ui|au|eu|ëu|ou|iu|[aeiouäëöü])/gi);
      var stressType = 0;
      // 5a: converting meaning to where the stress should be [0 = ult, 1 = penult, 2 = antepenult]
      if (this.gOptions.concat !== 0) { // if it's a concatenated word
        if (slot9saved.charAt(slot9saved.length-1) === "'") { //if you'd normally add a glottal stop into slot 9
          stressType = 0; // ultimate stress
        } else {
          stressType = 1; // penultimate stress
        }
      } else {
        stressType = ["UNF/K","UNF/C","FRM"].findIndex(x => x == this.gOptions.rel); // stress is reliant on relation, otherwise
      }
      // 5b: making sure the word can actually take the required stress
      while (wordVowels.length <= stressType) { // i.e. stress 0 needs 1 vowel, stress 1 needs 2 vowels, stress 2 needs 3 vowels
        var cutVal = this.cut.findIndex(x => x == true); 
        var ph = [1,9,7];
        if (ph[cutVal] === 7) {this.slots[8] = "h"}
        this.slots[ph[cutVal]] = "a";
        this.cut[cutVal] = false;
        (() => {this.ithkword = this.slots.slice(0,-1).join("")})(); // recalculate ithkword because slots have updated
        wordVowels = this.ithkword.match(/(?:ai|äi|ei|ëi|oi|öi|ui|au|eu|ëu|ou|iu|[aeiouäëöü])/gi); // recalculate wordVowels because ithkword has updated
      }
      // 5c: marking the stress
      if (stressType === 0 && wordVowels.length > 1) { // if ultimate stress (and not single-syllable word, because that's already assumed to be ultimate)
        for (let i = this.ithkword.length-1; i >= 0; i--) {
          if (["a","e","i","o","u","ä","ë","ö","ü"].includes(this.ithkword.charAt(i))) {
            if (this.sDip.includes(this.ithkword.charAt(i-1) + this.ithkword.charAt(i))) {
              this.ithkword = this.ithkword.substring(0, i-1) + this.sAccent[this.ithkword.charAt(i-1)] + this.ithkword.substring(i);
            } else {
              this.ithkword = this.ithkword.substring(0, i) + this.sAccent[this.ithkword.charAt(i)] + this.ithkword.substring(i+1);
            }
            break;
          }
        }
      } else if (stressType === 2) { // if antepenultimate stress
        var counter = 0;
        for (let i = this.ithkword.length-1; i >= 0; i--) {
          if (["a","e","i","o","u","ä","ë","ö","ü"].includes(this.ithkword.charAt(i))) {
            if (counter == 2) {
              if (this.sDip.includes(this.ithkword.charAt(i-1) + this.ithkword.charAt(i))) {
                this.ithkword = this.ithkword.substring(0, i-1) + this.sAccent[this.ithkword.charAt(i-1)] + this.ithkword.substring(i);
              } else {
                this.ithkword = this.ithkword.substring(0, i) + this.sAccent[this.ithkword.charAt(i)] + this.ithkword.substring(i+1);
              }
              break;
            } else {
              counter++
            }
          }
        }
      } // penultimate stress is unmarked, so I don't have to do anything
    },
    glossCalcs() {
      this.gloss = "";
      this.fullGloss = "";
      // glosses are of the form (T#-)S#(.CPT)(.S7cut)-"root"(-SLOT 4)(-SLOT 5.1)(-SLOT 5.2)(-SLOT 6)(-SLOT 7.1)(-SLOT 7.2)(-SLOT 8)(-SLOT 9)\SLOT 10,
      // unless there's a shortcut in which case slot 6 will be moved to slot 2
      // Slot 1
      if (this.gOptions.concat !== 0) {
        this.gloss += "T" + this.gOptions.concat + "-";
        this.fullGloss += "T" + this.gOptions.concat + "-";
      }
      // Slot 2
      this.gloss += "S" + this.gOptions.stem.charAt(1);
      if (this.gOptions.ver === "CPT") {
        this.gloss += ".CPT"
      }
      this.fullGloss += "S" + this.gOptions.stem.charAt(1) + "." + this.gOptions.ver;
      if (this.shortcutting) {
        var configgCode = (this.gOptions.plex+this.gOptions.simil+this.gOptions.cctd).slice(0,3);
        this.fullGloss += "."+this.gOptions.affil+"."+configgCode+"."+this.gOptions.ext+"."+this.gOptions.persp+"."+this.gOptions.ess;
        var s2c = [];
        if (this.gOptions.affil != "CSL") {s2c.push(this.gOptions.affil)}
        if (configgCode != "UPX") {s2c.push(configgCode)}
        if (this.gOptions.ext != "DEL") {s2c.push(this.gOptions.ext)}
        if (this.gOptions.persp != "M") {s2c.push(this.gOptions.persp)}
        if (this.gOptions.ess != "NRM") {s2c.push(this.gOptions.ess)}
        if (s2c.length > 0) {this.gloss += "." + s2c.join(".")}
      } else if (this.slotVIIshortcut) {
        this.gloss += ".[fix this]"
        this.fullGloss += ".[fix this]"
      }
      // Slot 3
      this.gloss += '-"' + this.gOptions.root + '"'; // will be changed if/when community database integration is added - the glossbot actually uses BOLD for unidentified roots
      this.fullGloss += '-"' + this.gOptions.root + '"';
      // Slot 4
      this.fullGloss += "-"+this.gOptions.func+"."+this.gOptions.spec+"."+this.gOptions.ctxt;
      var s4c = [];
      if (this.gOptions.func != "STA") {s4c.push(this.gOptions.func)}
      if (this.gOptions.spec != "BSC") {s4c.push(this.gOptions.spec)}
      if (this.gOptions.ctxt != "EXS") {s4c.push(this.gOptions.ctxt)}
      if (s4c.length > 0) {this.gloss += "-" + s4c.join(".")}
      // Slot 5
      for (var i in this.gOptions.Vafx) {
        let affx = this.gOptions.Vafx[i];
        this.gloss += "-'" + affx[0] + "'/" + affx[1] + {1:"₁",2:"₂",3:"₃"}[affx[2]]; // will be changed if/when community database integration is added - the glossbot actually uses BOLD for unidentified roots
        this.fullGloss += "-'" + affx[0] + "'/" + affx[1] + {1:"₁",2:"₂",3:"₃"}[affx[2]];
      }
      // Slot 6
      if (!this.shortcutting) {
        var configCode = (this.gOptions.plex+this.gOptions.simil+this.gOptions.cctd).slice(0,3);
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
      } else if (this.gOptions.Vafx.length > 0) {
        this.gloss += "-{Ca}";
        this.fullGloss += "-{Ca}";
      }
      // Slot 7
      if (this.slotVIIshortcut) {
        for (var j in this.gOptions.VIIafx.slice(0,-1)) {
          let affx = this.gOptions.VIIafx[j];
          this.gloss += "-'" + affx[0] + "'/" + affx[1] + {1:"₁",2:"₂",3:"₃"}[affx[2]]; // will be changed if/when community database integration is added - the glossbot actually uses BOLD for unidentified roots
          this.fullGloss += "-'" + affx[0] + "'/" + affx[1] + {1:"₁",2:"₂",3:"₃"}[affx[2]];
        }
      } else {
        for (var k in this.gOptions.VIIafx) {
          let affx = this.gOptions.VIIafx[k];
          this.gloss += "-'" + affx[0] + "'/" + affx[1] + {1:"₁",2:"₂",3:"₃"}[affx[2]]; // will be changed if/when community database integration is added - the glossbot actually uses BOLD for unidentified roots
          this.fullGloss += "-'" + affx[0] + "'/" + affx[1] + {1:"₁",2:"₂",3:"₃"}[affx[2]];
        }
      }
      // Slot 8
      var s8c = [];
      if (this.gOptions[this.gOptions.vn] !== "MNO") {s8c.push(this.gOptions[this.gOptions.vn])}
      if (this.gOptions.mood !== "FAC" && this.gOptions.rel === "UNF/K") {s8c.push(this.gOptions.mood)}
      if (this.gOptions.casc !== "CCN" && this.gOptions.rel !== "UNF/K") {s8c.push(this.gOptions.casc)}
      if (s8c.length > 0) {this.gloss += "-" + s8c.join(".")}
      this.fullGloss += "-" + this.gOptions[this.gOptions.vn] + "." + (this.gOptions.rel === "UNF/K" ? this.gOptions.mood : this.gOptions.casc)
      // Slot 9
      if (this.gOptions.rel === "UNF/K") {
        //IEV
        var s9c = [];
        this.fullGloss += "-"+this.gOptions.ill+"."+this.gOptions.exp;
        if (this.gOptions.ill === "ASR") {this.fullGloss+="."+this.gOptions.vld}
        if (this.gOptions.ill !== "ASR") {s9c.push(this.gOptions.ill)}
        if (this.gOptions.exp !== "COG") {s9c.push(this.gOptions.exp)}
        if (this.gOptions.vld !== "OBS" && this.gOptions.ill === "ASR") {s9c.push(this.gOptions.vld)}
        if (s9c.length > 0) {this.gloss += "-" + s9c.join(".")}
      } else {
        //case
        if (this.gOptions.c !== "THM") {this.gloss += "-"+this.gOptions.c}
        this.fullGloss += "-"+this.gOptions.c;
      }
      // Slot 10
      if (this.gOptions.concat === 0) {
        this.fullGloss += "\\" + this.gOptions.rel.split("/")[0];
        if (this.gOptions.rel.split("/")[0] !== "UNF") {this.gloss += "\\" + this.gOptions.rel.split("/")[0]}
      }
      if (this.gOptions.shcut === 2) {
        let ph = this.gloss;
        this.gloss = this.fullGloss;
        this.fullGloss = ph;
      }
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
          if (char === "n") {
            if (["k","g","x"].includes(nextchar)) {this.ipa += "ŋ";}
            else {this.ipa += "n"}
          } else if (char === "r" && nextchar !== "r") {
            if (!(Object.keys(this.sAccent).includes(nextchar) || Object.values(this.sAccent).includes(nextchar))) {this.ipa += "ɹ"}
            else {this.ipa += "ɾ"}
          } else if (char === "x") {
            this.ipa += "x"; // this should be the user's choice between [x] and [χ], which is why it has its own else if
          } else if ("rr" === char+nextchar) {
            this.ipa += "r"
            skipnext = true;
          } else if ("řř" === char+nextchar) {
            this.ipa += "ʁ:" // again, this is the user's choice between [ʁ:] and [ʀ], which is why it also has its own else if
            skipnext = true;
          } else if (["hl","hr","hm","hn"].includes(char+nextchar) && i == 0) {
            this.ipa += {"hl":"ɬ","hr":"ɾ̥","hm":"m̥","hn":"n̥"}[char+nextchar]; // this should be the user's choice between that and hl/hɾ/hm/hn
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
              this.ipa += this.ipaPreference[vwl];
              this.ipa += "ː";
              skipnext = true;
            } else if (["ä","ë"].includes(vwl)) {
                this.ipa += this.ipaPreference[vwl];
            } else if (vwl === "a") {
                if (Object.keys(this.sAccent).includes(prevchar) || Object.values(this.sAccent).includes(prevchar)) {this.ipa += "ɑ"}
                else {this.ipa += this.ipaPreference[vwl]}
            } else if (vwl === "e") {
                if (Object.keys(this.sAccent).includes(nextchar) || Object.values(this.sAccent).includes(nextchar)) {this.ipa += "e"}
                else {this.ipa += this.ipaPreference[vwl]}
            } else if (vwl === "i") {
                if (Object.keys(this.sAccent).includes(nextchar) || Object.values(this.sAccent).includes(nextchar)) {this.ipa += "i"}
                else if (nextchar == "y" || prevchar == "y") {this.ipa += "ɪ"}
                else {this.ipa += this.ipaPreference[vwl]}
            } else if (vwl === "o") {
                if (Object.keys(this.sAccent).includes(nextchar) || Object.values(this.sAccent).includes(nextchar)) {this.ipa += "o"}
                else {this.ipa += this.ipaPreference[vwl]}
            } else if (vwl === "ö") {
                if (Object.keys(this.sAccent).includes(nextchar) || Object.values(this.sAccent).includes(nextchar)) {this.ipa += "ø"}
                else {this.ipa += this.ipaPreference[vwl]}
            } else if (vwl === "u") {
                if (Object.keys(this.sAccent).includes(nextchar) || Object.values(this.sAccent).includes(nextchar)) {this.ipa += "u"}
                else if (nextchar == "w" || prevchar == "w") {this.ipa += "ʊ"}
                else {this.ipa += this.ipaPreference[vwl]}
            } else if (vwl === "ü") {
                if (nextchar == "w" || prevchar == "w" || nextchar == "y" || prevchar == "y") {this.ipa += "ʉ"}
                else {this.ipa += this.ipaPreference[vwl]}
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
    }
  },
  beforeMount() {
    this.slots[2] = "";
    this.calculateWord();
    this.IPAcalcs();
    this.glossCalcs();
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
.word {
  font-size: 20px;
}
.smalltext {
  font-size: 13px;
  color: gray;
}
#content {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 90px;
  right: 0px;
  overflow: auto;
}
#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 90px;
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
@media (max-width: 800px) {
  .section {
    flex-direction: column;
  }
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
#modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  /*padding: 20px;*/
  border: 1px solid #888;
  width: 80%;
  text-align: left;
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
</style>
