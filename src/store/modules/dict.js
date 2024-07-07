import { dicInfo } from '@/api/common'
import config from "@/utils/config";


const dict = {
    state: {
        dictList: []
    },
    mutations: {
        SET_DICTLIST: (state, dictList) => {
            state.dictList = dictList
        }
    },
    actions: {
        getDictList({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (config.isNeedLogin) {
                    dicInfo().then(response => {
                        const data = response.data
                        commit('SET_DICTLIST', data)
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                    })
                } else {
                    let response = {
                        data: {
                            roles: ['admin'],
                            username: "test",
                            icon: '',
                            menus: []
                        }
                    }
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.username)
                    commit('SET_AVATAR', data.icon)
                    resolve(response)
                }
            })
        },
    }
}

export default dict
