<template>
    <section class="app-certs">
        <div>
            <div class="tbl-header">
                <table
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                >
                    <thead>
                        <tr>
                            <th> Cert Name </th>
                            <th> Date Attained </th>
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
                        <tr>
                            <td>Cert Name</td>
                            <td>Date Attained</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'app-certs',
}
</script>

<style lang="scss" scoped>
table {
	width: 100%;
	table-layout: fixed;
}
.tbl-header {
	background-color: rgba(255,255,255,0.3);
}
.tbl-content {
	height: 750px;
	overflow-x: auto;
	margin-top: 0px;
	border: 1px solid rgba(255,255,255,0.3);
}
th {
	padding: 20px 15px;
	text-align: left;
	font-weight: 500;
	font-size: 16px;
	color: #fff;
	text-transform: uppercase;
}
td {
	padding: 15px;
	text-align: left;
	vertical-align: middle;
	font-weight: 300;
	font-size: 12px;
	color: #fff;
	border-bottom: solid 1px rgba(255,255,255,0.1);
}

</style>