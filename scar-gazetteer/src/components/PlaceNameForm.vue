<template>
    <b-form @submit="submit">
            <b-form-group
            label-for="place_id"
            >
                <template #label>
                    <span style="color: red;">*</span> Place ID:
                </template>
                <b-form-input
                id="place_id"
                v-model="$v.form_data.place_id.$model"
                type="text"
                :state="validateState('place_id')"
                />
            </b-form-group>
            <b-form-group
            label-for="place_name_mapping"
            >
                <template #label>
                    <span style="color: red;">*</span> Mapping Place Name:
                </template>
                <small>Must be at least 5 characters.</small>
                <b-form-input
                id="place_name_mapping"
                v-model="$v.form_data.place_name_mapping.$model"
                type="text"
                :state="validateState('place_name_mapping')"
                />
            </b-form-group>
            <b-form-group
            label-for="place_name_gazetteer"
            >
                <template #label>
                    <span style="color: red;">*</span> Gazetteer Place Name:
                </template>
                <small>Must be at least 5 characters.</small>
                <b-form-input
                id="place_name_mapping"
                v-model="$v.form_data.place_name_gazetteer.$model"
                :state="validateState('place_name_gazetteer')"
                type="text"
                />
            </b-form-group>

            <b-form-group
            label-for="latitude"
            >
                <template #label>
                    <span style="color: red;">*</span> Latitude:
                </template>
                <small>Must be between -90 and -60 degrees.</small>
                <b-form-input
                id="latitude"
                v-model="$v.form_data.latitude.$model"
                type="text"
                :state="validateState('latitude')"
                />
            </b-form-group>
            <b-form-group
            label-for="longitude"
            >
                <template #label>
                    <span style="color: red;">*</span> Longitude:
                </template>
                <small>Must be between -180 and 180 degrees.</small>
                <b-form-input
                id="longitude"
                v-model="$v.form_data.longitude.$model"
                type="text"
                :state="validateState('longitude')"
                />
            </b-form-group>
            <b-form-group
            label="Coordinate Accuracy:"
            label-for="coordinate_accuracy"
            >
                <b-form-input
                id="coordinate_accuracy"
                v-model="$v.form_data.coordinate_accuracy.$model"
                type="text"
                :state="validateState('coordinate_accuracy')"
                />
            </b-form-group>
            <b-form-group
            label="Altitude:"
            label-for="altitude"
            >
                <b-form-input
                id="altitude"
                v-model="$v.form_data.altitude.$model"
                type="text"
                :state="validateState('altitude')"
                />
            </b-form-group>
            <b-form-group
            label="Altitude Accuracy:"
            label-for="altitude_accuracy"
            >
                <b-form-input
                id="altitude"
                v-model="$v.form_data.altitude_accuracy.$model"
                type="text"
                :state="validateState('altitude_accuracy')"
                />
            </b-form-group>
            <b-form-group
                label="Narrative"
                label-for="narrative"
                >
                <small>Use [L]&lt;placename&gt;[/L] to link to other place names.</small>
                <b-form-textarea
                id="narrative"
                v-model="$v.form_data.narrative.$model"
                rows="3"
                max-rows="6"
                />
            </b-form-group>
            <b-form-group
                label="Named For"
                label-for="named-for"
                >
                <b-form-textarea
                id="named-for"
                v-model="$v.form_data.named_for.$model"
                rows="3"
                max-rows="6"
                />
            </b-form-group>
            <b-form-group
                    label-for="gazetteer">
                <template #label>
                    <span style="color: red;">*</span> Source Gazetteer:
                </template>
                <b-form-select
                    id="gazetteer"
                    v-model="$v.form_data.gazetteer.$model"
                    :options="lists.gazetteers"
                    :state="validateState('gazetteer')"
                />
            </b-form-group>
            <b-form-group
                    label-for="feature_type">
                <template #label>
                    <span style="color: red;">*</span> Feature Type:
                </template>
                <b-form-select
                    id="feature_type"
                    v-model="$v.form_data.feature_type_code.$model"
                    :options="lists.feature_types"
                    :state="validateState('feature_type_code')"
                />
            </b-form-group>
            <b-form-group
            label="Feature Class:"
            label-for="feature_class"
            >
                <b-form-input
                id="feature_class"
                v-model="$v.form_data.scar_feature_class.$model"
                type="text"
                />
            </b-form-group>
            <b-form-group
                    label="* Is Relic:"
                    label-for="is_relic">
                <template #label>
                    <span style="color: red;">*</span> Is Relic:
                </template>
                <b-form-select
                    id="is_relic"
                    v-model="$v.form_data.relic_flag.$model"
                    :options="lists.relic"
                />
            </b-form-group>
            <b-form-group
                    label="Date Named:"
                    label-for="date_named">
                <b-form-input
                id="date_named"
                v-model="$v.form_data.date_named.$model"
                type="date"
                />
            </b-form-group>
            <b-form-group
                label="Comments:"
                label-for="comments"
                >
                <b-form-textarea
                id="comments"
                v-model="$v.form_data.comments.$model"
                rows="3"
                max-rows="6"
                />
            </b-form-group>
            <b-form-group
            label="Source Name:"
            label-for="source_name"
            >
                <b-form-input
                id="source_name"
                v-model="$v.form_data.source_name.$model"
                type="text"
                />
            </b-form-group>
            <b-form-group
            label="Source Publisher:"
            label-for="source_publisher"
            >
                <b-form-input
                id="source_publisher"
                v-model="$v.form_data.source_publisher.$model"
                type="text"
                />
            </b-form-group>
            <b-form-group
            label="Source Identifier:"
            label-for="source_identifier"
            >
                <b-form-input
                id="source_identifier"
                v-model="$v.form_data.source_identifier.$model"
                type="text"
                />
            </b-form-group>
            <b-form-group
            label="Source Scale:"
            label-for="source_scale"
            >
                <b-form-input
                id="source_scale"
                v-model="$v.form_data.source_scale.$model"
                type="text"
                />
            </b-form-group>
            <br />
            <b-button  type="submit" variant="primary">Submit</b-button>
            <b-button variant="secondary" @click="reset">Reset</b-button>
        </b-form>
