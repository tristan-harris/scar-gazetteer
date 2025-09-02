<template>
    <b-container class="main-content">
        <h1>Welcome to the SCAR Composite Gazetteer of Antarctica</h1>

        <p>The SCAR Composite Gazetteer of Antarctica (CGA) has been compiled over a period of {{ years }} years
            (commenced 1992) and consists of {{ name_count }} names that correspond to {{ feature_count }} features.
            The place names information has been submitted by the national names committees from {{ gazetteer_count }} countries.
        </p>

        <ul class="unstyled">
            <li><b-icon-bar-chart style="text-align: center" /> <a href="/information/statistics"> View SCAR Gazetteer
                    summary information</a></li>
            <li><b-icon-cloud-arrow-down style="text-align: center" /> <a href="/download"> Download SCAR Gazetteer</a>
            </li>
            <li><b-icon-file-earmark-text style="text-align: center" /> <a href="/information/batch-instructions">
                    Instructions for batch edits</a></li>
        </ul>
    </b-container>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'

export default {
    name: "Main",
    data: function () {
        return {
            feature_count: 0,
            name_count: 0,
            gazetteer_count: 0
        }
    },
    computed: {
        years: function () {
            return dayjs().year() - 1992
        }
    },
    metaInfo: function () {
        return {
            script: [{
                type: 'application/ld+json',
                json: {
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": 'SCAR Composite Gazetteer of Antarctica',
                    "sourceOrganization": {
                        "@type": "Organization",
                        "name": "PROGRAMMA NAZIONALE DI RICERCHE IN ANTARTIDE",
                        "url": "https://www.pnra.aq/",
                        "logo": "https://www.pnra.aq/themes/basic/logo.png"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "Scientific Committee on Antarctic Research (SCAR)",
                        "url": "https://scar.org",
                        "logo": "https://scar.org/templates/it_headlines/custom/images/SCAR_logo_2018_white_background.png"
                    },
                    "spatialCoverage": {
                        "@type": "Place",
                        "geo": {
                            "@type": "GeoShape",
                            "box": "-90 180 -60 -180"
                        }
                    },
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://placenames.aq/search/results?search_text={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                }
            }]
        }
    },
    mounted: async function () {
        const response = await axios.get('/api/gaz_count')
        this.name_count = response.data[0].name_count
        this.feature_count = response.data[0].place_count
        this.gazetteer_count = response.data[0].gazetteer_count
    }
}
</script>


<style scoped>
.unstyled {
    list-style: none;
    /* Remove list bullets */
    padding: 0;
    margin: 0;
}

.main-content {
    max-width: 60em;
}
</style>
