<template>
    <b-container>
        <h2>Download</h2>

        <h3>Citation information</h3>
        <p>When citing this dataset, use the following example as a guide.</p>
        <p>Secretariat SCAR (1992, updated 2022).
            Composite Gazetteer of Antarctica, <em>Scientific Committee on Antarctic Research</em>.
            GCMD Metadata (<a
                href="http://gcmd.nasa.gov/records/SCAR_Gazetteer.html">http://gcmd.nasa.gov/records/SCAR_Gazetteer.html</a>)
        </p>

        <div class="alert alert-info"><strong>Note:</strong> These files maintain <span class="label label-info"
                id="diacritic_info" data-toggle="tooltip"
                title="A sign, such as an accent or cedilla, which when written above or below a letter indicates a difference in pronunciation from the same letter when unmarked or differently marked.">diacritics</span>.
            Please be mindful not to use software like spreadsheets, which do not keep diacritics.</div>

        <b-form @submit="submit">
            <b-form-group label="Gazetteer:" label-for="gazetteer">
                <b-form-select id="gazetteer" v-model="form.gazetteer" :options="gazetteers" />
            </b-form-group>
            <b-form-group label="Format:" label-for="format">
                <b-form-select id="format" v-model="form.format" :options="formats" />
            </b-form-group>
            <br>
            <b-button type="submit" variant="primary"><b-icon-download /> Download </b-button>
        </b-form>
    </b-container>
</template>

<script>
import axios from 'axios'

export default {
    name: "Search",
    data: function () {
        return {
            form: {
                gazetteer: null,
                format: 'CSV',
                version: 'aadc:SCAR_CGA_PLACE_NAMES'
            },
            gazetteers: [{ value: null, text: "All Gazetteers" }],
            formats: [
                { value: 'CSV', text: "CSV" },
                { value: 'application%2Fjson', text: 'GeoJSON' },
                { value: 'application%2Fvnd.google-earth.kml%2Bxml', text: 'KML' }],
        }
    },
    methods: {
        submit: function (event) {
            event.preventDefault()

            let filter = ""

            if (this.form.gazetteer) {
                filter = `&CQL_FILTER=gazetteer='${this.form.gazetteer}'`
            }

            const downloadLink = `https://data.aad.gov.au/geoserver/aadc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=aadc:SCAR_CGA_PLACE_NAMES&outputFormat=${this.form.format}${filter}`
            window.location = downloadLink
        }
    },
    mounted: async function () {
        let response = await axios.get('/api/gazetteers')
        let gaz = response.data

        let formatted = gaz.map(g => {
            return { value: g.gazetteer_code, text: g.country }
        })

        this.gazetteers = this.gazetteers.concat(formatted)
    }
}
</script>
