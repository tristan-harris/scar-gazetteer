<template>
    <b-container>
        <h1>Add new place name</h1>
        <place-name-form :form="form_data" v-on:submit="submit" />
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'

import PlaceNameForm from '@/components/PlaceNameForm.vue'

export default {
    name: "NewPlaceName",
    components: { PlaceNameForm },
    mixins: [pg],
    data: function () {
        return {
            form_data: {
                "name_id": null,
                "latitude": 0,
                "longitude": 0,
                "altitude": null,
                "feature_type_code": null,
                "narrative": "",
                "named_for": null,
                "meeting_date": null,
                "meeting_paper": null,
                "date_revised": null,
                "gazetteer": null,
                "place_id": null,
                "coordinate_accuracy": null,
                "altitude_accuracy": null,
                "accepted_by": null,
                "source_country_code": null,
                "source_name": null,
                "source_scale": null,
                "scar_map_cat_id": null,
                "comments": null,
                "source_publisher": null,
                "source_identifier": null,
                "date_named": null,
                "location_method_id": null,
                "reason": null,
                "relic_flag": false,
                "place_name_gazetteer": null,
                "place_name_mapping": null,
                "view_by_public_flag": true,
            }
        }
    },
    computed: {
        pgConfig() {
            return {
                route: 'place_names',
                query: {
                    select: ['name_id'],
                    limit: 1,
                    order: ['name_id.desc']
                },
                single: true
            }
        }
    },
    methods: {
        async submit(form_data) {

            let next_id = parseInt(this.pg.name_id) + 1
            this.form_data.name_id = next_id

            Object.assign(this.form_data, form_data)

            try {
                await this.$postgrest.$route('place_names').post({}, {}, this.form_data)

                this.$router.push({ path: `/place-name/${this.form_data.name_id}` })
            } catch (error) {
                console.log(error)
                alert(`Error: could not submit new place name (${error})`)
            }
        }
    }
}
</script>
