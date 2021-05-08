<template>
    <section class="app-transactions">
        <div
            v-if="transactions"
            id="transactions"
        >
            <button style="float:right; padding-right:15px;" v-on:click="changeView"> Graph </button>
            <transition-group name="transactions">
                <div id="list-table"
                    key='list'
                    v-if="this.view == 'list'"
                >
                    <div class="tbl-header">
                        <table
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                        >
                            <thead>
                                <tr>
                                    <th> Transaction Reason </th>
                                    <th> Transaction Date </th>
                                    <th> Transaction Amount </th>
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
                                v-for="transaction in transactions"
                                :key="transaction.id"
                            >
                            <td>{{ transaction.reason }}</td>
                            <td>{{ transaction.created }}</td>
                            <td>{{ transaction.amount }}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
                <div id="graph"
                    key='graph'
                    v-if="this.view == 'graph'"
                >
                    <transactionChart :chart-data='graphData' :options='graphData.options'></transactionChart>
                </div>
            </transition-group>
        </div>
    </section>
</template>

<script>
import TransactionChart from './transactionChart.js'

export default {
  name: 'app-transactions',
  components: {
      TransactionChart
  },
  data() {
      return {
          transactions: [],
          graphData: null,
          view: 'graph',
      }
  },
  created() {
      this.fetchData();
  },
  methods: {
        fetchData() {
            fetch('https://dev.dynulo.com/pmc/v2/bank/transactions/76561198852529992', {
                'headers': {
                    'x-dynulo-guild-token': this.$store.store.getters.communityToken,
                }
            })
                .then(response => response.json())
                .then(data => this.transactions = data)
                .then(data => this.fillData(data));
        },
        fillData(data) {
            var reasons = [];
            var points = [];
            for(var i = 0; i < data.length; i++){
                reasons.push(data[i].reason);
            }
            for(var j = 0; j < data.length; j++){
                points.push(data[j].amount);
            }
            this.graphData = {
                labels: reasons,
                datasets: [
                    {
                        label: 'Transactions',
                        backgroundColor: '#f87979',
                        data: points,
                    },
                ],
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    fontColor: "#f2f2f2f2",
                                    fontSize: 18,
                                    beginAtZero: true
                                }
                        }],
                        xAxes: [
                            {
                                ticks: {
                                    fontColor: "#f2f2f2f2",
                                    fontSize: 12,
                                    beginAtZero: true
                                }
                        }]
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                }
            }
        },
        changeView: function() {
            if(this.view == 'list') {
                this.view = 'graph';
            } else {
                this.view = 'list';
            }
        }
    },
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
  height:650px;
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