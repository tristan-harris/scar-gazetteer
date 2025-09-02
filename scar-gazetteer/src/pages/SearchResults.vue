<template>
    <b-container class="search">
        <h1>Search Results</h1>
        <b-alert show>
            <p><b-icon-info-circle-fill /> <strong>SCAR Gazetteer Information:</strong>
                Each place can have one or more entries in the SCAR Composite Gazetteer, dependant on its origin. By
                viewing an individual entry, you may see multiple references to the same place.
                SCAR uses a more general feature type coding, so each place will, in general, have multiple feature
                types.</p>
        </b-alert>
        <p>Page: {{ page }} of {{ total_pages }} - Total Results: {{ count }}</p>
        <div class="control" v-if="total_pages > 1">
            <div class="page-control">
                <b-button @click="previous" :disabled="page == 1">Previous</b-button>
                <b-button @click="next" :disabled="page >= total_pages">Next</b-button>
            </div>
            <div class="download-control">
                <b-button @click="download" variant="outline-primary"><b-icon-download /> Download</b-button>
            </div>
        </div>
        <div class="control" v-else>
            <div class="download-control">
                <b-button @click="download" variant="outline-primary"><b-icon-download /> Download</b-button>
            </div>
        </div>
        <b-table :items="results" :fields="fields">
            <template #cell(place_name_mapping)="p">
                <div>
                    <a :href="`/place-name/${p.item.name_id}`">{{ p.item.place_name_mapping }}
                        ({{ p.item.gazetteer }})</a><br />
                    <b-badge>Name ID: {{ p.item.name_id }}</b-badge> <b-badge>Place ID: {{ p.item.place_id }}</b-badge>
                </div>
            </template>
            <template #cell(latitude)="lat">
                <div>
                    {{ lat.item.latitude }}°
                </div>
            </template>
            <template #cell(longitude)="lon">
                <div>
                    {{ lon.item.longitude }}°
                </div>
            </template>
            <template #cell(feature_types)="f">
                <div v-if="f.item.feature_types">
                    <a
                        :href="`https://data.aad.gov.au/feature-type/${f.item.feature_types.feature_type_code}`">{{ f.item.feature_types.feature_type_name }}</a>
                </div>
            </template>
        </b-table>
        <div class="control" v-if="total_pages > 1">
            <div class="page-control">
                <b-button @click="previous" :disabled="page == 1">Previous</b-button>
                <b-button @click="next" :disabled="page >= total_pages">Next</b-button>
            </div>
        </div>
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'
import qs from 'qs'
import axios from 'axios'

export default {
    name: 'SearchResults',
    data: function () {
        return {
            fields: [
                { key: 'place_name_mapping', label: "Place Name", sortable: false },
                { key: 'latitude', sortable: false },
                { key: 'longitude', sortable: false },
                { key: 'feature_types', label: "Feature Type", sortable: false }
            ],
            page_size: 25,
            results: [],
            count: 0
        }
    },
    mixins: [pg],
    computed: {
        page() {
            return this.$route.query.page || 1
        },
        total_pages() {
            return Math.ceil(this.count / this.page_size)
        }
    },
    mounted: function () {
        this.search()
    },
    watch: {
        '$route': function () {
            this.search()
        }
    },
    methods: {
        parseFilter: function () {
            let filter = {}

            if (this.$route.query.search_text) {
                filter['search_text'] = `${this.$route.query.search_text}`
            } else {
                filter['search_text'] = ''
            }

            if (this.$route.query.gazetteer) {
                filter['gazetteer'] = `eq.${this.$route.query.gazetteer}`
            }

            if (this.$route.query.feature_type) {
                filter['feature_type_code'] = `eq.${this.$route.query.feature_type}`
            }

            if (this.$route.query.relics == 1) {
                filter['relic_flag'] = `is.false`
            }

            if (this.$route.query.relics == 2) {
                filter['relic_flag'] = `is.true`
            }

            filter['order'] = 'place_name_mapping.asc'

            return filter
        },
        search: async function () {
            let filter = this.parseFilter()

            filter['limit'] = this.page_size
            filter['offset'] = (this.$route.query.page ?? 0) * this.page_size

            const response = await axios.get(`/api/rpc/search?select=*,feature_types(feature_type_code,feature_type_name)&${qs.stringify(filter)}`, { headers: { 'Prefer': 'count=exact' } })
            this.results = response.data
            this.count = response.headers['content-range'].split('/')[1]
        },
        next: function () {

            if (this.page >= this.total_pages) {
                return
            }

            const query = Object.assign({}, this.$route.query);
            query.page = parseInt(this.page) + 1;
            this.$router.push({ query });
        },
        previous: function () {
            if (this.page == 1) {
                return
            }

            const query = Object.assign({}, this.$route.query);
            query.page = parseInt(this.page) - 1;
            this.$router.push({ query });
        },
        download: function () {
            let filter = this.parseFilter()

            axios({
                url: `/api/rpc/search?${qs.stringify(filter)}`,
                method: 'GET',
                headers: { 'Accept': 'text/csv' }
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'scar-gazetteer.csv');
                document.body.appendChild(link);
                link.click();
            });
        }
    },
}

</script>

<style scoped>
.badge {
    color: #fff;
    background-color: #999;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 25%);
}

.search {
    max-width: 50em;
}

.control {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 1.5em;
}

.page-control {
    display: flex;
    gap: 1em;
    flex-grow: 1;
}
</style>
