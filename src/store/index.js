import { createStore } from 'vuex'
import axios from 'axios'

const link = 'http://192.168.2.78:8081/save'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    POST_CLIENT({commit}, client) {
        // console.log(client)
        return axios.post(link, 
            {
                workid: client.workid,
                name: client.name,
                surname: client.surname,
                phoneNumber: client.phoneNumber,
                telegram: client.telegram,
            }
            )
            .then((res) => {
                //  console.log('qeuestions: ', qeuestions.data);
                // console.log(res);
                return res.data.id;
            })

    }
  },
  modules: {
  }
})
