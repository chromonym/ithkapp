<template>
  <div class="optionbox" :class="OBclass">
    <!--<button style="float:right; margin-top: 5px; margin-right: 5px; display:inline" @click="this.$emit('modal',code)">?</button>-->
    <input v-if="this.$parent.$parent.otherSettings.finishBoxes" type="checkbox" style="right:0; position:absolute" v-model="isDone"/>
    <h3 @click.self="this.$emit('modal',code)" :title="'Learn more about '+json.title">{{json.title}}</h3>

    <!-- The following depends on which TYPE of grammar option this is: -->

    <!-- If it's a simple text entry: -->
    <input v-if="json.type=='text'" v-model="text" @input="this.$emit('send-message',text,code)" placeholder="Enter..." :maxlength="length" :disabled="disabled"/>

    <!-- If it's a checkbox -->
    <div v-else-if="json.type=='checkbox'">
      <input type="checkbox" v-model="option" @change="this.$emit('send-message',option,code)" :disabled="disabled"/>
    </div>

    <!-- If it's number entry -->
    <div v-else-if="json.type=='number'">
      <input type="number" v-model="text" @input="this.calcNum()" placeholder="Enter..." :disabled="disabled"/>
    </div>

    <!-- V4-SPECIFIC ENTRIES -->
    <!-- If it's a list of text entries: -->
    <div v-else-if="json.type=='affix'">
      <div v-for="(affix,index) in affixes" :key="affix"> <!-- For each affix/degree pair in the array "affixes", add a textbox and two dropdowns linked to each-->
        <input v-model="affixes[index][0]" @input="this.$emit('send-message',affixes,code)" placeholder="Enter..." maxlength=5 :id="code+'affW'+index" :class="{hidden: affixes[index][1] == 'CA'}"/> <!-- Textbox -->
        <!-- CA AFFIX -->
        <select v-model="plex" @change="this.calc6(index)" :style="affixes[index][1] != 'CA' ? 'display:none' : 'display:inline-block'" :id="code+'plex'+index.toString()">
          <option>UPX</option>
          <option>DPX</option>
          <option>D</option>
          <option>M</option>
        </select>
        <select v-model="simil" @change="this.calc6(index)" :style="affixes[index][1] != 'CA' ? 'display:none' : 'display:inline-block'" :id="code+'simil'+index.toString()" :disabled="plex=='UPX' || plex=='DPX'">
          <option>S</option>
          <option>D</option>
          <option>F</option>
        </select>
        <select v-model="cctd" @change="this.calc6(index)" :style="affixes[index][1] != 'CA' ? 'display:none' : 'display:inline-block'" :id="code+'cctd'+index.toString()" :disabled="plex=='UPX' || plex=='DPX'">
          <option>S</option>
          <option>C</option>
          <option>F</option>
        </select>
        <select v-model="affil" @change="this.calc6(index)" :style="affixes[index][1] != 'CA' ? 'display:none' : 'display:inline-block'" :id="code+'affil'+index.toString()">
          <option>CSL</option>
          <option>ASO</option>
          <option>COA</option>
          <option>VAR</option>
        </select>
        <select v-model="ext" @change="this.calc6(index)" :style="affixes[index][1] != 'CA' ? 'display:none' : 'display:inline-block'" :id="code+'ext'+index.toString()">
          <option>DEL</option>
          <option>PRX</option>
          <option>ICP</option>
          <option>ATV</option>
          <option>GRA</option>
          <option>DPL</option>
        </select>
        <select v-model="persp" @change="this.calc6(index)" :style="affixes[index][1] != 'CA' ? 'display:none' : 'display:inline-block'" :id="code+'persp'+index.toString()">
          <option>M</option>
          <option>G</option>
          <option>N</option>
          <option>A</option>
        </select>
        <select v-model="ess" @change="this.calc6(index)" :style="affixes[index][1] != 'CA' ? 'display:none' : 'display:inline-block'" :id="code+'ess'+index.toString()">
          <option>NRM</option>
          <option>RPV</option>
        </select>
        <!-- END CA AFFIX -->
        <select v-model="affixes[index][1]" @change="this.$emit('send-message',affixes,code)" :style="'display:inline-block'" :id="code+'affD'+index.toString()"> <!-- Dropdown 1 (Degree) -->
          <option :key="1" :value="1">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? "Deg. 1" : affixes[index][2] == 4 ? "THM" : affixes[index][2] == 3 && affixes.length == 1 ? "POS" : "Deg. 1"}}</option>
          <option :key="2" :value="2">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? "Deg. 2" : affixes[index][2] == 4 ? "INS" : affixes[index][2] == 3 && affixes.length == 1 ? "PRP" : "Deg. 2"}}</option>
          <option :key="3" :value="3">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? "Deg. 3" : affixes[index][2] == 4 ? "ABS" : affixes[index][2] == 3 && affixes.length == 1 ? "GEN" : "Deg. 3"}}</option>
          <option :key="4" :value="4">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? "Deg. 4" : affixes[index][2] == 4 ? "AFF" : affixes[index][2] == 3 && affixes.length == 1 ? "ATT" : "Deg. 4"}}</option>
          <option :key="5" :value="5">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? "Deg. 5" : affixes[index][2] == 4 ? "STM" : affixes[index][2] == 3 && affixes.length == 1 ? "PDC" : "Deg. 5"}}</option>
          <option :key="6" :value="6">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? "Deg. 6" : affixes[index][2] == 4 ? "EFF" : affixes[index][2] == 3 && affixes.length == 1 ? "ITP" : "Deg. 6"}}</option>
          <option :key="7" :value="7">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? "Deg. 7" : affixes[index][2] == 4 ? "ERG" : affixes[index][2] == 3 && affixes.length == 1 ? "OGN" : "Deg. 7"}}</option>
          <option :key="8" :value="8" v-if="!['sy','zy','čy','šy','žy','jy','ly'].includes(affixes[index][0])">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? "Deg. 8" : affixes[index][2] == 4 ? "DAT" : affixes[index][2] == 3 && affixes.length == 1 ? "IDP" : "Deg. 8"}}</option>
          <option :key="9" :value="9">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? "Deg. 9" : affixes[index][2] == 4 ? "IND" : affixes[index][2] == 3 && affixes.length == 1 ? "PAR" : "Deg. 9"}}</option>
          <option :key="0" :value="0" v-if="!(['sy','zy','čy','šy','žy','jy','ly'].includes(affixes[index][0]) || (!['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) && (affixes[index][2] == 4 || (affixes[index][2] == 3 && affixes.length == 1))))">Deg. 0</option>
          <!--<option v-for="num in (['sy','zy','čy','šy','žy','jy','ly'].includes(affixes[index][0])) ? [0,1,2,3,4,5,6,8] : Array(10).keys()" :key="(num+1)%10" :value="(num+1)%10">Deg. {{(num+1)%10}}</option>-->
          <option key="CA" value="CA" @click="calc6(index)">Cₐ-stacking</option>
        </select>
        <select v-model="affixes[index][2]" @change="this.$emit('send-message',affixes,code)" :style="affixes[index][1] == 'CA' ? 'display:none' : 'display:inline-block'" :id="code+'affT'+index"> <!-- Dropdown 2 (Type) -->
          <option :value="1">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? 'Series ' : 'Type-'}}1</option>
          <option :value="2">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? "Series " : 'Type-'}}2</option>
          <option :value="3">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? "Series 3" : affixes.length == 1 ? "Ref (3)" : "Type-3"}}</option>
          <option :value="4">{{['sw','sy','zw','zy','čw','čy','šw','šy','žw','žy','jw','jy','lw','ly'].includes(affixes[index][0]) ? "Series 4" : "Ref (4)"}}</option>
        </select>
      </div>
      <input type="button" value="Add" @click="affixes.push(['',1,1]); this.$emit('send-message',affixes,code)"/> <!-- Button to add another affix -->
      <input type="button" value="Remove" @click="affixes.pop(); this.$emit('send-message',affixes,code)"/> <!-- Button to remove an affix -->
    </div>

    <div v-else-if="json.type=='pref'"> <!-- technically should add code to check that there's no duplicate values -->
      <div v-for="(affix,index) in refs" :key="affix">
        <select v-model="refs[index][0]" @change="this.$emit('send-message',refs,code)" :style="'display:inline-block'" :id="code+'ref'+index.toString()">
          <option v-for="(opt, short) in json.options" :key="opt.name" :value="short">{{opt.name}} ({{short}})</option>
        </select>
        <select v-model="refs[index][1]" @change="this.$emit('send-message',refs,code)" :style="'display:inline-block'" :id="code+'refP'+index.toString()">
          <option v-for="(opt, short) in json.options2" :key="opt.name" :value="short">{{opt.name}} ({{short}})</option>
        </select>
      </div>
      <input type="button" value="Add" @click="refs.push(['1M','NEU']); this.$emit('send-message',refs,code)"/> <!-- Button to add another affix -->
      <input type="button" value="Remove" @click="if (refs.length > 1) { refs.pop(); this.$emit('send-message',refs,code) }"/> <!-- Button to remove an affix -->
    </div>
    <!-- END V4-SPECIFIC ENTRIES -->

    <!-- Otherwise, assume it's a dropdown list: -->
    <select v-else v-model="option" @change="this.$emit('send-message',option.toString(),code)" :disabled="disabled" :id="code">
      <!--<option v-for="(opt, short) in options" :key="opt" :value="short">{{opt}} {{short === short.toString().toUpperCase() ? "("+short+")" : ""}}</option>-->
      <option v-for="(opt, short) in json.options" :key="opt.name" :value="short">{{opt.name}} {{(short === short.toString().toUpperCase() && !['1','2','3','4','5','6','7','8','9','0'].includes(short)) ? "("+short+")" : ""}}</option>
      <!-- above: show the long form of the option (opt), and IF the short form (short) is uppercase then show that in brackets as well -->
    </select>

    <p v-if='json.type == "affix" && this.affixes.length != 0 && !this.affixes.every(function (e) {return e[0] != ""})'><b>ERROR:</b> Empty affixes</p> <!-- if there's an error, have text that says so -->
    <p v-else-if='json.type == "affix" && this.affixes.length == 0 && reqAff'><b>ERROR:</b> Affixes are required</p>
    <p v-else-if='json.type == "text" && this.text == "" && !this.$props.emptyOK'><b>ERROR:</b> Empty text</p>
    <p v-else-if='this.$props.whitelist && ((json.type == "text" && (!this.text.split("").every((x) => this.$props.whitelist.includes(x.toLowerCase()))))
                ||(json.type == "affix" && this.affixes.length != 0 && !this.affixes.every((y) => y[0].split("").every((x) => this.$props.whitelist.includes(x)))))'><b>ERROR:</b> Non-allowed characters</p>
    <p v-else-if="json.type == 'number' && !this.isNum"><b>ERROR:</b> Non-numeric input</p>
    <p v-else-if="this.$props.error"><b>ERROR:</b> {{this.$props.errorName}}</p>
    <p v-else></p> <!-- This is here so that the padding works regardless of if there's a <p> element or not -->
  </div>
