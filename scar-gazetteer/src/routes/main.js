import Vue from 'vue'
import Router from 'vue-router'
import Postgrest from 'vue-postgrest'
import axios from 'axios'
import https from 'https'

const Main = () => import("../pages/Main.vue")
const Search = () => import("../pages/Search.vue")
const SearchResults = () => import("../pages/SearchResults.vue")
const Download = () => import("../pages/Download.vue")
const PlaceName = () => import("../pages/PlaceName.vue")
const Information = () => import("../pages/Information.vue")
const InformationGeneral = () => import("../pages/InformationGeneral.vue")
const InformationTerminology = () => import("../pages/InformationTerminology.vue")
const InformationBatchInstructions = () => import("../pages/InformationBatchInstructions.vue")
const InformationHistory = () => import("../pages/InformationHistory.vue")
const InformationThemes = () => import("../pages/InformationThemes.vue")
const InformationCGACharacteristics = () => import("../pages/InformationCGACharacteristics.vue")
const InformationData = () => import("../pages/InformationData.vue")
const InformationCitation = () => import("../pages/InformationCitation.vue")
const InformationGlossary = () => import("../pages/InformationGlossary.vue")
const InformationNamingAuthorities = () => import("../pages/InformationNamingAuthorities.vue")
const InformationStatistics = () => import("../pages/InformationStatistics.vue")
const NewPlaceName = () => import("../pages/NewPlaceName.vue")
const EditPlaceName = () => import("../pages/EditPlaceName.vue")
const Themes = () => import("../pages/Themes.vue")

import store from "../store"

Vue.use(Router)
Vue.use(Postgrest,
    {
        apiRoot: '/api'
    })

const router = new Router({
    base: process.env.VUE_APP_PROXY_PATH,
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Main,
        },
        {
            path: '/information',
            component: Information,
            children: [
                {
                    path: '',
                    component: InformationGeneral
                },
                {
                    path: 'terminology',
                    component: InformationTerminology
                },
                {
                    path: 'batch-instructions',
                    component: InformationBatchInstructions
                },
                {
                    path: 'history',
                    component: InformationHistory
                },
                {
                    path: 'themes',
                    component: InformationThemes
                },
                {
                    path: 'cga-characteristics',
                    component: InformationCGACharacteristics
                },
                {
                    path: 'data-and-validation',
                    component: InformationData
                },
                {
                    path: 'citation-information',
                    component: InformationCitation
                },
                {
                    path: 'glossary',
                    component: InformationGlossary
                },
                {
                    path: 'naming-authorities',
                    component: InformationNamingAuthorities
                },
                {
                    path: 'statistics',
                    component: InformationStatistics
                }
            ]
        },
        {
            path: '/search',
            component: Search,
            meta: {
                sitemap: { ignoreRoute: true }
            }
        },
        {
            path: '/search/results',
            component: SearchResults,
            meta: {
                sitemap: { ignoreRoute: true }
            }
        },
        {
            path: '/download',
            component: Download
        },
        {
            path: '/place-name/:id',
            component: PlaceName,
            meta: {
                sitemap: {
                    slugs: async () => await getPlaceIds()
                }
            }
        },
        {
            path: '/place-name/:id/edit',
            component: EditPlaceName,
            meta: {
                // requiresAdmin: true,
                sitemap: { ignoreRoute: true }
            }
        },
        {
            path: '/new-name',
            component: NewPlaceName,
            meta: {
                // requiresAdmin: true,
                sitemap: { ignoreRoute: true }
            }
        },
        {
            path: '/themes',
            component: Themes,
            meta: {
                // requiresAdmin: true,
                sitemap: { ignoreRoute: true }
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAdmin)) {
        if (store.state.user.isAdmin) {
            next()
            return
        }
        next('/')
    } else {
        next()
    }
})

async function getPlaceIds() {
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    // const response = await axios.get('https://scartest.data.aad.gov.au/api/place_names?select=name_id', { httpsAgent: agent })
    const response = await axios.get('api/place_names?select=name_id', { httpsAgent: agent })

    const ids = response.data.map(n => {
        return {id: n.name_id}
    })

    return ids
}

export default router
