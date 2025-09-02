<template>
    <b-container>
        <h1>Statistics</h1>
        <b-table striped hover label-sort-asc="" label-sort-desc="" label-sort-clear="" :items="statsWithTotal"
            :fields="fields" />
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'

export default {
    name: 'InformationGlossary',
    data: function () {
        return {
            fields: [
                { key: 'country' },
                { key: 'name_count' },
            ]
        }
    },
    mixins: [pg],
    computed: {
        stats() {
            return this.pg
        },
        statsWithTotal() {
            if (!this.stats || this.stats.length === 0) {
                return []
            }
            const total = this.stats.reduce((sum, item) => sum + (item.name_count || 0), 0)
            return [
                ...this.stats,
                {
                    country: 'Total',
                    name_count: total,
                    _rowVariant: 'primary',
                }
            ]
        },
        pgConfig() {
            return {
                route: 'name_count',
                query: {
                    select: ['*']
                }
            }
        }
    },
    watch: {
        '$route.params.id': function () {
            this.pg.$get
        },
    }
}
</script>
