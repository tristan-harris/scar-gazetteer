<template>
    <b-container>
        <h1>Edit Themes</h1>
        <b-form @submit.prevent="submitAll" v-if="!themes.$get.isPending">
            <div v-for="(theme, index) in themesData" :key="theme.id || index" class="theme-section mb-4">
                <b-card :header="`Theme ${index + 1}`" class="mb-3">
                    <b-form-group label="Name:" label-for="`name-${index}`">
                        <b-form-input :id="`name-${index}`" v-model="theme.name" type="text" required />
                    </b-form-group>

                    <b-form-group label="Description:" label-for="`description-${index}`">
                        <b-form-textarea :id="`description-${index}`" v-model="theme.description" rows="3"
                            max-rows="6" />
                    </b-form-group>

                    <b-form-group label="Place Names:" label-for="`place-names-${index}`">
                        <div v-for="(placeName, placeIndex) in theme.place_names" :key="placeIndex" class="d-flex mb-2">
                            <b-form-input v-model="theme.place_names[placeIndex]" type="text" class="mr-2" />
                            <b-button variant="outline-danger" class="mx-2 my-2 h-100" @click="removePlaceName(index, placeIndex)">
                                <b-icon-trash-fill />
                            </b-button>
                        </div>
                        <b-button variant="outline-primary" size="sm" @click="addPlaceName(index)" class="mt-2">
                            Add Place Name
                        </b-button>
                    </b-form-group>

                    <br>

                    <b-button variant="outline-danger" size="sm" @click="removeTheme(index)" class="float-right">
                        Remove Theme
                    </b-button>
                </b-card>
            </div>

            <div class="mb-3">
                <b-button variant="outline-success" @click="addTheme">
                    Add New Theme
                </b-button>
            </div>

            <div class="mt-4">
                <b-button type="submit" variant="primary" class="mr-2">
                    Save All Changes
                </b-button>
                <!-- <b-button variant="secondary" @click="resetAll">
                    Reset
                </b-button> -->
            </div>
        </b-form>

        <div v-if="themes.$get.isPending" class="text-center">
            <b-spinner class="spinner"></b-spinner>
            <p>Loading themes...</p>
        </div>
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'
import axios from 'axios'

export default {
    name: "Themes",
    mixins: [pg],
    data() {
        return {
            themesData: [],
            deletedThemes: []
        }
    },
    computed: {
        themes() {
            return this.pg
        },
        pgConfig() {
            return {
                route: 'themes',
                query: {
                    select: ['*'],
                    order: [['id', 'asc']]
                }
            }
        }
    },
    watch: {
        themes: {
            handler(newThemes) {
                if (newThemes && newThemes.length > 0) {
                    // deep copy the themes data for editing
                    this.themesData = newThemes.map(theme => ({
                        id: theme.id,
                        name: theme.name || '',
                        description: theme.description || '',
                        place_names: [...(theme.place_names || [])]
                    }))
                }
                this.deletedThemes = []
            },
            immediate: true
        }
    },
    methods: {
        addTheme() {
            this.themesData.push({
                id: null, // handled by database
                name: '',
                description: '',
                place_names: []
            })
        },

        removeTheme(index) {
            const theme = this.themesData[index]
            if (theme.id) {
                this.deletedThemes.push(theme.id)
            }
            this.themesData.splice(index, 1)
        },

        addPlaceName(themeIndex) {
            this.themesData[themeIndex].place_names.push('')
        },

        removePlaceName(themeIndex, placeIndex) {
            this.themesData[themeIndex].place_names.splice(placeIndex, 1)
        },

        async submitAll() {
            try {
                const cleanedThemes = this.themesData.map(theme => ({
                    ...theme,
                    place_names: theme.place_names.filter(name => name.trim() !== '')
                }))

                const promises = []

                if (this.deletedThemes.length > 0) {
                    const deletePromises = this.deletedThemes.map(themeId =>
                        axios.delete(`/api/themes?id=eq.${themeId}`)
                    )
                    promises.push(...deletePromises)
                }

                const updatePromises = cleanedThemes.map(theme => {
                    if (theme.id) {
                        return axios.patch(`/api/themes?id=eq.${theme.id}`, {
                            name: theme.name,
                            description: theme.description || null,
                            place_names: theme.place_names
                        })
                    } else {
                        return axios.post('/api/themes', {
                            name: theme.name,
                            description: theme.description || null,
                            place_names: theme.place_names
                        })
                    }
                })

                promises.push(...updatePromises)

                await Promise.all(promises)

                this.deletedThemes = []

                await this.themes.$get()

            } catch (error) {
                console.error('Failed to update themes:', error)
            }
        },

        resetAll() {
            this.deletedThemes = []
            this.themes.$get()
        }
    }
}
</script>

<style scoped>
.spinner {
    width: 3rem;
    height: 3rem;
}
</style>
