<template>
    <section>
        <table>
            <tbody>
                <tr
                    v-for="item in items"
                    :key="item.class"
                >
                    <td> {{item.pretty}} </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
export default {
    name: 'FetchItems',
    data() {
        return {
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
                .then(data => this.items = data);
        },
    }
}
</script>
