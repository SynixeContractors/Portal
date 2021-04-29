<template>
    <section class="app-inventory">
        <div class="grid-container"
            v-if="!loading"
        >
            <div class="Uniform">
                <div class="uClothing">{{ uitems[0] }}</div>
                <div class="uItems">
                    <table>
                        <tbody>
                            <tr
                                v-for="uitem in uitems[1]"
                                :key="uitem[0]"
                            >
                                <td>{{ uitem[0] }}</td>
                                <td>{{ uitem[1] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="Vest">
                <div class="vClothing">{{ vitems[0] }}</div>
                <div class="vItems">
                    <table>
                        <tbody>
                            <tr
                                v-for="vitem in vitems[1]"
                                :key="vitem[0]"
                            >
                                <td>{{ vitem[0] }}</td>
                                <td>{{ vitem[1] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="Backpack">
                <div class="bClothing">{{ bitems[0] }}</div>
                <div class="bItems">
                    <table>
                        <tbody>
                            <tr
                                v-for="bitem in bitems[1]"
                                :key="bitem[0]"
                            >
                                <td>{{ bitem[0] }}</td>
                                <td>{{ bitem[1] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="Misc">
                <div class="Map" v-if="misc[0]">Map</div>
                <div class="GPS" v-if="misc[1]">GPS</div>
                <div class="Compass" v-if="misc[3]">Compass</div>
                <div class="Watch" v-if="misc[4]">Watch</div>
            </div>
            <div class="Extra-Gear">
                <div class="Helmet" v-if="equipment[0]">{{ equipment[0] }}</div>
                <div class="Facewear" v-if="equipment[1]">{{ equipment[1] }}</div>
                <div class="NVGs" v-if="equipment[2]">{{ equipment[2] }}</div>
                <div class="Binoculars" v-if="equipment[3]">{{ equipment[3] }}</div>
            </div>
            <div class="Primary"
                v-if="pweapon[0]"
            >
                <div class="pGun">{{ pweapon[0] }}</div>
                <div class="pAttachment">
                <div class="pMuzzle" v-if="pweapon[1]">{{ pweapon[1] }}</div>
                <div class="pBipod" v-if="pweapon[2]">{{ pweapon[2] }}</div>
                <div class="pPEQ" v-if="pweapon[6]">{{ pweapon[6] }}</div>
                <div class="pScope" v-if="pweapon[3]">{{ pweapon[3] }}</div>
                <div class="pSecondry-Mag" v-if="pweapon[5][0]">{{ pweapon[5][0] }}</div>
                <div class="pPrimary-Mag" v-if="pweapon[4][0]">{{ pweapon[4][0] }}</div>
                </div>
            </div>
            <div class="Launcher"
                v-if="lweapon[0]"
            >
                <div class="lGun">{{ lweapon[0] }}</div>
                <div class="lAttachment">
                <div class="lMag" v-if="lweapon[1]">{{ lweapon[1] }}</div>
                <div class="lScope" v-if="lweapon[2]">{{ lweapon[2] }}</div>
                <div class="lPEQ" v-if="lweapon[6]">{{ lweapon[6] }}</div>
                <div class="lBipod" v-if="lweapon[3]">{{ lweapon[3] }}</div>
                <div class="lMuzzle" v-if="lweapon[4][0]">{{ lweapon[1][0] }}</div>
                </div>
            </div>
            <div class="Secondary"
                v-if="sweapon[0]"
            >
                <div class="sGun">{{ sweapon[0] }}</div>
                <div class="sAttachment">
                <div class="sMuzzle" v-if="sweapon[1]">{{ sweapon[1] }}</div>
                <div class="sBipod" v-if="sweapon[2]">{{ sweapon[2] }}</div>
                <div class="sPEQ" v-if="sweapon[6]">{{ sweapon[6] }}</div>
                <div class="sScope" v-if="sweapon[3]">{{ sweapon[3] }}</div>
                <div class="sMag" v-if="sweapon[4][0]">{{ sweapon[4][0] }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'app-inventory',
  data() {
      return {
          loading: true,
          uitems: [], //Uniform items
          vitems: {}, //Vest items
          bitems: {}, //Backpack items
          pweapon: {}, //primary weapon
          sweapon: {}, //secondary weapon
          lweapon: {}, //launcher weapon
          equipment: [],
          misc: [],
          data: {},
          loadout: {},
          items: {},
      }
  },
  created() {
      this.fetchData();
      this.fetchItemData();
  },
  methods: {
       fetchData() {
            fetch('https://dev.dynulo.com/pmc/v2/players/76561198852529992/loadout', {
                'headers': {
                    'x-dynulo-guild-token': this.$store.store.getters.communityToken,
                }
            })
                .then(response => response.json())
                .then(data => this.data = data)
                .then(()=>{
                    this.loadout = JSON.parse(this.data.loadout)
                    this.pweapon = this.loadout[0];
                    this.sweapon = this.loadout[1];
                    this.lweapon = this.loadout[2];
                    this.uitems = this.loadout[3];
                    this.vitems = this.loadout[4];
                    this.bitems = this.loadout[5];
                    for(var i = 0; i < 5; i++){
                        if(this.loadout[9][i] != ""){
                            this.misc.push(this.loadout[9][i]);
                        }
                    }
                    if(this.loadout[6] != ""){this.equipment.push(this.loadout[6])}
                    if(this.loadout[7] != ""){this.equipment.push(this.loadout[7])}
                    if(this.loadout[9][5] != ""){this.equipment.push(this.loadout[9][5])}
                    if(this.loadout[8][0] != ""){this.equipment.push(this.loadout[8][0])}
                });            
        },
        fetchItemData() {
            fetch('https://dev.dynulo.com/pmc/v2/items', {
                'headers': {
                    'x-dynulo-guild-token': this.$store.store.getters.communityToken,
                }
            })
                .then(response => response.json())
                .then(data => this.items = data)
                .then(()=>{
                    var items = this.items.map(function(e) { return e.class; });
                    
                    this.uitems[0] = this.items[items.indexOf(this.uitems[0])].pretty;
                    for (var a = 0; a < this.uitems[1].length; a++){
                        var b = items.indexOf(this.uitems[1][a][0])
                        this.uitems[1][a][0] = this.items[b].pretty;
                    }
                    this.vitems[0] = this.items[items.indexOf(this.vitems[0])].pretty;
                    for (var c = 0; c < this.vitems[1].length; c++){
                        var d = items.indexOf(this.vitems[1][c][0])
                        this.vitems[1][c][0] = this.items[d].pretty;
                    }
                    this.bitems[0] = this.items[items.indexOf(this.bitems[0])].pretty;
                    for (var e = 0; e < this.bitems[1].length; e++){
                        var f = items.indexOf(this.bitems[1][e][0])
                        this.bitems[1][e][0] = this.items[f].pretty;
                    }
                    if(this.pweapon[0]){
                        this.pweapon[0] = this.items[items.indexOf(this.pweapon[0])].pretty;
                        for (var g = 0; g < this.pweapon[1].length; g++){
                            var h = items.indexOf(this.pweapon[1][g][0])
                            this.pweapon[1][g][0] = this.items[h].pretty;
                        }
                    }
                    if(this.sweapon[0]){
                        this.sweapon[0] = this.items[items.indexOf(this.sweapon[0])].pretty;
                        for (var i = 0; i < this.sweapon[1].length; i++){
                            var j = items.indexOf(this.sweapon[1][i][0])
                            this.sweapon[1][i][0] = this.items[j].pretty;
                        }
                    }
                    if(this.lweapon[0]){
                        this.lweapon[0] = this.items[items.indexOf(this.lweapon[0])].pretty;
                        for (var k = 0; k < this.lweapon[1].length; k++){
                            var l = items.indexOf(this.lweapon[1][k][0])
                            this.lweapon[1][k][0] = this.items[l].pretty;
                        }
                    }
                    for (var m = 0; m < this.misc.length; m++){
                        var n = items.indexOf(this.misc[m])
                        this.misc[m] = this.items[n].pretty;
                    }
                    for (var o = 0; o < this.equipment.length; o++){
                        var p = items.indexOf(this.equipment[o])
                        this.equipment[o] = this.items[p].pretty;
                    }
                    this.loading = false;
                });
        },
       
  }
}
</script>

<style lang="scss" scoped>
$bordercolor: #4E5054;
$bordersize: 2px;
.grid-container {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 0.5fr 1fr;
  grid-template-rows: 0.7fr 1.2fr 1.2fr 0.9fr;
  gap: 0px 0px;
  grid-template-areas:
    "Uniform Vest Backpack Extra-Gear"
    "Uniform Vest Backpack Primary"
    "Uniform Vest Backpack Launcher"
    "Misc Misc Misc Secondary";
}
.Uniform {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 1.8fr;
  gap: 0px 0px;
  grid-template-areas:
    "uClothing uClothing uClothing"
    "uItems uItems uItems";
  grid-area: Uniform;
  border: $bordersize solid $bordercolor;
}
.uClothing {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ".";
  grid-area: uClothing;
  font-size: 18px;
  border-bottom: $bordersize solid $bordercolor;
}
.uItems {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ".";
  grid-area: uItems;
  font-size: 14px;
}
.Vest {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 1.8fr;
  gap: 0px 0px;
  grid-template-areas:
    "vClothing vClothing vClothing"
    "vItems vItems vItems";
  grid-area: Vest;
  border: $bordersize solid $bordercolor;
}
.vClothing {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ".";
  grid-area: vClothing;
  font-size: 18px;
  border-bottom: $bordersize solid $bordercolor;
}
.vItems {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ".";
  grid-area: vItems;
  font-size: 14px;
}
.Backpack {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 1.8fr;
  gap: 0px 0px;
  grid-template-areas:
    "bClothing bClothing bClothing"
    "bItems bItems bItems";
  grid-area: Backpack;
  border: $bordersize solid $bordercolor;
}
.bClothing {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ".";
  grid-area: bClothing;
  font-size: 18px;
  border-bottom: $bordersize solid $bordercolor;
}
.bItems {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ".";
  grid-area: bItems;
  font-size: 14px;
}
.Misc {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "Map GPS Compass Watch";
  grid-area: Misc;
  border: $bordersize solid $bordercolor;
}
.Map { grid-area: Map; margin: auto; font-size: 20px;}
.GPS { grid-area: GPS; margin: auto; font-size: 20px;}
.Compass { grid-area: Compass; margin: auto; font-size: 20px;}
.Watch { grid-area: Watch; margin: auto; font-size: 20px;}
.Extra-Gear {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "Helmet Facewear NVGs Binoculars";
  grid-area: Extra-Gear;
  border: $bordersize solid $bordercolor;
}
.Helmet { grid-area: Helmet; margin: auto; font-size: 16px;}
.Facewear { grid-area: Facewear; margin: auto; font-size: 16px;}
.NVGs { grid-area: NVGs; margin: auto; font-size: 16px;}
.Binoculars { grid-area: Binoculars; margin: auto; font-size: 16px;}
.Primary {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "pGun pGun pGun"
    "pAttachment pAttachment pAttachment";
  grid-area: Primary;
  border: $bordersize solid $bordercolor;
}
.pGun {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ".";
  grid-area: pGun;
  font-size: 20px;
  text-align: center;
}
.pAttachment {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "pMuzzle pBipod pPEQ pScope pSecondry-Mag pPrimary-Mag";
  grid-area: pAttachment;
}
.pMuzzle { grid-area: pMuzzle; margin: auto;}
.pBipod { grid-area: pBipod; margin: auto;}
.pPEQ { grid-area: pPEQ; margin: auto;}
.pScope { grid-area: pScope; margin: auto;}
.pSecondry-Mag { grid-area: pSecondry-Mag; margin: auto;}
.pPrimary-Mag { grid-area: pPrimary-Mag; margin: auto;}
.Launcher {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "lGun lGun lGun"
    "lAttachment lAttachment lAttachment";
  grid-area: Launcher;
}
.lGun {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ".";
  grid-area: lGun;
  border: $bordersize solid $bordercolor;
  font-size: 20px;
  text-align: center;
}
.lAttachment {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "lMuzzle lBipod lPEQ lScope lMag";
  grid-area: lAttachment;
}
.lMag { grid-area: lMag; }
.lScope { grid-area: lScope; }
.lPEQ { grid-area: lPEQ; }
.lBipod { grid-area: lBipod; }
.lMuzzle { grid-area: lMuzzle; }
.Secondary {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "sGun sGun sGun"
    "sAttachment sAttachment sAttachment";
  grid-area: Secondary;
}
.sGun {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ".";
  grid-area: sGun;
  border: $bordersize solid $bordercolor;
  font-size: 20px;
  text-align: center;
}
.sAttachment {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "sMuzzle sBipod sPEQ sScope sMag";
  grid-area: sAttachment;
}
.sMuzzle { grid-area: sMuzzle; }
.sBipod { grid-area: sBipod; }
.sPEQ { grid-area: sPEQ; }
.sScope { grid-area: sScope; }
.sMag { grid-area: sMag; }

table {
    table-layout: fixed;
}
td{
    text-align: left;
    vertical-align: middle;
    font-weight: 300;
}
</style>