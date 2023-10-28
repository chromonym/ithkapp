<!-- Does anyone actually read through the code for Ithkapp? -->
<!-- If you do - hi! don't worry about this file! -->
<template>
    <div>
        <h1>Ithkapp<br/>(vil(p)&#x200b;!af(b)&#x200b;fus(f)&#x200b;vaf(t)&#x200b;san(t)&#x200b;ap(t)&#x200b;vig(t)&#x200b;sung(b)&#x200b;es(p)&#x200b;u(t)&#x200b;vom(b)&#x200b;e(f)&#x200b;grog(f)&#x200b;kay(f)&#x200b;point(f)&#x200b;ga(f))</h1>
        <p class="smalltext">Compatible with <span title="Last update December 5, 2020 | 𝘬𝘢𝘺(𝘧)𝘣𝘰𝘱(𝘵) 𝘪𝘯 𝘵𝘩𝘦 𝘞𝘪𝘥𝘦𝘳 𝘞𝘰𝘳𝘭𝘥"><u style="border-bottom: 1px dotted gray; text-decoration: none;">the version of kay(f)bop(t) </u><a href="https://crazyninjageeks.wordpress.com/2015/11/28/introduction-to-kayfdanfsantaptvlirtsangbesputvombngagtvlimpkayfsnafkayfgaf-boptvegpdaffshofbompvlimpgafvlimpgaf/" target="_blank">currently on crazyninjageeks</a></span>.
        <br/>Definitions are a combination of taken from <a href="https://crazyninjageeks.wordpress.com/category/kayfbopt/" target="_blank">the kay(f)bop(t) site</a>, taken from <a href="https://badconlangingideas.tumblr.com/" target="_blank">badconlangingideas.tumblr.com</a>, and (occasionally) written by the creator of this site.
        <br/><a href="https://replit.com/@CameronHorn1/kayfbopt-orthography" target="_blank">Alternative orthography</a> from <a href="https://en.illogicopedia.org/wiki/How_to_Survive_in_Kay(f)bop(t)land(p)" target="_blank">Illogicopedia</a>.
        <br/>Cursor is <span :class="{hidden: !showCursorText}">the character of kay(f)bop(t) from <a href="https://www.reddit.com/r/prolangs/" target="_blank">Elemenopi's <i>Prolangs</i> webcomic</a></span>
                        <span :class="{hidden: showCursorText}">██████████████████████████████████████████</span>.
        <br/>All past and current forms of kay(f)bop(t) and all official documentation are by Daniel Swanson.
        <br/>Click on a box's title to learn more about what it means.</p>
        <p :class="{hidden: wordType != 'normal'}">Note that pronouns other than “I” and “you” must be declared with the verb “dan(f)yist(t)a(b)mar(b)ap(t)”, which takes the pronoun as subject and the referent as object</p>
        <div class="section"> <!-- all OptionBoxes must be in a class="section" div or else the formatting will be messed up -->
            <OptionBox :class="{hidden: gOptions.isanum}" :json="gData.root" code="root" @send-message="handleSendMessage" ref="root" @modal="openModal"/> <!-- ref should be the same as code -->
            <OptionBox :class="{hidden: !gOptions.isanum}" :json="gData.numroot" code="numroot" @send-message="handleSendMessage" ref="numroot" @modal="openModal" :error="this.gOptions.numroot.toString().substring(1).indexOf('0') > -1 || this.gOptions.numroot <= 0" :errorName="'Invalid value'"/>
            <OptionBox :json="gData.isanum" code="isanum" @send-message="handleSendMessage" ref="isanum" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType != 'normal'}" :json="gData.case" code="case" @send-message="handleSendMessage" ref="case" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType == 'adjv' || wordType == 'other'}" :json="gData.num" code="num" @send-message="handleSendMessage" ref="num" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType == 'adjv' || wordType == 'other'}" :json="gData.exp" code="exp" @send-message="handleSendMessage" ref="exp" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType != 'normal'}" :json="gData.food" code="food" @send-message="handleSendMessage" ref="food" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType != 'normal'}" :json="gData.gdr" code="gdr" @send-message="handleSendMessage" ref="gdr" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType != 'normal'}" :json="gData.death" code="death" @send-message="handleSendMessage" ref="death" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType != 'verb'}" :json="gData.ment" code="ment" @send-message="handleSendMessage" ref="ment" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType != 'verb'}" :json="gData.day" code="day" @send-message="handleSendMessage" ref="day" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType != 'verb'}" :json="gData.lie" code="lie" @send-message="handleSendMessage" ref="lie" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType != 'verb'}" :json="gData.bread" code="bread" @send-message="handleSendMessage" ref="bread" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType == 'adjv' || wordType == 'other'}" :json="gData.awe" code="awe" @send-message="handleSendMessage" ref="awe" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType != 'normal'}" :json="gData.mvlog" code="mvlog" @send-message="handleSendMessage" ref="mvlog" @modal="openModal"/>
            <OptionBox :class="{hidden: wordType != 'normal'}" :json="gData.mv" code="mv" @send-message="handleSendMessage" ref="mv" @modal="openModal" :error="this.gOptions.mv.toString().substring(1).indexOf('0') > -1 || this.gOptions.mv <= 0" :errorName="'Invalid value'"/>
            <OptionBox :class="{hidden: wordType != 'verb'}" :json="gData.ebar" code="ebar" @send-message="handleSendMessage" ref="ebar" @modal="openModal" :error="this.gOptions.ebar.toString().substring(1).indexOf('0') > -1 || this.gOptions.ebar <= 0" :errorName="'Invalid value'"/>
            <OptionBox :class="{hidden: wordType != 'adjv'}" :json="gData.stddev" code="stddev" @send-message="handleSendMessage" ref="stddev" @modal="openModal" :error="this.gOptions.stddev.toString().substring(1).indexOf('0') > -1 || this.gOptions.stddev <= 0" :errorName="'Invalid value'"/>
            <OptionBox :class="{hidden: wordType != 'normal'}" :json="gData.pro" code="pro" @send-message="handleSendMessage" ref="pro" @modal="openModal"/>
            <OptionBox :json="gData.fword" code="fword" @send-message="handleSendMessage" ref="fword" @modal="openModal"/>
        </div>
        <div class="section" :class="{hidden: !gOptions.fword}">
            <h2 style="width:100%;">Function Word Indication<br/></h2>
            <OptionBox :json="gData.idiot" code="idiot" @send-message="handleSendMessage" ref="idiot" @modal="openModal"/>
            <OptionBox :json="gData.funcplus" code="funcplus" @send-message="handleSendMessage" ref="funcplus" @modal="openModal" :disabled="!gOptions.idiot" emptyOK/>
        </div>
    </div>