</template>

<script>
export default {
  name: 'OptionBox',
  props: {
    code: String, // pass in the code for the box (should be the same as the ref)
    json: Object, // pass in grammardata[code] to here
    disabled: Boolean, // true to disable (grey out) the box
    show: Boolean, // true if the box should be hidden, false or empty if not
    length: String, // for text entry - maximum length of entry
    whitelist: Array, // for text entry - characters to be used (if blank, then any character)
    reqAff: Boolean, // for v4 affix entry - if affixes are required
    aff6: Function, // for v4 affix entry - slot 6 calcs
    error: Boolean, // throw error if true
    errorName: String, // what the error text should say if error is true
    emptyOK: Boolean, // true if the entry can be empty (for text entry)
  },
  data() {
    return {
      text: "",
      isNum: false,
      option: null,
      affixes: [],
      // for ca affixes
      plex: 'UPX',
      simil: 'S',
      cctd: 'S',
      affil: 'CSL',
      ext: 'DEL',
      persp: 'M',
      ess: 'NRM',
      // ---
      refs: [["1M","NEU"]], // for v4 personal-ref aff
      isDone: false,
    }
  },
  computed: {
    OBclass() { // set class to error if the input is the default
      return {
        error: (this.json.type == "affix" && this.affixes.length != 0 && (this.$props.whitelist && !this.affixes.every(function (e) {return e[0] != ""})
            ||  !this.affixes.every((y) => y[0].split("").every((x) => this.$props.whitelist.includes(x)))))
            ||  (this.json.type == "text" && ((this.text == "" && !this.$props.emptyOK) || (this.$props.whitelist && !this.text.split("").every((x) => this.$props.whitelist.includes(x.toLowerCase())))))
            ||  (this.json.type == "affix" && this.affixes.length == 0 && this.reqAff)
            ||  (!this.isNum && this.json.type == "number")
            ||  (this.$props.error),
            // end of V4 error checks
        disabledbox: this.disabled,
        notShown: this.show,
        doneBox: this.$parent.$parent.otherSettings.finishBoxes && this.isDone,
      }
    },
  },
  mounted() {
    if (this.$props.json.type == ""){
      this.option = Object.keys(this.$props.json.options)[0];
      //document.getElementById(this.$props.code).selectedIndex = 0;
    }
  },
  methods: {
    updateValue(toUpdate) {
      if (this.$props.json.type == "affix") {
        this.affixes = toUpdate;
        for (let i in this.affixes) {
          this.waitForElm("#"+this.$props.code+"affW"+i.toString()).then((elm) => {
            elm.value = toUpdate[i][0];
          })
          this.waitForElm("#"+this.$props.code+"affD"+i.toString()).then((elm) => {
            elm.value = toUpdate[i][1];
          })
          this.waitForElm("#"+this.$props.code+"affT"+i.toString()).then((elm) => {
            elm.value = toUpdate[i][2];
          })
        }
        this.$emit('send-message',this.affixes,this.$props.code);
      } else if (this.$props.json.type == "pref") {
        this.refs = toUpdate;
        console.log(toUpdate);
        for (let i in this.refs) {
          this.waitForElm("#"+this.$props.code+"ref"+i.toString()).then((elm) => {
            elm.value = toUpdate[i][0];
          })
          this.waitForElm("#"+this.$props.code+"refP"+i.toString()).then((elm) => {
            elm.value = toUpdate[i][1];
          })
        }
      } else if (this.$props.json.type == "text" || this.$props.json.type == "number") {
        this.text = toUpdate;
        this.$emit('send-message',this.text,this.$props.code);
      } else if (this.$props.json.type == "checkbox") {
        this.option = toUpdate;
        this.$emit('send-message',this.option,this.$props.code);
      } else {
        console.log("Recieved",toUpdate,"in",this.$props.code);
        if (Object.keys(this.$props.json.options).includes(toUpdate)) {
          this.option = toUpdate;
          document.getElementById(this.$props.code).selectedIndex = Object.keys(this.$props.json.options).indexOf(toUpdate);
          this.$emit('send-message',this.option.toString(),this.$props.code);
        }
      }
    },
    calc6(idx) {
      let dAffil = document.getElementById(this.code+'affil'+idx).value;
      let dPlex = document.getElementById(this.code+'plex'+idx).value;
      let dSimil = document.getElementById(this.code+'simil'+idx).value;
      let dCctd = document.getElementById(this.code+'cctd'+idx).value;
      let dExt = document.getElementById(this.code+'ext'+idx).value;
      let dEss = document.getElementById(this.code+'ess'+idx).value;
      let dPersp = document.getElementById(this.code+'persp'+idx).value;
      this.affixes[idx][0] = this.aff6(true,dAffil,dPlex,dSimil,dCctd,dExt,dEss,dPersp);
      this.$emit('send-message',this.affixes,this.$props.code);
      this.$emit('send-message',this.affixes,this.$props.code);
    },
    calcNum() {
      console.log(this.text);
      console.log(isNaN(this.text));
      if (!isNaN(this.text) && this.text !== "") {
        this.isNum = true;
        this.$emit('send-message',this.text,this.$props.code);
      } else {
        this.isNum = false;
        this.$emit('send-message',"",this.$props.code);
      }
    },
    waitForElm(selector) { // code for this is by Yong Wang (https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists)
                           // basically, it waits for the element described by (selector) to exist on the page before resolving
      return new Promise(resolve => {
          if (document.querySelector(selector)) {
              return resolve(document.querySelector(selector));
          }

          const observer = new MutationObserver(() => {
              if (document.querySelector(selector)) {
                  resolve(document.querySelector(selector));
                  observer.disconnect();
              }
          });

          observer.observe(document.body, {
              childList: true,
              subtree: true
          });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notShown {
  display: none;
}
.optionbox {
  float: left;
  border-style: solid;
  border-width: 1px;
  border-color: #363247;
  flex-grow: 1;
  /*flex-basis: 20vw;*/
  margin: 2px;
  position: relative;
}
h3:hover {
  text-decoration: underline;
  cursor: pointer;
}
.doneBox {
  background-color: rgb(239, 253, 248);
  border-color: rgb(0, 113, 75);
  color: rgb(0, 113, 75);
}
.error {
  border-color: #FF2C3E; /* #006C67 */
  color: #FF2C3E;
  background-color: #FFEFEF;
}
.disabledbox {
  border-color: black;
  background-color: rgb(176, 181, 184);
  color: rgb(94, 102, 107);
}
</style>
