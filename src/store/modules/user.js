// import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
//new api
import { login,nodeLogout} from '@/api/newLogin'
import Cookies from 'js-cookie'

const user = {
  state: {
    // token: getToken(),
    token: Cookies.get('token'),
    name: '',
    avatar: '',
    deviceInfo:Cookies.get('deviceInfo'),
    roles: [],
    /*self*/
    showSide:''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    set_deviceInfo(state,deviceInfo){
      state.deviceInfo = deviceInfo
    },
    Set_ShowSide(state,showSide){
      state.showSide = showSide
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {

        login(userInfo.name, userInfo.psw).then(response => {
          const data = response.data
          // setToken(data.name);

          Cookies.set('token',userInfo.name);
          commit('SET_TOKEN', userInfo.name);
          /*deviceInfo*/
          Cookies.set('deviceInfo',JSON.stringify(response.data));
          commit('set_deviceInfo', JSON.stringify(response.data));
          console.log(Cookies.get(),'Cookies')



          resolve(response)
          console.log('actions_response_log',response,userInfo)

        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ChangeSide({ commit, state },param) {
      console.log('param',param)
      commit('Set_ShowSide', param.barStatus)
    },

    // 登出
    LogOut({ commit, state },info) {
      return new Promise((resolve, reject) => {
        nodeLogout(state.token).then((res) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Cookies.remove('token');
          console.log('logout:',res.message)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        // removeToken();
        Cookies.remove(state.token);
        resolve()
      })
    }
  }
}

export default user
