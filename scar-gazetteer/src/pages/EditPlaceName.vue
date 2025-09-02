<template>
    <b-container>
        <h1>Edit place name</h1>
        <place-name-form v-if="!form_data.$get.isPending" :form="form_data" v-on:reset="reset" v-on:submit="submit" v-on:deletePlacename="deletePlacename" />
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'
import PlaceNameForm from '@/components/PlaceNameForm.vue'

export default {
    name: "EditPlaceName",
    components: { PlaceNameForm },
    mixins: [pg],
    computed: {
        pgConfig() {
            return {
                route: 'place_names',
                query: {
                    'name_id.eq': this.$route.params.id
                },
                single: true
            }
        },
        form_data() {
            return this.pg
        }
    },
    methods: {
        submit(form_data) {
            Object.assign(this.form_data, form_data)

            this.form_data.$patch({ headers: { Prefer: 'return=minimal' } })
              .then(() => {
                this.$router.push({ path: `/place-name/${this.form_data.name_id}` })
              })
              .catch(err => {
                console.error("PUT failed", err)
              })
        },
        reset() {
            this.form_data.$get()
        },
        deletePlacename(form_data) {
            form_data.$delete({ headers: { Prefer: 'return=minimal' } })
                .then(() => {
                    this.$router.push({ path: '/' })
                })
                .catch(err => {
                    console.error("DELETE failed", err)
                })
        }
    }
}
</script>
