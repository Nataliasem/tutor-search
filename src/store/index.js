import { createStore } from 'vuex'

import tutorsModule from './modules/tutors'
import requestsModule from './modules/requests'

const store = createStore({
  modules: {
    tutors: tutorsModule,
    requests: requestsModule
  }
})

export default store