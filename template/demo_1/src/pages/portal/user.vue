<template>
    <section>
        <div class="container">
            <div class="header">
                <div class="content">
                    <img class="img-xs rounded-circle" src="@/assets/images/faces-clipart/pic-1.png" alt="">
                    <h4 class="values">Stella Johnson</h4>
                </div>
                <div class="content">
                    <h3 class="values">Bal</h3>
                    <h4 class="values">$999,999</h4>
                </div>
            </div>
            <div class="data-container">
                <div class="nav">
                    <button
                        v-for="tab in tabs" 
                        v-bind:key="tab"
                        v-bind:class="['headings', { active: currentTab === tab }]"
                        v-on:click="currentTab = tab"
                    >{{ tab }} </button>
                    <div class="data">
                        <component
                            v-bind:is="currentTabComponent"
                        >
                        </component>
                    </div>
                </div>
            </div>       
        </div>
    </section>
</template>

<script>
  import Inventory from "./partials/Inventory";
  import Certs from "./partials/Certs";
  import Transactions from "./partials/Transactions";
  export default {
    name: "layout",
    components: {
        'tab-inventory': Inventory,
        'tab-certs': Certs,
        'tab-transactions': Transactions
    },
    data() {
        return {
            currentTab: 'Inventory',
            tabs: ['Inventory', 'Certs', 'Transactions'] 
        };
    },
    computed: {
        currentTabComponent: function () {
            return 'tab-' + this.currentTab.toLowerCase()
        }
    }
}
</script>

<style lang="scss" scoped>
$containerWidth: 60vw;
$containerHeight: 75vh;
$headerWidth: 100%;
$headerHeight: 10%;
$headerBackground: #36373B;
$dataContainerWidth: 100%;
$dataContainerHeight: 90%;
$navWidth: 100%;
$navHeight: 100%;
$navBackground: #36373B;
$dataWidth: 100%;
$dataHeight: 1000%;
$dataBackground: #57595E;
$headingsCount: 3;
.container {
    width: $containerWidth;
    min-height: $containerHeight;
    max-height: $containerHeight+10vh;
}
.header {
    background-color: $headerBackground;
    width: $headerWidth;
    height: $headerHeight;
    .content {
        width: 50%;
        max-height: 100%;
        float: left;
        margin: 0;
        display: block;  
    }
}
.data-container {
    width: $dataContainerWidth;
    height: $dataContainerHeight;
}
.nav {
    background-color: $navBackground;
    width: $navWidth;
    height: $navHeight;
    .headings {
        padding-bottom: 1%;
        margin-bottom: 0;
        width: 100%/$headingsCount;
        border: 2px solid #4E5054;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom: none;
        background-color: #4E5054;
        font-size: 25px;
        color: #f2f2f2;
    }
    :hover{
        background-color: $dataBackground;    
    }
    .active{
        background-color: $dataBackground; 
    }
}
.data {
    background-color: $dataBackground;
    width: $dataWidth;
    height: $dataHeight;
}
</style>