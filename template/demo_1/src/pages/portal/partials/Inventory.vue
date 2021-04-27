<template>
    <section class="app-inventory">
        <div class="container">
            <div class="section"
                v-if="!loading"
            >
                <div class="equipment">
                    <div class="entries">
                        <h4>{{ this.uitems[0] }}</h4>
                        <div class="tbl-content">
                            <table>
                                <tbody>
                                    <tr
                                        v-for="uitem in uitems[1]"
                                        :key="uitem[0]"
                                    >
                                    <td>{{ uitem[0] }} </td>
                                    <td>{{ uitem[1] }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="entries">
                        <h4>{{ this.vitems[0] }}</h4>
                        <div class="tbl-content">
                            <table>
                                <tbody>
                                    <tr
                                        v-for="vitem in vitems[1]"
                                        :key="vitem[0]"
                                    >
                                    <td>{{ vitem[0] }} </td>
                                    <td>{{ vitem[1] }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="entries">
                        <h4>{{ this.bitems[0] }}</h4>
                        <div class="tbl-content">
                            <table>
                                <tbody>
                                    <tr
                                        v-for="bitem in bitems[1]"
                                        :key="bitem[0]"
                                    >
                                    <td>{{ bitem[0] }} </td>
                                    <td>{{ bitem[1] }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="intelligence">
                    <p class="item">Map</p>
                    <p class="item">GPS</p>
                    <p class="item">Compass</p>
                    <p class="item">Watch</p>
                </div>
            </div>
            <div class="section"
                v-if="!loading"
            >
                <div class="gear">
                    <p class="item"> Helmet </p>
                    <p class="item"> Facewear </p>
                    <p class="item"> NVs </p>
                    <p class="item"> Binoculars </p>
                </div>
                <div class="armaments">
                    <h1> {{this.pweapon[0 ]}} </h1>
                    <div class="attachments">
                        <ul class="items">
                            <li v-if="this.pweapon[1]">{{ this.pweapon[1] }}</li>
                            <li v-if="this.pweapon[2]">{{ this.pweapon[2] }}</li>
                            <li v-if="this.pweapon[6]">{{ this.pweapon[6] }}</li>
                            <li v-if="this.pweapon[3]">{{ this.pweapon[3] }}</li>
                            <li v-if="this.pweapon[5][0]">{{ this.pweapon[5][0] }}</li>
                            <li v-if="this.pweapon[4][0]">{{ this.pweapon[4][0] }}</li>
                        </ul>
                    </div>
                </div>
                <div class="armaments"
                    v-if="this.lweapon[0]"
                >
                    <h1> {{ this.lweapon[0] }} </h1>
                    <div class="attachments">
                        <ul class="items">
                            <li v-if="this.pweapon[1]">{{ this.lweapon[1] }}</li>
                            <li v-if="this.pweapon[2]">{{ this.lweapon[2] }}</li>
                            <li v-if="this.pweapon[6]">{{ this.lweapon[6] }}</li>
                            <li v-if="this.pweapon[3]">{{ this.lweapon[3] }}</li>
                            <li v-if="this.pweapon[4][0]">{{ this.lweapon[4][0] }}</li>
                        </ul>
                    </div>
                </div>
                <div class="armaments"
                    v-if="this.sweapon[0]"
                >
                    <h1> {{this.sweapon[0]}} </h1>
                    <div class="attachments">
                        <ul class="items">
                            <li v-if="this.pweapon[1]">{{ this.sweapon[1] }}</li>
                            <li v-if="this.pweapon[2]">{{ this.sweapon[2] }}</li>
                            <li v-if="this.pweapon[6]">{{ this.sweapon[6] }}</li>
                            <li v-if="this.pweapon[3]">{{ this.sweapon[3] }}</li>
                            <li v-if="this.pweapon[4][0]">{{ this.sweapon[4][0] }}</li>
                        </ul>
                    </div>
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
                    this.pweapon[0] = this.items[items.indexOf(this.pweapon[0])].pretty;
                    for (var g = 0; g < this.pweapon[1].length; g++){
                        var h = items.indexOf(this.pweapon[1][g][0])
                        this.pweapon[1][g][0] = this.items[h].pretty;
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
                    this.loading = false;
                });
        },
       
  }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
}
.section {
    width: 50%;
    height: 700px;
    float: left;
}
.entries {
    width: 33%;
    height: 575px;
    float: left;
}
.tbl-content{
    height: 575px;
    overflow-x: hidden;
}
.equipment {
    height: 650px;
}
.intelligence {
    margin-top: 10px;
    margin-left: 35px;
    width: 100%;
    .item {
        width: 25%;
        display: inline-block;
    }
}
.gear {
    margin-top: 10px;
    margin-left: 35px;
    .item {
        width: 25%;
        display: inline-block;
    }
}
.attachments {
    .items {
        list-style: none;
    }
}
::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-track {
    background: #36373B;
}
::-webkit-scrollbar-thumb {
    background: #888;
}
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>