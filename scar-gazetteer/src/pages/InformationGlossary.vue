<template>
    <b-container>
        <h1>Glossary</h1>
        <div class="overflow-auto">
            <b-form-group label="Filter" label-for="filter-input" label-align-sm="left" label-size="lg" class="mb-3">
                <b-input-group size="m">
                    <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Matching text">
                    </b-form-input>
                </b-input-group>
            </b-form-group>

            <b-pagination v-model="currentPage" :total-rows="filteredRows" :per-page="perPage"
                aria-controls="my-table"></b-pagination>
            <b-table id="glossary-table" :items="filteredGlossary" :fields="fields" :per-page="perPage"
                :current-page="currentPage" striped hover label-sort-asc="" label-sort-desc="" label-sort-clear="" />
            <div class="spinner-div d-flex justify-content-center" v-if="pg.$get.isPending">
                <b-spinner class="spinner"></b-spinner>
            </div>
            <b-pagination v-model="currentPage" :total-rows="filteredRows" :per-page="perPage"
                aria-controls="my-table"></b-pagination>
        </div>
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'

export default {
    name: 'InformationGlossary',
    data: function () {
        return {
            perPage: 100,
            currentPage: 1,
            filter: '',
            fields: [
                { key: 'english_term', sortable: true },
                { key: 'national_term', sortable: true },
                { key: 'language', sortable: true },
                { key: 'scar_feature_type', sortable: true },
            ]
        }
    },
    mixins: [pg],
    computed: {
        rows() {
            return this.pg.length
        },
        glossary() {
            return this.pg
        },
        filteredGlossary() {
            if (!this.filter) {
                return this.glossary
            }
            const filterLower = this.filter.toLowerCase()
            const properties = ['english_term', 'national_term', 'language', 'scar_feature_type']

            return this.glossary.filter(entry => {
                return properties.some(prop => entry[prop] && entry[prop].toLowerCase().includes(filterLower))
            })
        },
        filteredRows() {
            return this.filteredGlossary.length
        },
        pgConfig() {
            return {
                route: 'glossary',
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
        filter() {
            this.currentPage = 1 // reset to first upon page when filtering
        }
    }
}
</script>
