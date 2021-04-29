<template>
    <section>
        <!--
        <b-table 
            :items="items"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            responsive="sm"
            
        ></b-table>
        -->
        <div
            v-if="items"
            id="items"
        >
            <div class="tbl-header">
                <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                >
                    <thead>
                        <tr>
                            <th> Category </th>
                            <th> Item Name </th>
                            <th> Item Cost </th>
                            <th> Requirement(s) </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="tbl-content">
                <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                >
                    <tbody>
                        <tr
                        v-for="item in items"
                        :key="item.class"
                        >
                            <td>{{ item.categories }}</td>
                            <td>{{ item.pretty }}</td>
                            <td>{{ item.cost }}</td>
                            <td>{{ item.traits }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'FetchItems',
    data() {
        return {
            sortBy: 'categories',
            sortDesc: false,
            fields: [
                { key: 'pretty', sortable: false },
                { key: 'traits', sortable: false },
                { key: 'cost', sortable: true },
                { key: 'categories', sortable: true },
            ],
            items: {},
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            fetch('https://dev.dynulo.com/pmc/v2/items', {
                'headers': {
                    'x-dynulo-guild-token': this.$store.store.getters.communityToken,
                }
            })
                .then(response => response.json())
                .then(data => this.items = data.sort((a,b) => (a.categories > b.categories) ? 1 : ((b.categories > a.categories) ? -1 : 0)));
        },
    }
}
</script>

<style lang="scss" scoped>
table{
  width:100%;
  table-layout: fixed;
}
.tbl-header{
  background-color: rgba(255,255,255,0.3);
 }
 .tbl-content{
  height:750px;
  overflow-x:auto;
  margin-top: 0px;
  border: 1px solid rgba(255,255,255,0.3);
}
th{
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
}
td{
  padding: 15px;
  text-align: left;
  vertical-align:middle;
  font-weight: 300;
  font-size: 12px;
  color: #fff;
  border-bottom: solid 1px rgba(255,255,255,0.1);
}
</style>