<template>
  <!-- This program works with TNIL Morpho-Phonology v0.19 and Phonotaxis v0.5.4 -->
  <div id="content">
    <h1>Ithkapp</h1>
    <div class="section"> <!-- Section 1: Root, etc. -->
      <OptionBox :json="gData.root" code="root" @send-message="handleSendMessage" type="text" @modal="openModal" ref="root"/>
      <OptionBox :json="gData.stem" code="stem" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.spec" code="spec" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.func" code="func" @send-message="handleSendMessage" @modal="openModal" ref="func"/>
      <OptionBox :json="gData.ver" code="ver" @send-message="handleSendMessage"/>
    </div>
    <div class="section"> <!-- Section 2: Concatenation & Affixes-->
      <OptionBox :json="gData.shcut" code="shcut" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.concat" code="concat" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.Vafx" code="Vafx" @send-message="handleSendMessage" type="affix"/>
      <OptionBox :json="gData.VIIafx" code="VIIafx" @send-message="handleSendMessage" type="affix"/>
    </div>
    <div class="section"> <!-- Section 3: Configuration -->
      <h2 style="width:100%;">Configuration</h2>
      <OptionBox :json="gData.plex" code="plex" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.simil" code="simil" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.cctd" code="cctd" @send-message="handleSendMessage"/>
    </div>
    <div class="section"> <!-- Section 4: Slot 6 -->
      <OptionBox :json="gData.affil" code="affil" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.ext" code="ext" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.persp" code="persp" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.ess" code="ess" @send-message="handleSendMessage"/>
    </div>
    <div class="section"> <!-- Section 5: Slot 8a -->
      <OptionBox :json="gData.vn" code="vn" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.val" code="val" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.pha" code="pha" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.eff" code="eff" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.lvl" code="lvl" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.asp" code="asp" @send-message="handleSendMessage"/>
    </div>
    <div class="section"> <!-- Section 6: Slot 8b to 10 -->
      <OptionBox :json="gData.ctxt" code="ctxt" @send-message="handleSendMessage"/>
      <OptionBox :json="gData.rel" code="rel" @send-message="handleSendMessage"/>
      <OptionBox v-if='this.gOptions.rel == "UNF/K"' :json="gData.mood" code="mood" @send-message="handleSendMessage"/>
      <OptionBox v-else :json="gData.casc" code="casc" @send-message="handleSendMessage"/>
      <OptionBox v-if="this.gOptions.rel != 'UNF/K'" :json="gData.c" code="c" @send-message="handleSendMessage" />
      <OptionBox v-if="this.gOptions.rel == 'UNF/K'" :json="gData.ill" code="ill" @send-message="handleSendMessage"/>
      <OptionBox v-if="this.gOptions.rel == 'UNF/K'" :json="gData.exp" code="exp" @send-message="handleSendMessage"/>
      <OptionBox v-if="this.gOptions.rel == 'UNF/K'" :json="gData.vld" code="vld" @send-message="handleSendMessage" :disabled='this.gOptions.ill == "PFM"'/>
    </div>
    <!--(Note: The affix slots & root slot will eventually be modified to be a definition-based selector)-->
  </div>
  <div id="footer">
    <p>{{ithkword}} /{{ipa}}/</p>
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
import consdata from './consdata.json'

export default {
  name: 'App',
  components: {
    OptionBox,
  },
  data() {
    return {
      modalContent: "",
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
      shortcutting: false,
      shcuttypeA: 0,
      shcuttypeB: 0,
      slotVIIshortcut: false,
      sDip: ["ai","äi","ei","ëi","oi","öi","ui","au","eu","ëu","ou","iu"], // permissible diphthongs
      sAccent: {"a":"á","e":"é","i":"í","ì":"í","o":"ó","u":"ú","ä":"â","ë":"ê","ö":"ô","ü":"û"}, // how to accent vowels
      slots: ["","","","","","","","","","",""], // ithkuil word, split into slots (0-6 = I-VII, 7-8 = VIII, 9 = IX, 10 = ungeminated VI)
      cut: [false,false,false], // cut vowels - slots 2, 8a, and 9
      ithkword: "", // the calculated ithkuil word
      gloss: "al.FA.bet", // gloss of word
      ipa: "eɪ bi: si:", // IPA transcription
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
    },
    openModal(code) {
      console.log("Modal opening for",code);
      this.modalContent = this.gData[code].popuptest;
      document.getElementById("modal").style.display = "block";
    },
    closeModal() {
      document.getElementById("modal").style.display = "none";
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
                "s3":{"PRC":5,"CPT":6}, // standard vowel form 5 (4 here) is skipped
                "s0":{"PRC":7,"CPT":8}};
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
                "DYN":{"BSC":5,"CTE":6,"CSV":7,"OBJ":8}}; // again, svf 5 is skipped
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
      var CONF = (this.gOptions.plex === "U") ? "" : (this.gOptions.plex === "D2") ? "s" : // the most hideous (but comparatively tame compared to ithkuil iii) table as an object
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
        if (this.concat === 0) {
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
        if (this.slots[9] === "a" && this.slots[8] === "h") {
          this.slots[9] = "";
          this.slots[8] = "";
          this.cut[2] = true; // slot 9 removed
          if (this.slots[7] === "a") { // here i have to check that the consonant before this is allowed at the end of a word
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
                  this.slots[7] = "";
                  this.cut[1] = true; // slot 8a removed
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
                  this.slots[7] = "";
                  this.cut[1] = true; // slot 8a removed
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
                  this.slots[7] = "";
                  this.cut[1] = true;
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
                  this.slots[7] = "";
                  this.cut[1] = true;
                }
              }
              console.log(lastCons); // this is where the code that checks if lastCons is permissable at the end of a word goes
            }
            //this.slots[7] = "";
            //this.cut[1] = true; // slot 8a removed
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
        var ph = [1,7,9];
        if (ph[cutVal] === 9) {this.slots[8] = "h"}
        this.slots[ph[cutVal]] = "a";
        this.cut[cutVal] = false;
        (() => {this.ithkword = this.slots.slice(0,-1).join("")})(); // recalculate ithkword because slots have updated
        wordVowels = this.ithkword.match(/(?:ai|äi|ei|ëi|oi|öi|ui|au|eu|ëu|ou|iu|[aeiouäëöü])/gi); // recalculate wordVowels because ithkword has updated
      }
      // 5c: marking the stress
      if (stressType === 0 && wordVowels.length > 1) { // if ultimate stress (and not single-syllable word, because that's already assumed to be ultimate)
        console.log("apply ultimate stress");
        for (let i = this.ithkword.length-1; i >= 0; i--) {
          if (["a","e","i","o","u","ä","ë","ö","ü"].includes(this.ithkword.charAt(i))) {
            console.log(this.sAccent[this.ithkword.charAt(i-1)]);
            if (this.sDip.includes(this.ithkword.charAt(i-1) + this.ithkword.charAt(i))) {
              this.ithkword = this.ithkword.substring(0, i-1) + this.sAccent[this.ithkword.charAt(i-1)] + this.ithkword.substring(i);
            } else {
              this.ithkword = this.ithkword.substring(0, i) + this.sAccent[this.ithkword.charAt(i)] + this.ithkword.substring(i+1);
            }
            break;
          }
        }
      } else if (stressType === 2) { // if antepenultimate stress
        console.log("apply antepenultimate stress");
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
    }
  },
  beforeMount() {
    this.slots[2] = "";
    this.calculateWord();
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
