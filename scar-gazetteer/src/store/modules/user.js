/* eslint-disable */   // disable for whole file

import axios from 'axios'
import Cookie from 'js-cookie'
import decode from 'jwt-decode'

const JWT_TOKEN = 'scar_token'

const ADMIN_ROLES = [
    'AADC',
    'AADC_DEV',
    'GAZ_EDIT'
]

function getToken() {
    return Cookie.get(JWT_TOKEN)
}

function isTokenExpired (token) {
    const tokenDecoded = decode(token)
    if (!tokenDecoded.exp) {
      return null
    }

    const date = new Date(0)
    date.setUTCSeconds(tokenDecoded.exp)

    return date < new Date()
  }

export default {
    namespaced: true,
    state: {
        isLoggedIn: false,
        username: '',
        email_address: '',
        isAdmin: false,
        token: '',
        loginError: false
    },
    getters: {
        getToken: (state) => {
            return state.token
        }
    },
    mutations: {
        login: (state, userInfo) => {
            state.isLoggedIn = true
            state.username = userInfo.username
            state.token = userInfo.token
            state.isAdmin = userInfo.isAdmin
        },
        logout: state => {
            state.isLoggedIn = false
            state.username = ''
            state.isAdmin = false
            state.token = ''
        },
        setError: (state, isError) => {
            state.loginError = isError
        }
    },
    actions: {
        async authenticate({dispatch, commit}, loginInfo) {
            try {
                commit('setError', false)
                let response = await axios.post(`/user/api/authenticate`, loginInfo)

                Cookie.set(JWT_TOKEN, response.data.token, {
                    expires: new Date(response.data.expires),
                    secure: location.protocol === 'https:'
                })

                dispatch('checkLoggedIn')
            } catch (error) {
                console.log(`Login Error: ${error}` )
                commit('setError', true)
            }
        },
        checkLoggedIn({commit}) {
            // commit('login', {
            //     username: 'username',
            //     token: 'test',
            //     isAdmin: true
            // })
            // return

            const token = getToken()
            let isAdmin = false;

            if(token) {
                if(isTokenExpired(token)) {
                    commit('logout')
                    Cookie.remove(JWT_TOKEN)
                    return
                }

                const tokenDecoded = decode(token)

                if(ADMIN_ROLES.some(r => tokenDecoded.roles.includes(r))) {
                    isAdmin = true
                }

                commit('login', {
                    username: tokenDecoded.user.username,
                    token: token,
                    isAdmin: isAdmin
                })

            } else {
                commit('logout')
            }
        },
        logout({dispatch, commit}){
            Cookie.remove(JWT_TOKEN)
            commit('setError', false)
            dispatch('checkLoggedIn')
            window.location = '/'
        }
    }
}
