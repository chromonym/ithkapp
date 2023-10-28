<template>
    <div>
        <h1>Ithkapp (olaisaliupšea)</h1> <!-- will need to change this bc KÇT means 'translate' when FML/s3 -->
        <p class="smalltext">Compatible with the <a target="_blank" href="http://www.ithkuil.net/00_intro.html">final version of Ithkuil III on ithkuil.net</a>.
        <br/>Definitions are a combination of taken from the Ithkuil III site and (occasionally) written by the creator of this site.
        <br/>Glosses are based on the glosses on the Ithkuil III site. and in-gloss definitions are provided by <a target="_blank" href="https://porpoiseless.github.io/elamxhi/">Elamxhí</a>.
        <br/>All past and current forms of Ithkuil and all official documentation are by John Quijada.
        <br/>Click on a box's title to learn more about what it means.</p>
        <div class="section"> <!-- all OptionBoxes must be in a class="section" div or else the formatting will be messed up -->
            <OptionBox :json="gData.root" code="root" @send-message="handleSendMessage" ref="root" @modal="openModal"/> <!-- ref should be the same as code -->
            <OptionBox :json="gData.desig" code="desig" @send-message="handleSendMessage" ref="desig" @modal="openModal"/>
            <OptionBox :json="gData.stem" code="stem" @send-message="handleSendMessage" ref="stem" @modal="openModal"/>
            <OptionBox :json="gData.pattern" code="pattern" @send-message="handleSendMessage" ref="pattern" @modal="openModal"/>
        </div>
        <div class="section">
            <OptionBox :json="gData.cIII" code="cIII" @send-message="handleSendMessage" ref="cIII" @modal="openModal"/>
        </div>
    </div>
</template>

<script>
import OptionBox from "../components/optionbox.vue"
import grammardata from './grammardata.json'

export default {
    name: "Ithkuil_v3",
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
            this.handleSendMessage(obj.word, "word"); // recalculate the word - MAKE SURE THIS IS A PROPERTY THAT EXISTS!
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
            defaultWord: "", // this should be whatever the default form of your "normal" word type is - whatever the algorithm generates with no option changes (ithkuil iv = "aal")
            settings: { // Settings - fill in with whatever you want the user to be able to change, with the following format:
                "Category A": { // Category title
                    "s1": ["Setting 1: ","defaultval",["defaultval","Fancy New Value"]] // dropdowns - "code": ["Visual Name","default value",[options]]
                },
                "Category B": {
                    "s2": ["Setting 2: ",false] // check boxes - "code": ["Visual Name:",true/false]
                }
            },
            gDefault: { // this should contain all of the grammar options' (dropdowns') default values
                "root": "",
                "desig":"IFL",
                "stem":"s1",
                "pattern":"p1",
                "cIII":"OBL",
            },
            wordType: "normal", //  set to whatever the default word type is - UNCOMMENT WITH LISTENWORDTYPE() ABOVE AND SWITCHWORDTYPE() BELOW TO ADD MULTIPLE WORD TYPES
            tabGroups: {"normal": [["root","desig","stem","pattern"]]}, // a dictionary representing the tab groups, based on word type
            gOptions: {}, //  leave as is - SHOULD BE WHERE YOU STORE/UPDATE GRAMMAR OPTIONS
            ithkword: "", //  leave as is - SHOULD BE THE FINAL WORD GENERATED
            ipa: "", //       leave as is - SHOULD BE THE IPA TRANSCRIPTION OF THE ABOVE WORD
            gloss: "", //     leave as is - SHOULD BE THE GLOSS (meaning) OF THE ABOVE WORD
            fullGloss: "", // leave as is - SHOULD BE A LONGER VERSION OF THE ABOVE GLOSS
            // gData: grammardata - uncomment when using a json file to store data
            gData: grammardata,
            slots: ["","","","","","","","","","","","","","",""],
        }
    },
    methods: {
        async handleSendMessage(value="",code="") { // what happens when an <OptionBox> updates its value
            if (code) {
                this.gOptions[code] = value
                // DO ANY FANCY VALUE UPDATING HERE (if necessary)
            }
            // RUN RECALCULATIONS HERE
            this.calculateWord();
            // above is a placeholder recalculation
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
            // RECALCULATE WORDS HERE
            this.handleSendMessage();
        },
        calculateWord() {
            this.calcSlot4();
            this.calcSlot8();
            this.ithkword = this.slots.join("");
            this.ipa = this.ithkword;
            this.gloss = this.ithkword;
            this.fullGloss = this.ithkword;
        },
        // calcSlot1()
        // calcSlot2()
        // calcSlot3()
        calcSlot4() { // still need to add Function to this
            let vr = {"p1":{"s1":{"STA":"a","DYN":"i","MNF":"ui","DSC":"oi"},"s2":{"STA":"e","DYN":"ai","MNF":"ü","DSC":"eo"},"s3":{"STA":"u","DYN":"ei","MNF":"ëi","DSC":"eö"}},
                      "p2":{"s1":{"STA":"o","DYN":"au","MNF":"ae","DSC":"oe"},"s2":{"STA":"ö","DYN":"eu","MNF":"ea","DSC":"öe"},"s3":{"STA":"î","DYN":"iu","MNF":"oa","DSC":"ëu"}},
                      "p3":{"s1":{"STA":"â","DYN":"ia","MNF":"üa","DSC":"üo"},"s2":{"STA":"ê","DYN":"ie","MNF":"iù","DSC":"üe"},"s3":{"STA":"ô","DYN":"io","MNF":"iö","DSC":"üö"}}};
            this.slots[3] = vr[this.gOptions.pattern][this.gOptions.stem]["STA"];
            // note that ü/ou, î/û, ia/ua, ie/ue, io/uo, üa/aì, iù/uì, iö/uö, üo/oì, üe/eì, üö/aù
        },
        // calcSlot5()
        // calcSlot6()
        // calcSlot7()
        calcSlot8() {
            this.slots[7] = this.gOptions.root;
        },
        // calcSlot9()
        // calcSlot10()
        // calcSlot11()
        // calcSlot12()
        // calcSlot13()
        // calcSlot14()
        // calcSlot15()
    },
    beforeMount() {
        if (this.$cookies.isKey("ithkapp-settings3")) {
          this.settings = this.$cookies.get("ithkapp-settings3");
        }
        this.gOptions = JSON.parse(JSON.stringify(this.gDefault));
        this.handleSendMessage();
    },
}
</script>