</template>

<script>
import OptionBox from "../components/optionbox.vue"
import grammardata from "./grammardata.json"

export default {
    name: "KayBop",
    components: {
        OptionBox,
    },
    props: {
        listenModal: Array,
        listenWordtype: String,
        listenWord: Object,
    },
    watch: {
        // listen for variables
        listenModal(arr) {
            this.updateFromModal(arr[0],arr[1]);
        },
        listenWordtype(str) { // Uncomment this value if multiple word types are required - str is the word type code set up in App.vue. Also uncomment switchWordType() and wordType
            this.switchWordType(str);
        },
        listenWord(obj) {
            this.gOptions = JSON.parse(JSON.stringify(obj));
            for (var property in obj) {
                this.updateFromModal(property,JSON.parse(JSON.stringify(obj[property])));
            }
            this.handleSendMessage(obj.root, "root"); // recalculate the word - MAKE SURE THIS IS A PROPERTY THAT EXISTS!
        },
        // emit variables
        ithkword(word) {
            this.$emit("gEmit",this.gOptions);
            this.$emit("ithkword",[word,this.ipa,this.gloss,this.fullGloss]);
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
            defaultWord: "san(t)​ap(t)​vlir(t)​sang(b)​es(p)​nu(t)​vom(b)​ngo(p)​ngo(p)​gag(b)​vlim(p)​kay(f)​", // this should be whatever the default form of your "normal" word type is - whatever the algorithm generates with no option changes (ithkuil iv = "aal")
            settings: { // Settings - fill in with whatever you want the user to be able to change, with the following format:
                //"Category A": { // Category title
                //    "s1": ["Setting 1: ","defaultval",["defaultval","Fancy New Value"]] // dropdowns - "code": ["Visual Name","default value",[options]]
                //},
                "Orthography": {
                    "noHan": ["Write Han characters as appropriate IPA instead: ",false],
                    "altOrth": ["Use alternative orthography: ",false], // check boxes - "code": ["Visual Name:",true/false]
                    "zwj": ["Add Zero-Width Joiners where relevant: ", true]
                },
                "Cursor": {
                    "cursor": ["Use the funny cursor: ",true]
                }
            },
            gDefault: { // this should contain all of the grammar options' (dropdowns') default values
                "root": "",
                "case":"NOM",
                "num": "FIN",
                "exp": "Y",
                "food": false,
                "gdr": "HUM",
                "death": "PSN",
                "awe": "BM",
                "mv": "",
                "pro": "no",
                "mvlog": false,
                "ment": "TNR",
                "day": "SU",
                "lie": "LIE",
                "bread": false,
                "numroot": "",
                "isanum": false,
                "ebar": "",
                "stddev": "",
                "fword": false,
                "idiot": false,
                "funcplus":"",
            },
            wordType: "normal",     //set to whatever the default word type is - UNCOMMENT WITH LISTENWORDTYPE() ABOVE AND SWITCHWORDTYPE() BELOW TO ADD MULTIPLE WORD TYPES
            tabGroups: {"normal": [["root"],["numroot"]],
                        "verb": [["root"]],
                        "adjv": [["root"]],
                        "other": [["root"]]}, // a dictionary representing the tab groups, based on word type
            gOptions: {}, //  leave as is - SHOULD BE WHERE YOU STORE/UPDATE GRAMMAR OPTIONS
            ithkword: "", //  leave as is - SHOULD BE THE FINAL WORD GENERATED
            ipa: "", //       leave as is - SHOULD BE THE IPA TRANSCRIPTION OF THE ABOVE WORD
            gloss: "", //     leave as is - SHOULD BE THE GLOSS (meaning) OF THE ABOVE WORD
            fullGloss: "", // leave as is - SHOULD BE A LONGER VERSION OF THE ABOVE GLOSS
            gData: grammardata,
            showCursorText: true,
        }
    },
    methods: {
        async handleSendMessage(value="",code="") { // what happens when an <OptionBox> updates its value
            if (code) {
                this.gOptions[code] = value
                // DO ANY FANCY VALUE UPDATING HERE (if necessary)
            }
            // RUN RECALCULATIONS HERE
            this.calcWord();
            // above is a placeholder recalculation
        },
        calcWord() {
            this.ithkword = "";
            let ithkparts = [];
            this.gOptions.root = this.gOptions.root.replaceAll("​","");
            // Ignoring roots with underscores for now
            if (!this.gOptions.isanum) {
                this.ithkword += this.gOptions.root.replace(/-/g,"").replace(/酶/g,"ø").replace(/瑟/g,"ɪ").replace(/蕯/g,"ʔ").replace(/蕦/g,"ʌ");
            } else {
                this.ithkword += this.calcNumber(this.gOptions.numroot);
            }
            let nums = {"FIN":"vlir(t)","INF":"vig(t)"};
            let exps = {"Y":"sang(b)","N":"sing(b)","YB":"sung(b)"};
            let awes = {"BM":"vlim(p)kay(f)","M":"vost(t)grog(f)","OK":"grog(f)kay(f)","C":"yam(t)ack(t)vlim(p)","G":"ash(f)tin(f)vlim(p)","AM":"grog(f)","AW":"vlim(p)","UE":"vlim(p)kay(f)sna(f)"};
            // NOUNS
            if (this.wordType == "normal") {
                // CASE
                if (this.gOptions.pro != "no" && this.gOptions.case == "INE") {
                    if (this.gOptions.pro == "there") {
                        this.ithkword = "kay(f)dan(f)tuw(t)glo(t)yai(b)bai(b)san(t)ap(t)";
                    } else {
                        this.ithkword = "kay(f)dan(f)tuw(t)fob(p)san(t)ap(t)";
                    }
                } else if (this.gOptions.case == "ANT") {
                    if (this.ithkword.indexOf("_") > -1) {
                        ithkparts.push("gyin(p)");
                    } else {
                        this.ithkword = "gyin(p)" + this.ithkword;
                    }
                } else if (this.gOptions.case == "INE") {
                    if (this.ithkword.indexOf("_") > -1) {
                        ithkparts.push("san(t)");
                    } else {
                        let spliced = this.ithkword.split(")");
                        spliced.splice(-2,0,"san(t");
                        this.ithkword = spliced.join(")");
                    }
                } else {
                    let cases = {"NOM":"san(t)ap(t)","ACC":"ap(t)","BRF":"gye(t)","SUI":"sa(p)","JUS":"ja(t)ja(t)","PST":"nai(b)ai(b)ai(b)"};
                    ithkparts.push(cases[this.gOptions.case]);
                }
                // NUMBER
                ithkparts.push(nums[this.gOptions.num]);
                // EXPECTATION
                ithkparts.push(exps[this.gOptions.exp]);
                // FOOD
                let foods = ["es(p)u(t)","des(p)nu(t)"];
                ithkparts.push(foods[+ this.gOptions.food]);
                // GENDER
                let gdrs = {"HUM":"vom(b)ngo(p)","NHM":"yak(b)","NMO":"gal(p)","AGI":"ni(b)nin(b)","GYM":"hak(t)","SIL":"an(b)do(t)","OTH":"vom(b)"};
                ithkparts.push(gdrs[this.gOptions.gdr]);
                // DEATH
                let deaths = {"PSN":"ngo(p)gag(b)","STU":"ngo(p)da(t)","WMB":"gag(b)","SMK":"jup(f)","ANV":"uff(f)da(t)","FHO":"a(f)","IMM":"ngag(t)","SLG":"bang(t)bang(t)","BAX":"ka(t)tie(t)","GUI":"da(t)","SHP":"ngag(t)","PNG":"%ap(t)","OTH":"e(f)"};
                ithkparts.push(deaths[this.gOptions.death]);
                // AWESOMENESS
                ithkparts.push(awes[this.gOptions.awe]);
                // MARKET VALUE
                ithkparts.push((this.gOptions.mvlog ? "va(f)" : "") + this.calcNumber(this.gOptions.mv));
            // VERBS
            } else if (this.wordType == "verb") {
                // NUMBER (agreement w/ subject)
                ithkparts.push(nums[this.gOptions.num]);
                // EXPECTATION
                ithkparts.push(exps[this.gOptions.exp]);
                // MENTAL STATE
                let ments = {"TNR":"es(p)","BZZ":"niz(t)","DRK":"ha(p)ha(p)","HGH":"gor(t)gan(t)","HAL":"vis(b)ick(b)","PAS":"not(p)dan(f)iel(f)","MTH":"dan(f)iel(f)","PNK":"al(p)so(p)not(p)dan(f)iel(f)"};
                ithkparts.push(ments[this.gOptions.ment]);
                // DAY OF WEEK
                let days = {"SU":"snal(t)","M":"u(t)","TU":"yan(b)","W":"glarg(p)","TH":"kang(f)vu(p)","F":"zim(p)","F13":"ec(t)to(t)morph(t)","SA":"zzz(b)"};
                ithkparts.push(days[this.gOptions.day]);
                // LYING + BREADBOX
                let lybr = [{"LIE":"ag(f)nar(b)","TRU":"vom(b)","EXG":"fish(b)","MSL":"sta(t)tist(t)","PDG":"chem(p)"},
                            {"LIE":"sim(t)dyot(p)","TRU":"gland(t)","EXG":"zim(b)","MSL":"ics(t)","PDG":"ist(p)ry(p)"}];
                ithkparts.push(lybr[+ this.gOptions.bread][this.gOptions.lie]);
                // AWESOMENESS
                ithkparts.push(awes[this.gOptions.awe]);
                // ERROR BARS
                ithkparts.push(this.calcNumber(this.gOptions.ebar));
            // ADJECTIVES/ADVERBS
            } else if (this.wordType == "adjv") {
                ithkparts.push(this.calcNumber(this.gOptions.stddev));
            }
            // numerical suffix
            if (this.gOptions.isanum) {
                if (Number.isInteger(this.gOptions.numroot)) {
                    if (this.gOptions.numroot % 2 == 0) {
                        ithkparts.push("tuw(t)glo(t)yai(b)bai(b)san(t)ap(t)vlir(t)sang(b)es(p)u(t)vom(b)da(t)vlim(p)kay(f)sna(f)ga(f)");
                    } else {
                        ithkparts.push("snil(f)dwin(f)san(t)ap(t)vlir(t)sang(b)es(p)u(t)vom(b)ngo(p)da(t)grog(f)kay(f)kay(f)dan(f)");
                    }
                }
            }
            // handle roots w/ underscores
            let i = 0;
            let underscores = (this.ithkword.match(/_/g)||[]).length;
            while (ithkparts.length > i && underscores > i) {
                this.ithkword = this.ithkword.replace("_",ithkparts[i]);
                i++;
            }
            if (ithkparts.length >= i) {
                this.ithkword += ithkparts.splice(i).join("");
            }
            this.ithkword = this.ithkword.replace(/_/g,"");
            // check for function word
            if (this.gOptions.fword && this.gOptions.idiot) {
                this.ithkword = this.gOptions.funcplus + "pa@(b)" + this.ithkword;
            }
            // calc ipa
            this.ipa = "";
            if (!this.settings["Orthography"].altOrth[1]) {
                if (this.ithkword.indexOf("!") > -1) { this.ipa += " ! = left click "; }
                if (this.ithkword.indexOf("*") > -1) { this.ipa += " * = right click "; }
                if (this.ithkword.indexOf("%") > -1) { this.ipa += " % = clap "; }
                if (this.ithkword.indexOf("@") > -1) { this.ipa += " @ = facepalm "; }
                if (this.ithkword.indexOf("ø") > -1 && !this.settings["Orthography"].noHan[1]) { this.ipa += " 酶 = ø "}
                if (this.ithkword.indexOf("ɪ") > -1 && !this.settings["Orthography"].noHan[1]) { this.ipa += " 瑟 = ɪ "}
                if (this.ithkword.indexOf("ʔ") > -1 && !this.settings["Orthography"].noHan[1]) { this.ipa += " 蕯 = ʔ "}
                if (this.ithkword.indexOf("ʌ") > -1 && !this.settings["Orthography"].noHan[1]) { this.ipa += " 蕦 = ʌ "}
            }
            // add zwsp between syllables for better displaying
            var syllablesplit = this.ithkword.split(")")
            this.ithkword = "";
            for (let i of syllablesplit.slice(0, -1)) {
                if (this.settings["Orthography"].altOrth[1]) {
                    let j = i.split("(");
                    for (let char of (this.gData.dictionary.indexOf(j[0]) >>> 0).toString(2)) {
                        if (char == "1") {
                            this.ithkword += "n";
                        } else {
                            this.ithkword += "u";
                        }
                        if (this.settings["Orthography"].zwj[1]) {
                            this.ithkword += "​"; // zwj
                        }
                    }
                    if (j.length > 1) {
                        switch (j[1]) {
                            case "f":
                                this.ithkword += "m";
                                break;
                            case "t":
                                this.ithkword += "ɯ";
                                break;
                            case "b":
                                this.ithkword += "h";
                                break;
                            case "p":
                                this.ithkword += "ɥ";
                                break;
                        }
                        if (this.settings["Orthography"].zwj[1]) {
                            this.ithkword += "​"; // zwj
                        }
                    }
                } else {
                    this.ithkword += i + ")";
                    if (this.settings["Orthography"].zwj[1]) {
                        this.ithkword += "​"; // zwj
                    }
                }
            }
            if (!this.settings["Orthography"].altOrth[1]) {
                if (!this.settings["Orthography"].noHan[1]) {
                    this.ithkword = this.ithkword.replace(/ø/g,"酶").replace(/ɪ/g,"瑟").replace(/ʔ/g,"蕯").replace(/ʌ/g,"蕦");
                }
                if (this.settings["Orthography"].zwj[1]) {
                    this.ithkword = this.ithkword.slice(0,-1);
                }
            }
            // remove gloss/fullgloss
            this.gloss = "";
            this.fullGloss = "";
        },
        calcNumber(num) {
            if (num <= 0) { return ""; }
            let numW = num.toString();
            if (numW.charAt(0) == "0") {numW = numW.substring(1)}
            if (numW.indexOf('0') > -1) { return ""; }
            numW = numW.replace(/73/g,"%");
            let kayNum = {"1":"ga(f)","2":"dan(f)","3":"yup(f)a(f)","4":"kay(f)dan(f)","5":"sna(f)ga(f)","6":"zhna(f)","7":"kay(f)","8":"zi(f)ga(f)","9":"vlim(p)ga(f)","%":"zov(p)",".":"point(f)"};
            let output = "";
            for (let char of numW) {
                output += kayNum[char];
            }
            return output;
        },
        openModal(code) { // leave as is - tells App.vue to open a modal
            this.$emit("modal",code);
        },
        updateFromModal(reference,value) { // leave as is - updates a dropdown from a modal
            this.$refs[reference].updateValue(value);
        },
        resetWord(gO=null) { // leave as is - resets the current word
            if (gO == null) {
                gO = this.gDefault;
            }
            this.gOptions = JSON.parse(JSON.stringify(gO));
            for (var property in gO) {
                this.updateFromModal(property,JSON.parse(JSON.stringify(gO[property])));
            }
        },
        switchWordType(type) { //UNCOMMENT THIS FUNCTION TO ADD MULTIPLE WORD TYPES - THE WORD TYPES SHOULD BE SET UP IN APP.VUE
            this.wordType = type;
            this.calcWord();
            this.handleSendMessage();
        },
    },
    beforeMount() {
        if (this.$cookies.isKey("ithkapp-settingskb")) {
          this.settings = this.$cookies.get("ithkapp-settingskb"); // replace the X with whatever the relevant langVer is
        }
        this.gOptions = JSON.parse(JSON.stringify(this.gDefault));
        this.handleSendMessage();
    },
}
</script>