</template>

<script>
import axios from 'axios'
import { validationMixin } from "vuelidate"
import { required, minLength, between, decimal } from 'vuelidate/lib/validators'


export default {
    name: 'PlaceNameForm',
    props: {
        form: Object
    },
    mixins: [validationMixin],
    data: function() {
        return {
            form_data: {
                place_id: null,
                place_name_mapping: null,
                place_name_gazetteer: null,
                latitude: null,
                longitude: null,
            },
            lists: {
                gazetteers: [{value: null, text: 'Select Gazetteer'}],
                feature_types: [{value: null, text: 'Select Feature Type'}],
                relic: [{value: false, text: 'No'}, {value: true, text:'Yes'}],
                location_method: [
                    {value: null, text: 'None'}
                ]
            }
        }
    },
    validations: {
        form_data: {
            place_id: {
                required,
                decimal,
                between: between(0,9999999999)
            },
            place_name_mapping: {
                required,
                minLength: minLength(5)
            },
            place_name_gazetteer: {
                required,
                minLength: minLength(5)
            },
            latitude: {
                required,
                decimal,
                between: between(-90,-60)
            },
            longitude: {
                required,
                decimal,
                between: between(-180,180)
            },
            coordinate_accuracy: {
                decimal
            },
            altitude: {
                decimal
            },
            altitude_accuracy: {

            },
            narrative: {

            },
            named_for: {

            },
            gazetteer: {
                required
            },
            feature_type_code: {
                required
            },
            scar_feature_class: {

            },
            relic_flag: {
                required
            },
            date_named: {

            },
            comments: {

            },
            source_name: {

            },
            source_publisher: {

            },
            source_identifier: {

            },
            source_scale: {

            }
        }
    },
    watch: {
        form: function() {
            this.form_data = this.form
        }
    },
    mounted: async function() {
        this.form_data = this.form

        let response = await axios.get('/api/gazetteers?order=country.asc')
        let gaz = response.data

        let formatted = gaz.map(g => {
            return {value: g.gazetteer_code, text: g.country}
        })

        this.lists.gazetteers = this.lists.gazetteers.concat(formatted)

        let response2 = await axios.get('/api/feature_types?feature_type_code=neq.0&order=feature_type_name.asc')
        let feat = response2.data

        let formatted2 = feat.map(f => {
            return {value: f.feature_type_code, text: f.feature_type_name}
        })

        this.lists.feature_types = this.lists.feature_types.concat(formatted2)
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.form_data[name];

            return $dirty? !$error : null
        },
        submit (event) {
            event.preventDefault()

            this.$v.form_data.$touch()
            if (this.$v.form_data.$anyError) {
                return
            }

            this.$emit('submit', this.form_data)
        },
        reset () {
            this.$emit('reset')
        }
    }
}
</script>
