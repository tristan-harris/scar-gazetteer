<template>
    <b-container>
        <h1>Themes</h1>
        <p>A theme or an idea that reoccurs in place names is often used when naming features in Antarctica. The list
            below contains some of the many themes in existence.</p>
        <div v-for="theme of themes" :key="theme.id">
            <h3 :id="theme.name">{{ theme.name }}</h3>
            <p>{{ theme.description }}</p>
            <span v-for="(place_name, index) in theme.place_names" :key="place_name">
                <!-- it is required to search for the place name because multiple countries have submitted entries for the same places -->
                <!-- and one cannot be prioritised over others -->
                <router-link :to="{ path: '/search/results', query: { search_text: place_name } }">{{ place_name }}</router-link>
                <span v-if="index + 1 < theme.place_names.length">, </span>
            </span>
        </div>
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'

export default {
    name: 'InformationThemes',
    data: function () {
        return {
        }
    },
    mixins: [pg],
    computed: {
        themes() {
            return this.pg
        },
        pgConfig() {
            return {
                route: 'themes',
                query: {
                    select: ['*'],
                    order: [
                        ['id', 'asc'],
                    ]
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
